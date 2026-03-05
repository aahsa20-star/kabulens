import { createServerClient } from "@/lib/supabase";
import TrendingClient from "./TrendingClient";

export const revalidate = 300;

type TrendingItem = {
  id: string;
  type: string;
  keyword: string;
  score: number;
  related_tickers: string[] | null;
  updated_at: string;
};

type NewsArticle = {
  id: string;
  title: string;
  summary: string | null;
  source: string | null;
  published_at: string | null;
  url: string;
  category: string | null;
};

export default async function TrendingPage() {
  const supabase = createServerClient();

  // Fetch trending cache
  const { data: trending } = await supabase
    .from("trending_cache")
    .select("*")
    .order("score", { ascending: false });

  // Fetch recent news for keyword search
  const since = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
  const { data: recentNews } = await supabase
    .from("news_articles")
    .select("id, title, summary, source, published_at, url, category")
    .eq("is_validated", true)
    .not("summary", "is", null)
    .gte("published_at", since)
    .order("published_at", { ascending: false })
    .limit(100);

  const google = ((trending as TrendingItem[]) || []).filter(
    (t) => t.type === "google",
  );
  const internal = ((trending as TrendingItem[]) || []).filter(
    (t) => t.type === "internal",
  );
  const lastUpdated =
    trending && trending.length > 0 ? trending[0].updated_at : null;

  return (
    <TrendingClient
      google={google}
      internal={internal}
      recentNews={(recentNews as NewsArticle[]) || []}
      lastUpdated={lastUpdated}
    />
  );
}
