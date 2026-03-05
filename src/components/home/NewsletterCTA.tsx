"use client";

import { useState } from "react";
import { Mail, CheckCircle, Send, Loader2 } from "lucide-react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setError("既に登録済みです");
        } else {
          setError(data.error || "登録に失敗しました。もう一度お試しください。");
        }
        return;
      }

      setSubmitted(true);
    } catch {
      setError("通信エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-xl bg-gradient-to-br from-navy to-navy-light overflow-hidden">
      <div className="px-6 py-10 sm:px-10 sm:py-14 text-center max-w-2xl mx-auto">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-5">
          <Mail className="h-6 w-6 text-white" />
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
          毎朝7時、マーケットの今を届けます
        </h2>

        {/* Subtext */}
        <p className="text-sm text-white/70 mb-8 leading-relaxed max-w-lg mx-auto">
          AI厳選ニュース・注目決算・経済指標をまとめてお届け。無料で登録。
        </p>

        {submitted ? (
          /* Success state */
          <div className="flex items-center justify-center gap-2 text-up">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">
              登録ありがとうございます！毎朝のニュースレターをお届けします。
            </span>
          </div>
        ) : (
          /* Form */
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="メールアドレスを入力"
                required
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-white text-sm font-semibold rounded-lg transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {loading ? "登録中..." : "無料登録"}
              </button>
            </form>

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-400 mt-3">{error}</p>
            )}
          </>
        )}

        {/* Fine print */}
        {!submitted && !error && (
          <p className="text-[11px] text-white/40 mt-4">
            いつでも配信停止できます。スパムは送りません。
          </p>
        )}
      </div>
    </section>
  );
}
