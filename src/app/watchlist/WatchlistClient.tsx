"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Star, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase-client";

type WatchlistItem = {
  id: string;
  user_id: string;
  ticker: string;
  company_name: string | null;
  created_at: string;
};

type Props = {
  initialData: WatchlistItem[];
  userId: string;
};

export default function WatchlistClient({ initialData, userId }: Props) {
  const [items, setItems] = useState<WatchlistItem[]>(initialData);
  const [ticker, setTicker] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!ticker.trim()) return;

    setAdding(true);
    setError("");

    const supabase = createClient();
    const { data, error: err } = await supabase
      .from("watchlists")
      .insert({
        user_id: userId,
        ticker: ticker.trim().toUpperCase(),
        company_name: companyName.trim() || null,
      })
      .select()
      .single();

    if (err) {
      if (err.code === "23505") {
        setError("この銘柄は既に登録されています");
      } else {
        setError("追加に失敗しました");
      }
    } else if (data) {
      setItems([data, ...items]);
      setTicker("");
      setCompanyName("");
    }
    setAdding(false);
  }

  async function handleDelete(id: string) {
    const supabase = createClient();
    const { error: err } = await supabase
      .from("watchlists")
      .delete()
      .eq("id", id);

    if (!err) {
      setItems(items.filter((i) => i.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      {/* Add form */}
      <div className="bg-white rounded-lg shadow-sm p-5">
        <h2 className="text-sm font-bold text-navy mb-4">銘柄を追加</h2>
        <form onSubmit={handleAdd} className="flex flex-wrap gap-3">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="ティッカーコード（例: 7203）"
            className="flex-1 min-w-[140px] rounded-lg border border-gray-200 bg-lightgray px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
          />
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="会社名（任意）"
            className="flex-1 min-w-[140px] rounded-lg border border-gray-200 bg-lightgray px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
          />
          <button
            type="submit"
            disabled={adding || !ticker.trim()}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-light transition-colors disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            追加
          </button>
        </form>
        {error && (
          <p className="mt-2 text-xs text-down">{error}</p>
        )}
      </div>

      {/* Watchlist table */}
      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Star className="mx-auto h-10 w-10 text-gray-300 mb-4" />
          <p className="text-sm font-medium text-gray-500 mb-2">
            まだ銘柄が登録されていません
          </p>
          <p className="text-xs text-gray-400">
            上のフォームから追加するか、
            <Link
              href="/stocks/japan"
              className="text-accent hover:text-accent-light"
            >
              銘柄詳細ページ
            </Link>
            の ☆ ボタンから追加できます
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                    銘柄コード
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                    会社名
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <Link
                        href={`/stocks/${item.ticker}`}
                        className="text-sm font-medium text-accent hover:text-accent-light num"
                      >
                        {item.ticker}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-navy">
                      {item.company_name || "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-400 hover:text-down transition-colors p-1"
                        aria-label="削除"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
