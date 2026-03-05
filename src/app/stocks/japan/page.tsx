"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, BarChart3, List, ChevronRight } from "lucide-react";

type Stock = {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
};

const mockStocks: Stock[] = [
  { code: "7203", name: "トヨタ自動車", price: 2847.5, change: 42.5, changePercent: 1.52, volume: 18_432_000 },
  { code: "6758", name: "ソニーグループ", price: 3215.0, change: -28.0, changePercent: -0.86, volume: 9_876_000 },
  { code: "6861", name: "キーエンス", price: 68_450.0, change: 1_250.0, changePercent: 1.86, volume: 1_234_000 },
  { code: "9984", name: "ソフトバンクグループ", price: 8_923.0, change: -156.0, changePercent: -1.72, volume: 14_567_000 },
  { code: "9983", name: "ファーストリテイリング", price: 42_350.0, change: 680.0, changePercent: 1.63, volume: 2_345_000 },
  { code: "7974", name: "任天堂", price: 9_876.0, change: 234.0, changePercent: 2.43, volume: 5_678_000 },
  { code: "6098", name: "リクルートホールディングス", price: 7_654.0, change: -89.0, changePercent: -1.15, volume: 6_789_000 },
  { code: "4063", name: "信越化学工業", price: 5_432.0, change: 67.0, changePercent: 1.25, volume: 4_567_000 },
  { code: "6367", name: "ダイキン工業", price: 24_680.0, change: -320.0, changePercent: -1.28, volume: 1_890_000 },
  { code: "9433", name: "KDDI", price: 4_876.0, change: 23.0, changePercent: 0.47, volume: 7_654_000 },
  { code: "8035", name: "東京エレクトロン", price: 28_750.0, change: 890.0, changePercent: 3.19, volume: 3_456_000 },
  { code: "6501", name: "日立製作所", price: 3_567.0, change: 45.0, changePercent: 1.28, volume: 8_765_000 },
  { code: "8306", name: "三菱UFJフィナンシャル・グループ", price: 1_654.5, change: 18.5, changePercent: 1.13, volume: 32_456_000 },
  { code: "7267", name: "本田技研工業", price: 1_543.0, change: -21.0, changePercent: -1.34, volume: 11_234_000 },
  { code: "8766", name: "東京海上ホールディングス", price: 5_678.0, change: 89.0, changePercent: 1.59, volume: 4_321_000 },
  { code: "6902", name: "デンソー", price: 2_456.0, change: 34.0, changePercent: 1.40, volume: 5_432_000 },
  { code: "4519", name: "中外製薬", price: 6_123.0, change: -78.0, changePercent: -1.26, volume: 3_210_000 },
  { code: "6594", name: "ニデック", price: 4_567.0, change: 123.0, changePercent: 2.77, volume: 6_543_000 },
  { code: "3382", name: "セブン＆アイ・HD", price: 2_134.5, change: -15.5, changePercent: -0.72, volume: 8_234_000 },
  { code: "2914", name: "JT", price: 4_312.0, change: 56.0, changePercent: 1.32, volume: 9_876_000 },
  { code: "4568", name: "第一三共", price: 5_876.0, change: 198.0, changePercent: 3.49, volume: 7_654_000 },
  { code: "6273", name: "SMC", price: 72_450.0, change: -980.0, changePercent: -1.33, volume: 876_000 },
  { code: "9432", name: "日本電信電話", price: 178.5, change: 2.5, changePercent: 1.42, volume: 45_678_000 },
  { code: "7741", name: "HOYA", price: 18_920.0, change: 420.0, changePercent: 2.27, volume: 2_345_000 },
  { code: "4661", name: "オリエンタルランド", price: 3_876.0, change: -45.0, changePercent: -1.15, volume: 4_567_000 },
  { code: "6762", name: "TDK", price: 5_234.0, change: 67.0, changePercent: 1.30, volume: 3_456_000 },
  { code: "6988", name: "日東電工", price: 8_765.0, change: -123.0, changePercent: -1.38, volume: 2_123_000 },
  { code: "4502", name: "武田薬品工業", price: 4_123.0, change: 34.0, changePercent: 0.83, volume: 6_789_000 },
  { code: "7751", name: "キヤノン", price: 5_012.0, change: -67.0, changePercent: -1.32, volume: 3_987_000 },
  { code: "2801", name: "キッコーマン", price: 1_876.0, change: 12.0, changePercent: 0.64, volume: 2_876_000 },
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
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const filteredStocks = (() => {
    switch (activeTab) {
      case "up":
        return [...mockStocks].filter((s) => s.change > 0).sort((a, b) => b.changePercent - a.changePercent);
      case "down":
        return [...mockStocks].filter((s) => s.change < 0).sort((a, b) => a.changePercent - b.changePercent);
      case "volume":
        return [...mockStocks].sort((a, b) => b.volume - a.volume);
      default:
        return mockStocks;
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

      {/* Stock table */}
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
        <span>最終更新: 15:00 JST</span>
      </div>
    </div>
  );
}
