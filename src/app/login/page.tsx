"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, CheckCircle, AlertCircle, ScanLine } from "lucide-react";
import { createClient } from "@/lib/supabase-client";
import { useAuth } from "@/components/auth/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("sent");
    }
  }

  if (loading) return null;

  return (
    <div className="mx-auto max-w-md px-4 pt-28 pb-20">
      <div className="bg-white rounded-xl shadow-sm p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <ScanLine className="h-6 w-6 text-accent" />
          <span className="text-lg font-bold text-navy">Kabu Lens</span>
        </div>

        {status === "sent" ? (
          /* Success state */
          <div className="text-center py-4">
            <CheckCircle className="mx-auto h-12 w-12 text-up mb-4" />
            <h1 className="text-xl font-bold text-navy mb-2">
              メールを確認してください
            </h1>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium text-navy">{email}</span>{" "}
              にログインリンクを送信しました。
            </p>
            <p className="text-xs text-gray-400">
              メールが届かない場合は、迷惑メールフォルダをご確認ください。
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setEmail("");
              }}
              className="mt-6 text-sm text-accent hover:text-accent-light transition-colors"
            >
              別のメールアドレスで試す
            </button>
          </div>
        ) : (
          /* Login form */
          <>
            <h1 className="text-xl font-bold text-navy text-center mb-1">
              ログイン / 新規登録
            </h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              メールアドレスにログインリンクを送信します
            </p>

            {status === "error" && (
              <div className="flex items-center gap-2 bg-down-bg text-down text-xs rounded-lg p-3 mb-4">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMsg || "エラーが発生しました。もう一度お試しください。"}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  メールアドレス
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-200 bg-lightgray pl-10 pr-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending" || !email.trim()}
                className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending"
                  ? "送信中..."
                  : "ログインリンクを送信"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-gray-400">
              アカウントをお持ちでない方も同じフォームから登録できます。
              <br />
              パスワードは不要です。
            </p>
          </>
        )}
      </div>

      {/* Back to home */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-accent transition-colors"
        >
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}
