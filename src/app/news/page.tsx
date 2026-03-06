import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { createServerClient } from "@/lib/supabase";
import NewsPageClient from "@/components/news/NewsPageClient";
import type { NewsArticle } from "@/components/news/NewsPageClient";

export const revalidate = 300;

async function fetchArticles(): Promise<NewsArticle[]> {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("news_articles")
    .select(
      "id, title, title_ja, summary, source, url, category, importance, published_at"
    )
    .eq("is_validated", true)
    .not("summary", "is", null)
    .order("published_at", { ascending: false })
    .limit(100);

  return data || [];
}

export default async function NewsPage() {
  const articles = await fetchArticles();

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-accent transition-colors">
          ホーム
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy font-medium">ニュース</span>
      </nav>

      {/* Page heading */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-6 w-6 text-accent" />
        <h1 className="text-2xl font-bold text-navy">ニュース</h1>
      </div>

      {/* Client-side filterable content */}
      <NewsPageClient articles={articles} />
    </div>
  );
}
