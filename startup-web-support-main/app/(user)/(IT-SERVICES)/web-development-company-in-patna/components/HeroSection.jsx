"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Globe,
  CheckCircle2,
  Users,
  ArrowRight,
  Star,
  Zap,
  ShieldCheck,
  Code2,
} from "lucide-react";
import ContactUs from "@/components/ContactUs";
import { openWhatsApp } from "@/lib/whatsapp";

const statsData = [
  {
    icon: Rocket,
    endValue: 7,
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: Globe,
    endValue: 500,
    suffix: "+",
    label: "Websites Delivered",
  },
  {
    icon: CheckCircle2,
    endValue: 100,
    suffix: "%",
    label: "Projects Delivered",
  },
  {
    icon: Users,
    endValue: 100,
    suffix: "%",
    label: "Client Satisfaction",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const textChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const HeroSection = () => {
  return (
    <section className="relative isolate w-full bg-white text-slate-900 overflow-hidden font-sans pt-8 sm:pt-14 pb-14 sm:pb-20">
      {/* =========================================================================
          BACKGROUND: FULL-SCREEN AMBIENT VERTICAL LIGHT SHAFTS (Matches App Dev Hero)
         ========================================================================= */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Pure White Aura behind center text */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-5xl h-[520px] bg-white rounded-full blur-3xl opacity-100" />

        {/* Top Horizon Glow Source spanning full width */}
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

        {/* Fine Vertical Light Pins */}
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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* =========================================================================
            TOP SECTION: GRAND TITLE & LEAD-IN (Strict Content Preservation)
           ========================================================================= */}
        {/* =========================================================================
            MAIN SECTION: 2-COLUMN GRID (Content + Contact Us Form)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-10 sm:mt-12">
          {/* Left Column: Heading, Description & Action */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 mb-3"
              variants={textChildVariants}
            >
              <Code2 className="w-4 h-4 text-sky-600" />
              <span>Tailored Digital Engineering</span>
            </motion.div>

            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-5 tracking-tight"
              variants={textChildVariants}
            >
              Transform Your Online Presence with a High-Performance{" "}
              <span className="bg-gradient-to-r from-[#009CDE] via-[#0086bf] to-[#0668E1] bg-clip-text text-transparent">
                Website Development Company
              </span>{" "}
              in Patna
            </motion.h2>

            <motion.p
              className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 font-normal"
              variants={textChildVariants}
            >
              Your website is often the base for any digital system or customer
              journey. At Startup Web Support, we design and build fast,
              responsive, and SEO-friendly websites that turn everyday visitors
              into loyal paying customers.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              variants={textChildVariants}
            >
              <motion.button
                onClick={() => openWhatsApp("Web Development in Patna")}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#009CDE] to-[#0086bf] hover:from-[#0086bf] hover:to-[#0074a6] rounded-2xl shadow-[0_14px_32px_-6px_rgba(0,156,222,0.42)] hover:shadow-[0_18px_38px_-6px_rgba(0,156,222,0.52)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>FREE Quote!</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <span className="text-slate-400 font-bold text-sm hidden sm:inline">
                OR
              </span>

              <motion.button
                onClick={() => openWhatsApp("Web Development Packages")}
                className="inline-flex items-center justify-center px-7 py-3.5 text-base font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border-2 border-sky-600/30 rounded-2xl transition-all duration-200 cursor-pointer shadow-xs hover:border-sky-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Our Packages
              </motion.button>
            </motion.div>

            {/* Social Proof & Trust Strip */}
            <motion.div
              variants={textChildVariants}
              className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 font-medium"
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
              </div>

              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />

              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#009CDE]" />
                <span className="font-semibold text-slate-700">
                  100+ Clients
                </span>
              </div>

              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />

              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-slate-700">Since 2017</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form with Glassmorphic Card Styling */}
          <motion.div
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg">
              {/* Ultra-soft ambient back glow */}
              <div
                className="absolute -inset-4 bg-gradient-to-b from-[#38bdf8]/15 via-[#009CDE]/08 to-transparent rounded-[36px] blur-2xl pointer-events-none -z-10"
                aria-hidden="true"
              />

              <ContactUs page="web-development-company-in-patna" />
            </div>
          </motion.div>
        </div>{" "}
        <motion.div
          className="text-center max-w-4xl  mt-12 sm:mt-28   mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-xs font-bold uppercase tracking-wider text-[#1e88e5] mb-4 shadow-2xs backdrop-blur-xs"
            variants={textChildVariants}
          >
            <span className="bg-sky-600 text-white text-[11px] font-bold rounded-full px-2.5 py-0.5">
              Best
            </span>
            <span>Website Development Services in Patna</span>
          </motion.div>

          {/* H1 Title with Grand Typography */}
          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.15] drop-shadow-xs"
            variants={textChildVariants}
          >
            <span className="block text-xl sm:text-2xl md:text-3xl text-slate-500 font-semibold mb-2">
              Leading Web Development Company in Patna.
            </span>
            <span>
              Web Development Company In Patna, Bihar{" "}
              <span className="bg-gradient-to-r from-[#009CDE] via-[#0086bf] to-[#0668E1] bg-clip-text text-transparent">
                Trusted by 500+ Clients
              </span>
            </span>
          </motion.h1>

          {/* Subheading Intro */}
          <motion.p
            className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto mt-4 sm:mt-5 leading-relaxed font-normal"
            variants={textChildVariants}
          >
            Trusted by 500+ clients since 2017. We provide custom website
            design, SEO, and app development services in Patna &amp; Bihar to
            help local businesses grow.
            <br className="hidden sm:inline" />
            <br className="hidden sm:inline" />
            Looking for a reliable web partner in Bihar? We help local
            businesses build a strong online identity. Startup Web Support helps
            businesses build strong online identities through professional
            websites, applications, and digital solutions at practical and
            affordable pricing.
          </motion.p>
        </motion.div>
        {/* =========================================================================
            BOTTOM SECTION: STATS CARDS (High-Impact Modern Metrics)
           ========================================================================= */}
        <div className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-slate-200/80">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={textChildVariants}
                  className="group relative bg-white/95 backdrop-blur-xs border border-slate-200/80 hover:border-sky-300 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-300 text-center flex flex-col items-center justify-center hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#009CDE] flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#009CDE] group-hover:text-white transition-colors duration-300 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                    {stat.endValue}
                    <span className="text-[#009CDE]">{stat.suffix}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 sm:mt-1.5">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
