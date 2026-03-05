import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// Stock master for mention counting
const STOCK_MASTER = [
  { ticker: "7203", names: ["トヨタ", "トヨタ自動車", "Toyota"] },
  { ticker: "6758", names: ["ソニー", "ソニーグループ", "Sony"] },
  { ticker: "9984", names: ["ソフトバンク", "SBG", "SoftBank"] },
  { ticker: "6861", names: ["キーエンス", "Keyence"] },
  { ticker: "9983", names: ["ファーストリテイリング", "ユニクロ", "ファストリ"] },
  { ticker: "7974", names: ["任天堂", "Nintendo"] },
  { ticker: "8035", names: ["東京エレクトロン", "東エレ", "TEL"] },
  { ticker: "6501", names: ["日立", "日立製作所", "Hitachi"] },
  { ticker: "8306", names: ["三菱UFJ", "MUFG"] },
  { ticker: "4063", names: ["信越化学", "信越化学工業"] },
  { ticker: "6367", names: ["ダイキン", "ダイキン工業"] },
  { ticker: "7267", names: ["ホンダ", "本田技研", "Honda"] },
  { ticker: "8766", names: ["東京海上", "東京海上HD"] },
  { ticker: "9433", names: ["KDDI"] },
  { ticker: "6098", names: ["リクルート"] },
  { ticker: "4568", names: ["第一三共"] },
  { ticker: "4519", names: ["中外製薬"] },
  { ticker: "6902", names: ["デンソー", "DENSO"] },
  { ticker: "6594", names: ["ニデック", "日本電産", "Nidec"] },
  { ticker: "2914", names: ["JT", "日本たばこ"] },
  { ticker: "7741", names: ["HOYA"] },
  { ticker: "9432", names: ["NTT", "日本電信電話"] },
  { ticker: "4661", names: ["オリエンタルランド", "OLC"] },
  { ticker: "6762", names: ["TDK"] },
  { ticker: "4502", names: ["武田薬品", "武田"] },
  { ticker: "7751", names: ["キヤノン", "Canon"] },
  { ticker: "3382", names: ["セブン", "セブン＆アイ", "7&i"] },
  { ticker: "6988", names: ["日東電工"] },
  { ticker: "2801", names: ["キッコーマン"] },
  { ticker: "6273", names: ["SMC"] },
];

async function fetchGoogleTrends(): Promise<
  { keyword: string; score: number }[]
> {
  try {
    const res = await fetch(
      "https://trends.google.com/trends/api/dailytrends?hl=ja&tz=-540&geo=JP&ns=15",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; KabuLens/1.0; +https://kabulens.com)",
        },
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!res.ok) return [];

    let text = await res.text();
    // Google prefixes response with ")]}'," — strip it
    if (text.startsWith(")]}',")) {
      text = text.slice(5);
    }

    const json = JSON.parse(text);
    const searches =
      json?.default?.trendingSearchesDays?.[0]?.trendingSearches || [];

    return searches.slice(0, 20).map(
      (s: { title: { query: string }; formattedTraffic: string }, i: number) => ({
        keyword: s.title?.query || "",
        score: 100 - i * 5,
      }),
    );
  } catch {
    return [];
  }
}

async function countStockMentions(
  supabase: ReturnType<typeof createServerClient>,
): Promise<{ keyword: string; score: number; tickers: string[] }[]> {
  const since = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

  const { data: articles } = await supabase
    .from("news_articles")
    .select("title, summary")
    .gte("published_at", since);

  if (!articles || articles.length === 0) return [];

  const counts: Record<string, { count: number; ticker: string; name: string }> =
    {};

  for (const article of articles) {
    const text = `${article.title || ""} ${article.summary || ""}`;
    for (const stock of STOCK_MASTER) {
      for (const name of stock.names) {
        if (text.includes(name)) {
          if (!counts[stock.ticker]) {
            counts[stock.ticker] = {
              count: 0,
              ticker: stock.ticker,
              name: stock.names[0],
            };
          }
          counts[stock.ticker].count++;
          break; // count each stock once per article
        }
      }
    }
  }

  return Object.values(counts)
    .filter((c) => c.count >= 1)
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)
    .map((c) => ({
      keyword: c.name,
      score: c.count,
      tickers: [c.ticker],
    }));
}

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerClient();

  // Fetch both data sources in parallel
  const [googleTrends, stockMentions] = await Promise.all([
    fetchGoogleTrends(),
    countStockMentions(supabase),
  ]);

  // Clear old cache
  await supabase.from("trending_cache").delete().neq("id", "");

  // Insert Google trends
  if (googleTrends.length > 0) {
    await supabase.from("trending_cache").insert(
      googleTrends.map((t) => ({
        type: "google",
        keyword: t.keyword,
        score: t.score,
        related_tickers: null,
      })),
    );
  }

  // Insert internal stock mentions
  if (stockMentions.length > 0) {
    await supabase.from("trending_cache").insert(
      stockMentions.map((t) => ({
        type: "internal",
        keyword: t.keyword,
        score: t.score,
        related_tickers: t.tickers,
      })),
    );
  }

  return NextResponse.json({
    ok: true,
    google: googleTrends.length,
    internal: stockMentions.length,
  });
}
