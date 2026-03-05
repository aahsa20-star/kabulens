"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle, MessageSquare, Loader2 } from "lucide-react";

const subjectOptions = [
  "サービスについて",
  "不具合報告",
  "取材・メディア",
  "その他",
] as const;

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<string>(subjectOptions[0]);
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, _hp: hp }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "送信に失敗しました。");
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
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20">
      <div className="py-6 max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-bold text-navy">お問い合わせ</h1>
          </div>
          <p className="text-sm text-gray-500">
            サービスに関するご質問、不具合のご報告、取材のご依頼など、お気軽にお問い合わせください。
          </p>
        </div>

        {/* Contact Form */}
        <section className="mb-10">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle className="h-10 w-10 text-up mx-auto mb-4" />
                <h3 className="text-lg font-bold text-navy mb-2">
                  お問い合わせを受け付けました
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
                  内容を確認のうえ、通常2営業日以内にご返信いたします。しばらくお待ちください。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold text-navy mb-1.5"
                  >
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="山田 太郎"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-lightgray text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold text-navy mb-1.5"
                  >
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-lightgray text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-semibold text-navy mb-1.5"
                  >
                    お問い合わせ種別
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-lightgray text-sm text-navy focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  >
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-navy mb-1.5"
                  >
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="お問い合わせ内容をご記入ください"
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-lightgray text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-y"
                  />
                </div>

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {loading ? "送信中..." : "送信する"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Company Info */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold text-navy">メールでのお問い合わせ</h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              フォームをご利用いただけない場合は、以下のメールアドレスまで直接ご連絡ください。
            </p>
            <a
              href="mailto:contact@kabulens.jp"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
            >
              <Mail className="h-4 w-4" />
              contact@kabulens.jp
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
