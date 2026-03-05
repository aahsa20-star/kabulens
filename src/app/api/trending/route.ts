import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export const revalidate = 300;

export async function GET() {
  const supabase = createServerClient();

  const { data: trending } = await supabase
    .from("trending_cache")
    .select("*")
    .order("score", { ascending: false });

  const google = (trending || []).filter((t) => t.type === "google");
  const internal = (trending || []).filter((t) => t.type === "internal");

  return NextResponse.json({ google, internal });
}
