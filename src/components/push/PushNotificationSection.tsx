"use client";

import { Bell } from "lucide-react";
import PushNotificationToggle from "./PushNotificationToggle";
import { useAuth } from "@/components/auth/AuthProvider";

export default function PushNotificationSection() {
  const { user } = useAuth();

  if (!user) return null;
  if (typeof window === "undefined") return null;
  if (!("serviceWorker" in navigator) || !("PushManager" in window))
    return null;

  return (
    <section className="mb-8">
      <div className="bg-white rounded-lg shadow-sm p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Bell className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-navy">プッシュ通知</h3>
            <p className="text-xs text-gray-500">
              決算速報・朝刊レポートをリアルタイムで受け取れます
            </p>
          </div>
        </div>
        <PushNotificationToggle />
      </div>
    </section>
  );
}
