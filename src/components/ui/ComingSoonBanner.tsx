import { Clock } from "lucide-react";

export default function ComingSoonBanner() {
  return (
    <div className="rounded-lg border-l-4 border-accent bg-[#EAF3FB] p-4 mb-6">
      <div className="flex items-start gap-3">
        <Clock className="h-5 w-5 text-accent mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold text-navy">コラム準備中</p>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            投資家・株YouTuberによる独自コラムを準備中です。公開までしばらくお待ちください。
          </p>
        </div>
      </div>
    </div>
  );
}
