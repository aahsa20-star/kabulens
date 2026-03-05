import Link from "next/link";
import {
  Landmark,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
  Clock,
  Info,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { AdvancedChart } from "@/components/tradingview/ClientWidgets";
import { createServerClient } from "@/lib/supabase";
import FedCountdown from "./FedCountdown";

export const revalidate = 300;

// FOMC 2026 schedule
const fomcSchedule = [
  { date: "2026-01-27/28", result: "据え置き", rate: "4.25-4.50%", statement: true },
  { date: "2026-03-17/18", result: "予定", rate: "—", statement: false },
  { date: "2026-05-05/06", result: "予定", rate: "—", statement: false },
  { date: "2026-06-16/17", result: "予定", rate: "—", statement: false },
  { date: "2026-07-28/29", result: "予定", rate: "—", statement: false },
  { date: "2026-09-15/16", result: "予定", rate: "—", statement: false },
  { date: "2026-10-27/28", result: "予定", rate: "—", statement: false },
  { date: "2026-12-15/16", result: "予定", rate: "—", statement: false },
];

const resultStyles: Record<string, string> = {
  "利上げ": "bg-down-bg text-down",
  "利下げ": "bg-up-bg text-up",
  "据え置き": "bg-gray-100 text-gray-600",
  "予定": "bg-blue-50 text-blue-600",
};

async function fetchFedNews() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("news_articles")
    .select("id, title, summary, source, published_at, url")
    .eq("is_validated", true)
    .not("summary", "is", null)
    .or("source.ilike.%FRB%,source.ilike.%Fed%,category.eq.政策")
    .order("published_at", { ascending: false })
    .limit(10);
  return data || [];
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

export default async function FedWatcherPage() {
  const news = await fetchFedNews();

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-accent transition-colors">ホーム</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/macro" className="hover:text-accent transition-colors">マーケット</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy font-medium">FRBウォッチャー</span>
      </nav>

      {/* Hero */}
      <section className="bg-navy rounded-xl p-6 sm:p-8 mb-8 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Landmark className="h-6 w-6 text-accent-light" />
          <h1 className="text-2xl font-bold">FRBウォッチャー</h1>
        </div>
        <p className="text-sm text-gray-300 mb-6">
          米国金融政策を日本語でリアルタイム解説
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="bg-white/10 rounded-lg p-5">
            <p className="text-xs text-gray-300 mb-1">現在のFF金利</p>
            <p className="text-4xl font-bold num tracking-tight">
              4.25 - 4.50<span className="text-xl">%</span>
            </p>
          </div>
          <FedCountdown nextDate="2026-03-17" label="次回FOMC" />
        </div>
      </section>

      {/* FF Rate Chart */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          FF金利（政策金利）推移
        </h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <AdvancedChart symbol="FRED:FEDFUNDS" height={400} />
        </div>
      </section>

      {/* FOMC Calendar */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-accent" />
          FOMCカレンダー 2026年
        </h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">日程</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">結果</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">変更後金利</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500">声明文</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {fomcSchedule.map((item) => (
                  <tr key={item.date} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-sm font-medium text-navy num">{item.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${resultStyles[item.result] || "bg-gray-100 text-gray-600"}`}>
                        {item.result}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm num text-navy">{item.rate}</td>
                    <td className="px-4 py-3 text-center">
                      {item.statement ? (
                        <span className="text-xs text-accent">公開済み</span>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Dot Plot Explainer */}
      <section className="mb-8">
        <div className="bg-lightgray rounded-lg p-6 border-l-4 border-accent">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-5 w-5 text-accent" />
            <h2 className="text-base font-bold text-navy">ドットプロットとは？</h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            FOMC参加者が予想する将来の政策金利水準を点（ドット）で示したもの。
            市場参加者が今後の利上げ・利下げ見通しを読む重要指標です。
            各参加者の予想が点として年末ごとにプロットされ、中央値が市場の注目を集めます。
          </p>
        </div>
      </section>

      {/* FRB News */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
          <Info className="h-5 w-5 text-accent" />
          FRB関連ニュース
        </h2>
        {news.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Clock className="mx-auto mb-3 w-8 h-8 text-gray-300" />
            <p className="text-sm text-gray-500">ニュースを取得中です</p>
          </div>
        ) : (
          <div className="space-y-3">
            {news.map((item) => (
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
                      <span>出典：{item.source}</span>
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
        )}
      </section>

      {/* Impact Cards */}
      <section>
        <h2 className="text-lg font-bold text-navy mb-4">日本株への影響</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="bg-white rounded-lg shadow-sm p-5 border-t-4 border-down">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-down" />
              <h3 className="text-sm font-bold text-navy">利上げ局面</h3>
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-down shrink-0" />
                円高 → 輸出株に逆風
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-down shrink-0" />
                ハイテク・グロース株に逆風
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-down shrink-0" />
                金利上昇 → 債券利回り上昇
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 border-t-4 border-gray-300">
            <div className="flex items-center gap-2 mb-3">
              <Minus className="h-5 w-5 text-gray-400" />
              <h3 className="text-sm font-bold text-navy">据え置き</h3>
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                市場は安定しやすい
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                円安維持しやすい
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                次回の方向性に注目
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 border-t-4 border-up">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="h-5 w-5 text-up" />
              <h3 className="text-sm font-bold text-navy">利下げ局面</h3>
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-up shrink-0" />
                円安 → 輸出株に追い風
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-up shrink-0" />
                リスクオン → 株高傾向
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-up shrink-0" />
                グロース・ハイテクに追い風
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
