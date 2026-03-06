import Link from "next/link";
import { ChevronRight, Layers, ExternalLink, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { THEMES } from "../page";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return THEMES.map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const theme = THEMES.find((t) => t.slug === slug);
  if (!theme) return {};
  return {
    title: `${theme.name}関連銘柄 | テーマ株 | Kabu Lens`,
    description: theme.description,
  };
}

export default async function ThemeDetailPage({ params }: Props) {
  const { slug } = await params;
  const theme = THEMES.find((t) => t.slug === slug);

  if (!theme) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-accent transition-colors">
          ホーム
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/themes" className="hover:text-accent transition-colors">
          テーマ株
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy font-medium">{theme.name}</span>
      </nav>

      {/* Page heading */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`h-10 w-10 rounded-lg ${theme.bgColor} flex items-center justify-center text-xl`}
        >
          {theme.icon}
        </div>
        <h1 className="text-2xl font-bold text-navy">{theme.name}関連銘柄</h1>
      </div>
      <p className="text-sm text-gray-500 mb-8 max-w-2xl">{theme.description}</p>

      {/* Stocks table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">
                  コード
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">
                  銘柄名
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 hidden sm:table-cell">
                  概要
                </th>
                <th className="text-right text-xs font-semibold text-gray-500 px-5 py-3">
                  詳細
                </th>
              </tr>
            </thead>
            <tbody>
              {theme.stocks.map((stock, i) => (
                <tr
                  key={stock.ticker}
                  className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
                    i === theme.stocks.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-5 py-4">
                    <span className="num text-sm font-semibold text-navy">
                      {stock.ticker}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/stocks/${stock.ticker}`}
                      className="text-sm font-medium text-navy hover:text-accent transition-colors"
                    >
                      {stock.name}
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5 sm:hidden">
                      {stock.description}
                    </p>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-xs text-gray-500">
                      {stock.description}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/stocks/${stock.ticker}`}
                      className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-light font-medium transition-colors"
                    >
                      銘柄情報
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Other themes */}
      <div className="mb-6">
        <h2 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
          <Layers className="h-4 w-4 text-accent" />
          その他のテーマ
        </h2>
        <div className="flex flex-wrap gap-2">
          {THEMES.filter((t) => t.slug !== slug).map((t) => (
            <Link
              key={t.slug}
              href={`/themes/${t.slug}`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white rounded-lg border border-gray-200 text-gray-600 hover:text-accent hover:border-accent/30 transition-colors"
            >
              <span>{t.icon}</span>
              {t.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Back link */}
      <Link
        href="/themes"
        className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-light transition-colors font-medium"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        テーマ株一覧に戻る
      </Link>
    </div>
  );
}
