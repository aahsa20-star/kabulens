import Link from "next/link";
import {
  Landmark,
  ChevronRight,
  BarChart3,
  Globe,
  CalendarDays,
  DollarSign,
} from "lucide-react";
import {
  MarketOverview,
  StockHeatmap,
  EconomicCalendar,
  ForexCrossRates,
} from "@/components/tradingview/ClientWidgets";

export default function MarketPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20">
      {/* Page Header */}
      <div className="py-6">
        <h1 className="text-2xl font-bold text-navy">マーケット概況</h1>
        <p className="mt-1 text-sm text-gray-500">
          主要指数・為替・金利・ヒートマップをリアルタイムで確認
        </p>
      </div>

      {/* Section 1: Market Overview */}
      <section className="pb-8">
        <h2 className="mb-4 text-lg font-semibold text-navy flex items-center gap-2">
          <Globe className="h-5 w-5 text-accent" />
          主要指数
        </h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <MarketOverview />
        </div>
      </section>

      {/* Section 2: Stock Heatmap */}
      <section className="pb-8">
        <h2 className="mb-4 text-lg font-semibold text-navy flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-accent" />
          マーケットヒートマップ
        </h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <StockHeatmap />
        </div>
      </section>

      {/* Section 3: Forex Cross Rates */}
      <section className="pb-8">
        <h2 className="mb-4 text-lg font-semibold text-navy flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-accent" />
          為替レート
        </h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <ForexCrossRates />
        </div>
      </section>

      {/* Section 4: FRB / BOJ Watcher Links */}
      <section className="grid gap-6 md:grid-cols-2 pb-8">
        <Link
          href="/macro/fed"
          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
        >
          <div className="bg-navy px-5 py-3 flex items-center gap-2">
            <Landmark className="h-4 w-4 text-accent-light" />
            <h2 className="text-sm font-bold text-white">FRBウォッチャー</h2>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              米国金融政策・FF金利・FOMCをわかりやすく解説
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:text-accent-light transition-colors">
              詳しく見る <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </Link>

        <Link
          href="/macro/boj"
          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
        >
          <div className="bg-navy px-5 py-3 flex items-center gap-2">
            <Landmark className="h-4 w-4 text-accent-light" />
            <h2 className="text-sm font-bold text-white">日銀ウォッチャー</h2>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              日本銀行の政策金利・金融政策決定会合を解説
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:text-accent-light transition-colors">
              詳しく見る <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </section>

      {/* Section 5: Economic Calendar */}
      <section className="pb-8">
        <h2 className="mb-4 text-lg font-semibold text-navy flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-accent" />
          経済指標カレンダー
        </h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <EconomicCalendar />
        </div>
      </section>
    </div>
  );
}
