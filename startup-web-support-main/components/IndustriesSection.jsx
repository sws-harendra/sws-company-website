"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowUpRight, ArrowRight } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const industriesData = [
  {
    icon: "/realstate.png",
    name: "Real Estate",
    tag: "Property & Housing",
    subtitle:
      "Property search portals, broker CRM, 3D floorplans & automated lead pipelines.",
  },
  {
    icon: "/education.png",
    name: "Education & EdTech",
    tag: "LMS & Learning",
    subtitle:
      "Interactive LMS portals, online exam engines, student apps & fee management.",
  },
  {
    icon: "/healthcare.png",
    name: "Healthcare & Clinics",
    tag: "Clinic & Hospital",
    subtitle:
      "Telemedicine apps, appointment scheduling, hospital ERP & digital health records.",
  },
  {
    icon: "/hospitality.png",
    name: "Hospitality & Travel",
    tag: "Travel & Dining",
    subtitle:
      "Direct booking engines, room reservation portals, restaurant POS & loyalty apps.",
  },
  {
    icon: "/finance.png",
    name: "Finance & Banking",
    tag: "FinTech & Billing",
    subtitle:
      "GST invoicing, loan management portals, payment integrations & secure audit trails.",
  },
  {
    icon: "/transport.png",
    name: "Transport & Logistics",
    tag: "Fleet & Cargo",
    subtitle:
      "Real-time GPS tracking, dispatch portals, delivery driver apps & inventory flow.",
  },
  {
    icon: "/ecomerce.png",
    name: "eCommerce & Retail",
    tag: "B2B & D2C Stores",
    subtitle:
      "High-conversion online stores, multi-vendor marketplaces & omni-channel POS.",
  },
  {
    icon: "/event.png",
    name: "Events & Media",
    tag: "Ticketing & Booking",
    subtitle:
      "Online ticket booking engines, QR pass verification & sponsor showcase portals.",
  },
];

const IndustriesSection = () => {
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
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 14,
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-[#1e88e5] via-[#1976d2] to-[#1e88e5] py-20 sm:py-24 font-sans overflow-hidden text-white">
      {/* =========================================================================
          BACKGROUND AMBIENT LIGHTING & GLOW (Soft Neutral Aura)
         ========================================================================= */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft Ambient Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-[450px] bg-white/12 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-[-5%] w-[450px] h-[450px] bg-sky-200/12 rounded-full blur-3xl" />

        {/* Subtle Grid Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-35" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* =======================================================================
            HEADER (Expert Typography & Announcement Capsule)
           ======================================================================= */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          {/* Announcement Capsule */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4 sm:mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-200" />
            <span>Cross-Industry Excellence</span>
          </div>

          {/* Master Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.14] mb-4 sm:mb-5">
            Industries We{" "}
            <span className="font-serif italic font-medium text-sky-100 drop-shadow-sm px-1">
              Serve
            </span>
          </h2>
          {/* Subheading Narrative */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-normal px-2">
            Tailored digital platforms, custom software, and high-performance
            marketing funnels built to address the unique challenges of your
            sector.
          </p>
        </motion.div>

        {/* =======================================================================
            INDUSTRIES GRID (Crisp Frosted Glass Cards - Bright & Low-Shade)
           ======================================================================= */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {industriesData.map((industry, index) => {
            const iconSrc = industry.icon.startsWith("/")
              ? industry.icon
              : `/${industry.icon}`;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.025, y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  openWhatsApp(`${industry.name} Industry Solutions`)
                }
                title={`Discuss ${industry.name} Solutions`}
                className="group relative overflow-hidden flex flex-col justify-between rounded-[26px] p-6 sm:p-6.5 bg-gradient-to-b from-white/[0.25] via-white/[0.18] to-white/[0.14] hover:from-white/[0.34] hover:via-white/[0.24] hover:to-white/[0.20] backdrop-blur-2xl border border-white/35 hover:border-white/65 shadow-[0_8px_30px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.45)] hover:shadow-[0_16px_38px_rgba(0,0,0,0.18),0_0_24px_rgba(255,255,255,0.25)] transition-all duration-300 cursor-pointer before:absolute before:top-0 before:inset-x-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-white/75 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity duration-300"
              >
                {/* Luminous Inner Corner Glow (Clean White Highlight) */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-white/20 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                {/* Subtle Interior Tint */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none rounded-[26px]" />

                {/* Card Top Section: Icon Hub & Information */}
                <div className="relative z-10 flex flex-col items-start text-left">
                  {/* Icon Hub Container (Bright Frosted Cushion) */}
                  <div className="w-16 h-16 rounded-[20px] bg-white/30 border border-white/40 backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.6)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-white/40 group-hover:border-white/60 transition-all duration-300 mb-5">
                    <Image
                      src={iconSrc}
                      alt={industry.name}
                      width={38}
                      height={38}
                      className="object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Industry Category Tag */}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200 mb-1.5 flex items-center gap-1.5">
                    {industry.tag}
                  </span>

                  {/* Industry Title */}
                  <h3 className="text-xl font-extrabold text-white tracking-tight">
                    {industry.name}
                  </h3>

                  {/* Industry Subtitle / Capability Description */}
                  <p className="text-xs sm:text-[13px] text-white/85 group-hover:text-white leading-relaxed font-normal mt-2 line-clamp-2 transition-colors">
                    {industry.subtitle}
                  </p>
                </div>

                {/* Bottom Interactive Link */}
                <div className="mt-5 pt-3.5 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white group-hover:text-sky-100 transition-colors relative z-10">
                  <span>Explore Solutions</span>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:text-sky-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* =======================================================================
            BOTTOM CUSTOM CONSULTATION BANNER (Frosted Glass with White CTA)
           ======================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 sm:mt-18 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-white/20 hover:bg-white/25 backdrop-blur-2xl border border-white/30 hover:border-white/50 text-white shadow-[0_8px_28px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.4)] transition-all duration-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-200 shrink-0 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-white/95">
                Don&apos;t see your industry listed? We build tailored digital
                systems for custom niches.
              </span>
            </div>
            <button
              onClick={() => openWhatsApp("Custom Industry Digital Solutions")}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white hover:bg-white/90 text-[#0f5ca8] font-bold text-xs sm:text-sm shadow-[0_4px_16px_rgba(0,0,0,0.14)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.22)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Talk to our solution architects</span>
              <ArrowRight className="w-4 h-4 text-[#0f5ca8]" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;
