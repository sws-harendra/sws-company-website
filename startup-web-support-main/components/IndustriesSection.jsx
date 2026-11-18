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
    <section className="relative bg-gradient-to-b from-[#1e88e5] via-[#1565c0] to-[#1e88e5] py-20 sm:py-20 font-sans overflow-hidden text-white">
      {/* =========================================================================
          BACKGROUND AMBIENT LIGHTING & GLOW
         ========================================================================= */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-[450px] bg-cyan-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-sky-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-[-5%] w-[450px] h-[450px] bg-blue-400/15 rounded-full blur-3xl" />

        {/* Subtle Tech Grid Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />
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
          {/* Master Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.14] mb-4 sm:mb-5">
            Industries We{" "}
            <span className="font-serif italic font-medium text-cyan-300 drop-shadow-sm px-1">
              Serve
            </span>
          </h2>
          {/* Subheading Narrative */}
          <p className="text-base sm:text-lg md:text-xl text-blue-100/90 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-normal px-2">
            Tailored digital platforms, custom software, and high-performance
            marketing funnels built to address the unique challenges of your
            sector.
          </p>
        </motion.div>

        {/* =======================================================================
            INDUSTRIES GRID (Crisp White High-Contrast Luxury Cards)
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
                onClick={() =>
                  openWhatsApp(`${industry.name} Industry Solutions`)
                }
                className="group relative overflow-hidden flex flex-col justify-between bg-white p-6 sm:p-6.5 rounded-[26px] border border-white shadow-[0_12px_32px_-6px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_48px_-6px_rgba(0,0,0,0.26),0_0_24px_rgba(34,211,238,0.35)] transition-all duration-300 cursor-pointer before:absolute before:top-0 before:inset-x-0 before:h-[3px] before:bg-gradient-to-r before:from-transparent before:via-[#009CDE] before:to-transparent"
              >
                {/* Luminous Inner Corner Ambient Glow */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-sky-100/70 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                {/* Subtle Interior Tint */}
                <div className="absolute inset-0 bg-gradient-to-b from-sky-50/30 via-transparent to-blue-50/20 pointer-events-none rounded-[26px]" />

                {/* Card Top Section: Icon Hub & Information */}
                <div className="relative z-10 flex flex-col items-start text-left">
                  {/* Icon Hub Container (Borderless 3D Soft Cushion) */}
                  <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100/80 shadow-[0_4px_14px_-2px_rgba(0,156,222,0.18),inset_0_1px_2px_rgba(255,255,255,1)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-[0_8px_20px_-2px_rgba(0,156,222,0.28)] transition-all duration-300 mb-5">
                    <Image
                      src={iconSrc}
                      alt={industry.name}
                      width={40}
                      height={40}
                      className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Industry Category Tag */}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#009CDE] mb-1.5">
                    {industry.tag}
                  </span>

                  {/* Industry Title */}
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#009CDE] transition-colors tracking-tight">
                    {industry.name}
                  </h3>

                  {/* Industry Subtitle / Capability Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal mt-2 line-clamp-2">
                    {industry.subtitle}
                  </p>
                </div>

                {/* Bottom Interactive Link */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#009CDE] group-hover:text-[#0086bf] transition-colors relative z-10">
                  <span>Explore Solutions</span>
                  <ArrowUpRight className="w-4 h-4 text-[#009CDE] group-hover:text-[#0086bf] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* =======================================================================
            BOTTOM CUSTOM CONSULTATION BANNER
           ======================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 sm:mt-18 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-white text-slate-800 shadow-xl">
            <span className="text-xs sm:text-sm font-medium text-slate-600">
              Don&apos;t see your industry listed? We build tailored digital
              systems for custom niches.
            </span>
            <button
              onClick={() => openWhatsApp("Custom Industry Digital Solutions")}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#009CDE] hover:text-[#0086bf] underline underline-offset-4 transition-colors"
            >
              <span>Talk to our solution architects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;
