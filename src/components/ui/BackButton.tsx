"use client";

import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <button
      onClick={() => history.back()}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-navy hover:bg-gray-50 transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      前のページ
    </button>
  );
}
