import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "決算カレンダー",
  description:
    "今週・来週に決算発表を予定している上場企業の一覧。東証プライム・スタンダード・グロース市場別に確認できます。",
};

export default function EarningsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
