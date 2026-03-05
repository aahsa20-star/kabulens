import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import WatchlistClient from "./WatchlistClient";

export const metadata = {
  title: "お気に入り銘柄",
};

export default async function WatchlistPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: watchlist } = await supabase
    .from("watchlists")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-accent transition-colors">
          ホーム
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/dashboard" className="hover:text-accent transition-colors">
          マイページ
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy font-medium">お気に入り銘柄</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
          <Star className="h-6 w-6 text-accent" />
          お気に入り銘柄
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          ウォッチリストに追加した銘柄を管理
        </p>
      </div>

      <WatchlistClient initialData={watchlist || []} userId={user.id} />
    </div>
  );
}
