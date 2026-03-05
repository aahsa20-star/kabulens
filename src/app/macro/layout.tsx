import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "マクロ経済ダッシュボード",
  description:
    "FRB・日銀の金融政策、主要指数、為替、債券利回りをリアルタイムで確認。マクロ経済の全体像を一画面で把握。",
};

export default function MacroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
