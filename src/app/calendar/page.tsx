"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CalendarDays } from "lucide-react";

const EconomicCalendar = dynamic(
  () => import("@/components/tradingview/EconomicCalendar"),
  { ssr: false }
);

const filters = [
  { id: "jp", label: "日本" },
  { id: "us", label: "米国" },
  { id: "eu", label: "欧州" },
  { id: "all", label: "全世界" },
] as const;

export default function CalendarPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20">
      {/* Page Header */}
      <div className="py-6">
        <div className="flex items-center gap-2 mb-1">
          <CalendarDays className="h-6 w-6 text-accent" />
          <h1 className="text-2xl font-bold text-navy">経済指標カレンダー</h1>
        </div>
        <p className="text-sm text-gray-500">
          主要国の経済指標発表スケジュールをリアルタイムで確認。GDP、雇用統計、CPI、政策金利など重要指標を網羅しています。
        </p>
      </div>

      {/* Filter Badges */}
      <div className="flex items-center gap-2 pb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
              activeFilter === filter.id
                ? "bg-accent text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Full Page Economic Calendar Widget */}
      <section className="pb-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <EconomicCalendar />
        </div>
      </section>
    </div>
  );
}
