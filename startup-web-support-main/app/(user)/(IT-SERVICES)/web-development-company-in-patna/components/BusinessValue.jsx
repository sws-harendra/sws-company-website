"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { openWhatsApp } from "@/lib/whatsapp";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const textChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 14 },
  },
};

const BusinessValue = () => {
  return (
    <section className="relative bg-gradient-to-b from-white via-sky-50/30 to-white py-16 sm:py-24 font-sans text-slate-900 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ================= SECTION HEADER ================= */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-wider text-[#1e88e5] mb-4 shadow-2xs"
            variants={textChildVariants}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1e88e5]" />
            <span>Market Growth &amp; Impact</span>
          </motion.div>

          <motion.p
            className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 italic tracking-tight"
            variants={textChildVariants}
          >
            &ldquo;Leading Web Development Company in Patna for Your Business&rdquo;
          </motion.p>

          <motion.p
            className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto"
            variants={textChildVariants}
          >
            Today, more than 70% of Indian businesses are already online, and customers now
            expect to find every service on the internet. If your business is not visible
            digitally, you are likely losing enquiries every day. Working with a reliable
            web development company in patna helps you build a solid online base that
            supports real business growth, not just online presence.
            <br className="hidden sm:inline" />
            <br className="hidden sm:inline" />
            We use practical tools and the right technologies to create websites that load
            fast, work smoothly on mobile, and are ready for search engines from day one.
            As a growing web development agency, we focus on results that matter to local
            businesses — more calls, more enquiries, and better trust. Many businesses see
            clear improvement in visibility and leads after getting their website done by a
            professional website development company in patna, and that is why they continue with us for updates and support.
          </motion.p>

          {/* High-Impact Stat Banner */}
          <motion.div
            className="mt-8 inline-block"
            variants={textChildVariants}
          >
            <div className="relative group bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 text-white rounded-2xl px-6 sm:px-8 py-3.5 sm:py-4 shadow-[0_12px_28px_-6px_rgba(2,132,199,0.35)] border border-sky-400/30">
              <div className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-lg font-bold">
                <TrendingUp className="w-5 h-5 text-cyan-200 flex-shrink-0" />
                <span>(70%) of Indian businesses are on internet now. Why aren&apos;t you?</span>
              </div>
            </div>
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mt-8"
            variants={textChildVariants}
          >
            Does hiring a Web Development Company in Patna add value to your business in India?
          </motion.h2>

          <div className="w-12 h-1 bg-[#1e88e5] rounded-full mx-auto mt-5 shadow-xs" />
        </motion.div>

        {/* ================= 2-COLUMN CONTENT & VISUAL SHOWCASE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & Value proposition */}
          <motion.div
            className="lg:col-span-6 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_10px_35px_-8px_rgba(0,0,0,0.06)] space-y-5"
              variants={textChildVariants}
            >
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                Use most leading technologies - the fastest growing Web Development Company in Patna for fast mobile responsive and SEO-friendly Website Development Services in Patna, Bihar. More than 70% of small businesses have a Website, whereas 30% of small businesses with a Website make more than 30% of their profit online. And 27% Of Business Owners use a Web Development Company in Patna for their Web support.
              </p>

              <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <Zap className="w-5 h-5" />
                </div>
                <p className="text-slate-800 text-sm sm:text-base font-medium">
                  Website Development Services in Patna,{" "}
                  <strong className="text-sky-600 font-bold">app development</strong>, and{" "}
                  <strong className="text-sky-600 font-bold">SEO Services</strong>
                </p>
              </div>

              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                To know more about your Web development needs for your venture for faster development, contact us for FREE Web Consulting. Hire Startup Web Support now for the best Website Development Services in Patna.
              </p>

              <div className="pt-2">
                <motion.button
                  onClick={() => openWhatsApp("Hiring for Website Development")}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 text-base font-bold text-white bg-gradient-to-r from-[#009CDE] to-[#0086bf] hover:from-[#0086bf] hover:to-[#0074a6] rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,156,222,0.4)] hover:shadow-[0_14px_30px_-5px_rgba(0,156,222,0.5)] transition-all duration-200 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Hire Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Modern Mockup Card */}
          <motion.div
            className="lg:col-span-6 flex justify-center"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full max-w-lg">
              {/* Soft decorative background glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-400/20 to-blue-500/20 rounded-3xl blur-2xl pointer-events-none -z-10" />

              <div className="relative bg-white rounded-3xl p-3 sm:p-4 border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                <img
                  src="/hero.jpg"
                  alt="Business Value Illustration"
                  className="w-full h-auto rounded-2xl object-cover"
                />

                {/* Floating pill badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-slate-950/85 backdrop-blur-md text-white rounded-2xl p-4 border border-white/20 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-300 font-medium">Proven Digital Standards</p>
                      <h4 className="text-sm font-bold text-white">Fast, Responsive &amp; SEO-Ready</h4>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold">
                    100% Reliable
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BusinessValue;
