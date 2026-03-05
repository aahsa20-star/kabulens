import {
  TickerTape,
  MarketOverview,
  StockHeatmap,
  EconomicCalendar,
  HotLists,
} from "@/components/tradingview/ClientWidgets";
import NewsSection from "@/components/home/NewsSection";
import MacroSummary from "@/components/home/MacroSummary";
import EarningsCalendarPreview from "@/components/home/EarningsCalendarPreview";
import ColumnPreview from "@/components/home/ColumnPreview";
import NewsletterCTA from "@/components/home/NewsletterCTA";

export default function Home() {
  return (
    <>
      {/* Zone ② Ticker Tape */}
      <div className="border-b border-gray-200">
        <TickerTape />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Zone ③ Hero - Market Overview */}
        <section className="py-6">
          <h2 className="mb-4 text-lg font-semibold text-navy">
            マーケット概況
          </h2>
          <MarketOverview />
        </section>

        {/* Zone ④ Main Content: News + Hot Lists + Macro */}
        <section className="grid gap-6 pb-8 lg:grid-cols-12">
          {/* ④-L News */}
          <div className="lg:col-span-7">
            <NewsSection />
          </div>

          {/* ④-C + ④-R Sidebar */}
          <div className="space-y-6 lg:col-span-5">
            {/* ④-C Hot Lists */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-navy">
                注目銘柄ランキング
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <HotLists />
              </div>
            </div>

            {/* ④-R Macro Summary */}
            <MacroSummary />
          </div>
        </section>

        {/* Zone ⑤ Earnings Calendar */}
        <section className="pb-8">
          <EarningsCalendarPreview />
        </section>

        {/* Zone ⑥ Economic Calendar */}
        <section className="pb-8">
          <h2 className="mb-4 text-lg font-semibold text-navy">
            経済指標カレンダー
          </h2>
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <EconomicCalendar />
          </div>
        </section>

        {/* Zone ⑦ Market Heatmap */}
        <section className="pb-8">
          <h2 className="mb-4 text-lg font-semibold text-navy">
            マーケットヒートマップ
          </h2>
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <StockHeatmap />
          </div>
        </section>

        {/* Zone ⑧ Influencer Columns */}
        <section className="pb-8">
          <ColumnPreview />
        </section>
      </div>

      {/* Zone ⑨ Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}
