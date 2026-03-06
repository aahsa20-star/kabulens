"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

const CODES = "7203,6758,9984,8035,6861,9983";

type Quote = {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
};

export default function JapanStocksWidget() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const res = await fetch(`/api/stocks/quotes?codes=${CODES}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setQuotes(data.quotes ?? []);
      } catch (err) {
        console.error("Failed to fetch quotes:", err);
        setError("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    }
    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-accent mb-2" />
        <p className="text-sm text-gray-500">株価データを取得中...</p>
      </div>
    );
  }

  if (error || quotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertCircle className="h-6 w-6 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500">
          {error ?? "データがありません"}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="text-xs text-gray-400">株価情報</span>
        <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
          Yahoo Finance
        </span>
      </div>

      {/* Stock list */}
      <ul className="divide-y divide-gray-50">
        {quotes.map((q) => {
          const isUp = q.changePercent > 0;
          const isDown = q.changePercent < 0;
          const color = isUp
            ? "text-emerald-600"
            : isDown
              ? "text-red-500"
              : "text-gray-600";

          return (
            <li key={q.code}>
              <Link
                href={`/stocks/${q.code}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-navy truncate">
                    {q.name}
                  </p>
                  <p className="text-xs text-gray-400">{q.code}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-sm font-semibold text-navy tabular-nums">
                    {q.price.toLocaleString("ja-JP", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                    <span className="text-[10px] text-gray-400 ml-0.5">円</span>
                  </p>
                  <div className={`flex items-center justify-end gap-0.5 ${color}`}>
                    {isUp ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : isDown ? (
                      <TrendingDown className="h-3 w-3" />
                    ) : null}
                    <span className="text-xs font-medium tabular-nums">
                      {isUp ? "+" : ""}
                      {q.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
