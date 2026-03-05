import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ニュース",
  description: "日本株・マクロ・為替の最新ニュースをAIが3行で要約。",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
