import Link from "next/link";
import { ExternalLink, Clock, Sparkles } from "lucide-react";

type NewsItem = {
  id: number;
  title: string;
  summary: string;
  source: string;
  sourceLabel: string;
  category: string;
  timeAgo: string;
  url: string;
};

const CATEGORY_STYLES: Record<string, string> = {
  "決算": "bg-blue-100 text-blue-700",
  "マクロ": "bg-purple-100 text-purple-700",
  "為替": "bg-amber-100 text-amber-700",
  "政策": "bg-emerald-100 text-emerald-700",
};

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "日銀、次回会合で追加利上げの可能性を示唆　植田総裁が記者会見で言及",
    summary:
      "植田総裁は定例記者会見で、経済・物価の見通しが実現していけば引き続き政策金利を引き上げる方針を改めて示した。市場では7月会合での利上げ観測が強まっている。",
    source: "ロイター",
    sourceLabel: "ロイター",
    category: "政策",
    timeAgo: "32分前",
    url: "#",
  },
  {
    id: 2,
    title: "トヨタ自動車、通期営業利益が過去最高を更新　EV投資加速も表明",
    summary:
      "トヨタは2026年3月期の連結営業利益が前期比12%増の6兆2,000億円となり過去最高を更新したと発表。同時にEV向け電池工場への追加投資1兆円を計画していることも明らかにした。",
    source: "JPX",
    sourceLabel: "JPX",
    category: "決算",
    timeAgo: "1時間前",
    url: "#",
  },
  {
    id: 3,
    title: "米FRB、6月FOMCで金利据え置きを決定　年内1回の利下げ示唆",
    summary:
      "FRBは政策金利を4.25-4.50%に据え置くことを全会一致で決定。パウエル議長は記者会見でインフレ鈍化の進展を認めつつも、慎重な姿勢を維持する考えを示した。",
    source: "FRB",
    sourceLabel: "FRB",
    category: "マクロ",
    timeAgo: "2時間前",
    url: "#",
  },
  {
    id: 4,
    title: "ドル円、一時150円台に下落　日米金利差縮小の思惑広がる",
    summary:
      "東京外為市場で円相場が一時1ドル=150.28円まで上昇し、約2カ月ぶりの円高水準をつけた。日銀の追加利上げ観測とFRBの利下げ期待が重なり日米金利差の縮小が意識されている。",
    source: "ロイター",
    sourceLabel: "ロイター",
    category: "為替",
    timeAgo: "3時間前",
    url: "#",
  },
  {
    id: 5,
    title: "ソフトバンクG、AI投資ファンド第2号の最終クローズを発表　総額15兆円規模",
    summary:
      "ソフトバンクグループはAI関連企業に特化した新ファンドの最終クローズを完了。世界各国の政府系ファンドや年金基金から出資を受け、過去最大規模のテクノロジー投資ファンドとなった。",
    source: "日経",
    sourceLabel: "日経",
    category: "決算",
    timeAgo: "4時間前",
    url: "#",
  },
  {
    id: 6,
    title: "中国人民銀行、預金準備率を0.5%引き下げ　景気刺激策を強化",
    summary:
      "中国人民銀行は市中銀行の預金準備率を0.5ポイント引き下げると発表。不動産市場の低迷や個人消費の伸び悩みに対応し、金融緩和を通じた景気下支えを図る。",
    source: "ロイター",
    sourceLabel: "ロイター",
    category: "マクロ",
    timeAgo: "5時間前",
    url: "#",
  },
];

export default function NewsSection() {
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockNews.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col"
          >
            {/* Header: category + time */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  CATEGORY_STYLES[item.category] ?? "bg-gray-100 text-gray-600"
                }`}
              >
                {item.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                {item.timeAgo}
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
                出典：{item.sourceLabel}
              </span>
              <Link
                href={item.url}
                className="flex items-center gap-1 text-xs text-accent hover:text-accent-light transition-colors font-medium"
              >
                元記事を読む
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
