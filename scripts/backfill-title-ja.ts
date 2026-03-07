/**
 * Backfill title_ja for news_articles where it is null.
 *
 * Usage:
 *   npx tsx scripts/backfill-title-ja.ts
 *
 * Requires ANTHROPIC_API_KEY to be set in .env.local (real key, not placeholder).
 */

import { createClient } from "@supabase/supabase-js";

// Env vars loaded via: node --env-file=.env.local

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY!;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}
if (!ANTHROPIC_API_KEY || ANTHROPIC_API_KEY.startsWith("YOUR_")) {
  console.error(
    "ANTHROPIC_API_KEY is not set or is a placeholder. Set a real key in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function translateTitle(title: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 256,
      system:
        "あなたは金融ニュースの翻訳者です。英語のニュースタイトルを自然な日本語に翻訳してください。すでに日本語の場合はそのまま返してください。翻訳のみを返してください。",
      messages: [{ role: "user", content: title }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Claude API ${res.status}: ${text}`);
  }

  const data = await res.json();
  return (data.content?.[0]?.text ?? title).trim();
}

async function main() {
  // Fetch all articles with null title_ja
  const { data: articles, error } = await supabase
    .from("news_articles")
    .select("id, title, title_ja")
    .is("title_ja", null)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error.message);
    process.exit(1);
  }

  if (!articles || articles.length === 0) {
    console.log("No articles with null title_ja. Nothing to do.");
    return;
  }

  console.log(`Found ${articles.length} articles with null title_ja\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const progress = `[${i + 1}/${articles.length}]`;

    try {
      const translated = await translateTitle(article.title);

      // Skip if translation is identical to original (already Japanese)
      if (translated === article.title) {
        console.log(`${progress} SKIP (already JP): ${article.title}`);
        // Still save it so it won't be picked up again
        await supabase
          .from("news_articles")
          .update({ title_ja: translated })
          .eq("id", article.id);
        skipCount++;
        continue;
      }

      await supabase
        .from("news_articles")
        .update({ title_ja: translated })
        .eq("id", article.id);

      console.log(`${progress} OK: ${article.title}`);
      console.log(`        → ${translated}`);
      successCount++;

      // Rate limit: ~200ms between requests
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`${progress} ERROR: ${article.title} — ${msg}`);
      errorCount++;
    }
  }

  console.log(
    `\nDone! Translated: ${successCount}, Skipped: ${skipCount}, Errors: ${errorCount}`
  );
}

main();
