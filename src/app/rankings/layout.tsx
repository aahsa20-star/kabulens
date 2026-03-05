import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "株価ランキング",
  description:
    "本日の値上がり・値下がり・出来高ランキング。",
};

export default function RankingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
