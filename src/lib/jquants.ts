/**
 * J-Quants API V2 Client
 * https://jpx-jquants.com/en/spec
 *
 * V2 uses x-api-key header auth (no token flow needed).
 * Free plan: previous-day closing prices only.
 */

const BASE_URL = "https://api.jquants.com/v2";

// --------------- helpers ---------------

function getApiKey(): string {
  const key = process.env.JQUANTS_API_KEY;
  if (!key) throw new Error("JQUANTS_API_KEY is not set");
  return key;
}

/** YYYYMMDD in JST */
function formatDateJST(d: Date): string {
  const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10).replace(/-/g, "");
}

/** Sleep for rate limiting */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --------------- in-memory cache ---------------

const CACHE_TTL = 60 * 60 * 1000; // 1 hour
let quotesCache: { data: StockQuote[]; at: number } | null = null;
let indicesCache: { data: IndexQuote[]; at: number } | null = null;

// --------------- types ---------------

export type StockQuote = {
  code: string;
  name: string;
  date: string;
  close: number;
  previousClose: number;
  change: number;
  changePercent: number;
};

export type IndexQuote = {
  code: string;
  name: string;
  date: string;
  close: number;
  previousClose: number;
  change: number;
  changePercent: number;
};

/** Well-known stock name mapping */
const STOCK_NAMES: Record<string, string> = {
  "7203": "トヨタ自動車",
  "6758": "ソニーグループ",
  "9984": "ソフトバンクグループ",
  "8035": "東京エレクトロン",
  "6861": "キーエンス",
  "9983": "ファーストリテイリング",
  "8306": "三菱UFJ FG",
  "6902": "デンソー",
  "7741": "HOYA",
  "6501": "日立製作所",
};

// --------------- fetch helper ---------------

async function fetchJQuants<T>(
  path: string,
  params?: Record<string, string>,
  retries = 2
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: { "x-api-key": getApiKey() },
    next: { revalidate: 3600 },
  });

  // Rate limit retry
  if (res.status === 429 && retries > 0) {
    console.warn(`[J-Quants] Rate limited, retrying in 2s...`);
    await sleep(2000);
    return fetchJQuants<T>(path, params, retries - 1);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`J-Quants ${res.status}: ${text}`);
  }

  return res.json();
}

// --------------- date range ---------------

/**
 * Calculate query date range.
 * Uses the most recent available dates, clamped to subscription end if needed.
 */
function getDateRange(): { from: string; to: string } {
  const now = new Date();
  const to = formatDateJST(now);
  const from = formatDateJST(
    new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
  );
  return { from, to };
}

// --------------- public API ---------------

/**
 * Fetch daily closing prices for given stock codes.
 * Returns last 2 trading days for change calculation.
 * Adds delay between requests to respect rate limits.
 */
export async function getDailyQuotes(
  codes: string[]
): Promise<StockQuote[]> {
  // Check cache
  if (quotesCache && Date.now() - quotesCache.at < CACHE_TTL) {
    const cached = codes
      .map((c) => quotesCache!.data.find((q) => q.code === c))
      .filter(Boolean) as StockQuote[];
    if (cached.length === codes.length) return cached;
  }

  const { from, to } = getDateRange();
  const results: StockQuote[] = [];

  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];

    // Rate limit: wait 300ms between requests
    if (i > 0) await sleep(300);

    try {
      type BarsResponse = {
        data: {
          Date: string;
          Code: string;
          C: number;
          AdjC: number;
        }[];
      };

      const res = await fetchJQuants<BarsResponse>("/equities/bars/daily", {
        code,
        from,
        to,
      });

      const rows = res.data ?? [];
      if (rows.length >= 2) {
        const latest = rows[rows.length - 1];
        const prev = rows[rows.length - 2];
        const close = latest.AdjC ?? latest.C;
        const previousClose = prev.AdjC ?? prev.C;
        const change = close - previousClose;
        const changePercent =
          previousClose !== 0 ? (change / previousClose) * 100 : 0;

        results.push({
          code,
          name: STOCK_NAMES[code] ?? code,
          date: latest.Date,
          close,
          previousClose,
          change,
          changePercent,
        });
      } else if (rows.length === 1) {
        const latest = rows[0];
        results.push({
          code,
          name: STOCK_NAMES[code] ?? code,
          date: latest.Date,
          close: latest.AdjC ?? latest.C,
          previousClose: 0,
          change: 0,
          changePercent: 0,
        });
      }
    } catch (err) {
      console.error(`[J-Quants] Failed to fetch ${code}:`, err);
    }
  }

  // Update cache
  if (results.length > 0) {
    quotesCache = { data: results, at: Date.now() };
  }
  return results;
}

/**
 * Fetch TOPIX index data.
 * Nikkei 225 is not available on the free plan (licensed by Nikkei Inc.).
 */
export async function getIndices(): Promise<IndexQuote[]> {
  if (indicesCache && Date.now() - indicesCache.at < CACHE_TTL) {
    return indicesCache.data;
  }

  const { from, to } = getDateRange();
  const results: IndexQuote[] = [];

  try {
    type IdxResponse = {
      data: { Date: string; Code: string; C: number }[];
    };

    const res = await fetchJQuants<IdxResponse>("/indices/bars/daily", {
      code: "0000",
      from,
      to,
    });

    const rows = res.data ?? [];
    if (rows.length >= 2) {
      const latest = rows[rows.length - 1];
      const prev = rows[rows.length - 2];
      const change = latest.C - prev.C;
      const changePercent = prev.C !== 0 ? (change / prev.C) * 100 : 0;

      results.push({
        code: "0000",
        name: "TOPIX",
        date: latest.Date,
        close: latest.C,
        previousClose: prev.C,
        change,
        changePercent,
      });
    }
  } catch (err) {
    console.error("[J-Quants] Failed to fetch TOPIX:", err);
  }

  indicesCache = { data: results, at: Date.now() };
  return results;
}
