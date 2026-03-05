"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  ExternalLink,
  Sparkles,
  Star,
  ChevronLeft,
} from "lucide-react";

type NewsArticle = {
  id: number;
  title: string;
  summary: string[];
  source: string;
  sourceUrl: string;
  timeAgo: string;
  category: string;
  categoryKey: string;
  importance: number;
};

const CATEGORY_STYLES: Record<string, string> = {
  "決算": "bg-blue-100 text-blue-700",
  "マクロ": "bg-purple-100 text-purple-700",
  "為替": "bg-amber-100 text-amber-700",
  "政策": "bg-emerald-100 text-emerald-700",
  "テクノロジー": "bg-cyan-100 text-cyan-700",
};

type CategoryTab = {
  key: string;
  label: string;
};

const categoryTabs: CategoryTab[] = [
  { key: "all", label: "すべて" },
  { key: "earnings", label: "決算" },
  { key: "macro", label: "マクロ" },
  { key: "fx", label: "為替" },
  { key: "policy", label: "政策" },
  { key: "tech", label: "テクノロジー" },
];

const mockArticles: NewsArticle[] = [
  {
    id: 1,
    title: "日銀、次回会合で追加利上げの可能性を示唆　植田総裁が記者会見で言及",
    summary: [
      "植田総裁は定例記者会見で、経済・物価の見通しが実現していけば引き続き政策金利を引き上げる方針を改めて示した。",
      "市場では7月会合での0.25%追加利上げ観測が60%超に上昇。10年債利回りは1.2%台に。",
      "日米金利差の縮小見通しから円高圧力が意識され、輸出関連銘柄を中心に株式市場は軟調。",
    ],
    source: "ロイター",
    sourceUrl: "#",
    timeAgo: "32分前",
    category: "政策",
    categoryKey: "policy",
    importance: 5,
  },
  {
    id: 2,
    title: "トヨタ自動車、通期営業利益が過去最高の6.2兆円　EV投資1兆円追加も発表",
    summary: [
      "2026年3月期の連結営業利益は前期比12%増の6兆2,000億円となり、2期連続で過去最高を更新した。",
      "次世代EV向け全固体電池の量産化に向け、設備投資を1兆円追加する方針も同時に公表。",
      "株主還元として自社株買い5,000億円の実施を決議。配当金も10円増配の年間90円に。",
    ],
    source: "JPX",
    sourceUrl: "#",
    timeAgo: "1時間前",
    category: "決算",
    categoryKey: "earnings",
    importance: 5,
  },
  {
    id: 3,
    title: "米FRB、6月FOMCで金利据え置き　年内1回の利下げ見通しを維持",
    summary: [
      "FRBは政策金利を4.25-4.50%に据え置くことを全会一致で決定。声明文では慎重な姿勢を維持。",
      "パウエル議長はインフレ鈍化の進展を認めつつ、利下げ開始時期は「データ次第」と強調。",
      "ドットチャートでは年内1回の利下げが中央値。市場は9月利下げ開始の確率を65%織り込み。",
    ],
    source: "FRB",
    sourceUrl: "#",
    timeAgo: "2時間前",
    category: "マクロ",
    categoryKey: "macro",
    importance: 5,
  },
  {
    id: 4,
    title: "ドル円、一時150円台に下落　日米金利差縮小の思惑が広がる",
    summary: [
      "東京外為市場でドル円が一時150.28円まで下落し、約2カ月ぶりの円高水準を記録。",
      "日銀の追加利上げ観測とFRBの利下げ期待が同時に強まり、日米金利差縮小が意識された。",
      "テクニカル的には200日移動平均線の148.50円が次の下値目途として注目されている。",
    ],
    source: "ロイター",
    sourceUrl: "#",
    timeAgo: "3時間前",
    category: "為替",
    categoryKey: "fx",
    importance: 4,
  },
  {
    id: 5,
    title: "ソフトバンクG、AI投資ファンド第2号が最終クローズ　総額15兆円規模に",
    summary: [
      "AIに特化した新ファンドの最終クローズを完了。世界各国の政府系ファンドから出資を集めた。",
      "投資先はAI半導体、ロボティクス、自動運転の3分野に重点配分する方針を表明。",
      "孫正義会長は「AIの社会実装フェーズに入り、実用化に近い企業への集中投資を進める」とコメント。",
    ],
    source: "日経",
    sourceUrl: "#",
    timeAgo: "4時間前",
    category: "テクノロジー",
    categoryKey: "tech",
    importance: 4,
  },
  {
    id: 6,
    title: "東京エレクトロン、AI半導体向け装置の受注が前年比2倍に急増",
    summary: [
      "2026年3月期第1四半期の新規受注額が前年同期比98%増の8,200億円と過去最高を更新。",
      "生成AI向けHBM（高帯域メモリ）製造装置の需要が急拡大。TSMCやSamsungからの大型受注が寄与。",
      "通期の業績見通しを上方修正し、売上高2兆5,000億円、営業利益7,500億円を新たに予想。",
    ],
    source: "JPX",
    sourceUrl: "#",
    timeAgo: "5時間前",
    category: "決算",
    categoryKey: "earnings",
    importance: 4,
  },
  {
    id: 7,
    title: "新NISA、開始1年で口座数が2,500万件突破　個人の日本株投資が拡大",
    summary: [
      "金融庁の発表によると、新NISA口座の開設数が累計2,500万件を超え、国民の約5人に1人が利用。",
      "投資信託への積立が中心だが、個別日本株への投資も増加傾向。成長投資枠の利用率は45%。",
      "20-30代の若年層の口座開設が全体の40%を占め、投資の裾野拡大が顕著に。",
    ],
    source: "金融庁",
    sourceUrl: "#",
    timeAgo: "6時間前",
    category: "政策",
    categoryKey: "policy",
    importance: 3,
  },
  {
    id: 8,
    title: "中国人民銀行が預金準備率0.5%引き下げ　景気刺激策を強化",
    summary: [
      "中国人民銀行は市中銀行の預金準備率を0.5ポイント引き下げ、約1兆元の資金供給を実施。",
      "不動産市場の低迷と個人消費の伸び悩みに対応し、金融緩和を通じた景気下支えを図る。",
      "上海総合指数は発表後に1.5%上昇。日本の中国関連銘柄にも買いが波及する展開。",
    ],
    source: "ロイター",
    sourceUrl: "#",
    timeAgo: "8時間前",
    category: "マクロ",
    categoryKey: "macro",
    importance: 3,
  },
  {
    id: 9,
    title: "任天堂、次世代ゲーム機「Switch 2」の予約受付を開始　半導体不足リスクも",
    summary: [
      "任天堂は次世代携帯ゲーム機「Switch 2」の公式予約受付を全世界で開始。発売は2025年9月予定。",
      "NVIDIA製カスタムチップ搭載で4K対応。価格は49,980円で、現行機から約1万円の値上げ。",
      "半導体供給の安定確保が課題。初回出荷台数は1,000万台を計画するも、需要が大幅に上回る見通し。",
    ],
    source: "日経",
    sourceUrl: "#",
    timeAgo: "10時間前",
    category: "テクノロジー",
    categoryKey: "tech",
    importance: 3,
  },
  {
    id: 10,
    title: "経常収支、4月は2.8兆円の黒字　海外投資収益が過去最高を更新",
    summary: [
      "財務省が発表した4月の経常収支は2兆8,000億円の黒字で、前年同月比15%増加。",
      "第一次所得収支が3兆5,000億円と過去最高。円安環境下での海外子会社の配当金増加が寄与。",
      "貿易収支は7,000億円の赤字が続くも、所得収支の黒字拡大でカバー。構造的な黒字基調を維持。",
    ],
    source: "財務省",
    sourceUrl: "#",
    timeAgo: "12時間前",
    category: "マクロ",
    categoryKey: "macro",
    importance: 2,
  },
];

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

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles =
    activeCategory === "all"
      ? mockArticles
      : mockArticles.filter((a) => a.categoryKey === activeCategory);

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-accent transition-colors">ホーム</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy font-medium">ニュース</span>
      </nav>

      {/* Page heading */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-6 w-6 text-accent" />
        <h1 className="text-2xl font-bold text-navy">ニュース</h1>
      </div>

      {/* Category filter tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
        {categoryTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveCategory(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === tab.key
                ? "bg-accent text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Articles list */}
      <div className="space-y-4">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6"
          >
            {/* Header: category + importance + time */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  CATEGORY_STYLES[article.category] ?? "bg-gray-100 text-gray-600"
                }`}
              >
                {article.category}
              </span>
              <ImportanceStars level={article.importance} />
              <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                <Clock className="h-3 w-3" />
                {article.timeAgo}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-base font-bold text-navy leading-snug mb-3">
              {article.title}
            </h2>

            {/* AI 3-line summary */}
            <div className="mb-4 pl-3 border-l-2 border-accent/20">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span className="text-[11px] font-semibold text-accent">AI要約</span>
              </div>
              <ol className="space-y-1.5">
                {article.summary.map((line, i) => (
                  <li key={i} className="text-xs text-gray-600 leading-relaxed flex gap-2">
                    <span className="num text-accent font-semibold shrink-0">{i + 1}.</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Footer: source + link */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-[11px] text-gray-400">
                出典：{article.source}
              </span>
              <Link
                href={article.sourceUrl}
                className="flex items-center gap-1 text-xs text-accent hover:text-accent-light transition-colors font-medium"
              >
                元記事を読む &rarr;
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-sm">該当するニュースがありません</p>
        </div>
      )}

      {/* Pagination placeholder */}
      <div className="flex items-center justify-center gap-2 mt-10">
        <button
          disabled
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-200 rounded-lg cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
          前のページ
        </button>
        <span className="num px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg">
          1
        </span>
        <button className="num px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          2
        </button>
        <button className="num px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          3
        </button>
        <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          次のページ
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
