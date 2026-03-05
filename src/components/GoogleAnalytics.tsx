"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!gaId || typeof window === "undefined") return;

    const consent = localStorage.getItem("cookie_consent");
    if (consent === "all") {
      // Cookie同意済み → consent を granted に更新し config を送信
      window.gtag?.("consent", "update", {
        analytics_storage: "granted",
      });
      window.gtag?.("config", gaId);
    }
  }, [gaId]);

  if (!gaId) return null;

  return (
    <>
      {/* gtag.js は常に読み込む（Search Console がGAコードを検出できるように） */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied'
          });
          gtag('js', new Date());
        `}
      </Script>
    </>
  );
}
