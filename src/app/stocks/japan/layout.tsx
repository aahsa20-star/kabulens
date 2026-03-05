import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "国内株式一覧",
};

export default function JapanStocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
