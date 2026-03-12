import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  BookOpen,
  Star,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { glossaryTerms } from "@/lib/glossary-terms";
import type { Metadata } from "next";

const CATEGORY_COLORS: Record<string, string> = {
  "株式基礎": "bg-blue-100 text-blue-800",
  "決算・財務": "bg-green-100 text-green-800",
  "金融政策": "bg-purple-100 text-purple-800",
  "マクロ経済": "bg-orange-100 text-orange-800",
  "テクニカル": "bg-pink-100 text-pink-800",
  "市場・取引": "bg-gray-100 text-gray-800",
};

export function generateStaticParams() {
  return glossaryTerms.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = glossaryTerms.find((t) => t.slug === slug);
  if (!term) return { title: "用語が見つかりません | Kabu Lens" };
  return {
    title: `${term.term}とは？ | 金融用語集 | Kabu Lens`,
    description: term.description.slice(0, 120),
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = glossaryTerms.find((t) => t.slug === slug);
  if (!term) notFound();

  const relatedTerms = term.related
    ? term.related
        .map((r) => glossaryTerms.find((t) => t.slug === r))
        .filter(Boolean)
    : [];

  return (
    <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-accent transition-colors">
          ホーム
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/glossary" className="hover:text-accent transition-colors">
          用語集
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy font-medium">{term.term}</span>
      </nav>

      {/* Hero */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              CATEGORY_COLORS[term.category] ?? "bg-gray-100 text-gray-800"
            }`}
          >
            {term.category}
          </span>
          {term.important && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              重要用語
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy leading-tight mb-1">
          {term.term}
        </h1>
        {term.term_en && (
          <p className="text-sm text-gray-400">{term.term_en}</p>
        )}
      </div>

      {/* Short description */}
      <p className="text-lg text-navy font-medium mb-6 leading-relaxed">
        {term.short}
      </p>

      {/* Detailed description */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="flex items-center gap-2 text-sm font-bold text-navy mb-3">
          <BookOpen className="h-4 w-4 text-accent" />
          詳細説明
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {term.description}
        </p>
      </div>

      {/* Example */}
      {term.example && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-sm font-bold text-navy mb-3">具体例</h2>
          <p className="text-sm text-gray-700 font-mono">{term.example}</p>
        </div>
      )}

      {/* Related terms */}
      {relatedTerms.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold text-navy mb-4">関連用語</h2>
          <div className="flex flex-wrap gap-3">
            {relatedTerms.map((r) =>
              r ? (
                <Link
                  key={r.slug}
                  href={`/glossary/${r.slug}`}
                  className="flex items-center gap-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow px-4 py-3"
                >
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      CATEGORY_COLORS[r.category] ??
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {r.category}
                  </span>
                  <span className="text-sm font-medium text-navy">
                    {r.term}
                  </span>
                  <ArrowRight className="h-3 w-3 text-accent" />
                </Link>
              ) : null
            )}
          </div>
        </section>
      )}

      {/* Affiliate: 松井証券 iDeCo */}
      <div className="bg-gray-50 rounded-lg p-5 mb-8">
        <h3 className="text-sm font-bold text-navy mb-2">iDeCoで資産運用を始めたい方へ</h3>
        <p className="text-xs text-gray-600 leading-relaxed mb-3">
          iDeCo（個人型確定拠出年金）は、掛金が全額所得控除になるなど税制面で大きなメリットがあります。将来の資産形成の第一歩として検討してみてください。
        </p>
        <p className="text-sm">
          <a href="https://px.a8.net/svt/ejp?a8mat=4AZAW2+AWCOFM+3XCC+BXIYQ" rel="nofollow" className="text-accent hover:underline font-medium">松井証券ではじめるiDeCo</a>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=4AZAW2+AWCOFM+3XCC+BXIYQ" alt="" />
        </p>
        <p className="text-[10px] text-gray-400 mt-2">※広告</p>
      </div>

      {/* Back link */}
      <Link
        href="/glossary"
        className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-light transition-colors font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        用語集に戻る
      </Link>
    </div>
  );
}
