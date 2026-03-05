"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TrendingUp, Globe, Flame, Newspaper, BarChart3 } from "lucide-react";

const tabs = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/stocks", label: "株式", icon: TrendingUp },
  { href: "/trending", label: "トレンド", icon: Flame },
  { href: "/macro", label: "マーケット", icon: Globe },
  { href: "/news", label: "ニュース", icon: Newspaper },
  { href: "/earnings", label: "決算", icon: BarChart3 },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200/60">
      <div className="flex items-center justify-around h-14 px-1">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 rounded-[4px] transition-colors ${
                isActive ? "text-accent" : "text-gray-400 active:text-gray-600"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.5]"}`}
              />
              <span
                className={`text-[10px] leading-tight ${
                  isActive ? "font-semibold" : "font-medium"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area inset for notched devices */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
