"use client";

import dynamic from "next/dynamic";

export const TickerTape = dynamic(
  () => import("@/components/tradingview/TickerTape"),
  { ssr: false }
);

export const MarketOverview = dynamic(
  () => import("@/components/tradingview/MarketOverview"),
  { ssr: false }
);

export const StockHeatmap = dynamic(
  () => import("@/components/tradingview/StockHeatmap"),
  { ssr: false }
);

export const EconomicCalendar = dynamic(
  () => import("@/components/tradingview/EconomicCalendar"),
  { ssr: false }
);

export const HotLists = dynamic(
  () => import("@/components/tradingview/HotLists"),
  { ssr: false }
);

export const AdvancedChart = dynamic(
  () => import("@/components/tradingview/AdvancedChart"),
  { ssr: false }
);
