"use client";
import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function BlockedPage() {
  const handleRetry = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 p-6 font-sans">
      <div className="max-w-md w-full text-center space-y-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
        <div className="flex justify-center">
          <div className="p-4 bg-amber-500/10 rounded-full text-amber-500 border border-amber-500/20">
            <AlertCircle className="w-12 h-12" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">An Error Occurred</h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            We are unable to process your request at this time. Please try again later or contact support if the issue persists.
          </p>
        </div>

        <div className="pt-4">
          <button
            onClick={handleRetry}
            className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold text-sm border border-zinc-700 hover:border-zinc-600 transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}
