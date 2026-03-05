import Link from "next/link";
import { BookOpen, ArrowRight, Clock } from "lucide-react";

type ColumnItem = {
  id: number;
  title: string;
  authorName: string;
  authorInitial: string;
  authorColor: string;
  publishedDate: string;
  readTime: string;
  gradientFrom: string;
  gradientTo: string;
};

const mockColumns: ColumnItem[] = [
  {
    id: 1,
    title: "日銀利上げ後の株式市場はどう動く？過去の利上げ局面を徹底分析",
    authorName: "田中 太郎",
    authorInitial: "田",
    authorColor: "bg-blue-500",
    publishedDate: "2026/03/04",
    readTime: "8分",
    gradientFrom: "from-blue-600",
    gradientTo: "to-indigo-700",
  },
  {
    id: 2,
    title: "半導体セクターの行方：NVIDIA決算後に注目すべき日本株5銘柄",
    authorName: "鈴木 花子",
    authorInitial: "鈴",
    authorColor: "bg-emerald-500",
    publishedDate: "2026/03/03",
    readTime: "12分",
    gradientFrom: "from-emerald-600",
    gradientTo: "to-teal-700",
  },
  {
    id: 3,
    title: "円高トレンド転換？ドル円150円割れのシナリオと投資戦略",
    authorName: "山田 一郎",
    authorInitial: "山",
    authorColor: "bg-amber-500",
    publishedDate: "2026/03/02",
    readTime: "10分",
    gradientFrom: "from-amber-600",
    gradientTo: "to-orange-700",
  },
];

export default function ColumnPreview() {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-bold text-navy">注目コラム</h2>
        </div>
        <Link
          href="/columns"
          className="text-sm text-accent hover:text-accent-light transition-colors font-medium flex items-center gap-1"
        >
          コラム一覧を見る
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Horizontal scroll on mobile, 3-column grid on desktop */}
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0">
        {mockColumns.map((col) => (
          <Link
            key={col.id}
            href={`/columns/${col.id}`}
            className="flex-shrink-0 w-[280px] snap-start md:w-auto bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
          >
            {/* Thumbnail placeholder */}
            <div
              className={`h-36 bg-gradient-to-br ${col.gradientFrom} ${col.gradientTo} flex items-center justify-center`}
            >
              <BookOpen className="h-10 w-10 text-white/30" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-sm font-bold text-navy leading-snug mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                {col.title}
              </h3>

              {/* Author + meta */}
              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
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
                    <span>{col.publishedDate}</span>
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
  );
}
