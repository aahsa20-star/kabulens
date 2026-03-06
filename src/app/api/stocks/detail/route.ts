import { NextRequest, NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export const dynamic = "force-dynamic";

export type StockDetail = {
  code: string;
  name: string;
  nameEn: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  per: number | null;
  pbr: number | null;
  dividendYield: number | null;
  volume: number;
  sector: string;
  industry: string;
};

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code || !/^\d{4}$/.test(code)) {
    return NextResponse.json(
      { error: "Valid 4-digit stock code is required" },
      { status: 400 }
    );
  }

  try {
    const symbol = `${code}.T`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const quote: any = await yahooFinance.quote(symbol);

    const detail: StockDetail = {
      code,
      name: (quote.shortName || quote.longName || code) as string,
      nameEn: (quote.longName || quote.shortName || code) as string,
      price: (quote.regularMarketPrice ?? 0) as number,
      change: (quote.regularMarketChange ?? 0) as number,
      changePercent: (quote.regularMarketChangePercent ?? 0) as number,
      marketCap: (quote.marketCap ?? 0) as number,
      per: quote.trailingPE != null ? (quote.trailingPE as number) : null,
      pbr: quote.priceToBook != null ? (quote.priceToBook as number) : null,
      dividendYield:
        quote.dividendYield != null ? (quote.dividendYield as number) : null,
      volume: (quote.regularMarketVolume ?? 0) as number,
      sector: (quote.sector || "---") as string,
      industry: (quote.industry || "---") as string,
    };

    return NextResponse.json({ detail });
  } catch (err) {
    console.error(`[/api/stocks/detail] ${code}:`, err);
    return NextResponse.json(
      { error: "Failed to fetch stock detail" },
      { status: 500 }
    );
  }
}
