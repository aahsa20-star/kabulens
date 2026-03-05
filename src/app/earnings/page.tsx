import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import { Calendar, Clock, Building2, Info } from "lucide-react";
import EarningsFilter from "./EarningsFilter";

// Revalidate every 5 minutes for fresh earnings data
export const revalidate = 300;

type MarketType = "プライム" | "スタンダード" | "グロース";

export type EarningsEntry = {
  id: string;
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

function getWeekDates(): string[] {
  const today = new Date();
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

function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

const dayNames = ["月", "火", "水", "木", "金"];

async function fetchEarnings(): Promise<EarningsEntry[]> {
  const supabase = createServerClient();
  const weekDates = getWeekDates();
  const startDate = weekDates[0];
  const endDate = weekDates[weekDates.length - 1];

  const { data: earningsData } = await supabase
    .from("earnings")
    .select("id, ticker, company_name, announced_at")
    .gte("announced_at", `${startDate}T00:00:00`)
    .lte("announced_at", `${endDate}T23:59:59`)
    .order("announced_at", { ascending: true });

  if (!earningsData || earningsData.length === 0) return [];

  // Look up market info from stocks table
  const tickers = earningsData.map((e) => e.ticker);
  const { data: stocksData } = await supabase
    .from("stocks")
    .select("ticker, market")
    .in("ticker", tickers);

  const marketMap = new Map<string, string>();
  stocksData?.forEach((s) => {
    if (s.market) marketMap.set(s.ticker, s.market);
  });

  return earningsData.map((e) => {
    const announcedAt = e.announced_at ? new Date(e.announced_at) : new Date();
    const dateStr = announcedAt.toISOString().split("T")[0];
    const hours = String(announcedAt.getHours()).padStart(2, "0");
    const mins = String(announcedAt.getMinutes()).padStart(2, "0");

    return {
      id: e.id,
      companyName: e.company_name || e.ticker,
      ticker: e.ticker,
      date: dateStr,
      time: `${hours}:${mins}`,
      market: (marketMap.get(e.ticker) || "プライム") as MarketType,
    };
  });
}

export default async function EarningsPage() {
  const weekDates = getWeekDates();
  const earnings = await fetchEarnings();

  const today = new Date().toISOString().split("T")[0];

  // If no data from DB, show empty state
  if (earnings.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-bold text-navy">決算カレンダー</h1>
          </div>
          <p className="text-sm text-gray-500">
            今週・来週に決算発表を予定している企業の一覧
          </p>
        </div>

        <div className="text-center py-16">
          <Clock className="mx-auto mb-3 w-8 h-8 text-gray-300" />
          <p className="text-sm text-gray-500">
            決算データを取得中です。しばらくお待ちください。
          </p>
          <p className="text-xs text-gray-400 mt-1">
            情報は毎営業日18:00（JST）に更新されます
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-8">
          <Info className="h-3 w-3" />
          <span>情報はJPX適時開示・TDnetに基づきます</span>
        </div>
      </div>
    );
  }

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

      {/* Filter (client component) */}
      <EarningsFilter
        earnings={earnings}
        weekDates={weekDates}
        today={today}
        dayNames={dayNames}
        marketColors={marketColors}
      />

      {/* Source attribution */}
      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-6">
        <Info className="h-3 w-3" />
        <span>情報はJPX適時開示・TDnetに基づきます</span>
      </div>
    </div>
  );
}
