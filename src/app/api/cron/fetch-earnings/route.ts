import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

/**
 * Fetch earnings announcements from TDnet (適時開示)
 * Runs daily at JST 18:00 (after market close)
 */

interface TDnetItem {
  ticker: string;
  companyName: string;
  announcedAt: string;
  title: string;
}

// Earnings-related keywords in TDnet disclosures
const EARNINGS_KEYWORDS = [
  "決算短信",
  "業績予想",
  "配当予想",
  "四半期報告",
  "通期",
  "中間",
  "第1四半期",
  "第2四半期",
  "第3四半期",
];

function parseTDnetHTML(html: string, dateStr: string): TDnetItem[] {
  const items: TDnetItem[] = [];

  // TDnet listing page has table rows with disclosure info
  // Pattern: ticker code (4 digits) + company name + disclosure title
  const rowRegex =
    /(\d{4,5})0?\s*<\/td>\s*<td[^>]*>([^<]+)<\/td>\s*<td[^>]*>\s*<a[^>]*>([^<]+)<\/a>/gi;

  let match: RegExpExecArray | null;
  while ((match = rowRegex.exec(html)) !== null) {
    const ticker = match[1];
    const companyName = match[2].trim();
    const title = match[3].trim();

    // Only keep earnings-related disclosures
    if (EARNINGS_KEYWORDS.some((kw) => title.includes(kw))) {
      items.push({
        ticker,
        companyName,
        announcedAt: `${dateStr}T15:30:00+09:00`,
        title,
      });
    }
  }

  return items;
}

function parseJPXRSS(xml: string): TDnetItem[] {
  const items: TDnetItem[] = [];

  const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let itemMatch: RegExpExecArray | null;

  while ((itemMatch = itemRegex.exec(xml)) !== null) {
    const content = itemMatch[1];

    const titleMatch = content.match(
      /<title>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/title>/i
    );
    const pubDateMatch = content.match(
      /<pubDate>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/pubDate>/i
    );

    if (!titleMatch) continue;
    const title = titleMatch[1].trim();

    // Only keep earnings-related items
    if (!EARNINGS_KEYWORDS.some((kw) => title.includes(kw))) continue;

    // Try to extract ticker from title (e.g., "【7203】トヨタ自動車..." or "(7203)")
    const tickerMatch = title.match(/[【\[(](\d{4})[】\])]/);
    if (!tickerMatch) continue;

    // Extract company name (text after ticker pattern)
    const nameMatch = title.match(/[】\])]([^\s]+)/);
    const companyName = nameMatch ? nameMatch[1] : "不明";

    items.push({
      ticker: tickerMatch[1],
      companyName,
      announcedAt: pubDateMatch
        ? new Date(pubDateMatch[1].trim()).toISOString()
        : new Date().toISOString(),
      title,
    });
  }

  return items;
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerClient();
    let totalNew = 0;
    const errors: string[] = [];

    // Fetch from JPX disclosure RSS
    try {
      const jpxRes = await fetch(
        "https://www.jpx.co.jp/news/1020/index.xml",
        { headers: { "User-Agent": "KabuLens/1.0" } }
      );
      if (jpxRes.ok) {
        const xml = await jpxRes.text();
        const items = parseJPXRSS(xml);

        for (const item of items) {
          // Look up stock info for market type
          const { data: stockInfo } = await supabase
            .from("stocks")
            .select("name_ja, market")
            .eq("ticker", item.ticker)
            .single();

          const companyName =
            stockInfo?.name_ja || item.companyName;

          // Upsert earnings entry (avoid duplicates by ticker + date)
          const announcedDate = item.announcedAt.split("T")[0];
          const { data: existing } = await supabase
            .from("earnings")
            .select("id")
            .eq("ticker", item.ticker)
            .gte("announced_at", `${announcedDate}T00:00:00`)
            .lt("announced_at", `${announcedDate}T23:59:59`)
            .limit(1)
            .single();

          if (!existing) {
            const { error: insertErr } = await supabase
              .from("earnings")
              .insert({
                ticker: item.ticker,
                company_name: companyName,
                announced_at: item.announcedAt,
                period: item.title,
              });

            if (!insertErr) totalNew++;
            else errors.push(`Insert ${item.ticker}: ${insertErr.message}`);
          }
        }
      } else {
        errors.push(`JPX RSS: HTTP ${jpxRes.status}`);
      }
    } catch (e) {
      errors.push(`JPX RSS: ${e instanceof Error ? e.message : "Unknown"}`);
    }

    // Fetch from TDnet daily listing (today + next 5 business days)
    const today = new Date();
    for (let offset = 0; offset < 7; offset++) {
      const date = new Date(today);
      date.setDate(today.getDate() + offset);

      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      const dateStr = date.toISOString().split("T")[0].replace(/-/g, "");
      const tdnetUrl = `https://www.release.tdnet.info/inbs/I_list_001_${dateStr}.html`;

      try {
        const tdnetRes = await fetch(tdnetUrl, {
          headers: { "User-Agent": "KabuLens/1.0" },
        });

        if (!tdnetRes.ok) continue;

        const html = await tdnetRes.text();
        const formattedDate = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
        const items = parseTDnetHTML(html, formattedDate);

        for (const item of items) {
          const { data: stockInfo } = await supabase
            .from("stocks")
            .select("name_ja, market")
            .eq("ticker", item.ticker)
            .single();

          const companyName = stockInfo?.name_ja || item.companyName;

          const { data: existing } = await supabase
            .from("earnings")
            .select("id")
            .eq("ticker", item.ticker)
            .gte("announced_at", `${formattedDate}T00:00:00`)
            .lt("announced_at", `${formattedDate}T23:59:59`)
            .limit(1)
            .single();

          if (!existing) {
            const { error: insertErr } = await supabase
              .from("earnings")
              .insert({
                ticker: item.ticker,
                company_name: companyName,
                announced_at: item.announcedAt,
                period: item.title,
              });

            if (!insertErr) totalNew++;
            else errors.push(`Insert ${item.ticker}: ${insertErr.message}`);
          }
        }
      } catch {
        // TDnet may not have future dates, skip silently
        continue;
      }
    }

    return NextResponse.json({
      success: true,
      new_entries: totalNew,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
