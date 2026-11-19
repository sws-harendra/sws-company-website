"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAndroid, FaApple, FaCashRegister, FaLink } from "react-icons/fa";
import { Sparkles, ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import Image from "next/image";
import { openWhatsApp } from "@/lib/whatsapp";

const servicesData = [
  {
    icon: FaAndroid,
    tabName: "Android",
    tagline: "Google Play & Device Ecosystem",
    badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    accentGradient: "from-emerald-500 to-teal-500",
    title: "Custom Android App Development",
    description:
      "We build Android apps that are secure, simple to use, and fit well within your budget. Our main focus is how the app performs in real life, making sure it runs smoothly and users can use it without any confusion.",
    image: "/mobile-app.jpg",
    floatingBadge: "High Performance & Stability",
  },
  {
    icon: FaApple,
    tabName: "iPhone",
    tagline: "Apple iOS Standards & Swift",
    badgeColor: "bg-slate-100 text-slate-900 border-slate-200",
    accentGradient: "from-slate-700 to-slate-900",
    title: "Elegant iOS App Solutions",
    description:
      "We develop high-quality iOS applications using modern tools so the app feels smooth, reliable, and premium. Everything is built keeping Apple standards in mind, so your app works properly from day one.",
    image: "/app-dev.png",
    floatingBadge: "Premium Native Experience",
  },
  {
    icon: FaCashRegister,
    tabName: "POP",
    tagline: "Point of Sale & Billing Management",
    badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
    accentGradient: "from-blue-500 to-cyan-500",
    title: "Point of Sale (POS) Systems",
    description:
      "We create custom POS systems that help you manage billing, inventory, and reports from one single system. It makes daily business work easier and saves time for shop owners and managers.",
    image: "/web.svg",
    floatingBadge: "Centralized Retail Operations",
  },
  {
    icon: FaLink,
    tabName: "Blockchain",
    tagline: "Decentralized & Future-Ready",
    badgeColor: "bg-purple-50 text-purple-600 border-purple-100",
    accentGradient: "from-purple-500 to-indigo-600",
    title: "Decentralized Blockchain Applications",
    description:
      "We develop secure and transparent blockchain-based solutions for businesses that need modern and future-ready systems. These applications are built to handle data safely and improve trust in digital operations.",
    image: "/blockchain.svg",
    floatingBadge: "Transparent & Tamper-Proof",
  },
];

const VerticalTabServices = () => {
  const [activeTab, setActiveTab] = useState(0);

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -15,
      transition: { duration: 0.2 },
    },
  };

  const currentService = servicesData[activeTab];

  return (
    <section className="relative bg-gradient-to-b from-white via-sky-50/25 to-white py-16 sm:py-24 font-sans text-slate-900 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ================= SECTION HEADER ================= */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Our Services
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mt-3.5 leading-relaxed font-normal">
            For the last 8 years, we have been serving the Indian as well as
            international markets with our website, mobile App Development
            Services in Patna, and digital marketing services.
          </p>

          <div className="w-12 h-1 bg-[#1e88e5] rounded-full mx-auto mt-5 shadow-xs" />
        </motion.div>

        {/* ================= VERTICAL TABS + SHOWCASE DECK ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Vertical Nav Rail (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-3 sm:p-4 border border-slate-200/80 shadow-[0_10px_35px_-8px_rgba(0,0,0,0.06)] space-y-2.5">
              {servicesData.map((service, index) => {
                const Icon = service.icon;
                const isActive = activeTab === index;

                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`relative w-full p-3.5 sm:p-4 text-left rounded-2xl transition-all duration-300 flex items-center justify-between group cursor-pointer outline-none ${
                      isActive
                        ? "text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    {/* Active Background Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeVerticalTabHighlight"
                        className="absolute inset-0 bg-gradient-to-r from-blue-50/90 via-sky-50/60 to-white border border-blue-200/80 rounded-2xl shadow-xs"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 32,
                        }}
                      />
                    )}

                    {/* Left Active Accent Bar */}
                    {isActive && (
                      <div className="absolute left-0 top-3.5 bottom-3.5 w-1.5 rounded-r-full bg-[#1e88e5] shadow-xs" />
                    )}

                    <div className="relative z-10 flex items-center gap-3.5">
                      {/* Squircle Icon */}
                      <div
                        className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-2xs ${
                          isActive
                            ? service.badgeColor + " scale-105"
                            : "bg-slate-100 text-slate-500 border-slate-200 group-hover:bg-white group-hover:text-slate-800"
                        }`}
                      >
                        <Icon className="text-xl" />
                      </div>

                      {/* Tab Name & Tagline */}
                      <div>
                        <div
                          className={`text-base font-bold transition-colors ${
                            isActive ? "text-slate-900" : "text-slate-700"
                          }`}
                        >
                          {service.tabName}
                        </div>
                        <div className="text-[11px] text-slate-400 group-hover:text-slate-500 font-medium line-clamp-1">
                          {service.tagline}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`relative z-10 w-4 h-4 transition-transform duration-200 ${
                        isActive
                          ? "text-[#1e88e5] translate-x-1"
                          : "text-slate-300 group-hover:text-slate-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Luxury Showcase Card (8 cols) */}
          <div className="lg:col-span-8 flex">
            <div className="w-full relative bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-[0_15px_45px_-10px_rgba(0,35,80,0.08)] flex flex-col justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 items-center"
                >
                  {/* Text Details */}
                  <div className="md:col-span-7 text-left">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
                      {currentService.title}
                    </h3>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-7 font-normal">
                      {currentService.description}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => openWhatsApp(currentService.title)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group/btn"
                      >
                        <BsWhatsapp className="w-4 h-4" />
                        <span>Discuss {currentService.tabName} Solutions</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      <span className="text-xs text-slate-400 font-medium">
                        Direct quotation
                      </span>
                    </div>
                  </div>

                  {/* Visual Image Showcase */}
                  <div className="md:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
                      <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 p-4 sm:p-5 border border-slate-200/70 shadow-inner group">
                        <div className="relative w-full aspect-[4/3] flex items-center justify-center rounded-xl overflow-hidden pt-4">
                          <Image
                            src={currentService.image}
                            alt={currentService.title}
                            width={460}
                            height={340}
                            className="w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerticalTabServices;
