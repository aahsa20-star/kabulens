import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PICKUP_THEMES = [
  {
    slug: "ai-semiconductor",
    name: "AI・半導体",
    icon: "🤖",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    stocks: ["東京エレクトロン", "アドバンテスト"],
  },
  {
    slug: "inbound",
    name: "インバウンド",
    icon: "✈️",
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    stocks: ["三越伊勢丹HD", "OLC"],
  },
  {
    slug: "high-dividend",
    name: "高配当",
    icon: "💰",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    stocks: ["三菱商事", "INPEX"],
  },
  {
    slug: "defense",
    name: "防衛",
    icon: "🛡️",
    color: "text-slate-700",
    bgColor: "bg-slate-50",
    stocks: ["三菱重工業", "川崎重工業"],
  },
];

export default function ThemePickup() {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-navy">注目テーマ株</h2>
        <Link
          href="/themes"
          className="text-sm text-accent hover:text-accent-light transition-colors font-medium"
        >
          すべてのテーマを見る &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {PICKUP_THEMES.map((theme) => (
          <Link
            key={theme.slug}
            href={`/themes/${theme.slug}`}
            className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-xl w-8 h-8 ${theme.bgColor} rounded-lg flex items-center justify-center`}
              >
                {theme.icon}
              </span>
              <span className={`text-sm font-bold ${theme.color}`}>
                {theme.name}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              {theme.stocks.join(" / ")} ほか
            </p>
            <div className="mt-2 flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
              詳細を見る
              <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
