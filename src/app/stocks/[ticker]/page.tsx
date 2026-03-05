"use client";

import { use } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Building2,
  BarChart3,
  PieChart,
  Clock,
  ExternalLink,
  Star,
} from "lucide-react";

const AdvancedChart = dynamic(
  () => import("@/components/tradingview/AdvancedChart"),
  { ssr: false }
);

type StockInfo = {
  code: string;
  name: string;
  nameEn: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  per: number;
  pbr: number;
  dividendYield: number;
  sector: string;
  revenue: string;
  operatingProfit: string;
  netIncome: string;
  eps: number;
};

const stockData: Record<string, StockInfo> = {
  "7203": {
    code: "7203",
    name: "トヨタ自動車",
    nameEn: "Toyota Motor Corp",
    price: 2847.5,
    change: 42.5,
    changePercent: 1.52,
    marketCap: "46.5兆円",
    per: 10.8,
    pbr: 1.24,
    dividendYield: 2.81,
    sector: "輸送用機器",
    revenue: "45兆953億円",
    operatingProfit: "5兆3,529億円",
    netIncome: "4兆9,449億円",
    eps: 341.2,
  },
  "6758": {
    code: "6758",
    name: "ソニーグループ",
    nameEn: "Sony Group Corp",
    price: 3215.0,
    change: -28.0,
    changePercent: -0.86,
    marketCap: "19.8兆円",
    per: 17.3,
    pbr: 2.45,
    dividendYield: 0.56,
    sector: "電気機器",
    revenue: "13兆208億円",
    operatingProfit: "1兆2,085億円",
    netIncome: "9,705億円",
    eps: 156.8,
  },
  "6861": {
    code: "6861",
    name: "キーエンス",
    nameEn: "Keyence Corp",
    price: 68450.0,
    change: 1250.0,
    changePercent: 1.86,
    marketCap: "16.6兆円",
    per: 38.5,
    pbr: 7.82,
    dividendYield: 0.31,
    sector: "電気機器",
    revenue: "9,228億円",
    operatingProfit: "5,186億円",
    netIncome: "3,792億円",
    eps: 1564.3,
  },
  "9984": {
    code: "9984",
    name: "ソフトバンクグループ",
    nameEn: "SoftBank Group Corp",
    price: 8923.0,
    change: -156.0,
    changePercent: -1.72,
    marketCap: "13.1兆円",
    per: 24.6,
    pbr: 1.87,
    dividendYield: 0.50,
    sector: "情報・通信業",
    revenue: "6兆7,565億円",
    operatingProfit: "2,251億円",
    netIncome: "1兆1,200億円",
    eps: 362.5,
  },
  "8035": {
    code: "8035",
    name: "東京エレクトロン",
    nameEn: "Tokyo Electron Ltd",
    price: 28750.0,
    change: 890.0,
    changePercent: 3.19,
    marketCap: "13.5兆円",
    per: 28.4,
    pbr: 8.12,
    dividendYield: 1.15,
    sector: "電気機器",
    revenue: "2兆2,090億円",
    operatingProfit: "6,418億円",
    netIncome: "4,834億円",
    eps: 1027.6,
  },
};

const defaultStock: StockInfo = {
  code: "----",
  name: "不明な銘柄",
  nameEn: "Unknown Stock",
  price: 0,
  change: 0,
  changePercent: 0,
  marketCap: "---",
  per: 0,
  pbr: 0,
  dividendYield: 0,
  sector: "---",
  revenue: "---",
  operatingProfit: "---",
  netIncome: "---",
  eps: 0,
};

type MockNews = {
  id: number;
  title: string;
  summary: string;
  source: string;
  timeAgo: string;
  category: string;
};

function getRelatedNews(code: string): MockNews[] {
  const newsMap: Record<string, MockNews[]> = {
    "7203": [
      { id: 1, title: "トヨタ、次世代EV向け全固体電池の量産計画を前倒し", summary: "2027年の量産開始を目指し、設備投資を2,000億円追加。航続距離1,200kmの実現に自信を示す。", source: "日経", timeAgo: "2時間前", category: "決算" },
      { id: 2, title: "トヨタ自動車、北米市場でハイブリッド車の販売が過去最高を記録", summary: "2025年度上半期の北米ハイブリッド車販売台数が前年同期比35%増。RAV4ハイブリッドが牽引。", source: "ロイター", timeAgo: "5時間前", category: "決算" },
      { id: 3, title: "日銀利上げ観測で自動車株に売り圧力、円高リスク意識", summary: "円高進行による輸出企業の業績下振れ懸念が広がり、トヨタなど自動車大手に売りが出る場面。", source: "Bloomberg", timeAgo: "1日前", category: "マクロ" },
    ],
    "6758": [
      { id: 1, title: "ソニー、PlayStation 6の開発計画を公式発表", summary: "次世代ゲーム機の2027年発売を示唆。カスタムAIチップ搭載でクラウドゲーミングとの融合を目指す。", source: "日経", timeAgo: "3時間前", category: "テクノロジー" },
      { id: 2, title: "ソニーの音楽事業、ストリーミング収益が初の1兆円突破", summary: "グローバルでのストリーミング契約増加が寄与。アジア市場での成長が顕著。", source: "ロイター", timeAgo: "8時間前", category: "決算" },
      { id: 3, title: "半導体画像センサー市場でソニーのシェアが拡大", summary: "スマートフォン向けCMOSセンサーで世界シェア55%を維持。車載向けにも拡大。", source: "Bloomberg", timeAgo: "1日前", category: "テクノロジー" },
    ],
  };

  return (
    newsMap[code] ?? [
      { id: 1, title: "日経平均株価、年初来高値を更新", summary: "海外投資家の資金流入が継続し、主要銘柄に幅広く買いが入る展開。", source: "日経", timeAgo: "1時間前", category: "マクロ" },
      { id: 2, title: "東証プライム市場の売買代金が4兆円を超える活況", summary: "好調な企業決算を背景に投資家心理が改善。半導体関連を中心に商いが膨らむ。", source: "ロイター", timeAgo: "4時間前", category: "マクロ" },
      { id: 3, title: "新NISA効果で個人投資家の日本株投資が増加傾向", summary: "新NISA開始以降、個人投資家の日本株買い越し額が累計で2兆円を超えた。", source: "Bloomberg", timeAgo: "1日前", category: "政策" },
    ]
  );
}

const CATEGORY_STYLES: Record<string, string> = {
  "決算": "bg-blue-100 text-blue-700",
  "マクロ": "bg-purple-100 text-purple-700",
  "為替": "bg-amber-100 text-amber-700",
  "政策": "bg-emerald-100 text-emerald-700",
  "テクノロジー": "bg-cyan-100 text-cyan-700",
};

function formatPrice(n: number): string {
  if (n >= 10000) return n.toLocaleString("ja-JP", { minimumFractionDigits: 0, maximumFractionDigits: 1 });
  return n.toLocaleString("ja-JP", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export default function StockDetailPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const stock = stockData[ticker] ?? { ...defaultStock, code: ticker };
  const isUp = stock.change >= 0;
  const isKnown = ticker in stockData;
  const relatedNews = getRelatedNews(ticker);

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-accent transition-colors">ホーム</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/stocks" className="hover:text-accent transition-colors">株式</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/stocks/japan" className="hover:text-accent transition-colors">国内株式</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy font-medium">{stock.code}</span>
      </nav>

      {/* Stock header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-baseline gap-3 mb-2">
          <h1 className="text-2xl font-bold text-navy">{stock.name}</h1>
          <span className="num text-sm text-gray-400">{stock.code}.T</span>
          {isKnown && (
            <span className="text-xs text-gray-400">{stock.nameEn}</span>
          )}
        </div>

        <div className="flex flex-wrap items-baseline gap-4">
          <span className="num text-3xl font-bold text-navy">
            {isKnown ? formatPrice(stock.price) : "---"}
          </span>
          {isKnown && (
            <>
              <span
                className={`num text-lg font-semibold ${
                  isUp ? "text-up" : "text-down"
                }`}
              >
                {isUp ? "+" : ""}
                {formatPrice(stock.change)}
              </span>
              <span
                className={`num inline-flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-lg ${
                  isUp ? "bg-up-bg text-up" : "bg-down-bg text-down"
                }`}
              >
                {isUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {isUp ? "+" : ""}
                {stock.changePercent.toFixed(2)}%
              </span>
            </>
          )}
        </div>
        {isKnown && (
          <p className="mt-1 text-xs text-gray-400">
            東証プライム &middot; {stock.sector} &middot; 最終更新 15:00 JST
          </p>
        )}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-navy flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-accent" />
            チャート
          </h2>
        </div>
        <AdvancedChart symbol={`TSE:${ticker}`} height={500} />
      </div>

      {/* Info cards grid */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* 基本情報 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-navy flex items-center gap-2">
              <Building2 className="h-4 w-4 text-accent" />
              基本情報
            </h2>
          </div>
          <div className="p-4">
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs text-gray-400 mb-1">時価総額</dt>
                <dd className="text-sm font-semibold text-navy">{stock.marketCap}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400 mb-1">PER（株価収益率）</dt>
                <dd className="num text-sm font-semibold text-navy">
                  {isKnown ? `${stock.per.toFixed(1)}倍` : "---"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400 mb-1">PBR（株価純資産倍率）</dt>
                <dd className="num text-sm font-semibold text-navy">
                  {isKnown ? `${stock.pbr.toFixed(2)}倍` : "---"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400 mb-1">配当利回り</dt>
                <dd className="num text-sm font-semibold text-navy">
                  {isKnown ? `${stock.dividendYield.toFixed(2)}%` : "---"}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs text-gray-400 mb-1">業種</dt>
                <dd className="text-sm font-semibold text-navy">{stock.sector}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 業績ハイライト */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-navy flex items-center gap-2">
              <PieChart className="h-4 w-4 text-accent" />
              業績ハイライト
            </h2>
          </div>
          <div className="p-4">
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs text-gray-400 mb-1">売上高</dt>
                <dd className="text-sm font-semibold text-navy">{stock.revenue}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400 mb-1">営業利益</dt>
                <dd className="text-sm font-semibold text-navy">{stock.operatingProfit}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400 mb-1">純利益</dt>
                <dd className="text-sm font-semibold text-navy">{stock.netIncome}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400 mb-1">EPS（1株当たり利益）</dt>
                <dd className="num text-sm font-semibold text-navy">
                  {isKnown ? `${stock.eps.toFixed(1)}円` : "---"}
                </dd>
              </div>
            </dl>
            {isKnown && (
              <p className="mt-4 text-[11px] text-gray-400">
                ※ 2025年3月期 通期実績（連結）
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Related news */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-bold text-navy">関連ニュース</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedNews.map((news) => (
            <article
              key={news.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    CATEGORY_STYLES[news.category] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {news.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  {news.timeAgo}
                </span>
              </div>
              <h3 className="text-sm font-bold text-navy leading-snug mb-2 line-clamp-2">
                {news.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                {news.summary}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-400">
                  出典：{news.source}
                </span>
                <Link
                  href="#"
                  className="flex items-center gap-1 text-xs text-accent hover:text-accent-light transition-colors font-medium"
                >
                  元記事を読む
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
