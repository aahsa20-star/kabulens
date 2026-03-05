import Link from "next/link";
import { ScanLine, Twitter, Youtube, MessageCircle } from "lucide-react";

const serviceLinks = [
  { href: "/stocks", label: "株式" },
  { href: "/macro", label: "マクロ" },
  { href: "/news", label: "ニュース" },
  { href: "/columns", label: "コラム" },
];

const supportLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "お問い合わせ" },
];

const socialLinks = [
  { href: "https://x.com", label: "X (Twitter)", icon: Twitter },
  { href: "https://youtube.com", label: "YouTube", icon: Youtube },
  { href: "https://discord.com", label: "Discord", icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer className="hidden md:block bg-navy text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="grid grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 group">
              <ScanLine className="h-6 w-6 text-accent-light transition-colors group-hover:text-accent" />
              <span className="text-lg font-bold tracking-tight">
                Kabu Lens
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-xs">
              株式市場を、もっとシャープに。
              <br />
              新NISA世代のための金融メディア。
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-9 w-9 rounded-[6px] bg-white/8 text-gray-400 transition-colors hover:bg-white/15 hover:text-white"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Service links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4">
              サービス
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4">
              サポート
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-xs text-gray-500">
            &copy; 2026 Kabu Lens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
