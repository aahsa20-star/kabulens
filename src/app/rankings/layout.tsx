import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "株価ランキング",
  description:
    "値上がり率、値下がり率、出来高急増、年初来高値・安値など、日本株の各種ランキングを確認できます。",
};

export default function RankingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
