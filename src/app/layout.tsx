import type { Metadata } from "next";
import { Inter, DM_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kabu Lens | 株式市場を、もっとシャープに。",
    template: "%s | Kabu Lens",
  },
  description:
    "日本株×マクロ×インフルエンサーコラム。新NISA世代のための金融メディア。美しいUIで市場を鋭く見通す。",
  keywords: [
    "日本株",
    "株式投資",
    "NISA",
    "マクロ経済",
    "FRB",
    "日銀",
    "決算",
    "株価",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Kabu Lens",
    title: "Kabu Lens | 株式市場を、もっとシャープに。",
    description:
      "日本株×マクロ×インフルエンサーコラム。新NISA世代のための金融メディア。",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kabu Lens | 株式市場を、もっとシャープに。",
    description:
      "日本株×マクロ×インフルエンサーコラム。新NISA世代のための金融メディア。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.variable} ${dmMono.variable} ${notoSansJP.variable} font-sans antialiased bg-offwhite text-navy`}
      >
        <Header />
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
