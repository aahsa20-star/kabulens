import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";

type StanceType = "hawkish" | "dovish" | "neutral";

type MacroCard = {
  id: string;
  title: string;
  headerIcon: string;
  details: {
    label: string;
    value: string;
    isNumber?: boolean;
  }[];
  stance: {
    type: StanceType;
    label: string;
  };
  nextEvent: {
    label: string;
    date: string;
  };
};

const STANCE_STYLES: Record<StanceType, { bg: string; text: string }> = {
  hawkish: { bg: "bg-down-bg", text: "text-down" },
  dovish: { bg: "bg-up-bg", text: "text-up" },
  neutral: { bg: "bg-gray-100", text: "text-gray-600" },
};

const mockMacroData: MacroCard[] = [
  {
    id: "frb",
    title: "FRB",
    headerIcon: "🇺🇸",
    details: [
      { label: "政策金利", value: "4.25-4.50%", isNumber: true },
      { label: "前回決定", value: "据え置き" },
    ],
    stance: { type: "hawkish", label: "タカ派" },
    nextEvent: { label: "次回FOMC", date: "2026/03/18-19" },
  },
  {
    id: "boj",
    title: "日銀",
    headerIcon: "🇯🇵",
    details: [
      { label: "政策金利", value: "0.50%", isNumber: true },
      { label: "前回決定", value: "利上げ (+0.25%)" },
    ],
    stance: { type: "hawkish", label: "タカ派寄り" },
    nextEvent: { label: "次回会合", date: "2026/03/13-14" },
  },
  {
    id: "fx",
    title: "為替",
    headerIcon: "💱",
    details: [
      { label: "USD/JPY", value: "150.42", isNumber: true },
      { label: "前日比", value: "-0.83 (-0.55%)", isNumber: true },
    ],
    stance: { type: "dovish", label: "円高傾向" },
    nextEvent: { label: "注目イベント", date: "米雇用統計 3/7" },
  },
];

function StanceIndicator({ stance }: { stance: MacroCard["stance"] }) {
  const styles = STANCE_STYLES[stance.type];
  const Icon =
    stance.type === "hawkish"
      ? TrendingUp
      : stance.type === "dovish"
        ? TrendingDown
        : Minus;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${styles.bg} ${styles.text}`}
    >
      <Icon className="h-3 w-3" />
      {stance.label}
    </span>
  );
}

export default function MacroSummary() {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-navy">マクロ経済</h2>
        <Link
          href="/macro"
          className="text-sm text-accent hover:text-accent-light transition-colors font-medium"
        >
          詳しく見る &rarr;
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {mockMacroData.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            {/* Navy header */}
            <div className="bg-navy px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">{card.headerIcon}</span>
                <h3 className="text-sm font-bold text-white">{card.title}</h3>
              </div>
              <StanceIndicator stance={card.stance} />
            </div>

            {/* Body */}
            <div className="px-4 py-3">
              {card.details.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1.5"
                >
                  <span className="text-xs text-gray-500">{detail.label}</span>
                  <span
                    className={`text-sm font-semibold text-navy ${
                      detail.isNumber ? "num" : ""
                    }`}
                  >
                    {detail.value}
                  </span>
                </div>
              ))}

              {/* Next event */}
              <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  {card.nextEvent.label}
                </span>
                <span className="text-xs font-medium text-navy flex items-center gap-1">
                  <ArrowRight className="h-3 w-3 text-accent" />
                  {card.nextEvent.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
