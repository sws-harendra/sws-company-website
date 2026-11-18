"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Star,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";

// Dynamic Headlines provided by user to cycle every 5 seconds
const headlineItems = [
  {
    prefix: "Grow Your",
    highlight: "Business",
    suffix: "& Reach More Customers",
  },
  {
    prefix: "Turn Website Visitors into",
    highlight: "Paying Customers",
    suffix: "",
  },
  {
    prefix: "Generate More Leads.",
    highlight: "Win More Business.",
    suffix: "",
  },
  {
    prefix: "Build Your Digital Presence.",
    highlight: "Expand Your Reach.",
    suffix: "",
  },
  {
    prefix: "Get More Customers with",
    highlight: "Powerful Digital Solutions",
    suffix: "",
  },
  {
    prefix: "Scale Your",
    highlight: "Business",
    suffix: "with Smart Technology",
  },
  {
    prefix: "Turn Your Ideas into",
    highlight: "Business Success",
    suffix: "",
  },
  {
    prefix: "Transform Your",
    highlight: "Business",
    suffix: "into a Digital Leader",
  },
  {
    prefix: "Empowering",
    highlight: "Businesses",
    suffix: "with Next-Gen IT Solutions",
  },
];

export default function NewHeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Cycle text every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % headlineItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentItem = headlineItems[currentTextIndex];

  return (
    <section className="relative isolate min-h-[85vh] lg:min-h-[90vh] w-full bg-white text-slate-900 overflow-hidden flex flex-col justify-center pt-8 sm:pt-14 pb-14 sm:pb-24 font-sans">
      {/* =========================================================================
          BACKGROUND: 
          FULL-SCREEN AMBIENT VERTICAL LIGHT SHAFTS (100% Width, Pure Center)
         ========================================================================= */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Pure White Aura behind center text ONLY */}
        <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-5xl h-[520px] bg-white rounded-full blur-3xl opacity-100" />

        {/* Top Horizon Glow Source spanning 100% full screen width */}
        <div className="absolute top-0 inset-x-0 w-full h-36 bg-gradient-to-b from-[#38bdf8]/18 via-[#009CDE]/06 to-transparent" />
        <div className="absolute top-0 inset-x-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#38bdf8]/70 via-[#009CDE]/60 to-transparent" />

        {/* Full-Width Soft Vertical Light Pillars */}
        <div className="absolute top-0 inset-x-0 w-full h-[760px] pointer-events-none overflow-hidden flex justify-between px-2 sm:px-6 md:px-12 lg:px-20 xl:px-28">
          <div className="w-10 sm:w-20 lg:w-28 h-full bg-gradient-to-b from-[#38bdf8]/18 via-[#009CDE]/05 to-transparent blur-xl" />
          <div className="w-12 sm:w-24 lg:w-32 h-full bg-gradient-to-b from-sky-300/15 via-[#009CDE]/04 to-transparent blur-xl" />
          <div className="w-14 sm:w-28 lg:w-36 h-full bg-gradient-to-b from-[#009CDE]/14 via-sky-200/03 to-transparent blur-xl" />
          <div className="w-16 sm:w-32 lg:w-40 h-full bg-gradient-to-b from-sky-400/12 via-[#009CDE]/03 to-transparent blur-xl" />

          {/* Center Cleared Area for Pure Text Readability */}
          <div className="w-28 sm:w-56 lg:w-72 h-full bg-gradient-to-b from-sky-100/10 to-transparent blur-2xl" />

          <div className="w-16 sm:w-32 lg:w-40 h-full bg-gradient-to-b from-sky-400/12 via-[#009CDE]/03 to-transparent blur-xl" />
          <div className="w-14 sm:w-28 lg:w-36 h-full bg-gradient-to-b from-[#009CDE]/14 via-sky-200/03 to-transparent blur-xl" />
          <div className="w-12 sm:w-24 lg:w-32 h-full bg-gradient-to-b from-sky-300/15 via-[#009CDE]/04 to-transparent blur-xl" />
          <div className="w-10 sm:w-20 lg:w-28 h-full bg-gradient-to-b from-[#38bdf8]/18 via-[#009CDE]/05 to-transparent blur-xl" />
        </div>

        {/* Fine Vertical Light Pins spanning 100% width */}
        <div className="absolute top-0 inset-x-0 w-full h-[580px] flex justify-between px-4 sm:px-10 md:px-20 lg:px-28 xl:px-36 opacity-35">
          <div className="w-[1px] h-full bg-gradient-to-b from-[#38bdf8] via-[#009CDE]/20 to-transparent" />
          <div className="w-[1px] h-full bg-gradient-to-b from-sky-300 via-[#009CDE]/20 to-transparent" />
          <div className="w-[1px] h-full bg-gradient-to-b from-[#38bdf8] via-[#009CDE]/20 to-transparent" />
          <div className="w-[1px] h-full bg-gradient-to-b from-[#009CDE]/40 to-transparent" />
          <div className="w-[1px] h-full bg-gradient-to-b from-[#009CDE]/40 to-transparent" />
          <div className="w-[1px] h-full bg-gradient-to-b from-[#38bdf8] via-[#009CDE]/20 to-transparent" />
          <div className="w-[1px] h-full bg-gradient-to-b from-sky-300 via-[#009CDE]/20 to-transparent" />
          <div className="w-[1px] h-full bg-gradient-to-b from-[#38bdf8] via-[#009CDE]/20 to-transparent" />
        </div>
      </div>

      {/* =========================================================================
          HERO MAIN CONTENT AREA (Grand, High-Converting, Ultra-Premium Center)
         ========================================================================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center text-center">
        {/* 1. TOP PREMIUM ANNOUNCEMENT BADGE */}

        {/* 2. DYNAMIC ANIMATED HEADLINE (Grand Scale, Master Typography) */}
        <div className="w-full min-h-[120px] sm:min-h-[160px] md:min-h-[200px] lg:min-h-[230px] flex items-center justify-center mb-5 sm:mb-7">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentTextIndex}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(4px)" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-black tracking-tight text-slate-900 leading-[1.14] sm:leading-[1.08] max-w-5xl mx-auto drop-shadow-xs"
            >
              {currentItem.prefix && (
                <span className="inline mr-2 sm:mr-3.5 text-slate-900">
                  {currentItem.prefix}
                </span>
              )}
              <span className="font-serif italic font-medium bg-gradient-to-r from-[#009CDE] via-[#0086bf] to-[#0668E1] bg-clip-text text-transparent inline px-1.5 drop-shadow-xs">
                {currentItem.highlight}
              </span>
              {currentItem.suffix && (
                <span className="inline ml-2 sm:ml-3.5 text-slate-900">
                  {currentItem.suffix}
                </span>
              )}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* 3. ELEGANT EXPLANATORY SUBHEADING */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl md:text-2xl text-slate-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-normal mb-8 sm:mb-11 px-2"
        >
          Building secure, scalable, and innovative digital solutions for modern
          businesses. Custom web development, high-performance mobile apps, and
          ROI-driven digital growth.
        </motion.p>

        {/* 4. CALL-TO-ACTION BUTTONS (High-Converting, Tactile, Luxury) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full sm:w-auto px-4 sm:px-0"
        >
          {/* Primary CTA */}
          <Link
            href="/contact-us"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#009CDE] to-[#0086bf] hover:from-[#0086bf] hover:to-[#0074a6] rounded-2xl shadow-[0_14px_32px_-6px_rgba(0,156,222,0.42)] hover:shadow-[0_18px_38px_-6px_rgba(0,156,222,0.52)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/portfolio"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 text-base sm:text-lg font-bold text-slate-800 bg-white/95 hover:bg-sky-50/70 border border-slate-200/90 hover:border-sky-300 rounded-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-xs backdrop-blur-sm"
          >
            <span>Explore Our Work</span>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#009CDE] transition-colors" />
          </Link>
        </motion.div>

        {/* 5. REFINED TRUST & SOCIAL PROOF STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/70 w-full max-w-3xl flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-500 font-medium"
        >
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="font-bold text-slate-900">4.9/5 Rating</span>
            <span className="text-slate-400">(100+ Reviews)</span>
          </div>

          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#009CDE]" />
            <span className="font-semibold text-slate-700">
              150+ Projects Delivered
            </span>
          </div>

          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />
        </motion.div>
      </div>
    </section>
  );
}
