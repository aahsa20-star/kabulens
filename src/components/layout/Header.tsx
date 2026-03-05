"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ScanLine,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/stocks", label: "株式" },
  { href: "/macro", label: "マクロ" },
  { href: "/news", label: "ニュース" },
  { href: "/columns", label: "コラム" },
  { href: "/earnings", label: "決算" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200/60">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <ScanLine className="h-6 w-6 text-accent transition-colors group-hover:text-accent-light" />
              <span className="text-lg font-bold tracking-tight text-navy">
                Kabu Lens
              </span>
            </Link>
            <span className="hidden lg:block text-xs text-gray-400 pl-3 border-l border-gray-200">
              株式市場を、もっとシャープに。
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm font-medium rounded-[6px] transition-colors ${
                    isActive
                      ? "text-accent bg-accent/8"
                      : "text-gray-600 hover:text-navy hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <button
              type="button"
              className="flex items-center gap-2 rounded-[6px] border border-gray-200 bg-lightgray px-3 py-1.5 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-100"
              aria-label="検索"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">検索</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-gray-300 bg-white px-1.5 py-0.5 text-[10px] font-mono text-gray-400">
                <span className="text-xs">&#8984;</span>K
              </kbd>
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center rounded-[6px] p-2 text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-40 bg-white">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 text-base font-medium rounded-[8px] transition-colors ${
                    isActive
                      ? "text-accent bg-accent/8"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="px-8 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              株式市場を、もっとシャープに。
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
