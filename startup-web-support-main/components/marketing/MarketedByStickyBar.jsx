"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, X, ShieldCheck, Sparkles } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

export default function MarketedByStickyBar({ marketer }) {
  const [dismissed, setDismissed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!marketer || dismissed || !scrolled) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello ${marketer.name}! I am on your Startup Web Support marketing partner page and would like to ask some questions.`,
  );
  const whatsappUrl = `https://wa.me/${marketer.whatsapp}?text=${whatsappMessage}`;
  const phoneUrl = `tel:${marketer.phone.replace(/\s+/g, "")}`;

  return (
    <aside
      aria-label="Marketing partner consultation bar"
      className="fixed bottom-3 left-3 right-3 sm:right-auto sm:left-6 sm:bottom-6 z-40 max-w-md w-auto bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl shadow-2xl p-3.5 sm:p-4 animate-in slide-in-from-bottom-5 sm:slide-in-from-left-5 duration-300"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span>Marketed by</span>
              <span className="font-semibold text-white truncate">
                {marketer.name}
              </span>
            </div>
            <p className="text-[11px] text-emerald-400 font-medium truncate">
              Authorized Partner • SWS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Link
            href={phoneUrl}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-xs font-medium"
            title={`Call ${marketer.phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-sky-300" />
            <span className="hidden sm:inline">Call</span>
          </Link>

          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-md"
            title="Chat on WhatsApp"
          >
            <BsWhatsapp className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </Link>

          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors ml-1"
            aria-label="Dismiss partner bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
