import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Briefcase } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import PortfolioClient from "./PortfolioClient";

export const metadata = {
  title: "ポートフォリオ",
};

export default async function PortfolioPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: holdings } = await supabase
    .from("portfolios")
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
        <span className="text-navy font-medium">ポートフォリオ</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-accent" />
          ポートフォリオ
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          保有銘柄・投資額を記録・管理
        </p>
      </div>

      <PortfolioClient initialData={holdings || []} userId={user.id} />
    </div>
  );
}
