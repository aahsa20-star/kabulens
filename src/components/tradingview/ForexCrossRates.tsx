"use client";

import { useEffect, useRef } from "react";

export default function ForexCrossRates() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 400,
      currencies: ["JPY", "USD", "EUR", "GBP", "CNY", "AUD"],
      isTransparent: true,
      colorTheme: "light",
      locale: "ja",
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
