import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "トークンが必要です。" },
        { status: 400 }
      );
    }

    // Decode token (base64-encoded email)
    let email: string;
    try {
      email = Buffer.from(token, "base64").toString("utf-8");
    } catch {
      return NextResponse.json(
        { success: false, error: "無効なトークンです。" },
        { status: 400 }
      );
    }

    // Validate that the decoded value looks like an email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "無効なトークンです。" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { error } = await supabase
      .from("newsletter_subs")
      .update({ confirmed: true })
      .eq("email", email);

    if (error) {
      return NextResponse.json(
        { success: false, error: "確認処理に失敗しました。" },
        { status: 500 }
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://kabulens.jp";
    return NextResponse.redirect(
      `${siteUrl}/newsletter?confirmed=true`
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
