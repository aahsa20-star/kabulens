import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "マクロ経済",
  description:
    "FRB・日銀・為替・金利のリアルタイム動向をまとめて確認。",
};

export default function MacroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
