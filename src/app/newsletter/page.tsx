"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Send,
  CheckCircle,
  Sun,
  CalendarDays,
  Zap,
  Shield,
  TrendingUp,
  Sparkles,
  BarChart3,
  Loader2,
} from "lucide-react";
import PushNotificationToggle from "@/components/push/PushNotificationToggle";

const newsletterTypes = [
  {
    icon: Sun,
    title: "朝刊レポート",
    schedule: "平日 7:00",
    description:
      "前日の米国市場の動き、為替・債券の概況、当日の注目イベントをコンパクトにまとめてお届けします。",
  },
  {
    icon: CalendarDays,
    title: "週次まとめ",
    schedule: "日曜 8:00",
    description:
      "1週間のマーケット振り返りと来週の注目ポイントを解説。重要な経済指標やイベントを先取りします。",
  },
  {
    icon: Zap,
    title: "決算速報メール",
    schedule: "随時",
    description:
      "主要企業の決算発表をリアルタイムで速報。業績サプライズや市場へのインパクトをいち早くお届けします。",
  },
];

const benefits = [
  { icon: TrendingUp, text: "毎朝5分でマーケットの全体像を把握" },
  { icon: Sparkles, text: "AI要約で重要ニュースを厳選" },
  { icon: BarChart3, text: "プロのアナリストによる週次コラム" },
  { icon: Shield, text: "広告なし、スパムなし、いつでも解除可能" },
];

export default function NewsletterPage() {
  const [name, setName] = useState("");
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
        body: JSON.stringify({ email, name: name || undefined }),
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
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20">
      <div className="py-6 max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
            <Mail className="h-7 w-7 text-accent" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
            Kabu Lens メールマガジン
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed max-w-lg mx-auto">
            マーケットの重要な動きを見逃さない。毎朝のニュースレターで、投資判断に必要な情報をお届けします。
          </p>
        </div>

        {/* Newsletter Types */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-navy mb-4">配信コンテンツ</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {newsletterTypes.map((type) => (
              <div
                key={type.title}
                className="bg-white rounded-lg shadow-sm p-5"
              >
                <type.icon className="h-5 w-5 text-accent mb-3" />
                <h3 className="text-sm font-bold text-navy mb-1">
                  {type.title}
                </h3>
                <span className="inline-block text-[11px] font-medium text-accent bg-accent/8 px-2 py-0.5 rounded-full mb-3">
                  {type.schedule}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Signup Form */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-navy to-navy-light rounded-xl p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle className="h-10 w-10 text-up mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">
                  登録ありがとうございます！
                </h3>
                <p className="text-sm text-white/70">
                  確認メールをお送りしました。メール内のリンクをクリックして登録を完了してください。
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold text-white mb-1 text-center">
                  無料で登録する
                </h2>
                <p className="text-sm text-white/60 mb-6 text-center">
                  30秒で登録完了。クレジットカード不要。
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="max-w-md mx-auto space-y-3"
                >
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="お名前"
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="メールアドレス"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {loading ? "登録中..." : "無料で登録する"}
                  </button>
                </form>

                {/* Error message */}
                {error && (
                  <p className="text-sm text-red-400 mt-3 text-center">
                    {error}
                  </p>
                )}

                <p className="text-[11px] text-white/40 mt-4 text-center">
                  登録することで、
                  <Link
                    href="/privacy"
                    className="underline hover:text-white/60 transition-colors"
                  >
                    プライバシーポリシー
                  </Link>
                  に同意したものとみなされます。いつでも配信停止できます。
                </p>
              </>
            )}
          </div>
        </section>

        {/* Push notification alternative */}
        <section className="mb-10">
          <div className="bg-white rounded-lg shadow-sm p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-sm font-bold text-navy mb-1">
                プッシュ通知でもお届けできます
              </h3>
              <p className="text-xs text-gray-500">
                ブラウザ通知で決算速報・朝刊レポートをリアルタイムに受信
              </p>
            </div>
            <PushNotificationToggle />
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-navy mb-4">
            Kabu Lens メルマガの特長
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.text}
                className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-3"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-up-bg shrink-0">
                  <CheckCircle className="h-4 w-4 text-up" />
                </div>
                <span className="text-sm text-navy font-medium">
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
