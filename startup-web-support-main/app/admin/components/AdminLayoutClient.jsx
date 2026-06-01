"use client";

import React from "react";
import Sidebar from "./sidebar";
import AdminHeader from "./AdminHeader";
import CustomScrollbar from "./CustomScrollbar";
import { useAdminTheme } from "../(main)/context/AdminThemeContext";

export default function AdminLayoutClient({ children }) {
  const { isAdminDark } = useAdminTheme();

  return (
    <div className={`h-screen w-screen overflow-hidden flex flex-col ${isAdminDark ? "dark bg-transparent text-zinc-50" : "bg-transparent text-zinc-900"} transition-colors duration-300`}>
      {/* Top Header */}
      <AdminHeader />

      {/* Main Admin Panels Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar Container */}
        <div className="h-full flex-shrink-0 z-20">
          <Sidebar />
        </div>

        {/* Content Container — uses branded thin custom scrollbar */}
        <main className="flex-1 h-full overflow-hidden bg-transparent dark:bg-transparent transition-colors duration-300">
          <CustomScrollbar className="h-full pt-2 pb-4 px-4 md:px-6">
            <div className="animate-fade-in flex-1 flex flex-col min-h-full">
              {children}
            </div>
          </CustomScrollbar>
        </main>
      </div>
    </div>
  );
}
