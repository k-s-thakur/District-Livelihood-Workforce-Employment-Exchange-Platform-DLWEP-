"use client";

import React, { useEffect } from "react";
import { useNotificationStore } from "@/lib/notificationStore";
import { Bell, X } from "lucide-react";

export default function PwaPushBanner() {
  const { activeToast, dismissToast } = useNotificationStore();

  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [activeToast, dismissToast]);

  if (!activeToast) return null;

  return (
    <div className="fixed top-4 right-4 z-9999 max-w-sm w-full bg-ink text-white rounded-md shadow-2xl border border-white/10 p-4 transition-all duration-300 transform translate-y-0 scale-100 flex items-start gap-3 animate-slide-in">
      <div className="bg-primary/20 p-2 rounded-full text-primary shrink-0 mt-0.5">
        <Bell className="w-5 h-5 text-primary fill-primary" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold uppercase tracking-wider text-primary">DLWEP Push Alert</h4>
        <p className="text-sm font-semibold text-white mt-1 leading-snug">{activeToast.title}</p>
        <p className="text-xs text-muted mt-0.5 leading-normal">{activeToast.message}</p>
      </div>

      <button
        onClick={dismissToast}
        className="text-white/60 hover:text-white transition-colors shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
