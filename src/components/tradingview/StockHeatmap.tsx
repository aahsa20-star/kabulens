"use client";

import { useEffect, useRef } from "react";

export default function StockHeatmap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      exchanges: [],
      dataSource: "TOPIX",
      grouping: "sector",
      blockSize: "market_cap_basic",
      blockColor: "change",
      locale: "ja",
      symbolUrl: "",
      colorTheme: "light",
      hasTopBar: true,
      isDataSet498enabled: false,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      isMonoSize: false,
      width: "100%",
      height: 500,
      isTransparent: true,
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container"
      style={{ height: 500 }}
    />
  );
}
