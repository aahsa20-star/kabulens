"use client";

import { BarChart3 } from "lucide-react";

export default function StockHeatmap() {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-white/50"
      style={{ height: 500 }}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 mb-4">
        <BarChart3 className="h-7 w-7 text-accent" />
      </div>
      <p className="text-base font-semibold text-navy mb-1">
        マーケットヒートマップ
      </p>
      <p className="text-sm text-gray-500">
        近日公開予定です
      </p>
    </div>
  );
}
