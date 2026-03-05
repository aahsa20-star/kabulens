"use client";

import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[600px] px-4 pt-32 pb-20 text-center">
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-lightgray p-6">
          <Search className="h-12 w-12 text-gray-300" />
        </div>
      </div>

      <p className="num text-6xl font-bold text-navy/20 mb-2">404</p>
      <h1 className="text-xl font-bold text-navy mb-3">
        ページが見つかりません
      </h1>
      <p className="text-sm text-gray-500 mb-8 leading-relaxed">
        お探しのページは移動または削除された可能性があります。
        <br />
        URLをご確認のうえ、再度お試しください。
      </p>

      <div className="flex items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-light transition-colors"
        >
          <Home className="h-4 w-4" />
          トップへ戻る
        </Link>
        <button
          onClick={() => history.back()}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-navy hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          前のページ
        </button>
      </div>
    </div>
  );
}
