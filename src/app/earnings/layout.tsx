import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "決算カレンダー",
  description:
    "今週・来週の国内株決算スケジュール。BEAT/MISS速報付き。",
};

export default function EarningsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
