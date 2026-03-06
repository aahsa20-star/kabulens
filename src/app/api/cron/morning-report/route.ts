import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { sendPushToAll } from "@/lib/web-push";

export async function GET(request: Request) {
  // 1. Auth check: Bearer token must match CRON_SECRET
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerClient();

  // 2. Get important news from last 24 hours (importance >= 4, max 5)
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data: news } = await supabase
    .from("news_articles")
    .select("title, summary, source, url")
    .gte("importance", 4)
    .gte("created_at", since)
    .order("importance", { ascending: false })
    .limit(5);

  // 3. Get today's earnings schedule
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const { data: earnings } = await supabase
    .from("earnings")
    .select("company_name, ticker, period")
    .gte("announced_at", todayStart.toISOString())
    .lte("announced_at", todayEnd.toISOString());

  // 4. If no news and no earnings, skip
  if ((!news || news.length === 0) && (!earnings || earnings.length === 0)) {
    return NextResponse.json({ message: "No content for today's report", skipped: true });
  }

  // 5. Generate report with Claude API (Haiku)
  const newsListText = news?.map((n, i) => `${i + 1}. ${n.title}${n.summary ? ` - ${n.summary}` : ""}`).join("\n") || "なし";
  const earningsListText = earnings?.map(e => `- ${e.company_name || e.ticker}（${e.ticker}）${e.period || ""}`).join("\n") || "なし";

  let reportHtml = "";

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const prompt = `以下の情報をもとに、個人投資家向けの朝刊レポートを日本語で生成してください。

【本日の注目ニュース】
${newsListText}

【本日の決算予定】
${earningsListText}

形式：
- 冒頭に一言相場コメント（1文）
- ニュース3〜5本を箇条書きで要約
- 本日の決算予定リスト
- 末尾に「詳細はKabu Lensで → https://kabulens.jp」

投資推奨・株価予測は絶対に含めないこと。
文体は親しみやすく、でも情報密度は高く。
HTMLのbodyタグ内のコンテンツとして出力してください。見出しはh2、リストはulを使用。`;

      const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 2000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (aiRes.ok) {
        const aiData = await aiRes.json();
        reportHtml = aiData.content?.[0]?.text || "";
      }
    } catch (e) {
      console.error("AI generation failed:", e);
    }
  }

  // Fallback: simple HTML report if AI fails or no API key
  if (!reportHtml) {
    reportHtml = `<h2>本日の注目ニュース</h2><ul>${news?.map(n => `<li><strong>${n.title}</strong>${n.summary ? `<br/>${n.summary}` : ""}</li>`).join("") || "<li>本日の注目ニュースはありません</li>"}</ul><h2>本日の決算予定</h2><ul>${earnings?.map(e => `<li>${e.company_name || e.ticker}（${e.ticker}）</li>`).join("") || "<li>本日の決算予定はありません</li>"}</ul><p>詳細は<a href="https://kabulens.jp">Kabu Lens</a>で</p>`;
  }

  // 6. Get confirmed subscribers
  const { data: subscribers } = await supabase
    .from("newsletter_subs")
    .select("email")
    .eq("confirmed", true);

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({ message: "No confirmed subscribers", skipped: true });
  }

  // 7. Send via Resend
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ message: "RESEND_API_KEY not set", skipped: true });
  }

  const today = new Date().toLocaleDateString("ja-JP", { month: "long", day: "numeric" });
  const emailHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f5f7fa;font-family:'Helvetica Neue',Arial,sans-serif"><div style="max-width:600px;margin:0 auto;background:#ffffff"><div style="background:#0D2137;padding:24px 32px"><h1 style="margin:0;color:#ffffff;font-size:20px">Kabu Lens 朝刊レポート</h1><p style="margin:4px 0 0;color:rgba(255,255,255,0.6);font-size:13px">${today}</p></div><div style="padding:24px 32px;color:#0D2137;font-size:14px;line-height:1.8">${reportHtml}</div><div style="padding:16px 32px;border-top:1px solid #eee;text-align:center"><p style="margin:0;color:#999;font-size:11px">Kabu Lens | 株式市場を、もっとシャープに。</p></div></div></body></html>`;

  let sentCount = 0;
  const errors: string[] = [];

  // Send to each subscriber (batch of emails)
  for (const sub of subscribers) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Kabu Lens <noreply@kabulens.jp>",
          to: sub.email,
          subject: `【Kabu Lens】${today}の朝刊レポート`,
          html: emailHtml,
        }),
      });

      if (res.ok) {
        sentCount++;
      } else {
        const errData = await res.json();
        errors.push(`${sub.email}: ${errData.message || res.statusText}`);
      }
    } catch (e) {
      errors.push(`${sub.email}: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }

  // Send push notification
  try {
    const newsCount = news?.length ?? 0;
    const earningsCount = earnings?.length ?? 0;
    await sendPushToAll(supabase, {
      title: "📰 Kabu Lens 朝刊",
      body: `本日の注目ニュース${newsCount}件・決算${earningsCount}件をまとめました`,
      url: "https://kabulens.jp/news",
      tag: "morning-report",
    });
  } catch {
    // Push failure should not fail the entire cron
  }

  return NextResponse.json({
    success: true,
    sent: sentCount,
    total: subscribers.length,
    errors: errors.length > 0 ? errors : undefined,
  });
}
