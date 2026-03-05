import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, Users, TrendingUp } from "lucide-react";
import ComingSoonBanner from "@/components/ui/ComingSoonBanner";

export const metadata: Metadata = {
  title: "コラム（準備中）",
  description:
    "投資家・株YouTuberによる独自コラムを準備中。",
};

type Writer = {
  id: string;
  name: string;
  initial: string;
  color: string;
  title: string;
  bio: string;
  followers: string;
  style: string;
};

type ColumnArticle = {
  slug: string;
  title: string;
  excerpt: string;
  authorId: string;
  authorName: string;
  authorInitial: string;
  authorColor: string;
  date: string;
  readTime: string;
  category: string;
  gradientFrom: string;
  gradientTo: string;
};

const writers: Writer[] = [
  {
    id: "tanaka",
    name: "田中 太郎",
    initial: "田",
    color: "bg-blue-500",
    title: "株YouTuber",
    bio: "登録者数45万人の株式投資チャンネル運営。元証券会社アナリスト。テクニカル分析と決算読み解きを得意とし、初心者にもわかりやすい解説が人気。",
    followers: "450,000",
    style: "テクニカル重視",
  },
  {
    id: "suzuki",
    name: "鈴木 花子",
    initial: "鈴",
    color: "bg-emerald-500",
    title: "独立系アナリスト",
    bio: "外資系運用会社で15年の経験を持つ独立系アナリスト。半導体・テクノロジーセクター専門。マクロ経済と個別銘柄の両面から分析。",
    followers: "128,000",
    style: "ファンダメンタル重視",
  },
  {
    id: "yamada",
    name: "山田 一郎",
    initial: "山",
    color: "bg-amber-500",
    title: "FP・投資コンサルタント",
    bio: "CFP保有。新NISA時代の資産形成を中心に発信。長期投資・配当戦略の実践者として、個人投資家の目線でわかりやすく市場を解説。",
    followers: "87,000",
    style: "長期・配当重視",
  },
];

const columns: ColumnArticle[] = [
  {
    slug: "boj-rate-hike-analysis",
    title: "日銀利上げ後の株式市場はどう動く？過去の利上げ局面を徹底分析",
    excerpt:
      "日銀が追加利上げを決定した場合、株式市場はどう反応するのか。過去3回の利上げ局面における日経平均・セクター別の動きを振り返り、今後の投資戦略を考える。",
    authorId: "tanaka",
    authorName: "田中 太郎",
    authorInitial: "田",
    authorColor: "bg-blue-500",
    date: "2026/03/04",
    readTime: "8分",
    category: "マクロ分析",
    gradientFrom: "from-blue-600",
    gradientTo: "to-indigo-700",
  },
  {
    slug: "semiconductor-stocks-after-nvidia",
    title: "半導体セクターの行方：NVIDIA決算後に注目すべき日本株5銘柄",
    excerpt:
      "NVIDIAの好決算を受けて半導体関連株が急騰。AI需要拡大の恩恵を受ける日本の半導体装置メーカーや素材メーカーの中から、特に注目すべき5銘柄を厳選。",
    authorId: "suzuki",
    authorName: "鈴木 花子",
    authorInitial: "鈴",
    authorColor: "bg-emerald-500",
    date: "2026/03/03",
    readTime: "12分",
    category: "セクター分析",
    gradientFrom: "from-emerald-600",
    gradientTo: "to-teal-700",
  },
  {
    slug: "yen-strengthening-scenario",
    title: "円高トレンド転換？ドル円150円割れのシナリオと投資戦略",
    excerpt:
      "FRBの利下げ観測と日銀の政策修正により、ドル円は転換点を迎えつつある。円高シナリオ別に有利なセクターと不利なセクターを整理し、ポートフォリオ戦略を提案。",
    authorId: "yamada",
    authorName: "山田 一郎",
    authorInitial: "山",
    authorColor: "bg-amber-500",
    date: "2026/03/02",
    readTime: "10分",
    category: "為替・戦略",
    gradientFrom: "from-amber-600",
    gradientTo: "to-orange-700",
  },
  {
    slug: "nisa-growth-portfolio-2026",
    title: "2026年版・新NISA成長投資枠で狙うべき高配当株ポートフォリオ",
    excerpt:
      "新NISAの成長投資枠を最大限活用するための高配当株ポートフォリオを提案。配当利回り4%以上かつ増配傾向にある銘柄をスクリーニングし、セクター分散を考慮した構成例を紹介。",
    authorId: "yamada",
    authorName: "山田 一郎",
    authorInitial: "山",
    authorColor: "bg-amber-500",
    date: "2026/03/01",
    readTime: "15分",
    category: "NISA・資産形成",
    gradientFrom: "from-violet-600",
    gradientTo: "to-purple-700",
  },
  {
    slug: "earnings-season-q3-preview",
    title: "3月決算シーズン直前：Q3決算で注目すべきポイントと銘柄",
    excerpt:
      "まもなく始まる3月決算シーズンに向けて、今期のQ3決算で特に注目すべきテーマを解説。インバウンド・半導体・防衛関連など、上方修正が期待できる銘柄群を分析。",
    authorId: "suzuki",
    authorName: "鈴木 花子",
    authorInitial: "鈴",
    authorColor: "bg-emerald-500",
    date: "2026/02/28",
    readTime: "11分",
    category: "決算プレビュー",
    gradientFrom: "from-rose-600",
    gradientTo: "to-pink-700",
  },
  {
    slug: "technical-analysis-nikkei-support",
    title: "日経平均テクニカル分析：38,000円のサポートラインは守られるか",
    excerpt:
      "日経平均が重要な節目である38,000円に接近。移動平均線・ボリンジャーバンド・RSIなど複数のテクニカル指標から、今後の方向性とエントリーポイントを分析。",
    authorId: "tanaka",
    authorName: "田中 太郎",
    authorInitial: "田",
    authorColor: "bg-blue-500",
    date: "2026/02/27",
    readTime: "9分",
    category: "テクニカル分析",
    gradientFrom: "from-cyan-600",
    gradientTo: "to-blue-700",
  },
];

export default function ColumnListPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Page heading */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-6 w-6 text-accent" />
          <h1 className="text-2xl font-bold text-navy">株レンズ・コラム</h1>
        </div>
        <p className="text-sm text-gray-500">信頼できる投資家の声</p>
      </div>

      <ComingSoonBanner />

      {/* Featured writers */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-navy mb-5 flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          注目ライター
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {writers.map((writer) => (
            <div
              key={writer.id}
              className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className={`w-14 h-14 rounded-full ${writer.color} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-lg font-bold text-white">
                    {writer.initial}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-navy">
                    {writer.name}
                  </h3>
                  <p className="text-xs text-accent font-medium">
                    {writer.title}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
                {writer.bio}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Users className="h-3.5 w-3.5" />
                  <span className="num">{writer.followers}</span>
                  <span>フォロワー</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/8 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                  <TrendingUp className="h-3 w-3" />
                  {writer.style}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Column articles grid */}
      <section>
        <h2 className="text-lg font-bold text-navy mb-5 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-accent" />
          最新コラム
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((col) => (
            <Link
              key={col.slug}
              href={`/column/${col.slug}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              {/* Thumbnail */}
              <div
                className={`h-40 bg-gradient-to-br ${col.gradientFrom} ${col.gradientTo} flex items-center justify-center`}
              >
                <BookOpen className="h-10 w-10 text-white/30" />
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Category tag */}
                <span className="inline-block rounded-full bg-lightgray px-2.5 py-0.5 text-[11px] font-medium text-gray-500 mb-2">
                  {col.category}
                </span>

                <h3 className="text-sm font-bold text-navy leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                  {col.title}
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
                  {col.excerpt}
                </p>

                {/* Author + meta */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full ${col.authorColor} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-[11px] font-bold text-white">
                      {col.authorInitial}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-navy truncate">
                      {col.authorName}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                      <span>{col.date}</span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="h-2.5 w-2.5" />
                        {col.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
