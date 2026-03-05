import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "マーケット概況 | 日経平均・為替・金利をリアルタイムで",
  description:
    "日経平均・TOPIX・ドル円・米国指数・金利をリアルタイムで確認。マーケット全体の動きをひと目で把握。",
};

export default function MacroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
