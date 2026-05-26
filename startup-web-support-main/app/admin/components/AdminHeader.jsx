"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Maximize, Minimize, LogOut, Clock, Calendar, User, ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../(main)/context/AuthContext";
import { useAdminTheme } from "../(main)/context/AdminThemeContext";
import Image from "next/image";
import Link from "next/link";

const AdminHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { isAdminDark, toggleAdminTheme } = useAdminTheme();
  
  const [time, setTime] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Digital Clock and Date
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen to fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Toggle Fullscreen Mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Humanize path for breadcrumbs
  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((seg, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace("-", " ");
      return { label, href, isLast: index === segments.length - 1 };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200/50 dark:border-zinc-800/50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-300">
      {/* Brand Logo & Breadcrumbs */}
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <Link href="/admin/dashboard" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white p-1 transition-transform group-hover:scale-105 shadow-sm">
            <Image 
              src="/sws-logo.png" 
              alt="SWS Logo" 
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#029bd2] dark:text-white">
              Startup Web Support
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
              Admin Portal
            </span>
          </div>
        </Link>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-zinc-200 dark:bg-zinc-800" />

        {/* Breadcrumbs */}
        <nav className="hidden sm:flex items-center space-x-2 text-sm font-medium">
          {breadcrumbs.map((crumb, idx) => (
            <div key={crumb.href} className="flex items-center">
              {idx > 0 && <ChevronRight className="w-4 h-4 mx-1 text-zinc-400 dark:text-zinc-600" />}
              {crumb.isLast ? (
                <span className="text-[#029bd2] font-semibold dark:text-[#029bd2]/90">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Clock & Controls */}
      <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
        {/* Real-time Clock Card */}
        <div className="flex items-center space-x-3 bg-zinc-100/80 dark:bg-zinc-900/80 px-4 py-2 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner text-zinc-700 dark:text-zinc-300 font-mono text-sm leading-none transition-colors">
          <div className="flex items-center space-x-1.5 border-r border-zinc-200 dark:border-zinc-800 pr-2">
            <Calendar className="w-3.5 h-3.5 text-[#029bd2]" />
            <span className="hidden lg:inline">{dateStr}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-[#1a4468] dark:text-sky-400" />
            <span className="font-bold tracking-widest">{time}</span>
          </div>
        </div>

        {/* Theme and Fullscreen Toggle Buttons */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher */}
          <button
            onClick={toggleAdminTheme}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all cursor-pointer shadow-sm relative group"
            title="Toggle Theme"
          >
            {isAdminDark ? (
              <Sun className="w-5 h-5 text-amber-500 dark:text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-5 h-5 text-[#1a4468]" />
            )}
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow">
              {isAdminDark ? "Light Mode" : "Dark Mode"}
            </span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all cursor-pointer shadow-sm relative group"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize className="w-5 h-5 text-[#029bd2]" />
            ) : (
              <Maximize className="w-5 h-5 text-[#1a4468] dark:text-zinc-300" />
            )}
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow">
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </span>
          </button>
        </div>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />

        {/* User Profile Info & Sign Out */}
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-zinc-50 to-zinc-100/50 dark:from-zinc-900 dark:to-zinc-900/50 p-1.5 pr-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm transition-colors">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1a4468] to-[#029bd2] flex items-center justify-center text-white text-xs font-bold shadow-md shadow-[#029bd2]/10">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : <User className="w-4 h-4" />}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                {user?.name || "Admin SWS"}
              </span>
              <span className="text-[9px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                {user?.role?.name || "Super Admin"}
              </span>
            </div>
          </div>

          {/* Quick Logout */}
          <button
            onClick={logout}
            className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-950 bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-all cursor-pointer shadow-sm group relative"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            <span className="absolute top-full mt-2 right-0 bg-rose-600 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow">
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
