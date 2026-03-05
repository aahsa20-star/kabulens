"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flame,
  TrendingUp,
  Clock,
  ExternalLink,
  Search,
  BarChart3,
  Hash,
  ChevronRight,
} from "lucide-react";

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

export default function TrendingClient({
  google,
  internal,
  recentNews,
  lastUpdated,
}: {
  google: TrendingItem[];
  internal: TrendingItem[];
  recentNews: NewsArticle[];
  lastUpdated: string | null;
}) {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  // Filter news by selected keyword
  const filteredNews = selectedKeyword
    ? recentNews.filter(
        (n) =>
          (n.title && n.title.includes(selectedKeyword)) ||
          (n.summary && n.summary.includes(selectedKeyword)),
      )
    : recentNews.slice(0, 10);

  const hasData = google.length > 0 || internal.length > 0;

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Hero */}
      <section className="bg-navy rounded-xl p-6 sm:p-8 mb-8 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="h-6 w-6 text-accent-light" />
          <h1 className="text-2xl font-bold">トレンド</h1>
        </div>
        <p className="text-sm text-gray-300 mb-2">
          今日の市場で話題のワード・銘柄
        </p>
        {lastUpdated && (
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            最終更新: {timeAgo(lastUpdated)}
          </p>
        )}
      </section>

      {!hasData ? (
        /* Empty state: show recent news as fallback */
        <div className="space-y-8">
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Flame className="mx-auto mb-3 w-8 h-8 text-gray-300" />
            <p className="text-sm text-gray-500 mb-1">
              トレンドデータを収集中です
            </p>
            <p className="text-xs text-gray-400">
              Cronジョブが起動すると自動で更新されます
            </p>
          </div>

          {/* Show recent news as fallback */}
          {recentNews.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                直近のニュース
              </h2>
              <div className="space-y-3">
                {recentNews.slice(0, 10).map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-navy line-clamp-2 mb-1">
                          {item.title}
                        </h3>
                        {item.summary && (
                          <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                            {item.summary}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-[11px] text-gray-400">
                          {item.category && (
                            <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">
                              {item.category}
                            </span>
                          )}
                          {item.source && <span>出典：{item.source}</span>}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {timeAgo(item.published_at)}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-accent hover:text-accent-light"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column: Keywords + Stock ranking */}
          <div className="lg:col-span-2 space-y-8">
            {/* Google Trends Tag Cloud */}
            {google.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  急上昇キーワード
                </h2>
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <div className="flex flex-wrap gap-2">
                    {google.map((item) => {
                      const isSelected = selectedKeyword === item.keyword;
                      // Size based on score
                      const fontSize =
                        item.score >= 80
                          ? "text-base font-bold"
                          : item.score >= 50
                            ? "text-sm font-semibold"
                            : "text-xs font-medium";
                      return (
                        <button
                          key={item.id}
                          onClick={() =>
                            setSelectedKeyword(
                              isSelected ? null : item.keyword,
                            )
                          }
                          className={`px-3 py-1.5 rounded-full transition-all ${fontSize} ${
                            isSelected
                              ? "bg-accent text-white shadow-md"
                              : "bg-lightgray text-navy hover:bg-accent/10 hover:text-accent"
                          }`}
                        >
                          <Hash className="inline h-3 w-3 mr-0.5 opacity-50" />
                          {item.keyword}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* Internal Stock Mention Ranking */}
            {internal.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  Kabu Lens内 注目銘柄ランキング
                </h2>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 w-12">
                            #
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                            銘柄
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                            コード
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                            言及回数
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 hidden sm:table-cell">
                            アクション
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {internal.map((item, i) => (
                          <tr
                            key={item.id}
                            className="hover:bg-gray-50/50 cursor-pointer"
                            onClick={() =>
                              setSelectedKeyword(
                                selectedKeyword === item.keyword
                                  ? null
                                  : item.keyword,
                              )
                            }
                          >
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                                  i === 0
                                    ? "bg-yellow-100 text-yellow-700"
                                    : i === 1
                                      ? "bg-gray-200 text-gray-600"
                                      : i === 2
                                        ? "bg-amber-100 text-amber-700"
                                        : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                {i + 1}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-navy">
                              {item.keyword}
                            </td>
                            <td className="px-4 py-3 text-sm num text-gray-500">
                              {item.related_tickers?.[0] || "—"}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent num">
                                {item.score}
                                <span className="text-xs text-gray-400 font-normal">
                                  件
                                </span>
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right hidden sm:table-cell">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedKeyword(item.keyword);
                                }}
                                className="text-xs text-accent hover:text-accent-light transition-colors"
                              >
                                ニュースを見る
                                <ChevronRight className="inline h-3 w-3" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right column: Related News */}
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <Search className="h-5 w-5 text-accent" />
                {selectedKeyword
                  ? `「${selectedKeyword}」の関連ニュース`
                  : "最新ニュース"}
              </h2>

              {selectedKeyword && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-accent text-white text-sm font-medium">
                    {selectedKeyword}
                  </span>
                  <button
                    onClick={() => setSelectedKeyword(null)}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    クリア
                  </button>
                </div>
              )}

              {filteredNews.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                  <Search className="mx-auto mb-2 w-6 h-6 text-gray-300" />
                  <p className="text-sm text-gray-500">
                    関連ニュースが見つかりません
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredNews.slice(0, 15).map((item) => (
                    <article
                      key={item.id}
                      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-sm font-bold text-navy line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      {item.summary && (
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                          {item.summary}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[11px] text-gray-400">
                          {item.source && <span>{item.source}</span>}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {timeAgo(item.published_at)}
                          </span>
                        </div>
                        <Link
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-accent-light"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* X search link */}
              {selectedKeyword && (
                <Link
                  href={`https://twitter.com/search?q=${encodeURIComponent(selectedKeyword + " 株")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mt-4 py-3 bg-white rounded-lg shadow-sm text-sm font-medium text-navy hover:bg-gray-50 transition-colors"
                >
                  <span>このワードをXで検索</span>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </Link>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
