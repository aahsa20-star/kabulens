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
  History,
} from "lucide-react";
import { AdvancedChart } from "@/components/tradingview/ClientWidgets";
import { createServerClient } from "@/lib/supabase";
import BojCountdown from "./BojCountdown";

export const revalidate = 300;

// BOJ 2026 schedule
const bojSchedule = [
  { date: "2026-01-23/24", result: "据え置き", rate: "0.50%", decision: "現状維持" },
  { date: "2026-03-13/14", result: "予定", rate: "—", decision: "—" },
  { date: "2026-04-30/05-01", result: "予定", rate: "—", decision: "—" },
  { date: "2026-06-12/13", result: "予定", rate: "—", decision: "—" },
  { date: "2026-07-16/17", result: "予定", rate: "—", decision: "—" },
  { date: "2026-09-17/18", result: "予定", rate: "—", decision: "—" },
  { date: "2026-10-29/30", result: "予定", rate: "—", decision: "—" },
  { date: "2026-12-17/18", result: "予定", rate: "—", decision: "—" },
];

const resultStyles: Record<string, string> = {
  "利上げ": "bg-up-bg text-up",
  "利下げ": "bg-down-bg text-down",
  "据え置き": "bg-gray-100 text-gray-600",
  "予定": "bg-blue-50 text-blue-600",
};

const timeline = [
  { year: "2000", event: "ゼロ金利政策導入" },
  { year: "2001", event: "量的緩和開始" },
  { year: "2006", event: "ゼロ金利解除" },
  { year: "2008", event: "リーマンショック → 緊急利下げ" },
  { year: "2013", event: "異次元緩和（黒田バズーカ）" },
  { year: "2016", event: "マイナス金利導入・YCC導入" },
  { year: "2022", event: "YCC修正開始" },
  { year: "2024", event: "マイナス金利解除・YCC廃止" },
  { year: "2025", event: "利上げ継続（0.25% → 0.50%）" },
];

async function fetchBojNews() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("news_articles")
    .select("id, title, summary, source, published_at, url")
    .eq("is_validated", true)
    .not("summary", "is", null)
    .or("source.ilike.%日銀%,source.ilike.%日本銀行%,source.ilike.%BOJ%")
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

export default async function BojWatcherPage() {
  const news = await fetchBojNews();

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-accent transition-colors">ホーム</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/macro" className="hover:text-accent transition-colors">マーケット</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy font-medium">日銀ウォッチャー</span>
      </nav>

      {/* Hero */}
      <section className="bg-navy rounded-xl p-6 sm:p-8 mb-8 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Landmark className="h-6 w-6 text-accent-light" />
          <h1 className="text-2xl font-bold">日銀ウォッチャー</h1>
        </div>
        <p className="text-sm text-gray-300 mb-6">
          日本銀行の金融政策を投資家目線で解説
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="bg-white/10 rounded-lg p-5">
            <p className="text-xs text-gray-300 mb-1">現在の政策金利</p>
            <p className="text-4xl font-bold num tracking-tight">
              0.50<span className="text-xl">%</span>
            </p>
          </div>
          <BojCountdown nextDate="2026-03-13" label="次回金融政策決定会合" />
        </div>
      </section>

      {/* Policy Rate Chart */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          政策金利推移
        </h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <AdvancedChart symbol="ECONOMICS:JPINTR" height={400} />
        </div>
      </section>

      {/* BOJ Calendar */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-accent" />
          金融政策決定会合カレンダー 2026年
        </h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">日程</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">結果</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">政策金利</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">主な決定事項</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bojSchedule.map((item) => (
                  <tr key={item.date} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-sm font-medium text-navy num">{item.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${resultStyles[item.result] || "bg-gray-100 text-gray-600"}`}>
                        {item.result}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm num text-navy">{item.rate}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.decision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
          <History className="h-5 w-5 text-accent" />
          日銀政策の歴史
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[52px] top-0 bottom-0 w-0.5 bg-gray-200" />

            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div key={item.year} className="flex items-start gap-4">
                  <span className="num text-sm font-bold text-accent w-10 text-right shrink-0 pt-0.5">
                    {item.year}
                  </span>
                  <div className="relative">
                    <div className={`w-3 h-3 rounded-full border-2 border-white shrink-0 mt-1 ${
                      i === timeline.length - 1 ? "bg-accent" : "bg-gray-400"
                    }`} />
                  </div>
                  <p className="text-sm text-navy leading-relaxed pt-0.5">
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOJ News */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
          <Info className="h-5 w-5 text-accent" />
          日銀関連ニュース
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
        <h2 className="text-lg font-bold text-navy mb-4">為替・株価への影響</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="bg-white rounded-lg shadow-sm p-5 border-t-4 border-up">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-up" />
              <h3 className="text-sm font-bold text-navy">利上げ</h3>
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-up shrink-0" />
                円高 → 銀行株に追い風
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-down shrink-0" />
                輸出株に逆風
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-down shrink-0" />
                住宅ローン金利上昇
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 border-t-4 border-gray-300">
            <div className="flex items-center gap-2 mb-3">
              <Minus className="h-5 w-5 text-gray-400" />
              <h3 className="text-sm font-bold text-navy">現状維持</h3>
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                市場は安定
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                円安圧力が継続
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                次回会合の声明に注目
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 border-t-4 border-accent">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold text-navy">追加緩和</h3>
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-up shrink-0" />
                円安 → 輸出株に追い風
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-up shrink-0" />
                リート株に追い風
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-up shrink-0" />
                不動産セクターにプラス
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
