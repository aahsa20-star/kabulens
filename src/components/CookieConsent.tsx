"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
      // Trigger slide-up animation after mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimateIn(true);
        });
      });
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie_consent", "all");
    setAnimateIn(false);
    // Reload after animation completes to activate GA
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const handleNecessaryOnly = () => {
    localStorage.setItem("cookie_consent", "necessary");
    setAnimateIn(false);
    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        animateIn ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-4xl px-4 pb-4">
        <div
          className="rounded-lg p-4 shadow-lg sm:p-6"
          style={{ backgroundColor: "#0D2137" }}
        >
          <p className="mb-4 text-sm leading-relaxed text-white sm:text-base">
            当サイトではCookieを使用しています。分析Cookieにより、サイトの改善に役立てています。
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
            <button
              onClick={handleNecessaryOnly}
              className="rounded-lg border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              必要なもののみ
            </button>
            <button
              onClick={handleAcceptAll}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#2E86C1" }}
            >
              すべて同意する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
