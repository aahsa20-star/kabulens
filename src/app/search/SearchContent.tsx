"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  TrendingUp,
  Newspaper,
  PenLine,
  Command,
  ExternalLink,
  Clock,
} from "lucide-react";

type SearchResult = {
  id: number;
  title: string;
  description: string;
  url: string;
  meta?: string;
};

type SearchResultGroup = {
  type: string;
  icon: React.ReactNode;
  results: SearchResult[];
};

const mockResultGroups: SearchResultGroup[] = [
  {
    type: "銘柄",
    icon: <TrendingUp className="h-4 w-4" />,
    results: [
      {
        id: 1,
        title: "トヨタ自動車（7203）",
        description: "東証プライム / 自動車 / 時価総額 42.8兆円",
        url: "/stocks/7203",
        meta: "2,847.5 円 (+1.2%)",
      },
      {
        id: 2,
        title: "ソニーグループ（6758）",
        description: "東証プライム / 電気機器 / 時価総額 18.2兆円",
        url: "/stocks/6758",
        meta: "14,825 円 (-0.3%)",
      },
      {
        id: 3,
        title: "任天堂（7974）",
        description: "東証プライム / その他製品 / 時価総額 10.1兆円",
        url: "/stocks/7974",
        meta: "8,234 円 (+0.8%)",
      },
    ],
  },
  {
    type: "ニュース",
    icon: <Newspaper className="h-4 w-4" />,
    results: [
      {
        id: 4,
        title: "日銀、次回会合で追加利上げの可能性を示唆",
        description:
          "植田総裁は定例記者会見で、経済・物価の見通しが実現していけば引き続き政策金利を引き上げる方針を改めて示した。",
        url: "/news",
        meta: "32分前",
      },
      {
        id: 5,
        title: "トヨタ自動車、通期営業利益が過去最高を更新",
        description:
          "2026年3月期の連結営業利益が前期比12%増の6兆2,000億円となり過去最高を更新したと発表。",
        url: "/news",
        meta: "1時間前",
      },
    ],
  },
  {
    type: "コラム",
    icon: <PenLine className="h-4 w-4" />,
    results: [
      {
        id: 6,
        title: "2026年の半導体セクター展望：AI需要の持続性を検証する",
        description:
          "生成AI関連の設備投資は2025年に大幅増加したが、2026年もその勢いは続くのか。主要企業の決算から読み解く。",
        url: "/column/semiconductor-outlook-2026",
        meta: "田中太郎",
      },
      {
        id: 7,
        title: "新NISA2年目のポートフォリオ戦略",
        description:
          "成長投資枠とつみたて投資枠の使い分けから、リバランスのタイミングまで実践的に解説。",
        url: "/column/nisa-portfolio-strategy",
        meta: "鈴木花子",
      },
    ],
  },
];

export default function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
    setSearchQuery(q);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  const hasResults = searchQuery.length > 0;

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20">
      <div className="py-6">
        <form onSubmit={handleSubmit} className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="銘柄名・ティッカー・キーワードで検索"
            autoFocus
            className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-gray-200 bg-white text-navy text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors shadow-sm"
          />
        </form>

        <p className="mt-3 text-xs text-gray-400 flex items-center gap-1">
          <Command className="h-3 w-3" />
          <span>
            <kbd className="inline-flex items-center gap-0.5 rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-[10px] font-mono text-gray-500">
              <span className="text-xs">&#8984;</span>K
            </kbd>{" "}
            でいつでも検索を開けます
          </span>
        </p>
      </div>

      {!hasResults ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Search className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-lg font-semibold text-navy mb-1">
            検索キーワードを入力してください
          </p>
          <p className="text-sm text-gray-500">
            銘柄コード、企業名、ニュースキーワードなどで検索できます
          </p>
        </div>
      ) : (
        <div className="pb-12 space-y-8 max-w-2xl">
          <p className="text-sm text-gray-500">
            「<span className="font-semibold text-navy">{searchQuery}</span>
            」の検索結果
          </p>

          {mockResultGroups.map((group) => (
            <div key={group.type}>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
                <span className="text-accent">{group.icon}</span>
                <h2 className="text-sm font-bold text-navy">{group.type}</h2>
                <span className="text-xs text-gray-400">
                  ({group.results.length}件)
                </span>
              </div>

              <div className="space-y-1">
                {group.results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    className="flex items-start justify-between gap-4 px-4 py-3 rounded-lg hover:bg-white hover:shadow-sm transition-all group"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-navy group-hover:text-accent transition-colors">
                        {result.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        {result.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {result.meta && (
                        <span
                          className={`text-xs font-medium num ${
                            group.type === "銘柄"
                              ? result.meta.includes("+")
                                ? "text-up"
                                : "text-down"
                              : "text-gray-400"
                          }`}
                        >
                          {group.type === "ニュース" && (
                            <Clock className="inline h-3 w-3 mr-0.5" />
                          )}
                          {result.meta}
                        </span>
                      )}
                      <ExternalLink className="h-3.5 w-3.5 text-gray-300 group-hover:text-accent transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
