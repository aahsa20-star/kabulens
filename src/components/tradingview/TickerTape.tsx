"use client";

import { useEffect, useRef } from "react";

export default function TickerTape() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "TSE:TOPIX", title: "TOPIX" },
        { proName: "TVC:NI225", title: "Nikkei 225" },
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:NSXUSD", title: "NASDAQ" },
        { proName: "FX_IDC:USDJPY", title: "USD/JPY" },
        { proName: "FX_IDC:EURJPY", title: "EUR/JPY" },
        { proName: "TVC:GOLD", title: "Gold" },
        { proName: "BITSTAMP:BTCUSD", title: "BTC/USD" },
      ],
      showSymbolDescription: true,
      colorTheme: "light",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "ja",
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div ref={containerRef} className="tradingview-widget-container w-full" />
  );
}
