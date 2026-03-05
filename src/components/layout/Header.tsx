"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ScanLine,
  ChevronDown,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import UserMenu from "@/components/auth/UserMenu";

type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const navLinks: NavItem[] = [
  { href: "/", label: "ホーム" },
  { href: "/stocks", label: "株式" },
  {
    href: "/macro",
    label: "マーケット",
    children: [
      { href: "/macro", label: "マーケット概況" },
      { href: "/macro/fed", label: "FRBウォッチャー" },
      { href: "/macro/boj", label: "日銀ウォッチャー" },
    ],
  },
  { href: "/trending", label: "トレンド" },
  { href: "/news", label: "ニュース" },
  { href: "/earnings", label: "決算" },
];

export default function Header() {
  const pathname = usePathname();
  const { user, loading: authLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const submenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenSubmenu(null);
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

  // Close submenu on outside click
  useEffect(() => {
    if (!openSubmenu) return;
    function handleClick(e: MouseEvent) {
      if (submenuRef.current && !submenuRef.current.contains(e.target as Node)) {
        setOpenSubmenu(null);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openSubmenu]);

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
          <nav className="hidden md:flex items-center gap-1" ref={submenuRef}>
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (link.children) {
                return (
                  <div key={link.href} className="relative">
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === link.href ? null : link.href)
                      }
                      className={`flex items-center gap-0.5 px-3 py-1.5 text-sm font-medium rounded-[6px] transition-colors ${
                        isActive
                          ? "text-accent bg-accent/8"
                          : "text-gray-600 hover:text-navy hover:bg-gray-100"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${
                          openSubmenu === link.href ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openSubmenu === link.href && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                        {link.children.map((child) => {
                          const childActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                childActive
                                  ? "text-accent bg-accent/5 font-medium"
                                  : "text-gray-600 hover:text-navy hover:bg-gray-50"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

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

            {/* Auth */}
            <div className="hidden md:block">
              {authLoading ? (
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
              ) : user ? (
                <UserMenu email={user.email ?? ""} />
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 rounded-[6px] bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-light transition-colors"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  ログイン
                </Link>
              )}
            </div>

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

              if (link.children) {
                return (
                  <div key={link.href}>
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === link.href ? null : link.href)
                      }
                      className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-[8px] transition-colors ${
                        isActive
                          ? "text-accent bg-accent/8"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openSubmenu === link.href ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openSubmenu === link.href && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2.5 text-sm rounded-[6px] transition-colors ${
                              pathname === child.href
                                ? "text-accent bg-accent/5 font-medium"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

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
          {/* Mobile auth */}
          <div className="px-4 py-4 border-t border-gray-100">
            {authLoading ? null : user ? (
              <div className="space-y-1">
                <p className="px-4 py-2 text-xs text-gray-400 truncate">{user.email}</p>
                <Link href="/dashboard" className="block px-4 py-3 text-base font-medium text-gray-700 rounded-[8px] hover:bg-gray-50">マイページ</Link>
                <Link href="/watchlist" className="block px-4 py-3 text-base font-medium text-gray-700 rounded-[8px] hover:bg-gray-50">お気に入り</Link>
                <Link href="/portfolio" className="block px-4 py-3 text-base font-medium text-gray-700 rounded-[8px] hover:bg-gray-50">ポートフォリオ</Link>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full rounded-lg bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
              >
                <LogIn className="h-4 w-4" />
                ログイン / 新規登録
              </Link>
            )}
          </div>
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
