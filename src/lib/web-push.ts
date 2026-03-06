import webpush from "web-push";
import type { SupabaseClient } from "@supabase/supabase-js";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_EMAIL = process.env.VAPID_EMAIL || "mailto:info@kabulens.jp";

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

interface PushPayload {
  title: string;
  body: string;
  url: string;
  tag: string;
}

interface PushSubscriptionRow {
  id: string;
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
}

async function sendToSubscription(
  sub: PushSubscriptionRow,
  payload: PushPayload
): Promise<boolean> {
  try {
    await webpush.sendNotification(
      {
        endpoint: sub.endpoint,
        keys: { p256dh: sub.p256dh, auth: sub.auth },
      },
      JSON.stringify(payload)
    );
    return true;
  } catch (error: unknown) {
    const statusCode =
      error && typeof error === "object" && "statusCode" in error
        ? (error as { statusCode: number }).statusCode
        : 0;
    // 410 Gone or 404 means subscription is no longer valid
    if (statusCode === 410 || statusCode === 404) {
      return false; // Signal to delete
    }
    console.error(`Push failed for ${sub.endpoint}:`, error);
    return true; // Keep subscription for transient errors
  }
}

export async function sendPushToAll(
  supabase: SupabaseClient,
  payload: PushPayload
): Promise<{ sent: number; failed: number; cleaned: number }> {
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    return { sent: 0, failed: 0, cleaned: 0 };
  }

  const { data: subscriptions } = await supabase
    .from("push_subscriptions")
    .select("id, user_id, endpoint, p256dh, auth");

  if (!subscriptions || subscriptions.length === 0) {
    return { sent: 0, failed: 0, cleaned: 0 };
  }

  let sent = 0;
  let failed = 0;
  let cleaned = 0;

  for (const sub of subscriptions) {
    const success = await sendToSubscription(sub, payload);
    if (success) {
      sent++;
    } else {
      // Remove expired subscription
      await supabase.from("push_subscriptions").delete().eq("id", sub.id);
      cleaned++;
      failed++;
    }
  }

  return { sent, failed, cleaned };
}

export async function sendPushToUser(
  supabase: SupabaseClient,
  userId: string,
  payload: PushPayload
): Promise<{ sent: number; failed: number; cleaned: number }> {
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    return { sent: 0, failed: 0, cleaned: 0 };
  }

  const { data: subscriptions } = await supabase
    .from("push_subscriptions")
    .select("id, user_id, endpoint, p256dh, auth")
    .eq("user_id", userId);

  if (!subscriptions || subscriptions.length === 0) {
    return { sent: 0, failed: 0, cleaned: 0 };
  }

  let sent = 0;
  let failed = 0;
  let cleaned = 0;

  for (const sub of subscriptions) {
    const success = await sendToSubscription(sub, payload);
    if (success) {
      sent++;
    } else {
      await supabase.from("push_subscriptions").delete().eq("id", sub.id);
      cleaned++;
      failed++;
    }
  }

  return { sent, failed, cleaned };
}
