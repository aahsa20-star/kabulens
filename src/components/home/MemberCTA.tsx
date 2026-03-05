import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MemberCTA() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6">
      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors group"
      >
        会員登録（無料）でお気に入り銘柄・ポートフォリオ管理が使えます
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}
