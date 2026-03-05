"use client";

import { useEffect, useRef } from "react";

export default function MarketOverview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      dateRange: "12M",
      showChart: true,
      locale: "ja",
      largeChartUrl: "",
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      width: "100%",
      height: 400,
      plotLineColorGrowing: "rgba(41, 98, 255, 1)",
      plotLineColorFalling: "rgba(255, 77, 92, 1)",
      gridLineColor: "rgba(240, 243, 250, 0)",
      scaleFontColor: "rgba(19, 23, 34, 1)",
      belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorFalling: "rgba(255, 77, 92, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
      belowLineFillColorFallingBottom: "rgba(255, 77, 92, 0)",
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
      tabs: [
        {
          title: "日本株",
          symbols: [
            { s: "TSE:7203", d: "トヨタ" },
            { s: "TSE:6758", d: "ソニーG" },
            { s: "TSE:9984", d: "ソフトバンクG" },
            { s: "TSE:6861", d: "キーエンス" },
            { s: "TSE:8306", d: "三菱UFJ" },
            { s: "TSE:8035", d: "東京エレクトロン" },
          ],
          originalTitle: "日本株",
        },
        {
          title: "主要指数",
          symbols: [
            { s: "TVC:NI225", d: "日経平均" },
            { s: "FRED:SP500", d: "S&P500" },
            { s: "TVC:DXY", d: "ドル指数" },
            { s: "FX:USDJPY", d: "ドル円" },
          ],
          originalTitle: "主要指数",
        },
        {
          title: "マクロ",
          symbols: [
            { s: "TVC:JP10Y", d: "日本10年債" },
            { s: "TVC:US10Y", d: "米10年債" },
            { s: "TVC:GOLD", d: "金" },
            { s: "TVC:USOIL", d: "原油" },
          ],
          originalTitle: "マクロ",
        },
      ],
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container"
      style={{ height: 400 }}
    />
  );
}
