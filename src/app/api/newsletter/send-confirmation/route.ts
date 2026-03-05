import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "メールアドレスが必要です。" },
        { status: 400 }
      );
    }

    const token = Buffer.from(email).toString("base64");
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://kabulens.jp";
    const confirmationUrl = `${siteUrl}/api/newsletter/confirm?token=${token}`;

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      const htmlBody = `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color:#0D2137;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:1px;">Kabu Lens</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#333333;">
                メルマガ登録ありがとうございます。
              </p>
              <p style="margin:0 0 32px;font-size:16px;line-height:1.6;color:#333333;">
                以下のボタンをクリックして、登録を確認してください。
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td align="center" style="background-color:#2E86C1;border-radius:6px;">
                    <a href="${confirmationUrl}" target="_blank" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;">
                      メルマガ登録を確認する
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #eeeeee;">
              <p style="margin:0;font-size:13px;line-height:1.5;color:#999999;text-align:center;">
                このメールに心当たりがない場合は無視してください。
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Kabu Lens <noreply@kabulens.jp>",
          to: email,
          subject: "Kabu Lens メルマガ登録の確認",
          html: htmlBody,
        }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        console.error("Resend API error:", errorData);
        return NextResponse.json(
          { success: false, error: "確認メールの送信に失敗しました。" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    }

    // RESEND_API_KEY is not set — log and return success
    console.log(
      `[newsletter] RESEND_API_KEY not set. Confirmation URL for ${email}: ${confirmationUrl}`
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "リクエストの形式が正しくありません。" },
        { status: 400 }
      );
    }

    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[newsletter] send-confirmation error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
