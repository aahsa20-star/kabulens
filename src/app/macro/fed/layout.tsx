import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FRBウォッチャー | 米国金融政策を日本語解説",
  description:
    "FOMCの最新決定・FF金利推移・ドットプロットをわかりやすく日本語解説。日本株への影響も解説。",
};

export default function FedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
