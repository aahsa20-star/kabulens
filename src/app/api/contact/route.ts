import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactRequestBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  _hp?: string;
}

function buildHtmlBody(name: string, email: string, subject: string, message: string): string {
  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedSubject = escapeHtml(subject);
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br>");

  return `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,'Hiragino Sans',sans-serif;background-color:#f4f4f7;color:#333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color:#0D2137;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">Kabu Lens - お問い合わせ</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 24px;font-size:14px;color:#666;">ウェブサイトからお問い合わせがありました。</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eee;color:#888;width:100px;vertical-align:top;">お名前</td>
                  <td style="padding:12px 0;border-bottom:1px solid #eee;">${escapedName}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eee;color:#888;vertical-align:top;">メール</td>
                  <td style="padding:12px 0;border-bottom:1px solid #eee;">
                    <a href="mailto:${escapedEmail}" style="color:#0D2137;">${escapedEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eee;color:#888;vertical-align:top;">件名</td>
                  <td style="padding:12px 0;border-bottom:1px solid #eee;">${escapedSubject}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;color:#888;vertical-align:top;">内容</td>
                  <td style="padding:12px 0;line-height:1.7;">${escapedMessage}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f9f9fb;padding:16px 32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#aaa;">&copy; Kabu Lens - kabulens.jp</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendEmail(name: string, email: string, subject: string, message: string): Promise<void> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.log("[Contact] RESEND_API_KEY not set. Logging contact submission:");
    console.log(`[Contact] Name: ${name}`);
    console.log(`[Contact] Email: ${email}`);
    console.log(`[Contact] Subject: ${subject}`);
    console.log(`[Contact] Message: ${message}`);
    return;
  }

  const html = buildHtmlBody(name, email, subject, message);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Kabu Lens <noreply@kabulens.jp>",
      to: "akiissamurai@gmail.com",
      subject: `[お問い合わせ] ${subject} - ${name}様`,
      html,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend API error (${response.status}): ${errorBody}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequestBody = await request.json();
    const { name, email, subject, message, _hp } = body;

    // Honeypot spam trap: if filled, silently accept
    if (_hp) {
      return NextResponse.json(
        { success: true, message: "お問い合わせを受け付けました。" },
        { status: 200 }
      );
    }

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "お名前は必須です。" },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { success: false, message: "メールアドレスは必須です。" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "有効なメールアドレスを入力してください。" },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, message: "お問い合わせ内容は必須です。" },
        { status: 400 }
      );
    }

    const sanitizedSubject = subject?.trim() || "お問い合わせ";

    await sendEmail(name.trim(), email.trim(), sanitizedSubject, message.trim());

    return NextResponse.json(
      { success: true, message: "お問い合わせを受け付けました。" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact] Error processing contact form:", error);

    return NextResponse.json(
      { success: false, message: "送信中にエラーが発生しました。時間をおいて再度お試しください。" },
      { status: 500 }
    );
  }
}
