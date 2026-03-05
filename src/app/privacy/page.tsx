import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "Kabu Lensのプライバシーポリシー。個人情報の収集、利用目的、安全管理措置について。",
};

const sections = [
  {
    title: "1. 収集する情報",
    paragraphs: [
      "当サイトでは、サービスの提供・改善のために以下の情報を収集する場合があります。",
      "（1）メールマガジン登録時にご提供いただくお名前・メールアドレス。（2）お問い合わせフォームからご送信いただく氏名・メールアドレス・メッセージ内容。（3）アクセスログ（IPアドレス、ブラウザ種別、アクセス日時、閲覧ページ等）。（4）Cookie及び類似技術により自動的に取得される情報。",
    ],
  },
  {
    title: "2. 情報の利用目的",
    paragraphs: [
      "収集した個人情報は、以下の目的で利用いたします。",
      "（1）メールマガジンの配信及び関連するご連絡。（2）お問い合わせへの対応。（3）サービスの運営、維持、改善及び新機能の開発。（4）利用状況の統計・分析によるサービス向上。（5）不正行為の検知及び防止。",
    ],
  },
  {
    title: "3. Cookieの利用について",
    paragraphs: [
      "当サイトでは、利用者の利便性向上及びアクセス解析のためにCookieを使用しています。Cookieとは、ウェブサーバーから利用者のブラウザに送信される小さなデータファイルです。",
      "利用者はブラウザの設定によりCookieの受け取りを拒否することができますが、その場合、当サイトの一部機能がご利用いただけなくなる場合があります。当サイトではGoogle Analyticsを利用しており、Googleによるデータ収集・処理については、Googleのプライバシーポリシーをご確認ください。",
    ],
  },
  {
    title: "4. 第三者への提供",
    paragraphs: [
      "当サイトは、以下の場合を除き、利用者の個人情報を第三者に提供いたしません。",
      "（1）利用者の同意がある場合。（2）法令に基づく場合。（3）人の生命、身体又は財産の保護のために必要であり、利用者の同意を得ることが困難な場合。（4）サービスの運営に必要な範囲で業務委託先に提供する場合（この場合、適切な監督を行います）。",
    ],
  },
  {
    title: "5. 安全管理措置",
    paragraphs: [
      "当サイトは、個人情報の漏洩、滅失又は毀損の防止のために、適切な安全管理措置を講じます。SSL暗号化通信の採用、アクセス権限の管理、定期的なセキュリティ評価を実施しています。",
      "万一、個人情報の漏洩等の事故が発生した場合には、速やかに利用者への通知及び関係機関への報告を行い、被害の最小化に努めます。",
    ],
  },
  {
    title: "6. 個人情報の開示・訂正・削除",
    paragraphs: [
      "利用者は、当サイトが保有する自己の個人情報について、開示・訂正・削除を請求することができます。ご請求の際は、下記のお問い合わせ先までメールにてご連絡ください。本人確認のうえ、合理的な期間内に対応いたします。",
    ],
  },
  {
    title: "7. プライバシーポリシーの変更",
    paragraphs: [
      "当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。重要な変更がある場合は、当サイト上での告知又はメールマガジンを通じてお知らせいたします。変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じます。",
    ],
  },
  {
    title: "8. お問い合わせ",
    paragraphs: [
      "本プライバシーポリシーに関するお問い合わせは、以下までご連絡ください。",
      "Kabu Lens 運営事務局\nメール：contact@kabulens.jp",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20">
      <div className="py-6 max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-bold text-navy">
              プライバシーポリシー
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            Kabu Lens（以下「当サイト」）は、利用者のプライバシーを尊重し、個人情報の保護に努めます。
            本プライバシーポリシーでは、当サイトにおける個人情報の取り扱いについて定めます。
          </p>
          <p className="text-xs text-gray-400 mt-2">
            最終更新日：2026年3月1日
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 pb-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-base font-bold text-navy mb-3">
                {section.title}
              </h2>
              <div className="bg-white rounded-lg shadow-sm p-5">
                {section.paragraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm text-gray-700 leading-relaxed mb-3 last:mb-0 whitespace-pre-line"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
