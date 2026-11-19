"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Smartphone,
  CheckCircle2,
  Users,
  ArrowRight,
  Sparkles,
  Star,
  ShieldCheck,
  Zap,
} from "lucide-react";
import ContactUs from "@/components/ContactUs";
import { openWhatsApp } from "@/lib/whatsapp";

const statsData = [
  {
    icon: Rocket,
    endValue: 5,
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: Smartphone,
    endValue: 20,
    suffix: "+",
    label: "Apps Developed",
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

const AppDevHero = () => {
  return (
    <section className="relative isolate w-full bg-white text-slate-900 overflow-hidden font-sans pt-8 sm:pt-14 pb-14 sm:pb-20">
      {/* =========================================================================
          BACKGROUND: 
          FULL-SCREEN AMBIENT VERTICAL LIGHT SHAFTS (Matches Landing Page Hero)
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
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* H1 Title with Grand Typography */}
          <motion.h1
            className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.12] drop-shadow-xs"
            variants={textChildVariants}
          >
            <span>Startup Web Support </span>
          </motion.h1>

          {/* Subheading Intro */}
          <motion.p
            className="text-sm text-slate-600 max-w-3xl mx-auto mt-2 sm:mt-5 leading-relaxed font-normal"
            variants={textChildVariants}
          >
            Want to get a mobile application according to your needs? SWS is
            here to help you get the best options ensuring that you get all the
            latest features.
          </motion.p>
        </motion.div>

        {/* =========================================================================
            MAIN SECTION: 2-COLUMN GRID (Content + Contact Us Form)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-12 sm:mt-12">
          {/* Left Column: Heading, Description & Action */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-5 tracking-tight"
              variants={textChildVariants}
            >
              A Pioneer in{" "}
              <span className="bg-gradient-to-r from-[#009CDE] via-[#0086bf] to-[#0668E1] bg-clip-text text-transparent">
                Mobile App Development Services
              </span>{" "}
              in Patna
            </motion.h2>

            <motion.p
              className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 font-normal"
              variants={textChildVariants}
            >
              If you are searching for mobile app development in patna, you
              don’t need to look further. At Startup Web Support, we help
              businesses turn their ideas into working mobile applications
              without making the process complicated or expensive. We focus on
              practical apps that solve real problems and are easy for users to
              understand.
            </motion.p>

            <motion.div variants={textChildVariants}>
              <motion.button
                onClick={() => openWhatsApp("Mobile App Development in Patna")}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#009CDE] to-[#0086bf] hover:from-[#0086bf] hover:to-[#0074a6] rounded-2xl shadow-[0_14px_32px_-6px_rgba(0,156,222,0.42)] hover:shadow-[0_18px_38px_-6px_rgba(0,156,222,0.52)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get Quotation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                  iOS & Android
                </span>
              </div>

              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />

              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-slate-700">
                  Agile Delivery
                </span>
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
              {/* Ultra-soft ambient back glow that diffuses seamlessly without harsh cutoffs */}
              <div
                className="absolute -inset-4 bg-gradient-to-b from-[#38bdf8]/15 via-[#009CDE]/08 to-transparent rounded-[36px] blur-2xl pointer-events-none -z-10"
                aria-hidden="true"
              />

              <ContactUs page="mobile-app-development-services-in-patna" />
            </div>
          </motion.div>
        </div>

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

export default AppDevHero;
