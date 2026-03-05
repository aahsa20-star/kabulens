"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

function calcDaysUntil(dateStr: string) {
  const target = new Date(dateStr + "T00:00:00+09:00");
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function FedCountdown({
  nextDate,
  label,
}: {
  nextDate: string;
  label: string;
}) {
  const [days, setDays] = useState(calcDaysUntil(nextDate));

  useEffect(() => {
    const timer = setInterval(() => setDays(calcDaysUntil(nextDate)), 60000);
    return () => clearInterval(timer);
  }, [nextDate]);

  const formatted = nextDate.replace(/-/g, "/");

  return (
    <div className="bg-white/10 rounded-lg p-5">
      <p className="text-xs text-gray-300 mb-1 flex items-center gap-1">
        <CalendarDays className="h-3.5 w-3.5" />
        {label}
      </p>
      <p className="text-lg font-bold num mb-1">{formatted}</p>
      <p className="text-3xl font-bold num text-accent-light">
        あと <span className="text-4xl">{days}</span> 日
      </p>
    </div>
  );
}
