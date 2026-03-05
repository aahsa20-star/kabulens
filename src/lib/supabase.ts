import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// ブラウザ用クライアント（公開キーのみ）
export function createBrowserClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// サーバー用クライアント（サービスロールキー・RLSバイパス）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
