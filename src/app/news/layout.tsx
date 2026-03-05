import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ニュース",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
