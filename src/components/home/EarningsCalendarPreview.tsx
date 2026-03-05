import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

type EarningsItem = {
  id: number;
  date: string;
  dateShort: string;
  companyName: string;
  ticker: string;
  expectedEPS: string;
  period: string;
};

const mockEarnings: EarningsItem[] = [
  {
    id: 1,
    date: "2026/03/06",
    dateShort: "3/6",
    companyName: "トヨタ自動車",
    ticker: "7203",
    expectedEPS: "312.5",
    period: "Q3",
  },
  {
    id: 2,
    date: "2026/03/07",
    dateShort: "3/7",
    companyName: "ソニーグループ",
    ticker: "6758",
    expectedEPS: "185.2",
    period: "Q3",
  },
  {
    id: 3,
    date: "2026/03/10",
    dateShort: "3/10",
    companyName: "ソフトバンクG",
    ticker: "9984",
    expectedEPS: "98.7",
    period: "Q3",
  },
  {
    id: 4,
    date: "2026/03/11",
    dateShort: "3/11",
    companyName: "キーエンス",
    ticker: "6861",
    expectedEPS: "542.1",
    period: "Q3",
  },
  {
    id: 5,
    date: "2026/03/12",
    dateShort: "3/12",
    companyName: "ファーストリテイリング",
    ticker: "9983",
    expectedEPS: "428.3",
    period: "Q2",
  },
];

export default function EarningsCalendarPreview() {
  return (
    <section className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-bold text-navy">決算カレンダー</h2>
        </div>
        <Link
          href="/earnings"
          className="text-sm text-accent hover:text-accent-light transition-colors font-medium flex items-center gap-1"
        >
          決算カレンダーを見る
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[56px_1fr_72px_88px_48px] gap-2 px-3 py-2 bg-lightgray rounded-t-lg text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
        <span>日付</span>
        <span>銘柄</span>
        <span className="text-center">コード</span>
        <span className="text-right">予想EPS</span>
        <span className="text-center">期</span>
      </div>

      {/* Table rows */}
      <div className="divide-y divide-gray-100">
        {mockEarnings.map((item) => (
          <Link
            key={item.id}
            href={`/stocks/${item.ticker}`}
            className="grid grid-cols-[56px_1fr_72px_88px_48px] gap-2 px-3 py-3 items-center hover:bg-lightgray/50 transition-colors group"
          >
            <span className="text-xs text-gray-500 num">{item.dateShort}</span>
            <span className="text-sm font-medium text-navy group-hover:text-accent transition-colors truncate">
              {item.companyName}
            </span>
            <span className="text-xs text-gray-400 num text-center">
              {item.ticker}
            </span>
            <span className="text-sm font-semibold text-navy num text-right">
              {item.expectedEPS}
            </span>
            <span className="text-[11px] text-gray-400 text-center">
              {item.period}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
