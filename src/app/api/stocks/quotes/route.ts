import { NextRequest, NextResponse } from "next/server";
import { getStockQuotes } from "@/lib/japanStocks";

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

  if (codes.length === 0 || codes.length > 50) {
    return NextResponse.json(
      { error: "Provide 1-50 comma-separated stock codes" },
      { status: 400 }
    );
  }

  try {
    const quotes = await getStockQuotes(codes);
    return NextResponse.json({ quotes });
  } catch (err) {
    console.error("[/api/stocks/quotes]", err);
    return NextResponse.json(
      { error: "Failed to fetch stock quotes" },
      { status: 500 }
    );
  }
}
