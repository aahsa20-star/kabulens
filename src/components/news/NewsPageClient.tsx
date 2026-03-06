"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  ExternalLink,
  Sparkles,
  Star,
} from "lucide-react";

export type NewsArticle = {
  id: string;
  title: string;
  title_ja: string | null;
  summary: string | null;
  source: string | null;
  url: string;
  category: string | null;
  importance: number | null;
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
  "金融政策": "bg-teal-100 text-teal-700",
  "その他": "bg-gray-100 text-gray-600",
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

function ImportanceStars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < level ? "text-amber-400 fill-amber-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function NewsPageClient({
  articles,
}: {
  articles: NewsArticle[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const categories = [
    "すべて",
    ...Array.from(
      new Set(articles.map((a) => a.category).filter(Boolean))
    ),
  ] as string[];

  const filtered =
    selectedCategory === "すべて"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <>
      {/* Category filter tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-accent text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <Clock className="mx-auto mb-3 w-8 h-8 text-gray-300" />
          <p className="text-sm text-gray-500">
            該当するニュースがありません
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((article) => {
            const displayTitle = article.title_ja ?? article.title;
            const summaryLines = article.summary
              ? article.summary.split(/\n+/).filter(Boolean)
              : [];
            const hasUrl = article.url && article.url !== "#";

            return (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {article.category && (
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        CATEGORY_STYLES[article.category] ??
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {article.category}
                    </span>
                  )}
                  {article.importance != null && article.importance > 0 && (
                    <ImportanceStars level={article.importance} />
                  )}
                  <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                    <Clock className="h-3 w-3" />
                    {timeAgo(article.published_at)}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base font-bold text-navy leading-snug mb-3">
                  {displayTitle}
                </h2>

                {/* AI summary */}
                {summaryLines.length > 0 && (
                  <div className="mb-4 pl-3 border-l-2 border-accent/20">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles className="h-3.5 w-3.5 text-accent" />
                      <span className="text-[11px] font-semibold text-accent">
                        AI要約
                      </span>
                    </div>
                    <ol className="space-y-1.5">
                      {summaryLines.map((line, i) => (
                        <li
                          key={i}
                          className="text-xs text-gray-600 leading-relaxed flex gap-2"
                        >
                          <span className="num text-accent font-semibold shrink-0">
                            {i + 1}.
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
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
      )}
    </>
  );
}
