"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  LayoutDashboard,
  Star,
  Briefcase,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase-client";

type Props = {
  email: string;
};

const menuItems = [
  { href: "/dashboard", label: "マイページ", icon: LayoutDashboard },
  { href: "/watchlist", label: "お気に入り", icon: Star },
  { href: "/portfolio", label: "ポートフォリオ", icon: Briefcase },
];

export default function UserMenu({ email }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.refresh();
    router.push("/");
  }

  const initial = email.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-white text-sm font-bold hover:bg-accent-light transition-colors"
        aria-label="ユーザーメニュー"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          {/* Email */}
          <div className="px-4 py-2.5 border-b border-gray-100">
            <p className="text-xs text-gray-400 truncate">{email}</p>
          </div>

          {/* Menu items */}
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-navy hover:bg-gray-50 transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}

          {/* Logout */}
          <div className="border-t border-gray-100 mt-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-down hover:bg-gray-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              ログアウト
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
