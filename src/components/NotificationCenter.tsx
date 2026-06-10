"use client";

import React, { useState, useRef, useEffect } from "react";
import { useNotificationStore } from "@/lib/notificationStore";
import { Bell, Trash2 } from "lucide-react";

export default function NotificationCenter() {
  const { notifications, markAllAsRead, clearNotifications } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      // Auto-read on open
      markAllAsRead();
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      
      {/* Bell Button */}
      <button
        onClick={handleToggle}
        className="relative p-2.5 rounded-full hover:bg-surface-soft transition-colors cursor-pointer border border-hairline-soft"
        aria-label="View Notifications"
      >
        <Bell className="w-5 h-5 text-ink" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Floating Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white border border-hairline rounded-md airbnb-shadow z-50 overflow-hidden">
          
          {/* Header */}
          <div className="px-4 py-3 border-b border-hairline-soft flex items-center justify-between bg-surface-soft">
            <span className="text-xs font-bold text-ink uppercase tracking-wider">
              Alerts & Notifications
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={clearNotifications}
                className="text-muted hover:text-primary transition-colors text-[10px] font-bold flex items-center gap-0.5"
                title="Clear all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-hairline-soft">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-xs text-muted">
                No notifications to display
              </div>
            ) : (
              notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={`p-4 transition-colors ${
                    n.isRead ? "bg-white" : "bg-primary/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${
                      n.isRead ? "text-ink" : "text-primary"
                    }`}>
                      {n.title}
                    </span>
                    <span className="text-[9px] text-muted-soft">
                      {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-1 leading-normal">
                    {n.message}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Footer view */}
          <div className="px-4 py-2 border-t border-hairline-soft bg-surface-soft text-center">
            <span className="text-[10px] text-muted font-semibold">
              District Livelihood Workforce alerts
            </span>
          </div>

        </div>
      )}

    </div>
  );
}
