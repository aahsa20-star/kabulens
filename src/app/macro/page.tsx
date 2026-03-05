import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Landmark,
  CalendarDays,
} from "lucide-react";
import {
  StockHeatmap,
  EconomicCalendar,
} from "@/components/tradingview/ClientWidgets";

type MacroIndicator = {
  name: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
};

const indicators: MacroIndicator[] = [
  {
    name: "日経平均",
    value: "39,284.52",
    change: "+312.48",
    changePercent: "+0.80%",
    isPositive: true,
  },
  {
    name: "TOPIX",
    value: "2,782.15",
    change: "+18.73",
    changePercent: "+0.68%",
    isPositive: true,
  },
  {
    name: "S&P 500",
    value: "5,842.31",
    change: "-23.67",
    changePercent: "-0.40%",
    isPositive: false,
  },
  {
    name: "USD/JPY",
    value: "150.42",
    change: "-0.83",
    changePercent: "-0.55%",
    isPositive: false,
  },
  {
    name: "米10年国債利回り",
    value: "4.287%",
    change: "+0.032",
    changePercent: "+0.75%",
    isPositive: true,
  },
  {
    name: "金(Gold)",
    value: "$2,918.40",
    change: "+14.20",
    changePercent: "+0.49%",
    isPositive: true,
  },
];

function SparklinePlaceholder({ isPositive }: { isPositive: boolean }) {
  const color = isPositive ? "#10b981" : "#ef4444";
  return (
    <svg
      viewBox="0 0 80 32"
      className="w-20 h-8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={
          isPositive
            ? "M0 28 L10 24 L20 26 L30 20 L40 18 L50 14 L60 10 L70 8 L80 4"
            : "M0 4 L10 8 L20 6 L30 12 L40 14 L50 18 L60 22 L70 24 L80 28"
        }
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MacroPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20">
      {/* Page Header */}
      <div className="py-6">
        <h1 className="text-2xl font-bold text-navy">
          マクロ経済ダッシュボード
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          主要指数・金融政策・経済指標を一画面で確認
        </p>
      </div>

      {/* Macro Indicator Cards - 2x3 Grid */}
      <section className="pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {indicators.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-lg shadow-sm p-5 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-1">{item.name}</p>
                <p className="text-lg font-bold text-navy num">{item.value}</p>
                <div className="flex items-center gap-2 mt-1">
                  {item.isPositive ? (
                    <TrendingUp className="h-3.5 w-3.5 text-up" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-down" />
                  )}
                  <span
                    className={`text-sm font-semibold num ${
                      item.isPositive ? "text-up" : "text-down"
                    }`}
                  >
                    {item.change}
                  </span>
                  <span
                    className={`text-xs num px-1.5 py-0.5 rounded ${
                      item.isPositive ? "bg-up-bg text-up" : "bg-down-bg text-down"
                    }`}
                  >
                    {item.changePercent}
                  </span>
                </div>
              </div>
              <SparklinePlaceholder isPositive={item.isPositive} />
            </div>
          ))}
        </div>
      </section>

      {/* Central Bank Policies */}
      <section className="grid gap-6 md:grid-cols-2 pb-8">
        {/* FRB Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-navy px-5 py-3 flex items-center gap-2">
            <Landmark className="h-4 w-4 text-accent-light" />
            <h2 className="text-sm font-bold text-white">FRB（米連邦準備制度）</h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">現在の政策金利</span>
              <span className="text-lg font-bold text-navy num">
                4.25 - 4.50%
              </span>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-xs font-semibold text-gray-500 mb-2">
                直近の決定サマリー
              </h3>
              <p className="text-sm text-navy leading-relaxed">
                2026年1月FOMCにて全会一致で金利据え置きを決定。パウエル議長はインフレ率の低下傾向を認めつつも、
                目標の2%到達には追加データが必要との見方を示した。ドットチャートでは年内1回の利下げが中央値。
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                次回FOMC
              </span>
              <span className="text-sm font-semibold text-navy flex items-center gap-1">
                <ArrowRight className="h-3.5 w-3.5 text-accent" />
                2026年3月17-18日
              </span>
            </div>
          </div>
        </div>

        {/* BOJ Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-navy px-5 py-3 flex items-center gap-2">
            <Landmark className="h-4 w-4 text-accent-light" />
            <h2 className="text-sm font-bold text-white">日本銀行</h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">現在の政策金利</span>
              <span className="text-lg font-bold text-navy num">0.50%</span>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-xs font-semibold text-gray-500 mb-2">
                金融政策の概要
              </h3>
              <p className="text-sm text-navy leading-relaxed">
                2025年1月に0.25%から0.50%へ利上げを実施。YCC（イールドカーブ・コントロール）は2024年3月に撤廃済み。
                植田総裁は経済・物価見通しが実現すれば追加利上げを行う方針を改めて示している。
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                次回金融政策決定会合
              </span>
              <span className="text-sm font-semibold text-navy flex items-center gap-1">
                <ArrowRight className="h-3.5 w-3.5 text-accent" />
                2026年3月13-14日
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stock Heatmap */}
      <section className="pb-8">
        <h2 className="mb-4 text-lg font-semibold text-navy">
          マーケットヒートマップ
        </h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <StockHeatmap />
        </div>
      </section>

      {/* Economic Calendar */}
      <section className="pb-8">
        <h2 className="mb-4 text-lg font-semibold text-navy">
          経済指標カレンダー
        </h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <EconomicCalendar />
        </div>
      </section>
    </div>
  );
}
