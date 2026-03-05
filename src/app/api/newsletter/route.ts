import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email presence
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "メールアドレスを入力してください。" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Validate email format
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "有効なメールアドレスを入力してください。" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { error: insertError } = await supabase
      .from("newsletter_subs")
      .insert({ email: trimmedEmail });

    if (insertError) {
      // Handle unique constraint violation (already subscribed)
      if (
        insertError.code === "23505" ||
        insertError.message.includes("duplicate") ||
        insertError.message.includes("unique")
      ) {
        return NextResponse.json({
          success: true,
          message: "既に登録済みです。",
        });
      }

      return NextResponse.json(
        { success: false, error: "登録に失敗しました。後でもう一度お試しください。" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "ニュースレターに登録しました。",
    });
  } catch (error) {
    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "リクエストの形式が正しくありません。" },
        { status: 400 }
      );
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
