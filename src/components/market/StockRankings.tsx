"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import Link from "next/link";

// TOPIX Core 30 + major stocks for broad coverage
const RANKING_CODES =
  "7203,6758,9984,8035,6861,9983,7974,6501,8306,8316,4063,4502,4568,6367,7741,6098,6594,3382,6902,2802";

type Quote = {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
};

export default function StockRankings() {
  const [gainers, setGainers] = useState<Quote[]>([]);
  const [losers, setLosers] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRankings() {
      try {
        const res = await fetch(`/api/stocks/quotes?codes=${RANKING_CODES}`);
        if (!res.ok) return;
        const data = await res.json();
        const quotes: Quote[] = data.quotes ?? [];

        const sorted = [...quotes].sort(
          (a, b) => b.changePercent - a.changePercent
        );
        setGainers(sorted.slice(0, 3));
        setLosers(sorted.slice(-3).reverse());
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    }
    fetchRankings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-5 w-5 animate-spin text-accent" />
      </div>
    );
  }

  if (gainers.length === 0 && losers.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="px-4 py-3 border-b border-gray-100">
        <span className="text-xs text-gray-400">値上がり・値下がりランキング</span>
      </div>

      {/* Gainers */}
      {gainers.length > 0 && (
        <div>
          <div className="px-4 pt-3 pb-1">
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              値上がり TOP3
            </span>
          </div>
          <ul className="divide-y divide-gray-50">
            {gainers.map((q, i) => (
              <li key={q.code}>
                <Link
                  href={`/stocks/${q.code}`}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xs font-bold text-emerald-600 w-5 text-center">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-navy truncate">
                      {q.name}
                    </p>
                    <p className="text-[11px] text-gray-400">{q.code}</p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600 tabular-nums">
                    +{q.changePercent.toFixed(2)}%
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Losers */}
      {losers.length > 0 && (
        <div>
          <div className="px-4 pt-3 pb-1 border-t border-gray-100">
            <span className="text-[11px] font-semibold text-red-500 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              値下がり TOP3
            </span>
          </div>
          <ul className="divide-y divide-gray-50">
            {losers.map((q, i) => (
              <li key={q.code}>
                <Link
                  href={`/stocks/${q.code}`}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xs font-bold text-red-500 w-5 text-center">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-navy truncate">
                      {q.name}
                    </p>
                    <p className="text-[11px] text-gray-400">{q.code}</p>
                  </div>
                  <span className="text-sm font-semibold text-red-500 tabular-nums">
                    {q.changePercent.toFixed(2)}%
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
