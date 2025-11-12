"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui Button (optional)
import { X } from "lucide-react";

export default function ThinTopBanner({
  message = "Limited time offer: 20% off — use CODE: SAVE20",
  href = "#",
  accent = "bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600",
  showClose = true,
  autoHideSeconds = 0, // >0 to auto-hide after N seconds
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!autoHideSeconds || autoHideSeconds <= 0) return;
    const t = setTimeout(() => setVisible(false), autoHideSeconds * 1000);
    return () => clearTimeout(t);
  }, [autoHideSeconds]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${accent} text-white text-[11px] leading-none`}
      role="region"
      aria-label="Top announcement banner"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Left: message (clickable) */}
          <a
            href={href}
            className="flex-1 truncate px-2 md:px-4 text-center text-[11px] font-medium hover:underline"
            aria-label="Offer details"
          >
            {message}
          </a>

          {/* Right: optional CTA + close */}
          <div className="flex items-center gap-1 pr-1">
            <Button
              asChild
              size="sm"
              className="h-6 min-h-0 px-2 py-0 text-[11px] rounded-md hidden sm:inline-flex"
            >
              <a href={href} aria-label="View offer">
                View
              </a>
            </Button>

            {showClose && (
              <button
                onClick={() => setVisible(false)}
                className="p-1 rounded hover:bg-white/20 ml-1"
                aria-label="Close announcement"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
