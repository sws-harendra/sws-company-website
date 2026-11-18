"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Sparkles, 
  Smartphone, 
  Code2, 
  Globe, 
  TrendingUp, 
  CheckCircle2,
  ShieldCheck,
  Zap,
  Cpu,
  Layers
} from "lucide-react";
import { SiGoogleads, SiMeta, SiReact } from "react-icons/si";

export default function NewHeroSection() {
  const [avatarError1, setAvatarError1] = useState(false);
  const [avatarError2, setAvatarError2] = useState(false);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full bg-white text-slate-900 overflow-hidden flex flex-col justify-center pt-8 sm:pt-14 pb-14 sm:pb-20 font-sans">
      
      {/* =========================================================================
          BACKGROUND PATTERNS & TECH MESH (Fills empty areas with brand blue theme)
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none -z-10 select-none overflow-hidden" aria-hidden="true">
        
        {/* Soft Radial Brand Blue Ambient Lights (#009CDE / #0284c7) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[1000px] h-[550px] rounded-full bg-gradient-to-tr from-[#009CDE]/12 via-sky-100/40 to-blue-50/60 blur-3xl opacity-90" />
        <div className="absolute top-12 left-[6%] w-[380px] h-[380px] rounded-full bg-sky-100/50 blur-3xl opacity-75" />
        <div className="absolute top-16 right-[6%] w-[420px] h-[420px] rounded-full bg-blue-100/45 blur-3xl opacity-75" />
        <div className="absolute bottom-6 left-[18%] w-[460px] h-[460px] rounded-full bg-sky-50/80 blur-3xl opacity-80" />
        <div className="absolute bottom-10 right-[15%] w-[400px] h-[400px] rounded-full bg-[#009CDE]/8 blur-3xl opacity-70" />

        {/* Seamless Blueprint Tech Grid with Subtle Crosshairs */}
        <svg className="absolute inset-0 w-full h-full text-[#009CDE]/[0.055]">
          <defs>
            <pattern id="sws-hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
              <circle cx="0" cy="0" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect 
            width="100%" 
            height="100%" 
            fill="url(#sws-hero-grid)" 
            style={{
              maskImage: "radial-gradient(ellipse 90% 80% at 50% 48%, #000 55%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 48%, #000 55%, transparent 100%)"
            }}
          />
        </svg>

        {/* Modern Connecting Tech Waves & Orbital Arcs */}
        <svg className="absolute inset-0 w-full h-full text-[#009CDE]/10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M -100 250 C 300 180, 500 350, 900 240 C 1300 130, 1600 290, 1900 210" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 6" />
          <path d="M -100 480 C 400 540, 700 410, 1100 490 C 1500 570, 1750 440, 2000 510" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
        </svg>

        {/* Ambient Orbit Tech Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[880px] h-[880px] rounded-full border border-sky-200/35 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1220px] h-[1220px] rounded-full border border-sky-300/25 border-dashed pointer-events-none" />

        {/* Subtle Decorative Floating Micro-Tags to eliminate empty quadrants */}
        <div className="hidden xl:flex absolute top-[18%] left-[28%] items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 border border-sky-100 text-[11px] font-medium text-sky-700/80 shadow-xs">
          <Zap className="w-3 h-3 text-[#009CDE]" /> High-Performance
        </div>
        <div className="hidden xl:flex absolute top-[22%] right-[27%] items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 border border-sky-100 text-[11px] font-medium text-sky-700/80 shadow-xs">
          <ShieldCheck className="w-3 h-3 text-[#009CDE]" /> 99.9% Scalable & Secure
        </div>
        <div className="hidden xl:flex absolute bottom-[18%] left-[30%] items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 border border-sky-100 text-[11px] font-medium text-sky-700/80 shadow-xs">
          <Cpu className="w-3 h-3 text-[#009CDE]" /> Clean Modern Architecture
        </div>
        <div className="hidden xl:flex absolute bottom-[22%] right-[29%] items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 border border-sky-100 text-[11px] font-medium text-sky-700/80 shadow-xs">
          <Layers className="w-3 h-3 text-[#009CDE]" /> Full-Cycle Support
        </div>

        {/* Decorative Geometric Crosshairs & Star Accents */}
        <div className="absolute top-24 left-[14%] text-[#009CDE]/30 text-lg font-mono">✦</div>
        <div className="absolute top-32 right-[18%] text-[#009CDE]/35 text-xl font-mono">✦</div>
        <div className="absolute bottom-36 left-[12%] text-sky-400/40 text-base font-mono">✦</div>
        <div className="absolute bottom-28 right-[14%] text-[#009CDE]/30 text-lg font-mono">✦</div>
        <div className="absolute top-1/3 left-[4%] text-slate-300/60 text-xs font-mono">+</div>
        <div className="absolute top-2/3 right-[4%] text-slate-300/60 text-xs font-mono">+</div>
      </div>

      {/* =========================================================================
          HERO MAIN CONTENT AREA (Relative container holding center & floating cards)
         ========================================================================= */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center py-4 sm:py-8">

        {/* -----------------------------------------------------------------------
            DESKTOP & TABLET FLOATING CARDS (Matches reference layout & requested icons)
           ----------------------------------------------------------------------- */}

        {/* 1. TOP LEFT: "20+ Countries Served" & GOOGLE ADS CARD */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: [-8, 8, -8],
            rotate: [0, 1, -1, 0]
          }}
          transition={{ 
            opacity: { duration: 0.6, delay: 0.1 },
            y: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.05, y: -10 }}
          className="hidden md:flex absolute top-2 lg:top-4 left-2 lg:left-6 xl:left-12 z-20 items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-sky-100 shadow-[0_12px_28px_-8px_rgba(0,156,222,0.12)] hover:shadow-[0_18px_35px_-8px_rgba(0,156,222,0.22)] transition-all cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 flex items-center justify-center text-[#009CDE] shadow-xs group-hover:scale-105 transition-transform">
            <SiGoogleads className="w-6 h-6 text-[#4285F4]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-slate-900 tracking-tight">20+</span>
              <span className="text-xs font-medium text-slate-500">Countries Served</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-bold text-[#009CDE]">Google Ads</span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                5.4x ROAS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Search & Performance Max</p>
          </div>
        </motion.div>

        {/* 2. TOP RIGHT: "500+ Projects Delivered" & APP DEVELOPMENT CARD */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: [8, -8, 8],
            rotate: [0, -1, 1, 0]
          }}
          transition={{ 
            opacity: { duration: 0.6, delay: 0.2 },
            y: { duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
            rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.05, y: -10 }}
          className="hidden md:flex absolute top-2 lg:top-4 right-2 lg:right-6 xl:right-12 z-20 items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-sky-100 shadow-[0_12px_28px_-8px_rgba(0,156,222,0.12)] hover:shadow-[0_18px_35px_-8px_rgba(0,156,222,0.22)] transition-all cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 flex items-center justify-center text-[#009CDE] shadow-xs group-hover:scale-105 transition-transform">
            <Smartphone className="w-6 h-6 text-[#009CDE]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-slate-900 tracking-tight">500+</span>
              <span className="text-xs font-medium text-slate-500">Projects Delivered</span>
            </div>
            <p className="text-xs font-bold text-[#009CDE] mt-0.5">App Development</p>
            <p className="text-[11px] text-slate-400 font-medium">iOS & Android • High Performance</p>
          </div>
        </motion.div>

        {/* 3. MID-LEFT DECORATIVE CHIP: REACT / ATOM BADGE (Exact match to reference screenshot) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [-6, 6, -6],
            rotate: [0, 4, -4, 0]
          }}
          transition={{ 
            opacity: { duration: 0.5, delay: 0.3 },
            y: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
            rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.12, rotate: 12 }}
          className="hidden lg:flex absolute top-[44%] -translate-y-1/2 left-3 xl:left-8 z-20 w-13 h-13 rounded-2xl bg-sky-50/95 backdrop-blur-sm border border-sky-200/80 items-center justify-center text-[#009CDE] shadow-md shadow-sky-500/10 cursor-pointer"
          title="React & Next.js Ecosystem"
        >
          <SiReact className="w-7 h-7 text-[#009CDE] animate-spin-slow" />
        </motion.div>

        {/* 4. MID-RIGHT DECORATIVE CHIP: CODE BRACKET </ > CHIP (Exact match to reference screenshot) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [6, -6, 6],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            opacity: { duration: 0.5, delay: 0.35 },
            y: { duration: 5.0, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
            rotate: { duration: 8.5, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.12, rotate: -12 }}
          className="hidden lg:flex absolute top-[40%] -translate-y-1/2 right-3 xl:right-8 z-20 w-13 h-13 rounded-2xl bg-sky-50/95 backdrop-blur-sm border border-sky-200/80 items-center justify-center text-[#009CDE] shadow-md shadow-sky-500/10 font-mono font-extrabold text-xl cursor-pointer"
          title="Clean Architecture Code"
        >
          {"</>"}
        </motion.div>

        {/* 5. BOTTOM LEFT: "10+ Years of Excellence" & WEBSITE DEVELOPMENT CARD (Exact match to reference) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: [-7, 7, -7],
            rotate: [0, -1, 1, 0]
          }}
          transition={{ 
            opacity: { duration: 0.6, delay: 0.3 },
            y: { duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
            rotate: { duration: 7.2, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.05, y: -8 }}
          className="hidden md:flex absolute bottom-2 lg:bottom-4 left-2 lg:left-6 xl:left-12 z-20 items-center gap-3.5 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-sky-100 shadow-[0_12px_28px_-8px_rgba(0,156,222,0.12)] hover:shadow-[0_18px_35px_-8px_rgba(0,156,222,0.22)] transition-all cursor-pointer group"
        >
          {/* Real Photo Avatar matching reference image man in suit */}
          <div className="relative">
            {!avatarError1 ? (
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&auto=format&fit=crop&q=80"
                alt="10+ Years Excellence"
                className="w-12 h-12 rounded-xl object-cover border border-sky-100 shadow-xs"
                onError={() => setAvatarError1(true)}
              />
            ) : (
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-sky-100 to-blue-100 border border-sky-200 shadow-xs flex items-center justify-center">
                <Code2 className="w-6 h-6 text-[#009CDE]" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-slate-900 tracking-tight">10+</span>
              <span className="text-xs font-semibold text-slate-600">Years of Excellence</span>
            </div>
            <p className="text-xs font-bold text-[#009CDE]">Website Development</p>
            <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
              {"★★★★★"}
              <span className="text-slate-400 font-normal">Next.js & Custom Portals</span>
            </div>
          </div>
        </motion.div>

        {/* 6. BOTTOM RIGHT: "100+ IT Engineers" & META ADS CARD (Exact match to reference style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: [7, -7, 7],
            rotate: [0, 1, -1, 0]
          }}
          transition={{ 
            opacity: { duration: 0.6, delay: 0.35 },
            y: { duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
            rotate: { duration: 6.8, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.05, y: -8 }}
          className="hidden md:flex absolute bottom-2 lg:bottom-4 right-2 lg:right-6 xl:right-12 z-20 flex-col bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-sky-100 shadow-[0_12px_28px_-8px_rgba(0,156,222,0.12)] hover:shadow-[0_18px_35px_-8px_rgba(0,156,222,0.22)] transition-all cursor-pointer group"
        >
          {/* Top Label */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs font-bold text-[#009CDE]">100+ IT Engineers</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-600 font-medium">Active</span>
            </div>
          </div>

          {/* Photo Card matching soft blue background portrait in reference screenshot */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-sky-100 border border-sky-200/80 shadow-xs flex-shrink-0">
              {!avatarError2 ? (
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80"
                  alt="IT Engineer"
                  className="w-full h-full object-cover"
                  onError={() => setAvatarError2(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <SiMeta className="w-6 h-6 text-[#009CDE]" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <SiMeta className="w-3.5 h-3.5 text-[#009CDE]" />
                <span className="text-xs font-bold text-slate-800">Meta Ads & SMM</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">10M+ Targeted Reach</p>
            </div>
          </div>
        </motion.div>

        {/* -----------------------------------------------------------------------
            CENTER HERO CONTENT (Pill badge, Heading, Subhead, CTA Buttons)
           ----------------------------------------------------------------------- */}
        <div className="relative z-10 text-center max-w-3xl sm:max-w-4xl mx-auto px-2 sm:px-4 py-8 sm:py-14 flex flex-col items-center">
          
          {/* Top Capsule Badge: "Driving Digital Growth" (Brand Blue Theme) */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-[#009CDE] text-xs sm:text-sm font-semibold shadow-xs mb-6 sm:mb-8 backdrop-blur-sm hover:bg-sky-100/70 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#009CDE] animate-pulse" />
            <span className="tracking-wide">Driving Digital Growth</span>
          </motion.div>

          {/* Main Headline (Highlighting "Businesses" with distinctive serif font & brand blue) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight text-slate-900 leading-[1.14] sm:leading-[1.16] mb-5 sm:mb-6"
          >
            Empowering{" "}
            <span className="font-serif italic font-medium text-[#009CDE] px-1 drop-shadow-xs">
              Businesses
            </span>{" "}
            with <br className="hidden sm:inline" />
            <span className="text-slate-900">Next-Gen IT Solutions</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-8 sm:mb-10"
          >
            Building secure, scalable, and innovative IT solutions for modern businesses.
          </motion.p>

          {/* Call-to-Action Buttons (Uniform Brand Blue Theme) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
          >
            {/* Primary Button: Get Started (Signature Brand Blue #009CDE) */}
            <Link
              href="/contact-us"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#009CDE] hover:bg-[#0086bf] active:bg-[#0074a6] rounded-xl shadow-lg shadow-[#009CDE]/25 hover:shadow-[#009CDE]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Get Started
            </Link>

            {/* Secondary Button: Our Work (Matching Soft Sky Blue Tint) */}
            <Link
              href="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-[#009CDE] bg-sky-50/90 hover:bg-sky-100 active:bg-sky-200/70 border border-sky-200/80 rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Our Work
            </Link>
          </motion.div>

          {/* -----------------------------------------------------------------------
              MOBILE-ONLY FEATURED CARDS (Visible only on small screens < md)
              Clean responsive grid of the 4 requested services in brand blue
             ----------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-3 mt-10 w-full md:hidden"
          >
            {/* Google Ads */}
            <div className="bg-white/95 p-3 rounded-xl border border-sky-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center mb-1.5">
                <SiGoogleads className="w-4 h-4 text-[#4285F4]" />
              </div>
              <span className="text-xs font-bold text-slate-800">Google Ads</span>
              <span className="text-[10px] text-emerald-600 font-semibold">5.4x ROAS Certified</span>
            </div>

            {/* App Development */}
            <div className="bg-white/95 p-3 rounded-xl border border-sky-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center mb-1.5">
                <Smartphone className="w-4 h-4 text-[#009CDE]" />
              </div>
              <span className="text-xs font-bold text-slate-800">App Development</span>
              <span className="text-[10px] text-slate-500">500+ Apps Delivered</span>
            </div>

            {/* Website Development */}
            <div className="bg-white/95 p-3 rounded-xl border border-sky-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center mb-1.5">
                <Code2 className="w-4 h-4 text-[#009CDE]" />
              </div>
              <span className="text-xs font-bold text-slate-800">Website Dev</span>
              <span className="text-[10px] text-slate-500">10+ Years Excellence</span>
            </div>

            {/* Meta Ads */}
            <div className="bg-white/95 p-3 rounded-xl border border-sky-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center mb-1.5">
                <SiMeta className="w-4 h-4 text-[#009CDE]" />
              </div>
              <span className="text-xs font-bold text-slate-800">Meta Ads</span>
              <span className="text-[10px] text-[#009CDE] font-semibold">10M+ Reach</span>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}