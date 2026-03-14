import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "コラム",
  description:
    "市場分析・投資戦略・銘柄解説のコラム。",
};

type ColumnArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  gradientFrom: string;
  gradientTo: string;
};

const columns: ColumnArticle[] = [
  {
    slug: "pbr-explained",
    title: "PBRとは？「1倍割れ＝割安」の正しい見つけ方と、初心者がハマる罠",
    excerpt:
      "「PBR1倍割れだから割安！」と思って買ったのに、その後ずっと上がらなかった。実はPBRにも、知らないと損する「罠」がある。PBRの基本から正しい使い方まで、まとめて解説する。",
    date: "2026/03/13",
    readTime: "7分",
    category: "初心者向け",
    gradientFrom: "from-green-500",
    gradientTo: "to-emerald-600",
  },
  {
    slug: "per-explained",
    title: "PERとは？割安株の正しい見つけ方と、初心者がハマる罠",
    excerpt:
      "「PERが低いから割安！」と思って買ったのに、その後ぜんぜん上がらなかった。実はPERには、知らないと損する「罠」がある。PERの基本から正しい使い方まで、まとめて解説する。",
    date: "2026/03/07",
    readTime: "7分",
    category: "初心者向け",
    gradientFrom: "from-orange-500",
    gradientTo: "to-red-600",
  },
  {
    slug: "what-is-new-nisa",
    title: "新NISAとは？始める前に知っておくべき「時間軸の罠」",
    excerpt:
      "2024年から新しくなったNISA制度。「非課税だからとりあえず始めよう」と口座を開いた人も多いはずだ。ただ、新NISAで失敗する人のほとんどは、制度の使い方ではなく「時間軸」を間違えている。",
    date: "2026/03/07",
    readTime: "6分",
    category: "初心者向け",
    gradientFrom: "from-sky-500",
    gradientTo: "to-blue-600",
  },
  {
    slug: "boj-rate-hike-analysis",
    title: "日銀利上げ後の株式市場はどう動く？過去の利上げ局面を徹底分析",
    excerpt:
      "日銀が追加利上げを決定した場合、株式市場はどう反応するのか。過去3回の利上げ局面における日経平均・セクター別の動きを振り返り、今後の投資戦略を考える。",
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
          <h1 className="text-2xl font-bold text-navy">コラム</h1>
        </div>
        <p className="text-sm text-gray-500">市場分析・投資戦略・銘柄解説</p>
      </div>

      {/* Column articles grid */}
      <section>
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
                  <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-[11px] font-bold text-white">K</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-navy truncate">
                      Kabu Lens 編集部
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
