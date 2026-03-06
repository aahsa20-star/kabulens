import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
import { glossaryTerms } from "@/lib/glossary-terms";
import GlossaryPageClient from "@/components/glossary/GlossaryPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "金融用語集 | 株式投資の基礎用語をわかりやすく解説 | Kabu Lens",
  description:
    "PER・EPS・FOMC・テーパリング等、株式投資・金融市場でよく使う用語を初心者向けにわかりやすく解説。",
};

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-accent transition-colors">
          ホーム
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy font-medium">用語集</span>
      </nav>

      {/* Heading */}
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="h-6 w-6 text-accent" />
        <h1 className="text-2xl font-bold text-navy">用語集</h1>
      </div>
      <p className="text-sm text-gray-500 mb-8">
        株式投資・金融市場の用語をわかりやすく解説
      </p>

      <GlossaryPageClient terms={glossaryTerms} />
    </div>
  );
}
