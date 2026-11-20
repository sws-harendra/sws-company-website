"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IoRocketOutline,
  IoGiftOutline,
  IoHeadsetOutline,
  IoFlashOutline,
  IoImagesOutline,
  IoServerOutline,
  IoTvOutline,
  IoColorPaletteOutline,
  IoLockClosedOutline,
  IoChatbubblesOutline,
  IoKeypadOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { Sparkles } from "lucide-react";

const benefitsData = [
  { icon: IoRocketOutline, text: "SEO-Friendly Design" },
  { icon: IoTvOutline, text: "Responsive across all devices" },
  { icon: IoGiftOutline, text: "FREE Support" },
  { icon: IoColorPaletteOutline, text: "Custom graphics and visuals" },
  { icon: IoHeadsetOutline, text: "Complete technical assistance" },
  { icon: IoLockClosedOutline, text: "SSL Installation" },
  { icon: IoFlashOutline, text: "Fast-Loading Pages" },
  { icon: IoChatbubblesOutline, text: "Contact Forms, WhatsApp & chatbot integration" },
  { icon: IoImagesOutline, text: "Licensed images" },
  { icon: IoKeypadOutline, text: " Admin access with training" },
  { icon: IoServerOutline, text: "Hosting, Domain and Logo" },
  { icon: IoDocumentTextOutline, text: " SEO-friendly content structure" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 14,
    },
  },
};

const BenefitsSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#1e88e5] via-[#1565c0] to-[#0d47a1] text-white py-16 sm:py-24 font-sans overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ================= SECTION HEADER ================= */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-cyan-200 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>All-Inclusive Value</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            What are the benefits of using Startup Web Support
          </h2>

          <p className="text-base sm:text-lg text-slate-100 max-w-3xl mx-auto leading-relaxed font-normal">
            At Startup Web Support, we don’t just make websites and hand them over. We focus on giving complete web development services that actually help your business move forward. Every project is handled differently, based on what your business needs, so the website works properly, stays secure, and is easy for you and your customers to use.
          </p>

          <div className="w-12 h-1 bg-cyan-300 rounded-full mx-auto mt-5 shadow-xs" />
        </motion.div>

        {/* ================= 12-BENEFIT GRID ================= */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {benefitsData.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-white/10 hover:bg-white/15 backdrop-blur-md p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/15 hover:border-cyan-300/50 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.15)] transition-all duration-300 flex items-center gap-4.5"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0 text-2xl text-cyan-300 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all duration-300 shadow-2xs">
                  <Icon />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {benefit.text}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
