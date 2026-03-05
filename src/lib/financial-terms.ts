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
