import type { Metadata } from "next";
import { Inter, DM_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import { AuthProvider } from "@/components/auth/AuthProvider";

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
    default: "Kabu Lens（株レンズ）| 日本株×マクロ 投資家向け金融メディア",
    template: "%s | Kabu Lens（株レンズ）",
  },
  description:
    "日本株・マクロ経済・決算情報をAIで要約。新NISA世代のための金融メディア。",
  metadataBase: new URL("https://kabulens.jp"),
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
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Kabu Lens（株レンズ）",
    title: "Kabu Lens（株レンズ）| 日本株×マクロ 投資家向け金融メディア",
    description:
      "日本株・マクロ経済・決算情報をAIで要約。新NISA世代のための金融メディア。",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Kabu Lens" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kabu Lens（株レンズ）| 日本株×マクロ 投資家向け金融メディア",
    description:
      "日本株・マクロ経済・決算情報をAIで要約。新NISA世代のための金融メディア。",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4781664015929713"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} ${dmMono.variable} ${notoSansJP.variable} font-sans antialiased bg-offwhite text-navy`}
      >
        <AuthProvider>
          <GoogleAnalytics />
          <Header />
          <main className="min-h-screen pb-20 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
