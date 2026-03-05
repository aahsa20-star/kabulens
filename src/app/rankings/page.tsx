"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Medal,
  TrendingUp,
  TrendingDown,
  BarChart3,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

type RankingTab = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type StockRanking = {
  rank: number;
  ticker: string;
  name: string;
  price: number;
  change: number;
  volume: number;
};

const tabs: RankingTab[] = [
  { id: "gainers", label: "値上がり率", icon: <TrendingUp className="h-4 w-4" /> },
  { id: "losers", label: "値下がり率", icon: <TrendingDown className="h-4 w-4" /> },
  { id: "volume", label: "出来高急増", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "high", label: "年初来高値", icon: <ArrowUp className="h-4 w-4" /> },
  { id: "low", label: "年初来安値", icon: <ArrowDown className="h-4 w-4" /> },
];

const gainersData: StockRanking[] = [
  { rank: 1, ticker: "6920", name: "レーザーテック", price: 28750, change: 14.82, volume: 12540000 },
  { rank: 2, ticker: "4385", name: "メルカリ", price: 4215, change: 12.45, volume: 8920000 },
  { rank: 3, ticker: "5032", name: "ANYCOLOR", price: 3850, change: 11.23, volume: 6780000 },
  { rank: 4, ticker: "3697", name: "SHIFT", price: 18920, change: 9.87, volume: 1250000 },
  { rank: 5, ticker: "6857", name: "アドバンテスト", price: 5680, change: 8.92, volume: 15200000 },
  { rank: 6, ticker: "4063", name: "信越化学工業", price: 6320, change: 7.65, volume: 4850000 },
  { rank: 7, ticker: "7342", name: "ウェルスナビ", price: 1895, change: 7.12, volume: 3210000 },
  { rank: 8, ticker: "6758", name: "ソニーグループ", price: 15240, change: 6.83, volume: 7650000 },
  { rank: 9, ticker: "9984", name: "ソフトバンクG", price: 8920, change: 6.45, volume: 18900000 },
  { rank: 10, ticker: "6594", name: "日本電産", price: 4850, change: 5.98, volume: 5420000 },
  { rank: 11, ticker: "7203", name: "トヨタ自動車", price: 2845, change: 5.67, volume: 22100000 },
  { rank: 12, ticker: "8035", name: "東京エレクトロン", price: 32450, change: 5.34, volume: 4120000 },
  { rank: 13, ticker: "4443", name: "Sansan", price: 1620, change: 4.98, volume: 2340000 },
  { rank: 14, ticker: "9433", name: "KDDI", price: 4985, change: 4.72, volume: 6780000 },
  { rank: 15, ticker: "7974", name: "任天堂", price: 8120, change: 4.51, volume: 3560000 },
  { rank: 16, ticker: "6146", name: "ディスコ", price: 42800, change: 4.23, volume: 980000 },
  { rank: 17, ticker: "8306", name: "三菱UFJ FG", price: 1685, change: 3.97, volume: 35600000 },
  { rank: 18, ticker: "8058", name: "三菱商事", price: 2780, change: 3.82, volume: 8450000 },
  { rank: 19, ticker: "9983", name: "ファーストリテイリング", price: 42150, change: 3.54, volume: 1230000 },
  { rank: 20, ticker: "2914", name: "日本たばこ産業", price: 4250, change: 3.21, volume: 4560000 },
];

const losersData: StockRanking[] = [
  { rank: 1, ticker: "8801", name: "三井不動産", price: 3540, change: -8.72, volume: 9870000 },
  { rank: 2, ticker: "3099", name: "三越伊勢丹HD", price: 2180, change: -7.85, volume: 5430000 },
  { rank: 3, ticker: "4384", name: "ラクスル", price: 1520, change: -7.23, volume: 2780000 },
  { rank: 4, ticker: "9201", name: "日本航空", price: 2650, change: -6.54, volume: 7650000 },
  { rank: 5, ticker: "2127", name: "日本M&Aセンター", price: 1245, change: -6.12, volume: 3450000 },
  { rank: 6, ticker: "8766", name: "東京海上HD", price: 5420, change: -5.87, volume: 4230000 },
  { rank: 7, ticker: "8316", name: "三井住友FG", price: 8350, change: -5.43, volume: 6780000 },
  { rank: 8, ticker: "6861", name: "キーエンス", price: 62400, change: -5.12, volume: 890000 },
  { rank: 9, ticker: "9432", name: "NTT", price: 168, change: -4.87, volume: 45600000 },
  { rank: 10, ticker: "4502", name: "武田薬品工業", price: 4120, change: -4.65, volume: 8900000 },
  { rank: 11, ticker: "6501", name: "日立製作所", price: 3280, change: -4.32, volume: 5670000 },
  { rank: 12, ticker: "7011", name: "三菱重工業", price: 1890, change: -4.15, volume: 7890000 },
  { rank: 13, ticker: "7012", name: "川崎重工業", price: 4560, change: -3.98, volume: 3210000 },
  { rank: 14, ticker: "6902", name: "デンソー", price: 2340, change: -3.76, volume: 4560000 },
  { rank: 15, ticker: "3382", name: "セブン&アイ", price: 2150, change: -3.54, volume: 6780000 },
  { rank: 16, ticker: "4568", name: "第一三共", price: 4780, change: -3.32, volume: 5430000 },
  { rank: 17, ticker: "6367", name: "ダイキン工業", price: 24500, change: -3.15, volume: 1230000 },
  { rank: 18, ticker: "6954", name: "ファナック", price: 4320, change: -2.98, volume: 2340000 },
  { rank: 19, ticker: "7751", name: "キヤノン", price: 4580, change: -2.76, volume: 3450000 },
  { rank: 20, ticker: "8031", name: "三井物産", price: 6780, change: -2.54, volume: 4560000 },
];

const volumeData: StockRanking[] = [
  { rank: 1, ticker: "9984", name: "ソフトバンクG", price: 8920, change: 6.45, volume: 45600000 },
  { rank: 2, ticker: "9432", name: "NTT", price: 168, change: -4.87, volume: 42300000 },
  { rank: 3, ticker: "8306", name: "三菱UFJ FG", price: 1685, change: 3.97, volume: 38900000 },
  { rank: 4, ticker: "7203", name: "トヨタ自動車", price: 2845, change: 5.67, volume: 28700000 },
  { rank: 5, ticker: "6920", name: "レーザーテック", price: 28750, change: 14.82, volume: 25600000 },
  { rank: 6, ticker: "8316", name: "三井住友FG", price: 8350, change: -5.43, volume: 22100000 },
  { rank: 7, ticker: "6857", name: "アドバンテスト", price: 5680, change: 8.92, volume: 19800000 },
  { rank: 8, ticker: "4385", name: "メルカリ", price: 4215, change: 12.45, volume: 18200000 },
  { rank: 9, ticker: "8801", name: "三井不動産", price: 3540, change: -8.72, volume: 16500000 },
  { rank: 10, ticker: "6758", name: "ソニーグループ", price: 15240, change: 6.83, volume: 15400000 },
  { rank: 11, ticker: "8058", name: "三菱商事", price: 2780, change: 3.82, volume: 14200000 },
  { rank: 12, ticker: "5032", name: "ANYCOLOR", price: 3850, change: 11.23, volume: 13500000 },
  { rank: 13, ticker: "4502", name: "武田薬品工業", price: 4120, change: -4.65, volume: 12800000 },
  { rank: 14, ticker: "7011", name: "三菱重工業", price: 1890, change: -4.15, volume: 11900000 },
  { rank: 15, ticker: "9201", name: "日本航空", price: 2650, change: -6.54, volume: 10200000 },
  { rank: 16, ticker: "3099", name: "三越伊勢丹HD", price: 2180, change: -7.85, volume: 9800000 },
  { rank: 17, ticker: "9433", name: "KDDI", price: 4985, change: 4.72, volume: 8900000 },
  { rank: 18, ticker: "4063", name: "信越化学工業", price: 6320, change: 7.65, volume: 8200000 },
  { rank: 19, ticker: "6594", name: "日本電産", price: 4850, change: 5.98, volume: 7600000 },
  { rank: 20, ticker: "6861", name: "キーエンス", price: 62400, change: -5.12, volume: 6900000 },
];

const dataMap: Record<string, StockRanking[]> = {
  gainers: gainersData,
  losers: losersData,
  volume: volumeData,
  high: gainersData, // reuse gainers data for demo
  low: losersData, // reuse losers data for demo
};

function formatPrice(price: number): string {
  return price.toLocaleString("ja-JP");
}

function formatVolume(volume: number): string {
  if (volume >= 10000000) {
    return `${(volume / 10000000).toFixed(1)}千万`;
  }
  if (volume >= 10000) {
    return `${(volume / 10000).toFixed(0)}万`;
  }
  return volume.toLocaleString("ja-JP");
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100">
        <Trophy className="h-4 w-4 text-amber-500" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
        <Medal className="h-4 w-4 text-gray-400" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50">
        <Medal className="h-4 w-4 text-orange-400" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-8 h-8">
      <span className="text-sm font-bold text-gray-400 num">{rank}</span>
    </div>
  );
}

export default function RankingsPage() {
  const [activeTab, setActiveTab] = useState("gainers");

  const data = dataMap[activeTab] || gainersData;

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Page heading */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="h-6 w-6 text-accent" />
          <h1 className="text-2xl font-bold text-navy">株価ランキング</h1>
        </div>
        <p className="text-sm text-gray-500">
          本日の市場データに基づく各種ランキング
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-accent text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-lightgray hover:text-navy"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rankings table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="hidden sm:grid grid-cols-[48px_72px_1fr_120px_120px_120px] gap-2 px-4 py-3 bg-lightgray text-[11px] font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
          <span className="text-center">順位</span>
          <span className="text-center">コード</span>
          <span>銘柄名</span>
          <span className="text-right">株価</span>
          <span className="text-right">前日比(%)</span>
          <span className="text-right">出来高</span>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-gray-50">
          {data.map((stock) => {
            const isPositive = stock.change > 0;
            const changeColor = isPositive ? "text-up" : stock.change < 0 ? "text-down" : "text-gray-500";
            const changeBg = isPositive ? "bg-up-bg" : stock.change < 0 ? "bg-down-bg" : "";

            return (
              <Link
                key={stock.rank}
                href={`/stocks/${stock.ticker}`}
                className="grid grid-cols-[48px_72px_1fr_auto] sm:grid-cols-[48px_72px_1fr_120px_120px_120px] gap-2 px-4 py-3 items-center hover:bg-lightgray/50 transition-colors group"
              >
                {/* Rank */}
                <div className="flex justify-center">
                  <RankBadge rank={stock.rank} />
                </div>

                {/* Ticker */}
                <span className="text-xs text-gray-400 num text-center">
                  {stock.ticker}
                </span>

                {/* Name */}
                <span className="text-sm font-medium text-navy group-hover:text-accent transition-colors truncate">
                  {stock.name}
                </span>

                {/* Price */}
                <span className="text-sm font-semibold text-navy num text-right">
                  {formatPrice(stock.price)}
                </span>

                {/* Change */}
                <div className="hidden sm:flex justify-end">
                  <span
                    className={`inline-flex items-center gap-0.5 rounded-md px-2 py-0.5 text-xs font-bold num ${changeBg} ${changeColor}`}
                  >
                    {isPositive ? "+" : ""}
                    {stock.change.toFixed(2)}%
                  </span>
                </div>

                {/* Volume */}
                <span className="hidden sm:block text-xs text-gray-500 num text-right">
                  {formatVolume(stock.volume)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile note: show change % below price */}
      <style>{`
        @media (max-width: 639px) {
          /* On mobile, the grid simplifies. The change is visible in the price column area */
        }
      `}</style>
    </div>
  );
}
