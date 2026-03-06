import Link from "next/link";
import { ArrowRight, Newspaper, TrendingUp, Bell } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-navy to-[#1a3a5c] overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left: Text */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight font-mono">
              株式市場を、もっとシャープに。
            </h1>
            <p className="mt-4 text-base lg:text-lg text-blue-300 leading-relaxed">
              ニュース・テーマ株・決算速報を日本語でわかりやすく。
              <br className="hidden sm:block" />
              新NISA世代のための投資情報メディア。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-medium rounded-lg px-6 py-3 text-sm transition-colors"
              >
                今日のニュースを見る
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/themes"
                className="inline-flex items-center gap-2 border border-white/60 hover:border-white text-white font-medium rounded-lg px-6 py-3 text-sm transition-colors"
              >
                テーマ株を探す
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right: Stat badges (hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-4">
            <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-5 py-4">
              <Newspaper className="h-8 w-8 text-blue-300 shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">毎日更新</p>
                <p className="text-blue-300/80 text-xs">厳選ニュース</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-5 py-4">
              <TrendingUp className="h-8 w-8 text-blue-300 shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">8テーマ</p>
                <p className="text-blue-300/80 text-xs">テーマ株カバー</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-5 py-4">
              <Bell className="h-8 w-8 text-blue-300 shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">無料登録</p>
                <p className="text-blue-300/80 text-xs">プッシュ通知対応</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
