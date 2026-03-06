"use client";

import { use, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Building2,
  BarChart3,
  Clock,
  ExternalLink,
  Star,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { createClient } from "@/lib/supabase-client";
import type { StockDetail } from "@/app/api/stocks/detail/route";

const AdvancedChart = dynamic(
  () => import("@/components/tradingview/AdvancedChart"),
  { ssr: false }
);

type NewsArticle = {
  id: string;
  title: string;
  title_ja: string | null;
  summary: string | null;
  source: string | null;
  url: string;
  category: string | null;
  published_at: string | null;
};

const CATEGORY_STYLES: Record<string, string> = {
  "決算": "bg-blue-100 text-blue-700",
  "マクロ": "bg-purple-100 text-purple-700",
  "為替": "bg-amber-100 text-amber-700",
  "政策": "bg-emerald-100 text-emerald-700",
  "日本株": "bg-sky-100 text-sky-700",
  "米株": "bg-gray-100 text-gray-600",
  "テクノロジー": "bg-cyan-100 text-cyan-700",
  "その他": "bg-gray-100 text-gray-600",
};

function formatPrice(n: number): string {
  if (n >= 10000) return n.toLocaleString("ja-JP", { minimumFractionDigits: 0, maximumFractionDigits: 1 });
  return n.toLocaleString("ja-JP", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function formatMarketCap(n: number): string {
  if (n >= 1_000_000_000_000) {
    return `${(n / 1_000_000_000_000).toFixed(1)}兆円`;
  }
  if (n >= 100_000_000) {
    return `${(n / 100_000_000).toFixed(0)}億円`;
  }
  return `${n.toLocaleString("ja-JP")}円`;
}

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}分前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}時間前`;
  const days = Math.floor(hours / 24);
  return `${days}日前`;
}

export default function StockDetailPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const router = useRouter();
  const { user } = useAuth();

  const [stock, setStock] = useState<StockDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  // Fetch stock detail
  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/stocks/detail?code=${ticker}`);
        if (!res.ok) throw new Error("銘柄データの取得に失敗しました");
        const data = await res.json();
        setStock(data.detail);
      } catch (e) {
        setError(e instanceof Error ? e.message : "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [ticker]);

  // Fetch related news from Supabase
  useEffect(() => {
    async function fetchNews() {
      const supabase = createClient();
      const { data } = await supabase
        .from("news_articles")
        .select("id, title, title_ja, summary, source, url, category, published_at")
        .eq("is_validated", true)
        .not("summary", "is", null)
        .order("published_at", { ascending: false })
        .limit(6);
      setNews(data ?? []);
    }
    fetchNews();
  }, []);

  // Check watchlist
  const checkFavorite = useCallback(async () => {
    if (!user) return;
    const supabase = createClient();
    const { data } = await supabase
      .from("watchlists")
      .select("id")
      .eq("ticker", ticker)
      .maybeSingle();
    setIsFavorite(!!data);
  }, [user, ticker]);

  useEffect(() => {
    checkFavorite();
  }, [checkFavorite]);

  async function toggleFavorite() {
    if (!user) {
      router.push("/login");
      return;
    }
    setFavLoading(true);
    const supabase = createClient();
    if (isFavorite) {
      await supabase.from("watchlists").delete().eq("ticker", ticker);
      setIsFavorite(false);
    } else {
      await supabase.from("watchlists").insert({
        user_id: user.id,
        ticker,
        company_name: stock?.name ?? null,
      });
      setIsFavorite(true);
    }
    setFavLoading(false);
  }

  const isUp = stock ? stock.change >= 0 : true;

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-accent transition-colors">ホーム</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/stocks" className="hover:text-accent transition-colors">株式</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/stocks/japan" className="hover:text-accent transition-colors">国内株式</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy font-medium">{ticker}</span>
      </nav>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm">
          <Loader2 className="h-8 w-8 text-accent animate-spin mb-3" />
          <p className="text-sm text-gray-500">銘柄データを取得中...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm">
          <AlertCircle className="h-8 w-8 text-red-400 mb-3" />
          <p className="text-sm text-gray-500 mb-4">{error}</p>
          <Link href="/stocks/japan" className="text-sm text-accent hover:text-accent-light">
            国内株式一覧に戻る
          </Link>
        </div>
      )}

      {/* Main content */}
      {!loading && !error && stock && (
        <>
          {/* Stock header */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-navy">{stock.name}</h1>
              <span className="num text-sm text-gray-400">{stock.code}.T</span>
              <span className="text-xs text-gray-400">{stock.nameEn}</span>
              <button
                onClick={toggleFavorite}
                disabled={favLoading}
                className={`ml-auto flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isFavorite
                    ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                } disabled:opacity-50`}
                aria-label={isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
              >
                <Star
                  className={`h-4 w-4 ${isFavorite ? "fill-amber-500 text-amber-500" : ""}`}
                />
                {isFavorite ? "お気に入り済み" : "お気に入り"}
              </button>
            </div>

            <div className="flex flex-wrap items-baseline gap-4">
              <span className="num text-3xl font-bold text-navy">
                {formatPrice(stock.price)}
              </span>
              <span
                className={`num text-lg font-semibold ${
                  isUp ? "text-up" : "text-down"
                }`}
              >
                {isUp ? "+" : ""}
                {formatPrice(stock.change)}
              </span>
              <span
                className={`num inline-flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-lg ${
                  isUp ? "bg-up-bg text-up" : "bg-down-bg text-down"
                }`}
              >
                {isUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {isUp ? "+" : ""}
                {stock.changePercent.toFixed(2)}%
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              東証プライム &middot; {stock.sector !== "---" ? stock.sector : stock.industry}
            </p>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-navy flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-accent" />
                チャート
              </h2>
            </div>
            <AdvancedChart symbol={`TSE:${ticker}`} height={500} />
          </div>

          {/* Info card */}
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-navy flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-accent" />
                  基本情報
                </h2>
              </div>
              <div className="p-4">
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs text-gray-400 mb-1">時価総額</dt>
                    <dd className="text-sm font-semibold text-navy">
                      {stock.marketCap > 0 ? formatMarketCap(stock.marketCap) : "---"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-400 mb-1">PER（株価収益率）</dt>
                    <dd className="num text-sm font-semibold text-navy">
                      {stock.per != null ? `${stock.per.toFixed(1)}倍` : "---"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-400 mb-1">PBR（株価純資産倍率）</dt>
                    <dd className="num text-sm font-semibold text-navy">
                      {stock.pbr != null ? `${stock.pbr.toFixed(2)}倍` : "---"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-400 mb-1">配当利回り</dt>
                    <dd className="num text-sm font-semibold text-navy">
                      {stock.dividendYield != null ? `${stock.dividendYield.toFixed(2)}%` : "---"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-400 mb-1">出来高</dt>
                    <dd className="num text-sm font-semibold text-navy">
                      {stock.volume > 0 ? stock.volume.toLocaleString("ja-JP") : "---"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-400 mb-1">業種</dt>
                    <dd className="text-sm font-semibold text-navy">
                      {stock.sector !== "---" ? stock.sector : stock.industry}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Related news */}
          {news.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-bold text-navy">最新ニュース</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {news.map((article) => {
                  const displayTitle = article.title_ja ?? article.title;
                  const hasUrl = article.url && article.url !== "#";
                  return (
                    <article
                      key={article.id}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-3">
                        {article.category && (
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              CATEGORY_STYLES[article.category] ?? "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {article.category}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                          <Clock className="h-3 w-3" />
                          {timeAgo(article.published_at)}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-navy leading-snug mb-2 line-clamp-2">
                        {displayTitle}
                      </h3>
                      {article.summary && (
                        <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                          {article.summary}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                        <span className="text-[11px] text-gray-400">
                          出典：{article.source || "不明"}
                        </span>
                        {hasUrl && (
                          <Link
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-accent hover:text-accent-light transition-colors font-medium"
                          >
                            元記事を読む
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
