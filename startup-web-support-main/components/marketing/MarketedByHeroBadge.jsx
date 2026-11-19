"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Phone, Sparkles, ArrowRight } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

export default function MarketedByHeroBadge({ marketer }) {
  if (!marketer) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello ${marketer.name}! I am visiting your Startup Web Support marketing partner page and would like to discuss my project.`,
  );
  const whatsappUrl = `https://wa.me/${marketer.whatsapp}?text=${whatsappMessage}`;
  const phoneUrl = `tel:${marketer.phone.replace(/\s+/g, "")}`;

  return (
    <div className="relative z-40 bg-gradient-to-r from-blue-900 via-sky-800 to-indigo-900 text-white shadow-md border-b border-blue-400/20 text-xs sm:text-sm py-2.5 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
        {/* Left Side: Co-branding indication */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 font-medium text-slate-100">
            <span className="text-blue-200">Marketed by:</span>
            <strong className="text-white font-semibold underline decoration-sky-400 decoration-2 underline-offset-2">
              {marketer.name}
            </strong>
            <span className="hidden md:inline text-slate-300">
              • Authorized SWS Representative
            </span>
          </div>
        </div>

        {/* Right Side: Quick Action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <Link
            href={phoneUrl}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white font-medium text-[11px] sm:text-xs"
          >
            <Phone className="w-3.5 h-3.5 text-sky-300" />
            <span className="hidden sm:inline">{marketer.phone}</span>
            <span className="sm:hidden">Call</span>
          </Link>

          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-[11px] sm:text-xs shadow-sm transition-all"
          >
            <BsWhatsapp className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
