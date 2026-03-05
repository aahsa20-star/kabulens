import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Briefcase,
  Bell,
  Mail,
  ChevronRight,
  Clock,
  ExternalLink,
  LayoutDashboard,
} from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createServerClient } from "@/lib/supabase";

export const metadata = {
  title: "マイページ",
};

const quickLinks = [
  {
    href: "/watchlist",
    label: "お気に入り銘柄",
    description: "銘柄をウォッチリストに追加・管理",
    icon: Star,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    href: "/portfolio",
    label: "ポートフォリオ",
    description: "保有銘柄・投資額を記録・管理",
    icon: Briefcase,
    color: "text-accent",
    bg: "bg-blue-50",
  },
  {
    href: "#",
    label: "アラート設定",
    description: "株価・指標の通知を設定",
    icon: Bell,
    color: "text-purple-500",
    bg: "bg-purple-50",
    comingSoon: true,
  },
  {
    href: "/newsletter",
    label: "メルマガ設定",
    description: "朝刊レポート・決算速報を受信",
    icon: Mail,
    color: "text-up",
    bg: "bg-emerald-50",
  },
];

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

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user's watchlist
  const { data: watchlist } = await supabase
    .from("watchlists")
    .select("ticker, company_name")
    .order("created_at", { ascending: false });

  // Fetch related news for watchlisted tickers
  const tickers = (watchlist || []).map((w) => w.ticker);
  let recentNews: {
    id: string;
    title: string;
    source: string | null;
    published_at: string | null;
    url: string;
  }[] = [];

  if (tickers.length > 0) {
    const serviceClient = createServerClient();
    const orFilter = tickers
      .map((t) => `title.ilike.%${t}%`)
      .join(",");
    const { data } = await serviceClient
      .from("news_articles")
      .select("id, title, source, published_at, url")
      .eq("is_validated", true)
      .or(orFilter)
      .order("published_at", { ascending: false })
      .limit(5);
    recentNews = data || [];
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-accent transition-colors">
          ホーム
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy font-medium">マイページ</span>
      </nav>

      {/* Welcome */}
      <section className="bg-navy rounded-xl p-6 sm:p-8 mb-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <LayoutDashboard className="h-6 w-6 text-accent-light" />
          <h1 className="text-2xl font-bold">マイページ</h1>
        </div>
        <p className="text-sm text-gray-300">
          {user.email} でログイン中
        </p>
      </section>

      {/* Quick links */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {quickLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow group ${
              link.comingSoon ? "pointer-events-none opacity-70" : ""
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`h-10 w-10 rounded-lg ${link.bg} flex items-center justify-center`}
              >
                <link.icon className={`h-5 w-5 ${link.color}`} />
              </div>
              {link.comingSoon && (
                <span className="text-[10px] font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                  近日公開
                </span>
              )}
            </div>
            <h2 className="text-sm font-bold text-navy mb-1 group-hover:text-accent transition-colors">
              {link.label}
            </h2>
            <p className="text-xs text-gray-500">{link.description}</p>
          </Link>
        ))}
      </section>

      {/* Watchlist news */}
      <section>
        <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-accent" />
          お気に入り銘柄のニュース
        </h2>

        {tickers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Star className="mx-auto h-8 w-8 text-gray-300 mb-3" />
            <p className="text-sm text-gray-500 mb-2">
              まだ銘柄が登録されていません
            </p>
            <Link
              href="/watchlist"
              className="text-sm text-accent hover:text-accent-light transition-colors font-medium"
            >
              お気に入り銘柄を追加する →
            </Link>
          </div>
        ) : recentNews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Clock className="mx-auto h-8 w-8 text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">
              お気に入り銘柄に関連するニュースはまだありません
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentNews.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-navy line-clamp-2 mb-1">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      {article.source && <span>出典：{article.source}</span>}
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {timeAgo(article.published_at)}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={article.url}
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
        )}
      </section>
    </div>
  );
}
