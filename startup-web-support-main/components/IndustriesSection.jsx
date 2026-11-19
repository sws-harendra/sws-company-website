"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  GraduationCap,
  HeartPulse,
  Luggage,
  Landmark,
  Truck,
  ShoppingCart,
  CalendarDays,
  Rocket,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const industriesData = [
  {
    icon: Home,
    name: "Real Estate",
    tag: "Property & Housing",
    subtitle:
      "Property search portals, broker CRM, 3D floorplans & automated lead gen.",
  },
  {
    icon: GraduationCap,
    name: "Education & EdTech",
    tag: "LMS & Learning",
    subtitle:
      "Interactive LMS portals, online exam engines, student apps & more.",
  },
  {
    icon: HeartPulse,
    name: "Healthcare & Clinics",
    tag: "Clinic & Hospital",
    subtitle:
      "Telemedicine apps, appointment scheduling, hospital ERP & digital care.",
  },
  {
    icon: Luggage,
    name: "Hospitality & Travel",
    tag: "Travel & Dining",
    subtitle:
      "Direct booking engines, room reservation portals, restaurant POS.",
  },
  {
    icon: Landmark,
    name: "Finance & Banking",
    tag: "FinTech & Billing",
    subtitle:
      "Secure banking solutions, fintech apps, and financial management tools.",
  },
  {
    icon: Truck,
    name: "Transport & Logistics",
    tag: "Fleet & Cargo",
    subtitle: "Fleet management, logistics tracking, and transport solutions.",
  },
  {
    icon: ShoppingCart,
    name: "eCommerce & Retail",
    tag: "B2B & D2C Stores",
    subtitle: "Online stores, inventory management, and retail solutions.",
  },
  {
    icon: CalendarDays,
    name: "Events & Media",
    tag: "Ticketing & Booking",
    subtitle: "Event booking, media platforms, and community engagement tools.",
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
    <section className="relative bg-gradient-to-b from-[#f8fbff] via-[#edf5ff] to-[#f8fbff] py-20 sm:py-24 font-sans overflow-hidden text-slate-900">
      {/* =========================================================================
          BACKGROUND AMBIENT LIGHTING (Clean, Soft & Seamless - No Clutter)
         ========================================================================= */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft Radial Ambient Glow Behind Header */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl h-[380px] bg-gradient-to-b from-[#009CDE]/10 via-sky-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Soft Corner Glows */}
        <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-gradient-to-br from-[#009CDE]/10 via-sky-200/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 -right-16 w-80 h-80 rounded-full bg-gradient-to-bl from-sky-200/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 left-1/3 w-80 h-80 rounded-full bg-sky-200/15 blur-3xl pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* =======================================================================
            HEADER (Matches Reference Layout with Brand Color Accent)
           ======================================================================= */}
        <motion.div
          className="text-center mb-14 sm:mb-18"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          {/* Master Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.14] mb-3 sm:mb-4">
            Industries We{" "}
            <span className="font-serif italic font-medium text-[#009CDE] px-1">
              Help Grow
            </span>
          </h2>

          {/* Subheading Narrative */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-normal px-2">
            Digital solutions built around the unique needs of your business.
          </p>

          {/* Center Brand Blue Accent Bar */}
          <div className="w-12 h-1 bg-[#009CDE] rounded-full mx-auto mt-4 sm:mt-5 shadow-[0_2px_8px_rgba(0,156,222,0.4)]" />
        </motion.div>

        {/* =======================================================================
            INDUSTRIES GRID (Crisp White Luxury Cards with Hover Highlights)
           ======================================================================= */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6.5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {industriesData.map((industry, index) => {
            const IconComponent = industry.icon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  openWhatsApp(`${industry.name} Industry Solutions`)
                }
                title={`Discuss ${industry.name} Solutions`}
                className="group relative bg-white rounded-[22px] sm:rounded-[24px] p-6 sm:p-7 border border-sky-100/80 shadow-[0_8px_25px_-4px_rgba(0,156,222,0.08),0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_-8px_rgba(0,156,222,0.22),0_0_20px_rgba(0,156,222,0.08)] hover:border-[#009CDE]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Left Accent Bar: Shows only on hover across all cards */}
                <div className="absolute left-0 top-6 bottom-6 w-1 sm:w-1.5 rounded-r-full bg-[#009CDE] opacity-0 group-hover:opacity-100 shadow-[0_0_8px_rgba(0,156,222,0.6)] transition-all duration-300" />

                {/* Card Top: Squircle Icon & Information */}
                <div>
                  {/* Squircle Icon Container */}
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-5 group-hover:scale-108 group-hover:bg-[#009CDE] group-hover:border-[#009CDE] transition-all duration-300 shadow-2xs">
                    <IconComponent className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-[#009CDE] group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Industry Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#009CDE] transition-colors tracking-tight">
                    {industry.name}
                  </h3>

                  {/* Industry Subtitle */}
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal mt-2 line-clamp-2">
                    {industry.subtitle}
                  </p>
                </div>

                {/* Card Bottom: "Explore Solutions" + Circular Arrow Button */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-[#009CDE] group-hover:text-[#0086bf] transition-colors">
                    Explore Solutions
                  </span>

                  {/* Circular Arrow Button */}
                  <div className="w-8 h-8 rounded-full bg-sky-50 border border-sky-100 text-[#009CDE] group-hover:bg-[#009CDE] group-hover:text-white group-hover:border-[#009CDE] group-hover:translate-x-1 flex items-center justify-center transition-all duration-300 shadow-2xs">
                    <ArrowRight className="w-4 h-4" />
                  </div>
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
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 sm:mt-18 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-white border border-sky-100 shadow-[0_8px_25px_rgba(0,156,222,0.08)] text-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#009CDE] shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-600">
                Don&apos;t see your industry listed? We build tailored digital
                systems for custom niches.
              </span>
            </div>
            <button
              onClick={() => openWhatsApp("Custom Industry Digital Solutions")}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#009CDE] hover:bg-[#0086bf] text-white font-bold text-xs sm:text-sm shadow-[0_4px_14px_rgba(0,156,222,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Talk to our solution architects</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;
