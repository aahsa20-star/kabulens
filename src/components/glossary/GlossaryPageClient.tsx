"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, BookOpen } from "lucide-react";
import type { GlossaryTerm, GlossaryCategory } from "@/lib/glossary-terms";
import { glossaryCategories } from "@/lib/glossary-terms";

const CATEGORY_COLORS: Record<string, string> = {
  "株式基礎": "bg-blue-100 text-blue-800",
  "決算・財務": "bg-green-100 text-green-800",
  "金融政策": "bg-purple-100 text-purple-800",
  "マクロ経済": "bg-orange-100 text-orange-800",
  "テクニカル": "bg-pink-100 text-pink-800",
  "市場・取引": "bg-gray-100 text-gray-800",
};

export default function GlossaryPageClient({
  terms,
}: {
  terms: GlossaryTerm[];
}) {
  const [selected, setSelected] = useState<"すべて" | GlossaryCategory>(
    "すべて"
  );

  const filtered =
    selected === "すべて"
      ? terms
      : terms.filter((t) => t.category === selected);

  const importantTerms = terms.filter((t) => t.important);

  return (
    <>
      {/* Category filter */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
        <button
          onClick={() => setSelected("すべて")}
          className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
            selected === "すべて"
              ? "bg-accent text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:border-accent hover:text-accent"
          }`}
        >
          すべて
        </button>
        {glossaryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
              selected === cat
                ? "bg-accent text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Important terms horizontal scroll */}
      {selected === "すべて" && importantTerms.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
            <h2 className="text-base font-bold text-navy">
              新NISA始めるなら最初に覚えたい用語
            </h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {importantTerms.map((t) => (
              <Link
                key={t.slug}
                href={`/glossary/${t.slug}`}
                className="shrink-0 w-48 bg-amber-50 border border-amber-200 rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    CATEGORY_COLORS[t.category]
                  }`}
                >
                  {t.category}
                </span>
                <p className="mt-2 text-sm font-bold text-navy leading-snug">
                  {t.term}
                </p>
                <p className="mt-1 text-[11px] text-gray-500 line-clamp-2">
                  {t.short}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Term cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <Link
            key={t.slug}
            href={`/glossary/${t.slug}`}
            className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  CATEGORY_COLORS[t.category] ?? "bg-gray-100 text-gray-800"
                }`}
              >
                {t.category}
              </span>
              {t.important && (
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              )}
            </div>
            <h3 className="text-sm font-bold text-navy leading-snug mb-1">
              {t.term}
            </h3>
            {t.term_en && (
              <p className="text-[11px] text-gray-400 mb-2">{t.term_en}</p>
            )}
            <p className="text-xs text-gray-600 leading-relaxed">{t.short}</p>
            <div className="mt-3 flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
              <BookOpen className="h-3 w-3" />
              詳しく見る
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-gray-400">該当する用語がありません</p>
        </div>
      )}
    </>
  );
}
