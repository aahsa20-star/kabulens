"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Filter, Building2 } from "lucide-react";

type MarketType = "プライム" | "スタンダード" | "グロース";

type EarningsEntry = {
  id: number;
  companyName: string;
  ticker: string;
  date: string;
  time: string;
  market: MarketType;
};

const marketColors: Record<MarketType, { bg: string; text: string; dot: string }> = {
  "プライム": { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  "スタンダード": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  "グロース": { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
};

// Generate dates for current & next week (Mon-Fri)
function getWeekDates(): string[] {
  const today = new Date(2026, 2, 5); // 2026-03-05 (Thursday)
  // Go to Monday of this week
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  const dates: string[] = [];
  for (let w = 0; w < 2; w++) {
    for (let d = 0; d < 5; d++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + w * 7 + d);
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      dates.push(`${y}-${m}-${dd}`);
    }
  }
  return dates;
}

const weekDates = getWeekDates();
const dayNames = ["月", "火", "水", "木", "金"];

const mockEarnings: EarningsEntry[] = [
  // This week (Mon 3/2 - Fri 3/6)
  { id: 1, companyName: "トヨタ自動車", ticker: "7203", date: "2026-03-02", time: "15:00", market: "プライム" },
  { id: 2, companyName: "三菱UFJ FG", ticker: "8306", date: "2026-03-02", time: "16:00", market: "プライム" },
  { id: 3, companyName: "ソニーグループ", ticker: "6758", date: "2026-03-03", time: "15:30", market: "プライム" },
  { id: 4, companyName: "ANYCOLOR", ticker: "5032", date: "2026-03-03", time: "15:00", market: "グロース" },
  { id: 5, companyName: "キーエンス", ticker: "6861", date: "2026-03-04", time: "15:30", market: "プライム" },
  { id: 6, companyName: "メルカリ", ticker: "4385", date: "2026-03-04", time: "15:00", market: "プライム" },
  { id: 7, companyName: "日本電産", ticker: "6594", date: "2026-03-04", time: "16:00", market: "プライム" },
  { id: 8, companyName: "ファーストリテイリング", ticker: "9983", date: "2026-03-05", time: "15:00", market: "プライム" },
  { id: 9, companyName: "SHIFT", ticker: "3697", date: "2026-03-05", time: "15:30", market: "グロース" },
  { id: 10, companyName: "ソフトバンクG", ticker: "9984", date: "2026-03-06", time: "16:00", market: "プライム" },
  { id: 11, companyName: "ラクスル", ticker: "4384", date: "2026-03-06", time: "15:00", market: "グロース" },
  // Next week (Mon 3/9 - Fri 3/13)
  { id: 12, companyName: "東京エレクトロン", ticker: "8035", date: "2026-03-09", time: "15:30", market: "プライム" },
  { id: 13, companyName: "三井住友FG", ticker: "8316", date: "2026-03-09", time: "16:00", market: "プライム" },
  { id: 14, companyName: "アドバンテスト", ticker: "6857", date: "2026-03-10", time: "15:00", market: "プライム" },
  { id: 15, companyName: "ウェルスナビ", ticker: "7342", date: "2026-03-10", time: "15:30", market: "グロース" },
  { id: 16, companyName: "任天堂", ticker: "7974", date: "2026-03-11", time: "15:30", market: "プライム" },
  { id: 17, companyName: "日本M&Aセンター", ticker: "2127", date: "2026-03-11", time: "15:00", market: "スタンダード" },
  { id: 18, companyName: "信越化学工業", ticker: "4063", date: "2026-03-12", time: "15:00", market: "プライム" },
  { id: 19, companyName: "Sansan", ticker: "4443", date: "2026-03-12", time: "15:30", market: "グロース" },
  { id: 20, companyName: "KDDI", ticker: "9433", date: "2026-03-13", time: "15:00", market: "プライム" },
];

function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export default function EarningsPage() {
  const [marketFilter, setMarketFilter] = useState<"all" | MarketType>("all");

  const filteredEarnings = marketFilter === "all"
    ? mockEarnings
    : mockEarnings.filter((e) => e.market === marketFilter);

  // Group earnings by date
  const earningsByDate: Record<string, EarningsEntry[]> = {};
  for (const entry of filteredEarnings) {
    if (!earningsByDate[entry.date]) {
      earningsByDate[entry.date] = [];
    }
    earningsByDate[entry.date].push(entry);
  }

  const today = "2026-03-05";

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Page heading */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-6 w-6 text-accent" />
          <h1 className="text-2xl font-bold text-navy">決算カレンダー</h1>
        </div>
        <p className="text-sm text-gray-500">
          今週・来週に決算発表を予定している企業の一覧
        </p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Filter className="h-4 w-4" />
          <span>市場</span>
        </div>
        <select
          value={marketFilter}
          onChange={(e) => setMarketFilter(e.target.value as "all" | MarketType)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-navy focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="all">すべての市場</option>
          <option value="プライム">東証プライム</option>
          <option value="スタンダード">東証スタンダード</option>
          <option value="グロース">東証グロース</option>
        </select>

        {/* Market legend */}
        <div className="hidden sm:flex items-center gap-4 ml-auto text-xs text-gray-500">
          {(Object.keys(marketColors) as MarketType[]).map((market) => (
            <div key={market} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${marketColors[market].dot}`} />
              <span>{market}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Week view: this week */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-accent" />
          今週の決算発表
        </h2>
        <div className="grid gap-3 sm:grid-cols-5">
          {weekDates.slice(0, 5).map((date, i) => {
            const entries = earningsByDate[date] || [];
            const isToday = date === today;
            return (
              <div
                key={date}
                className={`rounded-lg border ${
                  isToday
                    ? "border-accent bg-accent/5"
                    : "border-gray-200 bg-white"
                } p-3`}
              >
                {/* Date header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                  <div>
                    <span
                      className={`text-sm font-bold ${
                        isToday ? "text-accent" : "text-navy"
                      }`}
                    >
                      {formatDateLabel(date)}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">
                      ({dayNames[i]})
                    </span>
                  </div>
                  {isToday && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">
                      今日
                    </span>
                  )}
                  {entries.length > 0 && (
                    <span className="text-[10px] text-gray-400 num">
                      {entries.length}件
                    </span>
                  )}
                </div>

                {/* Entries */}
                {entries.length > 0 ? (
                  <div className="space-y-2">
                    {entries.map((entry) => {
                      const colors = marketColors[entry.market];
                      return (
                        <Link
                          key={entry.id}
                          href={`/stocks/${entry.ticker}`}
                          className="block rounded-md p-2 hover:bg-lightgray transition-colors group"
                        >
                          <div className="flex items-start justify-between gap-1">
                            <p className="text-xs font-bold text-navy group-hover:text-accent transition-colors leading-snug">
                              {entry.companyName}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-gray-400 num">
                              {entry.ticker}
                            </span>
                            <span
                              className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium ${colors.bg} ${colors.text}`}
                            >
                              {entry.market}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                            <Clock className="h-2.5 w-2.5" />
                            {entry.time}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-gray-300 text-center py-4">
                    発表予定なし
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Week view: next week */}
      <div>
        <h2 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-accent" />
          来週の決算発表
        </h2>
        <div className="grid gap-3 sm:grid-cols-5">
          {weekDates.slice(5, 10).map((date, i) => {
            const entries = earningsByDate[date] || [];
            return (
              <div
                key={date}
                className="rounded-lg border border-gray-200 bg-white p-3"
              >
                {/* Date header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                  <div>
                    <span className="text-sm font-bold text-navy">
                      {formatDateLabel(date)}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">
                      ({dayNames[i]})
                    </span>
                  </div>
                  {entries.length > 0 && (
                    <span className="text-[10px] text-gray-400 num">
                      {entries.length}件
                    </span>
                  )}
                </div>

                {/* Entries */}
                {entries.length > 0 ? (
                  <div className="space-y-2">
                    {entries.map((entry) => {
                      const colors = marketColors[entry.market];
                      return (
                        <Link
                          key={entry.id}
                          href={`/stocks/${entry.ticker}`}
                          className="block rounded-md p-2 hover:bg-lightgray transition-colors group"
                        >
                          <div className="flex items-start justify-between gap-1">
                            <p className="text-xs font-bold text-navy group-hover:text-accent transition-colors leading-snug">
                              {entry.companyName}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-gray-400 num">
                              {entry.ticker}
                            </span>
                            <span
                              className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium ${colors.bg} ${colors.text}`}
                            >
                              {entry.market}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                            <Clock className="h-2.5 w-2.5" />
                            {entry.time}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-gray-300 text-center py-4">
                    発表予定なし
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
