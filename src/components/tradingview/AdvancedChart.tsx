"use client";

import { useEffect, useRef } from "react";

interface AdvancedChartProps {
  symbol?: string;
  height?: number;
}

export default function AdvancedChart({
  symbol = "TSE:7203",
  height = 500,
}: AdvancedChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: "D",
      timezone: "Asia/Tokyo",
      theme: "light",
      style: "1",
      locale: "ja",
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
      hide_volume: false,
      backgroundColor: "rgba(255, 255, 255, 0)",
      isTransparent: true,
      enable_publishing: false,
      withdateranges: true,
      hide_side_toolbar: false,
      details: true,
      hotlist: true,
      studies: ["STD;RSI", "STD;MACD"],
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container"
      style={{ height }}
    />
  );
}
