import Link from "next/link";
import { ChevronRight, Layers, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "テーマ株 | Kabu Lens",
  description:
    "AI・半導体、EV、防衛、インバウンドなど注目テーマ別に関連銘柄をチェック。Kabu Lensのテーマ株一覧ページ。",
};

export type ThemeStock = {
  ticker: string;
  name: string;
  description: string;
};

export type ThemeData = {
  slug: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  stocks: ThemeStock[];
};

export const THEMES: ThemeData[] = [
  {
    slug: "ai-semiconductor",
    name: "AI・半導体",
    icon: "🤖",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    description:
      "生成AI・データセンター向け半導体関連銘柄。AI需要拡大に伴い成長期待の高いセクター。",
    stocks: [
      { ticker: "8035", name: "東京エレクトロン", description: "半導体製造装置で世界3位" },
      { ticker: "6857", name: "アドバンテスト", description: "半導体テスト装置で世界首位" },
      { ticker: "6146", name: "ディスコ", description: "半導体切断・研磨装置で世界シェア7割" },
      { ticker: "6920", name: "レーザーテック", description: "EUV用マスク欠陥検査装置で独占" },
      { ticker: "6723", name: "ルネサスエレクトロニクス", description: "車載半導体で世界大手" },
      { ticker: "6526", name: "ソシオネクスト", description: "先端SoC設計で注目のファブレス" },
    ],
  },
  {
    slug: "ev-battery",
    name: "EV・電池",
    icon: "🔋",
    color: "text-green-700",
    bgColor: "bg-green-50",
    description:
      "電気自動車・全固体電池・車載電池関連銘柄。世界的なEVシフトの恩恵を受けるセクター。",
    stocks: [
      { ticker: "7203", name: "トヨタ自動車", description: "全固体電池量産に向け巨額投資" },
      { ticker: "7267", name: "本田技研工業", description: "ソニーとEV合弁、北米EV工場建設" },
      { ticker: "6752", name: "パナソニックHD", description: "テスラ向け車載電池の主力供給元" },
      { ticker: "6981", name: "村田製作所", description: "全固体電池を開発中の電子部品大手" },
      { ticker: "4080", name: "田中化学研究所", description: "正極材料で車載電池向け供給" },
      { ticker: "6674", name: "GSユアサ", description: "車載リチウム電池・全固体電池開発" },
    ],
  },
  {
    slug: "defense",
    name: "防衛",
    icon: "🛡️",
    color: "text-slate-700",
    bgColor: "bg-slate-50",
    description:
      "防衛費増額に伴い注目される防衛・安全保障関連銘柄。GDPの2%目標で受注拡大期待。",
    stocks: [
      { ticker: "7011", name: "三菱重工業", description: "防衛産業最大手、戦闘機・護衛艦" },
      { ticker: "7012", name: "川崎重工業", description: "潜水艦・輸送機・ヘリコプター" },
      { ticker: "7721", name: "東京計器", description: "防衛用電子機器・ジャイロセンサー" },
      { ticker: "6208", name: "石川製作所", description: "機雷・火工品の防衛専業メーカー" },
      { ticker: "4274", name: "細谷火工", description: "信号弾・照明弾など火工品専業" },
      { ticker: "6203", name: "豊和工業", description: "自衛隊向け小火器の主力メーカー" },
    ],
  },
  {
    slug: "inbound",
    name: "インバウンド",
    icon: "✈️",
    color: "text-sky-700",
    bgColor: "bg-sky-50",
    description:
      "訪日外国人増加の恩恵を受ける銘柄群。円安と観光立国政策で業績拡大が続くセクター。",
    stocks: [
      { ticker: "9603", name: "エイチ・アイ・エス", description: "旅行大手、ハウステンボス運営" },
      { ticker: "9022", name: "JR東海", description: "新幹線需要でインバウンド恩恵大" },
      { ticker: "3382", name: "セブン＆アイHD", description: "コンビニ免税売上が急拡大" },
      { ticker: "2681", name: "ゲオHD", description: "リユース事業で訪日客の需要増" },
      { ticker: "7453", name: "良品計画", description: "無印良品ブランドで訪日客に人気" },
      { ticker: "4661", name: "オリエンタルランド", description: "TDR運営、訪日客の来場増加" },
    ],
  },
  {
    slug: "high-dividend",
    name: "高配当",
    icon: "💰",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    description:
      "配当利回りが高く、安定したインカム収入が期待できる銘柄。新NISA成長投資枠で人気。",
    stocks: [
      { ticker: "8058", name: "三菱商事", description: "累進配当を掲げる総合商社最大手" },
      { ticker: "8306", name: "三菱UFJ FG", description: "メガバンク首位、増配基調" },
      { ticker: "9434", name: "ソフトバンク", description: "通信大手、高配当利回り維持" },
      { ticker: "2914", name: "JT", description: "配当利回り4%超の高配当銘柄" },
      { ticker: "8766", name: "東京海上HD", description: "損保最大手、株主還元に積極的" },
      { ticker: "5020", name: "ENEOS HD", description: "エネルギー大手、高配当政策継続" },
    ],
  },
  {
    slug: "renewable-energy",
    name: "再エネ・脱炭素",
    icon: "🌱",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    description:
      "再生可能エネルギー・カーボンニュートラル関連銘柄。GX推進で政府支援も追い風。",
    stocks: [
      { ticker: "9519", name: "レノバ", description: "再エネ発電所の開発・運営専業" },
      { ticker: "1407", name: "ウエストHD", description: "太陽光発電施設の施工大手" },
      { ticker: "6255", name: "エヌ・ピー・シー", description: "太陽電池製造装置の専業" },
      { ticker: "9517", name: "イーレックス", description: "バイオマス発電に注力の新電力" },
      { ticker: "6013", name: "タクマ", description: "バイオマスプラント・環境プラント" },
      { ticker: "5765", name: "SMK", description: "EV充電コネクタなど車載電子部品" },
    ],
  },
  {
    slug: "dx",
    name: "DX・SaaS",
    icon: "💻",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    description:
      "デジタルトランスフォーメーション・クラウドSaaS関連銘柄。企業のDX投資拡大で成長期待。",
    stocks: [
      { ticker: "4443", name: "Sansan", description: "名刺管理・BtoB DXプラットフォーム" },
      { ticker: "4478", name: "フリー", description: "クラウド会計・人事労務SaaS" },
      { ticker: "4776", name: "サイボウズ", description: "kintone等のグループウェア大手" },
      { ticker: "3923", name: "ラクス", description: "楽楽精算など中小企業向けSaaS" },
      { ticker: "4475", name: "HENNGE", description: "クラウドセキュリティSaaS" },
      { ticker: "9766", name: "コナミG", description: "DX関連でIT事業が急成長" },
    ],
  },
  {
    slug: "space",
    name: "宇宙",
    icon: "🚀",
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    description:
      "宇宙開発・衛星通信・ロケット関連銘柄。宇宙基本計画で官民の投資拡大が見込まれるセクター。",
    stocks: [
      { ticker: "7011", name: "三菱重工業", description: "H3ロケット打上げの主契約者" },
      { ticker: "9437", name: "NTTドコモ", description: "衛星通信による通信網拡大を計画" },
      { ticker: "6701", name: "NEC", description: "人工衛星の製造・運用で実績豊富" },
      { ticker: "7013", name: "IHI", description: "ロケットエンジン・宇宙機器を製造" },
      { ticker: "6503", name: "三菱電機", description: "人工衛星・宇宙通信システム大手" },
      { ticker: "4812", name: "ISID", description: "宇宙関連のシミュレーション技術" },
    ],
  },
];

export default function ThemesPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-accent transition-colors">
          ホーム
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy font-medium">テーマ株</span>
      </nav>

      {/* Page heading */}
      <div className="flex items-center gap-2 mb-2">
        <Layers className="h-6 w-6 text-accent" />
        <h1 className="text-2xl font-bold text-navy">テーマ株</h1>
      </div>
      <p className="text-sm text-gray-500 mb-8">
        注目テーマごとに関連銘柄をまとめています。投資テーマの研究にご活用ください。
      </p>

      {/* Theme cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {THEMES.map((theme) => (
          <Link
            key={theme.slug}
            href={`/themes/${theme.slug}`}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 group flex flex-col"
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`h-10 w-10 rounded-lg ${theme.bgColor} flex items-center justify-center text-xl`}
              >
                {theme.icon}
              </div>
              <h2 className="text-base font-bold text-navy group-hover:text-accent transition-colors">
                {theme.name}
              </h2>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">
              {theme.description}
            </p>

            {/* Stock count + link */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-[11px] text-gray-400">
                {theme.stocks.length}銘柄
              </span>
              <span className="flex items-center gap-1 text-xs text-accent font-medium group-hover:text-accent-light transition-colors">
                <TrendingUp className="h-3 w-3" />
                詳細を見る
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
