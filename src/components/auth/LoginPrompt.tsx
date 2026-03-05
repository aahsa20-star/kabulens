import Link from "next/link";
import { Lock } from "lucide-react";

export default function LoginPrompt() {
  return (
    <div className="mx-auto max-w-md px-4 pt-28 pb-20">
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-lightgray flex items-center justify-center mb-5">
          <Lock className="h-6 w-6 text-gray-400" />
        </div>
        <h1 className="text-xl font-bold text-navy mb-2">
          会員登録・ログインが必要です
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          無料登録でお気に入り銘柄・ポートフォリオ管理が使えます
        </p>
        <Link
          href="/login"
          className="inline-block w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-light transition-colors mb-3"
        >
          無料で登録する
        </Link>
        <Link
          href="/login"
          className="text-sm text-gray-400 hover:text-accent transition-colors"
        >
          ログインはこちら
        </Link>
      </div>
    </div>
  );
}
