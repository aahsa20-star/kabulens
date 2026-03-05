"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Briefcase,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
} from "lucide-react";
import { createClient } from "@/lib/supabase-client";

type PortfolioItem = {
  id: string;
  user_id: string;
  ticker: string;
  company_name: string | null;
  shares: number;
  average_price: number;
  purchased_at: string | null;
  memo: string | null;
  created_at: string;
};

type Props = {
  initialData: PortfolioItem[];
  userId: string;
};

export default function PortfolioClient({ initialData, userId }: Props) {
  const [items, setItems] = useState<PortfolioItem[]>(initialData);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  // Form state
  const [ticker, setTicker] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [shares, setShares] = useState("");
  const [avgPrice, setAvgPrice] = useState("");
  const [purchasedAt, setPurchasedAt] = useState("");
  const [memo, setMemo] = useState("");

  // Summary
  const totalStocks = items.length;
  const totalInvestment = items.reduce(
    (sum, item) => sum + item.shares * item.average_price,
    0
  );

  function resetForm() {
    setTicker("");
    setCompanyName("");
    setShares("");
    setAvgPrice("");
    setPurchasedAt("");
    setMemo("");
    setError("");
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!ticker.trim() || !shares || !avgPrice) return;

    setAdding(true);
    setError("");

    const supabase = createClient();
    const { data, error: err } = await supabase
      .from("portfolios")
      .insert({
        user_id: userId,
        ticker: ticker.trim().toUpperCase(),
        company_name: companyName.trim() || null,
        shares: Number(shares),
        average_price: Number(avgPrice),
        purchased_at: purchasedAt || null,
        memo: memo.trim() || null,
      })
      .select()
      .single();

    if (err) {
      setError("追加に失敗しました");
    } else if (data) {
      setItems([data, ...items]);
      resetForm();
      setShowForm(false);
    }
    setAdding(false);
  }

  async function handleDelete(id: string) {
    const supabase = createClient();
    const { error: err } = await supabase
      .from("portfolios")
      .delete()
      .eq("id", id);

    if (!err) {
      setItems(items.filter((i) => i.id !== id));
    }
  }

  function formatCurrency(n: number): string {
    if (n >= 100000000) return `${(n / 100000000).toFixed(1)}億円`;
    if (n >= 10000) return `${Math.round(n / 10000)}万円`;
    return `${n.toLocaleString()}円`;
  }

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm p-5">
          <p className="text-xs text-gray-400 mb-1">保有銘柄数</p>
          <p className="text-2xl font-bold text-navy num">{totalStocks}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-5">
          <p className="text-xs text-gray-400 mb-1">合計投資額</p>
          <p className="text-2xl font-bold text-navy num">
            {totalInvestment > 0 ? formatCurrency(totalInvestment) : "—"}
          </p>
        </div>
      </div>

      {/* Add button / form */}
      <div className="bg-white rounded-lg shadow-sm">
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (!showForm) resetForm();
          }}
          className="w-full flex items-center justify-between p-5 text-sm font-bold text-navy hover:bg-gray-50 transition-colors rounded-lg"
        >
          <span className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-accent" />
            銘柄を追加
          </span>
          {showForm ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </button>

        {showForm && (
          <form onSubmit={handleAdd} className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  ティッカーコード *
                </label>
                <input
                  type="text"
                  required
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                  placeholder="例: 7203"
                  className="w-full rounded-lg border border-gray-200 bg-lightgray px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  会社名
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="例: トヨタ自動車"
                  className="w-full rounded-lg border border-gray-200 bg-lightgray px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  株数 *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="any"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  placeholder="例: 100"
                  className="w-full rounded-lg border border-gray-200 bg-lightgray px-3 py-2 text-sm text-navy num placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  平均取得単価 *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="any"
                  value={avgPrice}
                  onChange={(e) => setAvgPrice(e.target.value)}
                  placeholder="例: 2850"
                  className="w-full rounded-lg border border-gray-200 bg-lightgray px-3 py-2 text-sm text-navy num placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  購入日
                </label>
                <input
                  type="date"
                  value={purchasedAt}
                  onChange={(e) => setPurchasedAt(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-lightgray px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  メモ
                </label>
                <input
                  type="text"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="例: NISA枠で購入"
                  className="w-full rounded-lg border border-gray-200 bg-lightgray px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
            </div>
            {error && <p className="text-xs text-down">{error}</p>}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={adding || !ticker.trim() || !shares || !avgPrice}
                className="flex items-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-light transition-colors disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                追加
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="rounded-lg px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-100 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Holdings table */}
      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Briefcase className="mx-auto h-10 w-10 text-gray-300 mb-4" />
          <p className="text-sm font-medium text-gray-500 mb-2">
            まだ銘柄が登録されていません
          </p>
          <p className="text-xs text-gray-400">
            上の「銘柄を追加」ボタンからポートフォリオに追加できます
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                    銘柄
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                    株数
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                    平均取得単価
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                    投資額
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 hidden sm:table-cell">
                    メモ
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
                      {item.company_name && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.company_name}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-sm num text-navy">
                      {item.shares.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-sm num text-navy">
                      {item.average_price.toLocaleString()}円
                    </td>
                    <td className="px-4 py-3 text-right text-sm num text-navy font-medium">
                      {(item.shares * item.average_price).toLocaleString()}円
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 hidden sm:table-cell max-w-[200px] truncate">
                      {item.memo || "—"}
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

      {/* Disclaimer */}
      <div className="bg-amber-50 rounded-lg p-4 flex gap-3">
        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-amber-800 mb-1">ご注意</p>
          <p className="text-xs text-amber-700 leading-relaxed">
            このポートフォリオは記録用途のみです。投資判断の根拠として使用しないでください。
            表示されている情報は参考値であり、実際の取引条件とは異なる場合があります。
          </p>
        </div>
      </div>
    </div>
  );
}
