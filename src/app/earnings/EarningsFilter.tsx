"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Filter, Building2 } from "lucide-react";
import type { EarningsEntry } from "./page";

type MarketType = "プライム" | "スタンダード" | "グロース";

type Props = {
  earnings: EarningsEntry[];
  weekDates: string[];
  today: string;
  dayNames: string[];
  marketColors: Record<MarketType, { bg: string; text: string; dot: string }>;
};

function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export default function EarningsFilter({
  earnings,
  weekDates,
  today,
  dayNames,
  marketColors,
}: Props) {
  const [marketFilter, setMarketFilter] = useState<"all" | MarketType>("all");

  const filteredEarnings =
    marketFilter === "all"
      ? earnings
      : earnings.filter((e) => e.market === marketFilter);

  const earningsByDate: Record<string, EarningsEntry[]> = {};
  for (const entry of filteredEarnings) {
    if (!earningsByDate[entry.date]) {
      earningsByDate[entry.date] = [];
    }
    earningsByDate[entry.date].push(entry);
  }

  return (
    <>
      {/* Filter */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Filter className="h-4 w-4" />
          <span>市場</span>
        </div>
        <select
          value={marketFilter}
          onChange={(e) =>
            setMarketFilter(e.target.value as "all" | MarketType)
          }
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-navy focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="all">すべての市場</option>
          <option value="プライム">東証プライム</option>
          <option value="スタンダード">東証スタンダード</option>
          <option value="グロース">東証グロース</option>
        </select>

        <div className="hidden sm:flex items-center gap-4 ml-auto text-xs text-gray-500">
          {(Object.keys(marketColors) as MarketType[]).map((market) => (
            <div key={market} className="flex items-center gap-1.5">
              <div
                className={`w-2.5 h-2.5 rounded-full ${marketColors[market].dot}`}
              />
              <span>{market}</span>
            </div>
          ))}
        </div>
      </div>

      {/* This week */}
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
                          <p className="text-xs font-bold text-navy group-hover:text-accent transition-colors leading-snug">
                            {entry.companyName}
                          </p>
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

      {/* Next week */}
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
                          <p className="text-xs font-bold text-navy group-hover:text-accent transition-colors leading-snug">
                            {entry.companyName}
                          </p>
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
    </>
  );
}
