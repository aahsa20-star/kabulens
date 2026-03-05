import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "Kabu Lensへのお問い合わせ。サービスに関するご質問、不具合のご報告、取材のご依頼など。",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
