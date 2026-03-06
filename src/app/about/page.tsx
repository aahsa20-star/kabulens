import type { Metadata } from "next";
import Link from "next/link";
import {
  ScanLine,
  Target,
  ShieldAlert,
  Mail,
  ArrowRight,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kabu Lensについて | 免責事項",
  description:
    "Kabu Lens（株レンズ）のサービス概要と免責事項。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20">
      <div className="py-6 max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-navy mb-2">About</h1>
          <p className="text-sm text-gray-500">
            Kabu Lensのサービス概要とご利用にあたっての注意事項
          </p>
        </div>

        {/* Service Description */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <ScanLine className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold text-navy">Kabu Lens概要</h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-navy leading-relaxed mb-4">
              Kabu Lensは、日本株を中心としたマーケット情報を提供する金融メディアです。
              新NISA世代の個人投資家に向けて、複雑な市場情報を分かりやすく、美しいUIで提供することを目指しています。
            </p>
            <p className="text-sm text-navy leading-relaxed mb-4">
              AI技術を活用したニュース要約、リアルタイムのマーケットデータ、
              経験豊富なアナリストによるコラムを通じて、投資判断に必要な情報へのアクセスを容易にします。
            </p>
            <div className="grid gap-3 sm:grid-cols-3 mt-6">
              <div className="text-center p-4 rounded-lg bg-lightgray">
                <p className="text-2xl font-bold text-accent num">3,800+</p>
                <p className="text-xs text-gray-500 mt-1">掲載銘柄数</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-lightgray">
                <p className="text-2xl font-bold text-accent num">50+</p>
                <p className="text-xs text-gray-500 mt-1">経済指標を追跡</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-lightgray">
                <p className="text-2xl font-bold text-accent num">24/7</p>
                <p className="text-xs text-gray-500 mt-1">リアルタイム更新</p>
              </div>
            </div>
          </div>
        </section>

        {/* Operator Info */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold text-navy">運営者情報</h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                {[
                  ["サイト名", "Kabu Lens（株レンズ）"],
                  ["運営者", "Aki"],
                  ["設立", "2026年"],
                  ["所在地", "茨城県"],
                  ["お問い合わせ", "akiissamurai@gmail.com"],
                  ["運営目的", "日本株・マクロ経済情報の提供"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <th className="px-6 py-3 text-left font-semibold text-navy bg-lightgray w-1/3">
                      {label}
                    </th>
                    <td className="px-6 py-3 text-navy">
                      {label === "お問い合わせ" ? (
                        <a
                          href={`mailto:${value}`}
                          className="text-accent hover:text-accent-light transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold text-navy">ミッション</h2>
          </div>
          <div className="bg-gradient-to-br from-navy to-navy-light rounded-xl p-8 text-center">
            <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
              株式市場を、もっとシャープに。
            </p>
            <p className="text-sm text-white/60 mt-4 max-w-md mx-auto leading-relaxed">
              情報の洪水のなかで、本当に必要なデータを見極める。
              Kabu Lensは、すべての投資家がプロフェッショナルと同じ視点で市場を見通せる世界を実現します。
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold text-navy">免責事項</h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-navy mb-2">
                投資助言に該当しません
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                当サイトで提供する情報は、金融商品取引法に定める投資助言・代理業に該当するものではありません。
                掲載されている情報は情報提供を目的としたものであり、特定の金融商品の売買を推奨するものではありません。
                投資に関する最終決定は、ご自身の判断と責任において行ってください。
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-navy mb-2">
                情報の正確性について
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                当サイトに掲載されている情報の正確性、完全性、適時性については万全を期しておりますが、
                これを保証するものではありません。掲載情報に基づいて利用者が行った投資行為により
                生じた損害について、当サイトは一切の責任を負いません。
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-navy mb-2">
                データの遅延について
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                当サイトで表示される株価・為替レート等のマーケットデータには、提供元の仕様により
                一定の遅延が発生する場合があります。リアルタイムの取引判断には、
                証券会社等が提供する正式なデータをご利用ください。
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-navy mb-2">
                第三者コンテンツについて
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                当サイトには、外部のコラムニストやアナリストによる意見・分析が含まれます。
                これらは各執筆者個人の見解であり、当サイトの公式見解を示すものではありません。
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold text-navy">お問い合わせ</h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-navy leading-relaxed mb-4">
              サービスに関するお問い合わせ、フィードバック、メディア掲載に関するご連絡は以下のメールアドレスまでお願いいたします。
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

        {/* Link to Privacy Policy */}
        <section className="mb-12">
          <Link
            href="/privacy"
            className="flex items-center justify-between bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow group"
          >
            <div>
              <h3 className="text-sm font-bold text-navy group-hover:text-accent transition-colors">
                プライバシーポリシー
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                個人情報の取り扱いについて
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-accent transition-colors" />
          </Link>
        </section>
      </div>
    </div>
  );
}
