import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

interface ClaudeResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
}

interface SummaryResult {
  title_ja: string;
  summary: string;
  importance: number;
  category: string;
}

function extractNumbers(text: string): number[] {
  const matches = text.match(/\d+[\d,.]*\d*|\d/g);
  if (!matches) return [];
  return matches.map((m) => parseFloat(m.replace(/,/g, "")));
}

function validateNumbers(title: string, summary: string): boolean {
  const titleNumbers = extractNumbers(title);
  if (titleNumbers.length === 0) return true;

  const summaryNumbers = extractNumbers(summary);
  // Check that numbers from the title appear in the summary
  for (const num of titleNumbers) {
    if (!summaryNumbers.includes(num)) {
      return false;
    }
  }
  return true;
}

async function summarizeArticle(
  title: string,
  url: string
): Promise<SummaryResult | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }

  const userMessage = `以下のニュース記事を分析してください。

タイトル: ${title}
URL: ${url}

カテゴリ判定ルール:
- "決算": 決算・業績・EPS・売上・純利益を含む
- "政策": 日銀・FRB・金利・利上げ・利下げ・金融政策を含む
- "日本株": 東証・日経・TOPIX・国内株・プライム市場を含む
- "マクロ": GDP・インフレ・CPI・雇用統計・景気を含む
- "為替": 円・ドル・ユーロ・為替・FXを含む
- "米株": NYSE・ナスダック・S&P・米国株を含む（優先度を下げる）

重要度ルール:
- 日本市場に直接影響するニュース → importance 4-5
- 日本市場に間接的に影響するニュース → importance 2-3
- 米株のみのニュース → importance 1-2

以下のJSON形式で回答してください（JSONのみ、他のテキストは不要）:
{
  "title_ja": "タイトルの自然な日本語訳（英語タイトルの場合のみ翻訳。すでに日本語なら原文のまま）",
  "summary": "記事の要約（日本語、2-3文）",
  "importance": <1-5の整数、5が最も重要>,
  "category": "<以下のいずれか: 決算, 政策, 日本株, マクロ, 為替, 米株, その他>"
}`;

  const messages: ClaudeMessage[] = [{ role: "user", content: userMessage }];

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: "あなたは金融ニュースのAI要約アシスタントです。",
      messages,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API error: ${response.status} - ${errorText}`);
  }

  const data: ClaudeResponse = await response.json();
  const text = data.content[0]?.text;
  if (!text) {
    throw new Error("Empty response from Claude API");
  }

  // Parse the JSON from the response (handle possible markdown code blocks)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No JSON found in Claude response");
  }

  const parsed = JSON.parse(jsonMatch[0]);

  // Validate the parsed result
  if (
    typeof parsed.summary !== "string" ||
    typeof parsed.importance !== "number" ||
    typeof parsed.category !== "string"
  ) {
    throw new Error("Invalid response structure from Claude");
  }

  // Clamp importance to 1-5
  const importance = Math.max(1, Math.min(5, Math.round(parsed.importance)));

  return {
    title_ja: typeof parsed.title_ja === "string" ? parsed.title_ja : title,
    summary: parsed.summary,
    importance,
    category: parsed.category,
  };
}

export async function GET(request: Request) {
  try {
    // Verify CRON_SECRET
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerClient();

    // Fetch up to 10 unsummarized articles
    const { data: articles, error: fetchError } = await supabase
      .from("news_articles")
      .select("id, title, url")
      .eq("is_validated", false)
      .is("summary", null)
      .order("published_at", { ascending: false })
      .limit(10);

    if (fetchError) {
      return NextResponse.json(
        { success: false, error: fetchError.message },
        { status: 500 }
      );
    }

    if (!articles || articles.length === 0) {
      return NextResponse.json({
        success: true,
        processed: 0,
        message: "No articles to summarize",
      });
    }

    let processedCount = 0;
    const errors: string[] = [];

    // Process articles sequentially to respect rate limits
    for (const article of articles) {
      try {
        const result = await summarizeArticle(article.title, article.url);

        if (!result) {
          errors.push(`${article.id}: No result from summarization`);
          continue;
        }

        // Validate numbers between title and summary
        const isValid = validateNumbers(article.title, result.summary);

        if (!isValid) {
          errors.push(
            `${article.id}: Number validation failed - leaving for retry`
          );
          // Leave is_validated=false so it will be retried next run
          continue;
        }

        // Update article with summary data
        const { error: updateError } = await supabase
          .from("news_articles")
          .update({
            title_ja: result.title_ja,
            summary: result.summary,
            importance: result.importance,
            category: result.category,
            is_validated: true,
          })
          .eq("id", article.id);

        if (updateError) {
          errors.push(`${article.id}: Update failed - ${updateError.message}`);
          continue;
        }

        processedCount++;
      } catch (articleError) {
        const message =
          articleError instanceof Error
            ? articleError.message
            : "Unknown error";
        errors.push(`${article.id}: ${message}`);
        // Leave is_validated=false so it will be retried next run
        continue;
      }
    }

    return NextResponse.json({
      success: true,
      processed: processedCount,
      total: articles.length,
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
