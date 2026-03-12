import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowLeft,
  Tag,
} from "lucide-react";
import { articlesMap, articleTitles } from "@/lib/column-data";
import ShareButtons from "@/components/column/ShareButtons";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesMap[slug];
  if (!article) return {};

  // First 100 chars of body text (strip markdown markers)
  const plainText = article.body
    .replace(/^##?\s+.*/gm, "")
    .replace(/\*\*/g, "")
    .replace(/^\* /gm, "")
    .replace(/^- /gm, "")
    .replace(/\n+/g, " ")
    .trim();
  const description = plainText.slice(0, 100) + (plainText.length > 100 ? "..." : "");

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      publishedTime: article.date.replace(/\//g, "-"),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
    },
  };
}

function renderInline(text: string): React.ReactNode[] {
  // Split by bold and markdown links
  const tokens = text.split(/(\*\*.*?\*\*|\[.*?\]\(https?:\/\/.*?\))/);
  return tokens.map((token, i) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={i} className="font-bold text-navy">{token.slice(2, -2)}</strong>;
    }
    const linkMatch = token.match(/^\[(.+?)\]\((https?:\/\/.+?)\)$/);
    if (linkMatch) {
      const isInternal = linkMatch[2].includes("kabulens.jp");
      return (
        <a
          key={i}
          href={linkMatch[2]}
          {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className="text-accent hover:underline"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return <span key={i}>{token}</span>;
  });
}

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
    } else if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const items: string[] = [trimmed.slice(2)];
      const startIdx = lines.indexOf(line);
      let nextIdx = startIdx + 1;
      while (nextIdx < lines.length) {
        const nextLine = lines[nextIdx].trim();
        if (nextLine.startsWith("* ") || nextLine.startsWith("- ")) {
          items.push(nextLine.slice(2));
          lines[nextIdx] = "";
          nextIdx++;
        } else {
          break;
        }
      }
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1.5 my-3 pl-1">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-gray-700 leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
    } else if (/^https:\/\/www\.youtube\.com\/embed\/[\w-]+$/.test(trimmed)) {
      elements.push(
        <div key={key++} className="my-4 w-full">
          <div className="relative w-full overflow-hidden rounded-lg shadow-sm" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src={trimmed}
              title="YouTube動画"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      );
    } else if (/^\[.+\]\(https?:\/\/.+\)$/.test(trimmed)) {
      const match = trimmed.match(/^\[(.+)\]\((https?:\/\/.+)\)$/);
      if (match) {
        elements.push(
          <p key={key++} className="text-sm">
            <a
              href={match[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-accent transition-colors"
            >
              {match[1]}
            </a>
          </p>
        );
      }
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      elements.push(
        <p key={key++} className="text-sm font-bold text-navy mt-3 mb-1">
          {trimmed.slice(2, -2)}
        </p>
      );
    } else {
      elements.push(
        <p key={key++} className="text-sm text-gray-700 leading-relaxed">
          {renderInline(trimmed)}
        </p>
      );
    }
  }
  return elements;
}

export default async function ColumnDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = articlesMap[slug];

  if (!article) {
    notFound();
  }

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
          {article.tickers.length > 0 && (
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
          )}

          {/* Share buttons (client component) */}
          <ShareButtons title={article.title} />

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

        {/* Sidebar: Author info */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h3 className="text-sm font-bold text-navy mb-4">この記事の著者</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-white">K</span>
              </div>
              <div>
                <p className="text-base font-bold text-navy">Kabu Lens 編集部</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              日本株・マクロ経済・決算情報をわかりやすく解説。新NISA世代の個人投資家に向けて、投資判断に必要な情報を提供します。
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
