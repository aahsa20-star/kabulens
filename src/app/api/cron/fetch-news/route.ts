import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

interface RSSSource {
  url: string;
  source: string;
}

const RSS_SOURCES: RSSSource[] = [
  {
    url: "https://feeds.reuters.com/reuters/JPBusinessNews",
    source: "ロイター",
  },
  {
    url: "https://www.boj.or.jp/rss/news.xml",
    source: "日銀",
  },
  {
    url: "https://www.federalreserve.gov/feeds/press_all.xml",
    source: "FRB",
  },
];

interface ParsedItem {
  title: string;
  link: string;
  pubDate: string;
}

function parseRSSItems(xml: string): ParsedItem[] {
  const items: ParsedItem[] = [];
  const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let itemMatch: RegExpExecArray | null;

  while ((itemMatch = itemRegex.exec(xml)) !== null) {
    const itemContent = itemMatch[1];

    // Extract title (handle CDATA sections)
    const titleMatch = itemContent.match(
      /<title>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/title>/i
    );
    // Extract link
    const linkMatch = itemContent.match(
      /<link>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/link>/i
    );
    // Extract pubDate
    const pubDateMatch = itemContent.match(
      /<pubDate>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/pubDate>/i
    );

    if (titleMatch && linkMatch) {
      items.push({
        title: titleMatch[1].trim(),
        link: linkMatch[1].trim(),
        pubDate: pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString(),
      });
    }
  }

  return items;
}

export async function GET(request: Request) {
  try {
    // Verify CRON_SECRET
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerClient();
    let totalNewArticles = 0;
    const errors: string[] = [];

    for (const source of RSS_SOURCES) {
      try {
        const response = await fetch(source.url, {
          headers: { "User-Agent": "KabuLens/1.0 RSS Fetcher" },
        });

        if (!response.ok) {
          errors.push(`${source.source}: HTTP ${response.status}`);
          continue;
        }

        const xml = await response.text();
        const items = parseRSSItems(xml);

        for (const item of items) {
          // Check if URL already exists (skip duplicates)
          const { data: existing } = await supabase
            .from("news_articles")
            .select("id")
            .eq("url", item.link)
            .limit(1)
            .single();

          if (existing) {
            continue;
          }

          // Insert new article
          const { error: insertError } = await supabase
            .from("news_articles")
            .insert({
              title: item.title,
              url: item.link,
              source: source.source,
              published_at: new Date(item.pubDate).toISOString(),
              is_validated: false,
            });

          if (!insertError) {
            totalNewArticles++;
          }
        }
      } catch (sourceError) {
        const message =
          sourceError instanceof Error ? sourceError.message : "Unknown error";
        errors.push(`${source.source}: ${message}`);
        continue;
      }
    }

    return NextResponse.json({
      success: true,
      new_articles: totalNewArticles,
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
