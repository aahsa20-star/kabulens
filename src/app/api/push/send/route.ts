import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { sendPushToAll, sendPushToUser } from "@/lib/web-push";

export async function POST(request: Request) {
  try {
    // Internal API: CRON_SECRET auth only
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { user_id, title, body: notifBody, url, tag } = body;

    if (!title || !notifBody || !url || !tag) {
      return NextResponse.json(
        { error: "Missing required fields: title, body, url, tag" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const payload = { title, body: notifBody, url, tag };

    const result = user_id
      ? await sendPushToUser(supabase, user_id, payload)
      : await sendPushToAll(supabase, payload);

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
