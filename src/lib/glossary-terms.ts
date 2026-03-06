export type GlossaryCategory =
  | "株式基礎"
  | "決算・財務"
  | "金融政策"
  | "マクロ経済"
  | "テクニカル"
  | "市場・取引";

export interface GlossaryTerm {
  slug: string;
  term: string;
  term_en?: string;
  category: GlossaryCategory;
  short: string;
  description: string;
  example?: string;
  related?: string[];
  important: boolean;
}

export const glossaryTerms: GlossaryTerm[] = [
  // ─── 株式基礎 ───────────────────────────────
  {
    slug: "per",
    term: "PER（株価収益率）",
    term_en: "Price Earnings Ratio",
    category: "株式基礎",
    short: "株価が利益の何倍かを示す指標",
    description:
      "株価を1株当たり純利益（EPS）で割った値。「株価÷EPS」で計算する。PERが高いほど割高、低いほど割安とされるが、成長株は高PERが許容されることが多い。日本株の平均PERは14〜16倍程度。",
    example: "株価1,000円 / EPS 50円 = PER 20倍",
    related: ["eps", "pbr"],
    important: true,
  },
  {
    slug: "pbr",
    term: "PBR（株価純資産倍率）",
    term_en: "Price Book-value Ratio",
    category: "株式基礎",
    short: "株価が純資産の何倍かを示す指標",
    description:
      "株価を1株当たり純資産（BPS）で割った値。PBR1倍を下回ると「解散価値以下」とされ割安の目安になる。東証は上場企業にPBR1倍割れ改善を要請しており、日本株市場で特に注目される指標。",
    example: "株価500円 / BPS 400円 = PBR 1.25倍",
    related: ["per", "roe"],
    important: true,
  },
  {
    slug: "eps",
    term: "EPS（1株当たり利益）",
    term_en: "Earnings Per Share",
    category: "株式基礎",
    short: "1株に対して生み出した利益",
    description:
      "当期純利益を発行済み株式数で割った値。EPSが高いほど企業の収益力が高いことを示す。決算発表時に市場予想との比較（BEATかMISSか）が株価を大きく動かす。",
    example: "純利益100億円 / 発行済み株式1億株 = EPS 100円",
    related: ["per", "beat", "miss"],
    important: true,
  },
  {
    slug: "roe",
    term: "ROE（自己資本利益率）",
    term_en: "Return on Equity",
    category: "株式基礎",
    short: "株主資本に対する利益率",
    description:
      "当期純利益を自己資本で割った値。ROEが高いほど株主から預かった資本を効率よく運用できている。日本企業は欧米と比べROEが低い傾向があり、東証の改革で改善要請が続いている。一般的に10%以上が目安。",
    example: "純利益50億円 / 自己資本500億円 = ROE 10%",
    related: ["pbr", "roa"],
    important: true,
  },
  {
    slug: "roa",
    term: "ROA（総資産利益率）",
    term_en: "Return on Assets",
    category: "株式基礎",
    short: "総資産に対する利益率",
    description:
      "当期純利益を総資産で割った値。借入金を含む全資産をどれだけ効率よく使って利益を出しているかを示す。ROEは借入で水増しできるが、ROAはより本質的な収益力を測れる。",
    related: ["roe"],
    important: false,
  },
  {
    slug: "dividend-yield",
    term: "配当利回り",
    term_en: "Dividend Yield",
    category: "株式基礎",
    short: "株価に対する配当金の割合",
    description:
      "1株当たり年間配当金を株価で割った値。配当利回り3%以上が「高配当株」の目安とされることが多い。新NISA口座での長期投資先として人気が高い。ただし株価が下落しても配当が据え置かれると利回りは上がるため、業績悪化のサインのこともある。",
    example: "年間配当50円 / 株価1,000円 = 配当利回り 5%",
    related: ["per"],
    important: true,
  },
  {
    slug: "market-cap",
    term: "時価総額",
    term_en: "Market Capitalization",
    category: "株式基礎",
    short: "企業の株式の市場での総価値",
    description:
      "株価に発行済み株式数を掛けた値。企業規模を測る最も基本的な指標。日本最大はトヨタ自動車で約50兆円（2025年時点）。時価総額によって大型株・中型株・小型株に分類される。",
    example: "株価2,000円 × 発行済み株式10億株 = 時価総額2兆円",
    important: false,
  },
  {
    slug: "buyback",
    term: "自社株買い",
    term_en: "Share Buyback",
    category: "株式基礎",
    short: "企業が自社の株式を市場で買い戻すこと",
    description:
      "企業が余剰資金で市場から自社株を購入・消却すること。発行済み株式数が減るためEPS・ROEが向上し、株主還元として評価される。日本企業の自社株買いは近年急増しており、株価の支援要因となっている。",
    related: ["eps", "roe"],
    important: false,
  },

  // ─── 決算・財務 ───────────────────────────────
  {
    slug: "beat",
    term: "BEAT（予想上回り）",
    term_en: "Earnings Beat",
    category: "決算・財務",
    short: "決算が市場予想を上回ること",
    description:
      "企業の決算発表でEPS・売上高などが市場コンセンサス予想を上回ること。BEATすると株価が急騰するケースが多い。予想の上回り幅が大きいほど「サプライズ」と呼ばれ、より大きな株価反応が起きる。",
    related: ["miss", "eps"],
    important: true,
  },
  {
    slug: "miss",
    term: "MISS（予想下回り）",
    term_en: "Earnings Miss",
    category: "決算・財務",
    short: "決算が市場予想を下回ること",
    description:
      "企業の決算発表でEPS・売上高などが市場コンセンサス予想を下回ること。MISSすると株価が急落するケースが多い。業績が良くても予想に届かなければ「失望売り」が出ることがある。",
    related: ["beat", "eps"],
    important: true,
  },
  {
    slug: "operating-profit",
    term: "営業利益",
    term_en: "Operating Profit",
    category: "決算・財務",
    short: "本業で稼いだ利益",
    description:
      "売上高から売上原価・販売費・一般管理費を差し引いた利益。本業の収益力を示す最も重要な利益指標。営業利益率（営業利益÷売上高）が高いほど効率的に稼げるビジネスモデルといえる。",
    related: ["eps"],
    important: true,
  },
  {
    slug: "guidance",
    term: "業績予想（ガイダンス）",
    term_en: "Earnings Guidance",
    category: "決算・財務",
    short: "企業が示す次期の業績見通し",
    description:
      "企業が投資家に対して開示する次の四半期・通期の業績見通し。決算発表時に実績とあわせて注目される。ガイダンスの上方修正は株価上昇要因、下方修正は下落要因になる。日本企業は保守的な予想を出しやすい傾向がある。",
    related: ["beat", "miss"],
    important: false,
  },

  // ─── 金融政策 ───────────────────────────────
  {
    slug: "ff-rate",
    term: "FF金利（フェデラルファンズレート）",
    term_en: "Federal Funds Rate",
    category: "金融政策",
    short: "米国の政策金利",
    description:
      "米国の銀行間で翌日物資金を貸し借りする際の金利。FRBが誘導目標を設定する事実上の米国政策金利。FF金利の変化は株式・債券・為替市場に大きな影響を与えるため、FOMCの決定が世界中から注目される。",
    related: ["fomc", "hawkish", "dovish"],
    important: true,
  },
  {
    slug: "fomc",
    term: "FOMC",
    term_en: "Federal Open Market Committee",
    category: "金融政策",
    short: "米国の金融政策を決定する委員会",
    description:
      "連邦公開市場委員会。FRBの政策金利（FF金利）の変更を決定する会合。年8回開催され、その結果と声明文・議長会見の内容が世界の金融市場に大きな影響を与える。次回FOMC日程は常に市場参加者の注目事項。",
    related: ["ff-rate", "dot-plot"],
    important: true,
  },
  {
    slug: "dot-plot",
    term: "ドットプロット",
    term_en: "Dot Plot",
    category: "金融政策",
    short: "FOMC参加者の金利予想を点で示したグラフ",
    description:
      "FOMC参加者（FRB理事・地区連銀総裁）が各自の政策金利予想を匿名で提出し、グラフ上に点として示したもの。年4回公表される。市場参加者はドットプロットから「タカ派寄り」か「ハト派寄り」かを読み取り、将来の利上げ・利下げ見通しを形成する。",
    related: ["fomc", "ff-rate", "hawkish"],
    important: true,
  },
  {
    slug: "hawkish",
    term: "タカ派（ホーキッシュ）",
    term_en: "Hawkish",
    category: "金融政策",
    short: "インフレ抑制を優先し利上げに積極的な姿勢",
    description:
      "中央銀行や政策当局者がインフレ抑制を優先し、利上げ・金融引き締めに積極的な姿勢のこと。タカ派的な発言が出ると利上げ期待が高まり、株式市場には逆風、為替は利上げ通貨高になりやすい。",
    related: ["dovish", "fomc"],
    important: true,
  },
  {
    slug: "dovish",
    term: "ハト派（ダビッシュ）",
    term_en: "Dovish",
    category: "金融政策",
    short: "景気支援を優先し利下げに積極的な姿勢",
    description:
      "中央銀行や政策当局者が景気支援・雇用最大化を優先し、利下げ・金融緩和に積極的な姿勢のこと。ハト派的な発言が出ると利下げ期待が高まり、株式市場には追い風になりやすい。",
    related: ["hawkish", "fomc"],
    important: true,
  },
  {
    slug: "qe",
    term: "量的緩和（QE）",
    term_en: "Quantitative Easing",
    category: "金融政策",
    short: "中央銀行が資産を購入して市場に資金を供給する政策",
    description:
      "中央銀行が国債や社債などを市場から購入することで、大量の資金を市場に供給する非伝統的な金融政策。政策金利がゼロ下限に達した場合の追加緩和手段として使われる。リーマンショック後に米国・日本・欧州が大規模なQEを実施。",
    related: ["qt", "tapering"],
    important: true,
  },
  {
    slug: "qt",
    term: "量的引き締め（QT）",
    term_en: "Quantitative Tightening",
    category: "金融政策",
    short: "中央銀行が保有資産を縮小して市場から資金を回収する政策",
    description:
      "QE（量的緩和）の逆。中央銀行が保有する国債等を売却・満期償還しても再投資せず、バランスシートを縮小することで市場から資金を吸収する。インフレ抑制のための金融引き締め手段のひとつ。",
    related: ["qe", "tapering"],
    important: false,
  },
  {
    slug: "tapering",
    term: "テーパリング",
    term_en: "Tapering",
    category: "金融政策",
    short: "量的緩和の規模を段階的に縮小すること",
    description:
      "中央銀行が毎月の資産購入額を段階的に減らしていくこと。QE（量的緩和）の終了に向けた移行プロセス。2013年にFRBがテーパリングを示唆した際に新興国市場が急落した「テーパー・タントラム」が有名。",
    related: ["qe", "qt"],
    important: false,
  },
  {
    slug: "ycc",
    term: "イールドカーブ・コントロール（YCC）",
    term_en: "Yield Curve Control",
    category: "金融政策",
    short: "日銀が長期金利を特定水準に誘導した政策",
    description:
      "日本銀行が2016年に導入した金融政策。10年国債利回りをゼロ%程度に誘導・固定することで長短金利を制御した。2024年に廃止。YCCの修正・廃止観測が出るたびに円高・日本国債市場が大きく動いた。",
    related: ["boj"],
    important: true,
  },
  {
    slug: "boj",
    term: "日銀（日本銀行）",
    term_en: "Bank of Japan / BOJ",
    category: "金融政策",
    short: "日本の中央銀行",
    description:
      "日本の金融政策を担う中央銀行。政策金利の設定・国債の売買・物価安定目標（2%）の達成が主な役割。年8回の「金融政策決定会合」で政策を決定する。植田和男総裁のもと2024年にマイナス金利・YCCを解除し、利上げサイクルに入った。",
    related: ["ycc", "hawkish"],
    important: true,
  },

  // ─── マクロ経済 ───────────────────────────────
  {
    slug: "cpi",
    term: "CPI（消費者物価指数）",
    term_en: "Consumer Price Index",
    category: "マクロ経済",
    short: "消費者が購入する物価の変動を示す指標",
    description:
      "家庭が購入する財・サービスの価格変動を測る代表的なインフレ指標。毎月発表され、中央銀行の金融政策に直接影響する。コアCPI（食品・エネルギーを除く）がより注目される場合も多い。",
    related: ["pce", "ff-rate"],
    important: true,
  },
  {
    slug: "pce",
    term: "PCE（個人消費支出デフレーター）",
    term_en: "Personal Consumption Expenditures",
    category: "マクロ経済",
    short: "FRBが最重視するインフレ指標",
    description:
      "FRBがインフレ目標（2%）の達成を判断する際に最も重視する物価指標。CPIより広範な品目をカバーし、消費者の代替行動も反映する。毎月末に発表される。",
    related: ["cpi", "fomc"],
    important: true,
  },
  {
    slug: "nfp",
    term: "非農業部門雇用者数（NFP）",
    term_en: "Non-Farm Payrolls",
    category: "マクロ経済",
    short: "米国の月間雇用者数の増減",
    description:
      "毎月第一金曜日に発表される米国雇用統計の中心指標。農業部門を除く雇用者数の増減を示す。予想との乖離が大きいほど為替・株式市場への影響が大きく、「最も重要な経済指標」のひとつとされる。",
    related: ["cpi", "ff-rate"],
    important: true,
  },
  {
    slug: "risk-off",
    term: "リスクオフ",
    term_en: "Risk-off",
    category: "マクロ経済",
    short: "投資家が安全資産に資金を移す動き",
    description:
      "地政学リスク・景気後退懸念・市場の不確実性が高まった際に、投資家が株式等のリスク資産を売って国債・円・金などの安全資産に資金を移す動き。円高・株安・金高が同時に起きやすい。",
    related: ["risk-on"],
    important: true,
  },
  {
    slug: "risk-on",
    term: "リスクオン",
    term_en: "Risk-on",
    category: "マクロ経済",
    short: "投資家がリスク資産を積極的に買う局面",
    description:
      "景気回復期待・金融緩和・市場の安定時に、投資家がリスク資産（株式・新興国通貨等）を積極的に買う局面。株高・円安・コモディティ高が同時に起きやすい。",
    related: ["risk-off"],
    important: false,
  },
  {
    slug: "stagflation",
    term: "スタグフレーション",
    term_en: "Stagflation",
    category: "マクロ経済",
    short: "景気後退とインフレが同時進行する最悪の状態",
    description:
      "景気停滞（Stagnation）とインフレ（Inflation）の合成語。通常、景気後退時はインフレが落ち着くが、スタグフレーションではどちらも悪化する。利上げも利下げもしにくい中央銀行にとって最難関の局面。1970年代の石油危機で有名。",
    important: false,
  },

  // ─── 市場・取引 ───────────────────────────────
  {
    slug: "nikkei",
    term: "日経平均株価（日経225）",
    term_en: "Nikkei 225",
    category: "市場・取引",
    short: "日本の代表的な株価指数",
    description:
      "東京証券取引所プライム市場に上場する225銘柄の株価を平均した指数。1949年から算出される日本最古・最有名の株価指数。値嵩株（株価が高い銘柄）の影響を受けやすいという特性がある。",
    related: ["topix"],
    important: true,
  },
  {
    slug: "topix",
    term: "TOPIX（東証株価指数）",
    term_en: "Tokyo Stock Price Index",
    category: "市場・取引",
    short: "東証プライム全銘柄の時価総額加重平均指数",
    description:
      "東京証券取引所プライム市場の全上場銘柄を対象とした時価総額加重平均指数。時価総額が大きい銘柄ほど指数に与える影響が大きい。機関投資家のベンチマークとして日経平均より重視されることが多い。",
    related: ["nikkei"],
    important: true,
  },
  {
    slug: "circuit-breaker",
    term: "サーキットブレーカー",
    term_en: "Circuit Breaker",
    category: "市場・取引",
    short: "急激な相場変動時に取引を一時停止する仕組み",
    description:
      "株式市場や先物市場において、相場が急激に変動した場合に取引を一時停止する制度。パニック売りによる相場崩壊を防ぐための安全弁。2024年8月の急落時に先物でサーキットブレーカーが発動した。",
    important: false,
  },
  {
    slug: "short-selling",
    term: "空売り（ショート）",
    term_en: "Short Selling",
    category: "市場・取引",
    short: "株を借りて売り、後で安く買い戻して利益を得る手法",
    description:
      "保有していない株式を証券会社から借りて売却し、後で価格が下落したら買い戻して返却することで差益を得る取引手法。株価下落局面で利益を狙える。空売り残（ショートインタレスト）が多い銘柄は「踏み上げ」リスクがある。",
    important: false,
  },
];

// カテゴリ一覧
export const glossaryCategories: GlossaryCategory[] = [
  "株式基礎",
  "決算・財務",
  "金融政策",
  "マクロ経済",
  "市場・取引",
];

// financial-terms.ts 互換用ヘルパー（FinancialTermTooltip 用）
export const financialTerms: Record<
  string,
  { ja: string; description: string }
> = {
  "Quantitative Tightening": {
    ja: "量的引き締め（QT）",
    description:
      "中央銀行が保有資産を削減し、市場の資金を吸収する政策",
  },
  "Quantitative Easing": {
    ja: "量的緩和（QE）",
    description:
      "中央銀行が資産を購入し、市場に資金を供給する政策",
  },
  "Dot Plot": {
    ja: "ドットプロット",
    description:
      "FOMC参加者が予想する将来の政策金利水準を点で示したグラフ",
  },
  "Yield Curve Control": {
    ja: "イールドカーブ・コントロール（YCC）",
    description:
      "日本銀行が長期金利を特定の水準に誘導する政策（2016〜2024年実施）",
  },
  "Federal Funds Rate": {
    ja: "FF金利（フェデラルファンズレート）",
    description:
      "米国の政策金利。FRBが誘導目標を設定する短期金利",
  },
  Hawkish: {
    ja: "タカ派（hawkish）",
    description: "インフレ抑制を優先し利上げに積極的な姿勢",
  },
  Dovish: {
    ja: "ハト派（dovish）",
    description: "景気支援を優先し利下げ・緩和に積極的な姿勢",
  },
  Tapering: {
    ja: "テーパリング",
    description:
      "中央銀行が量的緩和の規模を段階的に縮小していくこと",
  },
  "Forward Guidance": {
    ja: "フォワードガイダンス",
    description:
      "中央銀行が将来の金融政策の方向性を事前に市場に示すこと",
  },
  PCE: {
    ja: "PCE（個人消費支出）",
    description:
      "FRBが最重視するインフレ指標。CPIより広範な物価動向を示す",
  },
  CPI: {
    ja: "CPI（消費者物価指数）",
    description:
      "消費者が購入する財・サービスの価格変動を示す代表的なインフレ指標",
  },
  "Non-Farm Payrolls": {
    ja: "非農業部門雇用者数（NFP）",
    description:
      "毎月第一金曜発表の米雇用統計。市場への影響が最大級の経済指標",
  },
  Beat: {
    ja: "BEAT（市場予想上回り）",
    description: "企業の決算が市場コンセンサス予想を上回ったこと",
  },
  Miss: {
    ja: "MISS（市場予想下回り）",
    description: "企業の決算が市場コンセンサス予想を下回ったこと",
  },
  EPS: {
    ja: "EPS（1株当たり利益）",
    description:
      "純利益を発行済み株式数で割った値。決算の重要指標",
  },
  "P/E Ratio": {
    ja: "PER（株価収益率）",
    description:
      "株価が1株利益の何倍かを示す割安・割高の判断指標",
  },
  "Yield Spread": {
    ja: "イールドスプレッド",
    description:
      "異なる債券間の利回り差。リスク度合いや市場の緊張感を示す",
  },
  "Risk-off": {
    ja: "リスクオフ",
    description:
      "投資家が株式等のリスク資産を売り、安全資産（国債・円・金）に資金を移す動き",
  },
  "Risk-on": {
    ja: "リスクオン",
    description:
      "投資家がリスク資産（株式・新興国通貨等）を積極的に買う局面",
  },
  Stagflation: {
    ja: "スタグフレーション",
    description:
      "景気後退（Stagnation）とインフレ（Inflation）が同時進行する最悪の経済状態",
  },
};
