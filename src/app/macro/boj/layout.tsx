import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "日銀ウォッチャー | 金融政策決定会合・政策金利",
  description:
    "日本銀行の最新政策金利・金融政策決定会合の日程と結果。利上げが日本株・為替に与える影響を解説。",
};

export default function BojLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
