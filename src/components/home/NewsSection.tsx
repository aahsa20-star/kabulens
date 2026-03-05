import Link from "next/link";
import { ExternalLink, Clock, Sparkles } from "lucide-react";
import { createServerClient } from "@/lib/supabase";

type NewsItem = {
  id: string;
  title: string;
  summary: string | null;
  source: string | null;
  category: string | null;
  published_at: string | null;
  url: string;
};

const CATEGORY_STYLES: Record<string, string> = {
  "決算": "bg-blue-100 text-blue-700",
  "マクロ": "bg-purple-100 text-purple-700",
  "為替": "bg-amber-100 text-amber-700",
  "政策": "bg-emerald-100 text-emerald-700",
  "日本株": "bg-sky-100 text-sky-700",
  "米株": "bg-gray-100 text-gray-600",
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

async function fetchNews(): Promise<NewsItem[]> {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("news_articles")
    .select("id, title, summary, source, category, published_at, url")
    .eq("is_validated", true)
    .not("summary", "is", null)
    .neq("category", "米株")
    .order("importance", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(6);

  return data || [];
}

export default async function NewsSection() {
  const news = await fetchNews();

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-bold text-navy">AI要約ニュース</h2>
        </div>
        <Link
          href="/news"
          className="text-sm text-accent hover:text-accent-light transition-colors font-medium"
        >
          すべてのニュース &rarr;
        </Link>
      </div>

      {news.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Clock className="mx-auto mb-3 w-8 h-8 text-gray-300" />
          <p className="text-sm text-gray-500">
            ニュースを取得中です。しばらくお待ちください。
          </p>
          <p className="text-xs text-gray-400 mt-1">
            最新情報は30分ごとに更新されます
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col"
            >
              {/* Header: category + time */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    CATEGORY_STYLES[item.category ?? ""] ??
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.category || "その他"}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  {timeAgo(item.published_at)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-navy leading-snug mb-2 line-clamp-2">
                {item.title}
              </h3>

              {/* AI Summary */}
              <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                {item.summary}
              </p>

              {/* Footer: source + link */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-400">
                  出典：{item.source}
                </span>
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-accent hover:text-accent-light transition-colors font-medium"
                >
                  元記事を読む
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
