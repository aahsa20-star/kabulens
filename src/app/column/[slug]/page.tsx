"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BookOpen,
  Clock,
  Calendar,
  TrendingUp,
  Twitter,
  Youtube,
  Link2,
  Check,
  ArrowLeft,
  Tag,
} from "lucide-react";

type WriterProfile = {
  id: string;
  name: string;
  initial: string;
  color: string;
  title: string;
  bio: string;
  xHandle: string;
  youtubeChannel: string;
  style: string;
};

type ArticleData = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  authorId: string;
  gradientFrom: string;
  gradientTo: string;
  body: string;
  tickers: { code: string; name: string }[];
  relatedSlugs: string[];
};

const writersMap: Record<string, WriterProfile> = {
  tanaka: {
    id: "tanaka",
    name: "田中 太郎",
    initial: "田",
    color: "bg-blue-500",
    title: "株YouTuber",
    bio: "登録者数45万人の株式投資チャンネル運営。元証券会社アナリスト。テクニカル分析と決算読み解きを得意とし、初心者にもわかりやすい解説が人気。",
    xHandle: "@tanaka_kabu",
    youtubeChannel: "田中太郎の株チャンネル",
    style: "テクニカル重視",
  },
  suzuki: {
    id: "suzuki",
    name: "鈴木 花子",
    initial: "鈴",
    color: "bg-emerald-500",
    title: "独立系アナリスト",
    bio: "外資系運用会社で15年の経験を持つ独立系アナリスト。半導体・テクノロジーセクター専門。マクロ経済と個別銘柄の両面から分析。",
    xHandle: "@suzuki_analyst",
    youtubeChannel: "鈴木花子のマーケット分析",
    style: "ファンダメンタル重視",
  },
  yamada: {
    id: "yamada",
    name: "山田 一郎",
    initial: "山",
    color: "bg-amber-500",
    title: "FP・投資コンサルタント",
    bio: "CFP保有。新NISA時代の資産形成を中心に発信。長期投資・配当戦略の実践者として、個人投資家の目線でわかりやすく市場を解説。",
    xHandle: "@yamada_fp",
    youtubeChannel: "山田一郎の資産形成チャンネル",
    style: "長期・配当重視",
  },
};

const articlesMap: Record<string, ArticleData> = {
  "boj-rate-hike-analysis": {
    slug: "boj-rate-hike-analysis",
    title: "日銀利上げ後の株式市場はどう動く？過去の利上げ局面を徹底分析",
    date: "2026/03/04",
    readTime: "8分",
    category: "マクロ分析",
    authorId: "tanaka",
    gradientFrom: "from-blue-600",
    gradientTo: "to-indigo-700",
    body: `## 日銀利上げの影響を読み解く

2026年に入り、日銀の追加利上げ観測が再び市場を揺るがしています。植田総裁は記者会見で「経済・物価の見通しが実現していけば、引き続き政策金利を引き上げる」と明言しており、マーケット参加者の多くが次回会合での利上げを織り込み始めています。

本コラムでは、過去の利上げ局面における日本株の動きを振り返り、今後の投資戦略について考察します。

## 過去3回の利上げ局面

### 2006年7月：ゼロ金利解除
ゼロ金利解除が決定された2006年7月、日経平均は短期的に約5%の調整を見せました。しかし、その後はグローバル経済の好調に支えられ、年末にかけて回復基調をたどりました。特に金融セクターは利ざやの改善期待から相対的にアウトパフォームしました。

銀行株や保険株が特に恩恵を受け、三菱UFJフィナンシャルグループや東京海上ホールディングスは利上げ発表後の3ヶ月間で市場平均を大幅に上回るパフォーマンスを記録しています。

### 2007年2月：追加利上げ
二度目の利上げとなった2007年2月は、市場への影響が限定的でした。すでに織り込み済みだったことに加え、企業業績の好調が株価を下支えしました。ただし、不動産セクターには金利上昇の悪影響が現れ始めています。

不動産投資信託（REIT）市場では、利上げ後に利回りの上昇圧力が強まり、東証REIT指数は約8%の下落を記録しました。一方で、輸出関連株は円高の影響を警戒しつつも、堅調な海外需要に支えられました。

### 2024年3月：マイナス金利解除
直近の利上げとなった2024年3月のマイナス金利解除は、歴史的な政策転換でした。日経平均は一時的に調整したものの、その後4万円台を回復し、バブル後最高値を更新しました。

この局面で特徴的だったのは、為替市場との連動性です。利上げにもかかわらず円安が進行し、輸出企業の業績期待が株価を押し上げる展開となりました。

## 今回の利上げで注目すべきポイント

今回の利上げ局面では、以下の3つのポイントに注目しています。

**1. 金融セクターの再評価**
利上げによる利ざや改善は金融株にとって明確なプラス要因です。メガバンクや地方銀行、保険株は引き続き注目です。

**2. 不動産・REIT への影響**
金利上昇は不動産セクターにとって逆風ですが、インフレによる賃料上昇と資産価値の上昇がどこまで相殺するかがポイントです。

**3. グロース株の選別**
金利上昇局面ではバリュエーションの高いグロース株が売られやすくなります。成長性が確実に見込める銘柄への選別が一層重要になるでしょう。

## まとめ

過去の利上げ局面を分析すると、初期の調整は避けられないものの、中長期的には経済成長と企業業績が株価を左右する傾向が見られます。今回も「利上げ＝株安」と短絡的に考えるのではなく、セクターごとの影響を見極めた選別投資が重要です。`,
    tickers: [
      { code: "8306", name: "三菱UFJ FG" },
      { code: "8766", name: "東京海上HD" },
      { code: "8316", name: "三井住友FG" },
      { code: "8801", name: "三井不動産" },
    ],
    relatedSlugs: [
      "semiconductor-stocks-after-nvidia",
      "yen-strengthening-scenario",
    ],
  },
  "semiconductor-stocks-after-nvidia": {
    slug: "semiconductor-stocks-after-nvidia",
    title: "半導体セクターの行方：NVIDIA決算後に注目すべき日本株5銘柄",
    date: "2026/03/03",
    readTime: "12分",
    category: "セクター分析",
    authorId: "suzuki",
    gradientFrom: "from-emerald-600",
    gradientTo: "to-teal-700",
    body: `## NVIDIA決算が示す半導体市場の方向性

NVIDIAの最新四半期決算は、市場予想を大幅に上回る結果となりました。データセンター部門の売上高は前年同期比で約80%増加し、AI関連の需要が依然として力強いことが確認されています。

この決算を受けて、日本の半導体関連株にも注目が集まっています。本コラムでは、AI需要拡大の恩恵を受ける日本の半導体装置メーカーや素材メーカーの中から、特に注目すべき5銘柄を厳選して解説します。

## 注目銘柄1：東京エレクトロン（8035）

半導体製造装置の世界的大手。AI向け先端半導体の製造には最先端の露光装置や成膜装置が不可欠であり、東京エレクトロンはこの分野で高いシェアを誇ります。受注残高は過去最高水準にあり、今後2〜3年の成長が見込まれます。

足元の株価はPER30倍台で推移していますが、AI関連の設備投資サイクルが本格化する中、バリュエーションの正当性は十分にあると考えます。

## 注目銘柄2：アドバンテスト（6857）

半導体テスト装置の世界最大手。AIチップの性能検証には高度なテスト工程が必要であり、アドバンテストの装置は不可欠です。NVIDIAをはじめとする主要半導体メーカーが顧客であり、AI需要の恩恵を直接的に受けます。

特にHBM（高帯域メモリ）向けのテスト需要が急拡大しており、中期的な成長ドライバーとなっています。

## 注目銘柄3：レーザーテック（6920）

EUV（極端紫外線）用マスク検査装置で世界唯一のポジションを持つ企業です。先端半導体の微細化が進む限り、同社の装置需要は拡大し続けます。独占的な市場ポジションにより、高い利益率を維持しています。

## 注目銘柄4：信越化学工業（4063）

シリコンウェハの世界最大手。半導体の製造にはシリコンウェハが不可欠であり、生産量が増えれば増えるほど同社の売上も拡大します。素材メーカーとして景気サイクルの影響を受けやすいものの、AI需要による構造的な成長が見込まれます。

## 注目銘柄5：ディスコ（6146）

半導体ウェハの切断・研磨装置で世界トップシェアを誇る企業です。半導体チップの後工程で使用される装置の需要は、生産量に比例して増加します。安定した収益基盤と高い技術力が評価されています。

## 投資戦略

半導体セクターは景気サイクルの影響を受けやすいものの、AI需要という構造的な成長ドライバーが加わったことで、従来とは異なる成長軌道が期待できます。ただし、短期的にはバリュエーションの調整リスクもあるため、分散投資とタイミングの分散（積立）を心がけることが重要です。`,
    tickers: [
      { code: "8035", name: "東京エレクトロン" },
      { code: "6857", name: "アドバンテスト" },
      { code: "6920", name: "レーザーテック" },
      { code: "4063", name: "信越化学工業" },
      { code: "6146", name: "ディスコ" },
    ],
    relatedSlugs: [
      "boj-rate-hike-analysis",
      "earnings-season-q3-preview",
    ],
  },
  "yen-strengthening-scenario": {
    slug: "yen-strengthening-scenario",
    title: "円高トレンド転換？ドル円150円割れのシナリオと投資戦略",
    date: "2026/03/02",
    readTime: "10分",
    category: "為替・戦略",
    authorId: "yamada",
    gradientFrom: "from-amber-600",
    gradientTo: "to-orange-700",
    body: `## 為替市場の転換点

2026年に入り、ドル円相場は大きな転換点を迎えつつあります。FRBの利下げサイクル継続と日銀の利上げ路線により、日米金利差の縮小が進行中です。

本コラムでは、円高シナリオ別に投資戦略を検討し、ポートフォリオの見直しポイントを解説します。

## ドル円の現状分析

直近のドル円相場は152円台で推移しています。テクニカル的には200日移動平均線を下回っており、トレンド転換のサインが点灯しています。ファンダメンタルズ面でも、以下の要因が円高方向に作用しています。

**円高要因：**
- FRBの利下げ継続（年内あと1〜2回の利下げ予想）
- 日銀の追加利上げ観測
- 米国経済の減速懸念
- 日本企業のリパトリエーション（資金還流）

**円安要因：**
- 日本の貿易赤字構造（エネルギー輸入）
- 個人投資家の海外投資（新NISA経由）
- 日米の絶対金利差（依然として大きい）

## シナリオ別投資戦略

### シナリオA：緩やかな円高（145〜150円）
最も蓋然性が高いシナリオです。この場合、内需関連株と円高メリット株に注目します。小売、食品、電力・ガスなど輸入コスト低下の恩恵を受けるセクターが有望です。

### シナリオB：急激な円高（140円割れ）
FRBの緊急利下げなど予想外のイベントが発生した場合のシナリオです。輸出企業の業績下方修正リスクが高まるため、ディフェンシブ銘柄へのシフトが求められます。

### シナリオC：円安回帰（155円以上）
日銀が利上げを見送り、FRBの利下げペースが鈍化した場合のシナリオです。自動車・機械など輸出関連株が再び注目されます。

## ポートフォリオの見直しポイント

現在のポートフォリオが輸出企業に偏っている場合は、内需株の比率を引き上げることを検討すべきです。為替ヘッジ付きの外国債券ファンドも、円高局面では有効な選択肢となります。

長期投資家にとっては、為替変動に一喜一憂するのではなく、企業の本源的な価値に注目した銘柄選択が重要です。`,
    tickers: [
      { code: "7203", name: "トヨタ自動車" },
      { code: "9983", name: "ファーストリテイリング" },
      { code: "2914", name: "日本たばこ産業" },
      { code: "9432", name: "NTT" },
    ],
    relatedSlugs: [
      "boj-rate-hike-analysis",
      "nisa-growth-portfolio-2026",
    ],
  },
  "nisa-growth-portfolio-2026": {
    slug: "nisa-growth-portfolio-2026",
    title: "2026年版・新NISA成長投資枠で狙うべき高配当株ポートフォリオ",
    date: "2026/03/01",
    readTime: "15分",
    category: "NISA・資産形成",
    authorId: "yamada",
    gradientFrom: "from-violet-600",
    gradientTo: "to-purple-700",
    body: `## 新NISAを最大限活用する

新NISAの成長投資枠240万円を最大限活用するために、高配当株を中心としたポートフォリオ構築について解説します。配当利回り4%以上かつ増配傾向にある銘柄をスクリーニングし、セクター分散を考慮した構成例を紹介します。

## 銘柄選定の基準

今回のスクリーニング基準は以下の通りです。

1. 配当利回り4%以上（予想ベース）
2. 3期連続増配または配当維持
3. 配当性向50%以下（持続可能性の確認）
4. 自己資本比率30%以上（財務健全性）
5. 時価総額1,000億円以上（流動性の確保）

## 推奨ポートフォリオ構成

上記の基準でスクリーニングした結果、以下のセクター配分を推奨します。

**金融セクター（30%）：** メガバンク・保険株は利上げ恩恵もあり、配当利回りと株価上昇の両方が期待できます。

**通信セクター（20%）：** NTTやKDDIは安定配当の代表格。景気変動に強いディフェンシブ性も魅力です。

**商社セクター（20%）：** 三菱商事や三井物産は資源価格の恩恵に加え、非資源分野の成長も見逃せません。

**エネルギー・インフラ（15%）：** 電力会社やENEOSなど、安定収益基盤を持つ企業が該当します。

**その他高配当（15%）：** JTや武田薬品など、個別の高配当銘柄で分散を図ります。

## 配当再投資の威力

年間配当利回り4%のポートフォリオを20年間運用し、配当を再投資し続けた場合、元本は約2.2倍になります。新NISAの非課税メリットを活かせば、通常の課税口座と比較して最終的な資産額に大きな差が生まれます。

長期的な資産形成においては、短期的な株価変動に惑わされず、配当の安定性と成長性に注目した投資を続けることが重要です。`,
    tickers: [
      { code: "8306", name: "三菱UFJ FG" },
      { code: "9432", name: "NTT" },
      { code: "8058", name: "三菱商事" },
      { code: "2914", name: "日本たばこ産業" },
    ],
    relatedSlugs: [
      "yen-strengthening-scenario",
      "boj-rate-hike-analysis",
    ],
  },
  "earnings-season-q3-preview": {
    slug: "earnings-season-q3-preview",
    title: "3月決算シーズン直前：Q3決算で注目すべきポイントと銘柄",
    date: "2026/02/28",
    readTime: "11分",
    category: "決算プレビュー",
    authorId: "suzuki",
    gradientFrom: "from-rose-600",
    gradientTo: "to-pink-700",
    body: `## Q3決算シーズンの注目点

まもなく始まる3月決算シーズンに向けて、今期のQ3決算で特に注目すべきテーマを解説します。今回のシーズンでは、インバウンド関連、半導体関連、そして防衛関連の3つのテーマに注目しています。

## テーマ1：インバウンド関連

訪日外国人数は2026年に入っても増加傾向が続いており、1月の訪日客数は過去最高を更新しました。百貨店やホテル、航空会社など、インバウンド関連銘柄の業績上方修正が期待されます。

## テーマ2：半導体関連

先述の通り、AI需要の拡大により半導体関連企業の受注は好調を維持しています。Q3決算では受注残高の推移と今後のガイダンスに注目です。

## テーマ3：防衛関連

地政学リスクの高まりを背景に、日本の防衛予算は大幅に増額されています。三菱重工業やIHI、川崎重工業など防衛関連メーカーの受注動向に注目が集まっています。

## まとめ

Q3決算では、個別企業の業績だけでなく、通期業績予想の修正にも注目が必要です。上方修正が出た銘柄は短期的な株価上昇が期待できるため、決算発表スケジュールを事前にチェックしておくことをお勧めします。`,
    tickers: [
      { code: "7011", name: "三菱重工業" },
      { code: "7012", name: "川崎重工業" },
      { code: "9201", name: "日本航空" },
      { code: "3099", name: "三越伊勢丹HD" },
    ],
    relatedSlugs: [
      "semiconductor-stocks-after-nvidia",
      "boj-rate-hike-analysis",
    ],
  },
  "technical-analysis-nikkei-support": {
    slug: "technical-analysis-nikkei-support",
    title: "日経平均テクニカル分析：38,000円のサポートラインは守られるか",
    date: "2026/02/27",
    readTime: "9分",
    category: "テクニカル分析",
    authorId: "tanaka",
    gradientFrom: "from-cyan-600",
    gradientTo: "to-blue-700",
    body: `## テクニカル指標が示す現在地

日経平均が重要な節目である38,000円に接近しています。移動平均線、ボリンジャーバンド、RSIなど複数のテクニカル指標から、今後の方向性を分析します。

## 移動平均線分析

25日移動平均線は38,500円付近に位置しており、日経平均は現在この水準を下回っています。75日移動平均線（38,200円）も重要なサポートとして機能しています。200日移動平均線（37,800円）を割り込むようであれば、トレンド転換を示唆する可能性があります。

## RSI（相対力指数）

14日RSIは現在42付近で推移しており、売られすぎ（30以下）には達していませんが、弱気ゾーンに入りつつあります。過去のパターンでは、RSIが35を下回った局面で短期的なリバウンドが起きやすい傾向があります。

## ボリンジャーバンド

日経平均はボリンジャーバンドの-1σ付近に位置しています。-2σ（37,600円）まで下落した場合は、統計的にはリバウンドの確率が高い水準です。

## 今後の展開予測

テクニカル的には、38,000円のサポートラインが守られるかどうかが最大の焦点です。ここを維持できれば、39,000〜39,500円への反発が期待できます。一方、38,000円を明確に割り込んだ場合は、37,500円付近まで下値余地が広がる可能性があります。

短期トレーダーは38,000円付近での押し目買いを検討し、37,800円割れでロスカットというシナリオが有効でしょう。`,
    tickers: [
      { code: "9983", name: "ファーストリテイリング" },
      { code: "8035", name: "東京エレクトロン" },
      { code: "6758", name: "ソニーグループ" },
      { code: "9984", name: "ソフトバンクG" },
    ],
    relatedSlugs: [
      "boj-rate-hike-analysis",
      "semiconductor-stocks-after-nvidia",
    ],
  },
};

// Helper: get article title by slug for related articles
const articleTitles: Record<string, { title: string; date: string; category: string; gradientFrom: string; gradientTo: string }> = {
  "boj-rate-hike-analysis": { title: "日銀利上げ後の株式市場はどう動く？過去の利上げ局面を徹底分析", date: "2026/03/04", category: "マクロ分析", gradientFrom: "from-blue-600", gradientTo: "to-indigo-700" },
  "semiconductor-stocks-after-nvidia": { title: "半導体セクターの行方：NVIDIA決算後に注目すべき日本株5銘柄", date: "2026/03/03", category: "セクター分析", gradientFrom: "from-emerald-600", gradientTo: "to-teal-700" },
  "yen-strengthening-scenario": { title: "円高トレンド転換？ドル円150円割れのシナリオと投資戦略", date: "2026/03/02", category: "為替・戦略", gradientFrom: "from-amber-600", gradientTo: "to-orange-700" },
  "nisa-growth-portfolio-2026": { title: "2026年版・新NISA成長投資枠で狙うべき高配当株ポートフォリオ", date: "2026/03/01", category: "NISA・資産形成", gradientFrom: "from-violet-600", gradientTo: "to-purple-700" },
  "earnings-season-q3-preview": { title: "3月決算シーズン直前：Q3決算で注目すべきポイントと銘柄", date: "2026/02/28", category: "決算プレビュー", gradientFrom: "from-rose-600", gradientTo: "to-pink-700" },
  "technical-analysis-nikkei-support": { title: "日経平均テクニカル分析：38,000円のサポートラインは守られるか", date: "2026/02/27", category: "テクニカル分析", gradientFrom: "from-cyan-600", gradientTo: "to-blue-700" },
};

function renderMarkdownBody(body: string) {
  const lines = body.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={key++} className="h-4" />);
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h4 key={key++} className="text-base font-bold text-navy mt-6 mb-2">
          {trimmed.slice(4)}
        </h4>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h3 key={key++} className="text-lg font-bold text-navy mt-8 mb-3 pb-2 border-b border-gray-100">
          {trimmed.slice(3)}
        </h3>
      );
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      elements.push(
        <p key={key++} className="text-sm font-bold text-navy mt-3 mb-1">
          {trimmed.slice(2, -2)}
        </p>
      );
    } else {
      // Handle inline bold
      const parts = trimmed.split(/(\*\*.*?\*\*)/);
      const inlineElements = parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-bold text-navy">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      });
      elements.push(
        <p key={key++} className="text-sm text-gray-700 leading-relaxed">
          {inlineElements}
        </p>
      );
    }
  }
  return elements;
}

export default function ColumnDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [copied, setCopied] = useState(false);

  const article = articlesMap[slug];

  if (!article) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="text-center py-20">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-navy mb-2">
            コラムが見つかりません
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            お探しのコラムは存在しないか、削除された可能性があります。
          </p>
          <Link
            href="/column"
            className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-light transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            コラム一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const writer = writersMap[article.authorId];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareX = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article.title);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleShareLINE = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}`, "_blank");
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Back link */}
      <Link
        href="/column"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-accent transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        コラム一覧に戻る
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main content */}
        <div>
          {/* Hero gradient */}
          <div
            className={`h-48 sm:h-56 rounded-lg bg-gradient-to-br ${article.gradientFrom} ${article.gradientTo} flex items-center justify-center mb-6`}
          >
            <BookOpen className="h-16 w-16 text-white/20" />
          </div>

          {/* Article meta */}
          <div className="mb-6">
            <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent mb-3">
              {article.category}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-navy leading-tight mb-3">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime}で読める
              </span>
            </div>
          </div>

          {/* Article body */}
          <article className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-6">
            {renderMarkdownBody(article.body)}
          </article>

          {/* Related stock tags */}
          <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
            <h3 className="text-sm font-bold text-navy mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4 text-accent" />
              この記事で言及された銘柄
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tickers.map((ticker) => (
                <Link
                  key={ticker.code}
                  href={`/stocks/${ticker.code}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-lightgray px-3 py-1.5 text-xs font-medium text-navy hover:border-accent hover:text-accent transition-colors"
                >
                  <span className="num text-gray-400">{ticker.code}</span>
                  <span>{ticker.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Share buttons */}
          <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
            <h3 className="text-sm font-bold text-navy mb-3">この記事をシェア</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShareX}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:border-gray-400 hover:text-navy transition-colors"
              >
                <Twitter className="h-4 w-4" />
                X
              </button>
              <button
                onClick={handleShareLINE}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:border-green-400 hover:text-green-600 transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINE
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:border-gray-400 hover:text-navy transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-up" />
                    <span className="text-up">コピー済み</span>
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4" />
                    リンクコピー
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Related columns */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              関連コラム
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {article.relatedSlugs.map((relSlug) => {
                const rel = articleTitles[relSlug];
                if (!rel) return null;
                return (
                  <Link
                    key={relSlug}
                    href={`/column/${relSlug}`}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                  >
                    <div
                      className={`h-28 bg-gradient-to-br ${rel.gradientFrom} ${rel.gradientTo} flex items-center justify-center`}
                    >
                      <BookOpen className="h-8 w-8 text-white/30" />
                    </div>
                    <div className="p-4">
                      <span className="inline-block rounded-full bg-lightgray px-2 py-0.5 text-[10px] font-medium text-gray-500 mb-2">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-bold text-navy leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-2">{rel.date}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar: Writer profile */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h3 className="text-sm font-bold text-navy mb-4">この記事の著者</h3>
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-14 h-14 rounded-full ${writer.color} flex items-center justify-center flex-shrink-0`}
              >
                <span className="text-lg font-bold text-white">
                  {writer.initial}
                </span>
              </div>
              <div>
                <p className="text-base font-bold text-navy">{writer.name}</p>
                <p className="text-xs text-accent font-medium">{writer.title}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              {writer.bio}
            </p>

            {/* Investment style tag */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/8 px-2.5 py-1 text-[11px] font-medium text-accent">
                <TrendingUp className="h-3 w-3" />
                {writer.style}
              </span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <a
                href={`https://x.com/${writer.xHandle.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 hover:text-navy hover:border-gray-400 transition-colors"
              >
                <Twitter className="h-3.5 w-3.5" />
                {writer.xHandle}
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 hover:text-red-500 hover:border-red-300 transition-colors"
              >
                <Youtube className="h-3.5 w-3.5" />
                YouTube
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
