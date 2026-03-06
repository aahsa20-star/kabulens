"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  List,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

type Stock = {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
};

// 主要30銘柄コード
const STOCK_CODES = [
  "7203","6758","6861","9984","9983","7974","6098","4063","6367","9433",
  "8035","6501","8306","7267","8766","6902","4519","6594","3382","2914",
  "4568","6273","9432","7741","4661","6762","6988","4502","7751","2801",
];

type TabKey = "all" | "up" | "down" | "volume";

const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "all", label: "全銘柄", icon: <List className="h-4 w-4" /> },
  { key: "up", label: "値上がり", icon: <TrendingUp className="h-4 w-4" /> },
  { key: "down", label: "値下がり", icon: <TrendingDown className="h-4 w-4" /> },
  { key: "volume", label: "出来高上位", icon: <BarChart3 className="h-4 w-4" /> },
];

function formatNumber(n: number): string {
  return n.toLocaleString("ja-JP");
}

function formatPrice(n: number): string {
  if (n >= 10000) return n.toLocaleString("ja-JP", { minimumFractionDigits: 0, maximumFractionDigits: 1 });
  return n.toLocaleString("ja-JP", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export default function JapanStocksPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    async function fetchStocks() {
      try {
        const res = await fetch(`/api/stocks/quotes?codes=${STOCK_CODES.join(",")}`);
        if (!res.ok) throw new Error("データ取得に失敗しました");
        const data = await res.json();
        setStocks(
          (data.quotes ?? []).map((q: Stock) => ({
            code: q.code,
            name: q.name,
            price: q.price,
            change: q.change,
            changePercent: q.changePercent,
            volume: q.volume,
          }))
        );
        setLastUpdated(
          new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })
        );
      } catch (e) {
        setError(e instanceof Error ? e.message : "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    }
    fetchStocks();
  }, []);

  const filteredStocks = (() => {
    switch (activeTab) {
      case "up":
        return [...stocks].filter((s) => s.change > 0).sort((a, b) => b.changePercent - a.changePercent);
      case "down":
        return [...stocks].filter((s) => s.change < 0).sort((a, b) => a.changePercent - b.changePercent);
      case "volume":
        return [...stocks].sort((a, b) => b.volume - a.volume);
      default:
        return stocks;
    }
  })();

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-accent transition-colors">ホーム</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/stocks" className="hover:text-accent transition-colors">株式</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy font-medium">国内株式</span>
      </nav>

      {/* Page heading */}
      <h1 className="text-2xl font-bold text-navy mb-6">国内株式</h1>

      {/* Tab filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? "bg-accent text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm">
          <Loader2 className="h-8 w-8 text-accent animate-spin mb-3" />
          <p className="text-sm text-gray-500">株価データを取得中...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm">
          <AlertCircle className="h-8 w-8 text-red-400 mb-3" />
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      )}

      {/* Stock table */}
      {!loading && !error && (
        <>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">コード</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">銘柄名</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">株価</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">前日比</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">前日比(%)</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">出来高</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredStocks.map((stock) => {
                    const isUp = stock.change >= 0;
                    return (
                      <tr key={stock.code} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3.5">
                          <Link
                            href={`/stocks/${stock.code}`}
                            className="num text-sm font-medium text-accent hover:text-accent-light transition-colors"
                          >
                            {stock.code}
                          </Link>
                        </td>
                        <td className="px-4 py-3.5">
                          <Link
                            href={`/stocks/${stock.code}`}
                            className="text-sm font-medium text-navy hover:text-accent transition-colors"
                          >
                            {stock.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <span className="num text-sm font-semibold text-navy">
                            {formatPrice(stock.price)}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <span
                            className={`num text-sm font-medium ${
                              isUp ? "text-up" : "text-down"
                            }`}
                          >
                            {isUp ? "+" : ""}
                            {formatPrice(stock.change)}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <span
                            className={`num inline-flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded-md ${
                              isUp ? "bg-up-bg text-up" : "bg-down-bg text-down"
                            }`}
                          >
                            {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {isUp ? "+" : ""}
                            {stock.changePercent.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <span className="num text-sm text-gray-600">
                            {formatNumber(stock.volume)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>{filteredStocks.length} 銘柄表示中</span>
            {lastUpdated && <span>最終更新: {lastUpdated} JST</span>}
          </div>
        </>
      )}
    </div>
  );
}
