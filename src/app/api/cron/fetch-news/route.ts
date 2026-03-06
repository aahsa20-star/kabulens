import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

interface RSSSource {
  url: string;
  source: string;
  lang: "ja" | "en";
  priority: number;
}

const RSS_SOURCES: RSSSource[] = [
  // 日本語・日本市場（最優先）
  {
    url: "https://www.nikkei.com/news/rss/?channel=market",
    source: "日本経済新聞",
    lang: "ja",
    priority: 1,
  },
  {
    url: "https://www.jpx.co.jp/news/1020/index.xml",
    source: "JPX",
    lang: "ja",
    priority: 1,
  },
  {
    url: "https://www.boj.or.jp/rss/boj_all.xml",
    source: "日本銀行",
    lang: "ja",
    priority: 1,
  },
  {
    url: "https://feeds.reuters.com/reuters/JPBusinessNews",
    source: "ロイター",
    lang: "ja",
    priority: 1,
  },
  {
    url: "https://www.bloomberg.co.jp/feeds/podcast/markets.xml",
    source: "Bloomberg",
    lang: "ja",
    priority: 1,
  },
  // 省庁・機関
  {
    url: "https://www.mof.go.jp/rss/index.rss",
    source: "財務省",
    lang: "ja",
    priority: 2,
  },
  {
    url: "https://www.dir.co.jp/rss/report.rdf",
    source: "大和総研",
    lang: "ja",
    priority: 2,
  },
  {
    url: "https://www.fsa.go.jp/news/rss/news.xml",
    source: "金融庁",
    lang: "ja",
    priority: 2,
  },
  // 海外（マクロのみ・日本市場への影響が大きいものに限定）
  {
    url: "https://www.federalreserve.gov/feeds/press_all.xml",
    source: "FRB",
    lang: "en",
    priority: 3,
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

    const titleMatch = itemContent.match(
      /<title>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/title>/i
    );
    const linkMatch = itemContent.match(
      /<link>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/link>/i
    );
    const pubDateMatch = itemContent.match(
      /<pubDate>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/pubDate>/i
    );
    // Also try dc:date for RDF feeds (e.g., 大和総研)
    const dcDateMatch = itemContent.match(
      /<dc:date>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/dc:date>/i
    );

    if (titleMatch && linkMatch) {
      items.push({
        title: titleMatch[1].trim(),
        link: linkMatch[1].trim(),
        pubDate: pubDateMatch
          ? pubDateMatch[1].trim()
          : dcDateMatch
            ? dcDateMatch[1].trim()
            : new Date().toISOString(),
      });
    }
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
    let totalNewArticles = 0;
    const errors: string[] = [];

    // Sort sources by priority (lower = higher priority)
    const sortedSources = [...RSS_SOURCES].sort(
      (a, b) => a.priority - b.priority
    );

    for (const source of sortedSources) {
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
          const { data: existing } = await supabase
            .from("news_articles")
            .select("id")
            .eq("url", item.link)
            .limit(1)
            .single();

          if (existing) continue;

          const { error: insertError } = await supabase
            .from("news_articles")
            .insert({
              title: item.title,
              url: item.link,
              source: source.source,
              published_at: new Date(item.pubDate).toISOString(),
              is_validated: false,
            });

          if (!insertError) totalNewArticles++;
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
