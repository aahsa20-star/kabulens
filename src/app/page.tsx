import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import {
  TickerTape,
  MarketOverview,
} from "@/components/tradingview/ClientWidgets";
import JapanStocksWidget from "@/components/market/JapanStocksWidget";
import StockRankings from "@/components/market/StockRankings";
import HeroSection from "@/components/home/HeroSection";
import NewsSection from "@/components/home/NewsSection";
import ThemePickup from "@/components/home/ThemePickup";
import EarningsCalendarPreview from "@/components/home/EarningsCalendarPreview";
import NewsletterCTA from "@/components/home/NewsletterCTA";

// Revalidate every 5 minutes for fresh news data
export const revalidate = 300;

export default function Home() {
  return (
    <>
      {/* Ticker Tape */}
      <div className="border-b border-gray-200">
        <TickerTape />
      </div>

      {/* Hero */}
      <HeroSection />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* AI News + Hot Lists (2-column) */}
        <section className="grid gap-6 py-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <NewsSection />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="mb-4 text-lg font-semibold text-navy">
                主要銘柄
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <JapanStocksWidget />
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-lg font-semibold text-navy">
                注目銘柄ランキング
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <StockRankings />
              </div>
            </div>
          </div>
        </section>

        {/* Theme Stocks Pickup */}
        <section className="pb-8">
          <ThemePickup />
        </section>

        {/* Market Overview (single widget) */}
        <section className="pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy">マーケット概況</h2>
            <Link
              href="/macro"
              className="flex items-center gap-1 text-sm text-accent hover:text-accent-light transition-colors font-medium"
            >
              詳しいマーケット情報を見る
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <MarketOverview />
        </section>

        {/* Earnings Calendar Preview */}
        <section className="pb-8">
          <EarningsCalendarPreview />
        </section>
      </div>

      {/* Latest YouTube video */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-medium text-gray-500 mb-4">
            最新動画
          </h2>
          <div className="w-full max-w-[600px]">
            <div className="relative w-full overflow-hidden rounded-lg shadow-sm" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/buKuBhoPP4A"
                title="Kabu Lens 最新動画"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-3 text-center">
              <a
                href="https://www.youtube.com/@kabulens"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-accent transition-colors"
              >
                チャンネルを見る
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Glossary banner */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-8">
        <Link
          href="/glossary"
          className="flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-200 hover:border-accent py-3 px-4 text-sm text-gray-600 hover:text-accent transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          投資用語がわからない？用語集で調べる
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Newsletter CTA — PV増加後に復活予定
      <NewsletterCTA />
      */}
    </>
  );
}
