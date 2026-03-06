/**
 * Japan stock data via yahoo-finance2
 *
 * Uses Yahoo Finance unofficial API through the widely-used yahoo-finance2 npm package.
 * Stock codes use ".T" suffix for Tokyo Stock Exchange (e.g., "7203.T" for Toyota).
 */

import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

// --------------- types ---------------

export type StockQuote = {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  volume: number;
};

// --------------- in-memory cache ---------------

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let quotesCache: { data: StockQuote[]; at: number } | null = null;

// --------------- public API ---------------

/**
 * Fetch stock quotes for given TSE codes.
 * Adds ".T" suffix for Yahoo Finance Tokyo exchange symbols.
 */
export async function getStockQuotes(
  codes: string[]
): Promise<StockQuote[]> {
  // Check cache
  if (quotesCache && Date.now() - quotesCache.at < CACHE_TTL) {
    const cached = codes
      .map((c) => quotesCache!.data.find((q) => q.code === c))
      .filter(Boolean) as StockQuote[];
    if (cached.length === codes.length) return cached;
  }

  const results = await Promise.allSettled(
    codes.map(async (code) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const quote: any = await yahooFinance.quote(`${code}.T`);
      return {
        code,
        name: (quote.shortName || quote.longName || code) as string,
        price: (quote.regularMarketPrice ?? 0) as number,
        change: (quote.regularMarketChange ?? 0) as number,
        changePercent: (quote.regularMarketChangePercent ?? 0) as number,
        previousClose: (quote.regularMarketPreviousClose ?? 0) as number,
        volume: (quote.regularMarketVolume ?? 0) as number,
      };
    })
  );

  const quotes = results
    .filter(
      (r): r is PromiseFulfilledResult<StockQuote> =>
        r.status === "fulfilled"
    )
    .map((r) => r.value);

  // Log failures
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(
        `[yahoo-finance2] Failed to fetch ${codes[i]}:`,
        r.reason
      );
    }
  });

  // Update cache
  if (quotes.length > 0) {
    quotesCache = { data: quotes, at: Date.now() };
  }

  return quotes;
}
