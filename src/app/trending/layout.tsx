import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "トレンド | 今日の話題の銘柄・キーワード | Kabu Lens",
  description:
    "Googleトレンドと自前集計で「今日の株クラで話題のワード・銘柄」を表示。急上昇キーワードと注目銘柄ランキング。",
};

export default function TrendingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
