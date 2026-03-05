"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <div className="text-center py-20 max-w-md mx-auto">
        <AlertTriangle className="h-12 w-12 text-down mx-auto mb-4" />
        <h1 className="text-xl font-bold text-navy mb-2">
          ページの読み込みに失敗しました
        </h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          一時的なエラーが発生しました。再試行するか、トップページへお戻りください。
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-light text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            再試行
          </button>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-sm font-medium text-navy rounded-lg hover:border-gray-400 transition-colors"
          >
            <Home className="h-4 w-4" />
            トップへ戻る
          </button>
        </div>
      </div>
    </div>
  );
}
