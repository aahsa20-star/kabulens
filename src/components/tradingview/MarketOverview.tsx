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
          title: "\u65e5\u672c\u682a",
          symbols: [
            { s: "TVC:NI225", d: "Nikkei 225" },
            { s: "TSE:TOPIX", d: "TOPIX" },
            { s: "TVC:NI400", d: "JPX 400" },
            { s: "TVC:MOTHERS", d: "Mothers" },
          ],
          originalTitle: "\u65e5\u672c\u682a",
        },
        {
          title: "\u7c73\u56fd\u682a",
          symbols: [
            { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
            { s: "FOREXCOM:NSXUSD", d: "NASDAQ" },
            { s: "FOREXCOM:DJI", d: "DOW" },
            { s: "TVC:RUT", d: "Russell 2000" },
          ],
          originalTitle: "\u7c73\u56fd\u682a",
        },
        {
          title: "\u70ba\u66ff",
          symbols: [
            { s: "FX_IDC:USDJPY", d: "USD/JPY" },
            { s: "FX_IDC:EURJPY", d: "EUR/JPY" },
            { s: "FX_IDC:GBPJPY", d: "GBP/JPY" },
            { s: "FX_IDC:EURUSD", d: "EUR/USD" },
          ],
          originalTitle: "\u70ba\u66ff",
        },
        {
          title: "\u30b3\u30e2\u30c7\u30a3\u30c6\u30a3",
          symbols: [
            { s: "TVC:GOLD", d: "Gold" },
            { s: "TVC:USOIL", d: "WTI Oil" },
            { s: "TVC:SILVER", d: "Silver" },
            { s: "TVC:PLATINUM", d: "Platinum" },
          ],
          originalTitle: "\u30b3\u30e2\u30c7\u30a3\u30c6\u30a3",
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
