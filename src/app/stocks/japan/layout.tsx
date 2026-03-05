import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "国内株式一覧",
  description: "日本株の個別銘柄情報。チャート・決算・ニュースを一画面で確認。",
};

export default function JapanStocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
