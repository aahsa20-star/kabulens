import { NextRequest, NextResponse } from "next/server";
import { getDailyQuotes } from "@/lib/jquants";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const codesParam = req.nextUrl.searchParams.get("codes");

  if (!codesParam) {
    return NextResponse.json(
      { error: "codes parameter is required" },
      { status: 400 }
    );
  }

  const codes = codesParam
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  if (codes.length === 0 || codes.length > 20) {
    return NextResponse.json(
      { error: "Provide 1-20 comma-separated stock codes" },
      { status: 400 }
    );
  }

  try {
    const quotes = await getDailyQuotes(codes);
    return NextResponse.json({ quotes });
  } catch (err) {
    console.error("[/api/stocks/quotes]", err);
    return NextResponse.json(
      { error: "Failed to fetch stock quotes" },
      { status: 500 }
    );
  }
}
