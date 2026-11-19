"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import TopCard from "./TopCard";
import {
  Smartphone,
  Layers,
  Rocket,
  Globe,
  Building2,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaAndroid, FaApple } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { openWhatsApp } from "@/lib/whatsapp";

const cardMetadata = [
  {
    icon: Smartphone,
    category: "Strategic Overview",
    color: "from-blue-500 to-cyan-500",
    bgAccent: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: Layers,
    category: "Full Lifecycle",
    color: "from-sky-500 to-indigo-500",
    bgAccent: "bg-sky-50 text-sky-600 border-sky-100",
  },
  {
    icon: FaAndroid,
    category: "Platform Focus",
    color: "from-emerald-500 to-teal-500",
    bgAccent: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    icon: FaApple,
    category: "Apple Ecosystem",
    color: "from-slate-700 to-slate-900",
    bgAccent: "bg-slate-100 text-slate-900 border-slate-200",
  },
  {
    icon: Rocket,
    category: "Cross-Platform",
    color: "from-purple-500 to-indigo-600",
    bgAccent: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    icon: Globe,
    category: "Custom Engineering",
    color: "from-blue-600 to-indigo-600",
    bgAccent: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    icon: Building2,
    category: "Domain Expertise",
    color: "from-amber-500 to-orange-500",
    bgAccent: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: ShieldCheck,
    category: "Client Trust",
    color: "from-teal-500 to-emerald-600",
    bgAccent: "bg-teal-50 text-teal-600 border-teal-100",
  },
];

const TopInfoSection = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <section className="relative bg-[#1e88e5] text-white py-14 sm:py-20 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute bottom-28 left-28 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-28 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-28 right-1/3 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ================= SECTION HEADER WITH CONTROLS ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <motion.div
            className="text-left max-w-3xl"
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Everything You Need to Know About Mobile App Development
            </h2>

            <p className="text-sm sm:text-base text-sky-100/90 mt-2.5 leading-relaxed font-normal">
              In-depth insights into our engineering standards, platform
              expertise, and how we build applications that deliver real
              business impact.
            </p>
          </motion.div>

          {/* Navigation Controls + Auto-scroll Indicator */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="flex items-center gap-2">
              <button
                onClick={() => swiperInstance?.slidePrev()}
                aria-label="Previous insight"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white text-white hover:text-slate-900 border border-white/20 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => swiperInstance?.slideNext()}
                aria-label="Next insight"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white text-white hover:text-slate-900 border border-white/20 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= EQUAL-HEIGHT HORIZONTAL SLIDER ================= */}
        <div className="relative">
          <Swiper
            onSwiper={setSwiperInstance}
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: 3200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.8,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 2.3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3.2,
                spaceBetween: 22,
              },
              1280: {
                slidesPerView: 3.8,
                spaceBetween: 24,
              },
            }}
            slidesPerView={1.15}
            spaceBetween={16}
            className="w-full overflow-visible"
          >
            {TopCard.map((card, index) => {
              const meta = cardMetadata[index] || cardMetadata[0];
              const Icon = meta.icon;

              return (
                <SwiperSlide key={index} className="h-auto flex">
                  <div
                    onClick={() => setSelectedCard({ ...card, index, meta })}
                    className="group relative w-full h-[315px] sm:h-[325px] bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-[0_10px_35px_-8px_rgba(0,35,80,0.22)] hover:shadow-[0_20px_50px_-10px_rgba(0,35,80,0.35)] hover:border-sky-300 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden select-none"
                  >
                    {/* Top Accent Line on Hover */}
                    <div
                      className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${meta.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    <div className="flex flex-col">
                      {/* Card Top: Squircle Icon & Number */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div
                          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-2xs ${meta.bgAccent}`}
                        >
                          <Icon className="text-xl sm:text-2xl" />
                        </div>

                        <span className="text-xs font-mono font-bold text-slate-400 px-2 py-1 bg-slate-50 rounded-lg border border-slate-100">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Micro Category Pill */}
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#1e88e5] mb-1.5">
                        {meta.category}
                      </div>

                      {/* Title with Fixed Height Baseline */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1e88e5] transition-colors leading-snug line-clamp-2 h-[2.75rem] sm:h-[3rem] mb-2">
                        {card.title}
                      </h3>

                      {/* Description Excerpt with Fixed Line Clamp */}
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                        {card.desc.trim()}
                      </p>
                    </div>

                    {/* Footer Action Pinned to Bottom */}
                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1e88e5] group-hover:text-blue-700">
                      <span className="inline-flex items-center gap-1.5">
                        <span>Read Overview</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <BookOpen className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1e88e5]" />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* ================= HIGH-END DETAIL MODAL ================= */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 my-auto overflow-hidden"
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3.5 mb-4 pr-10">
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-2xs ${selectedCard.meta.bgAccent}`}
                >
                  <selectedCard.meta.icon className="text-2xl" />
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1e88e5]">
                    {selectedCard.meta.category} &bull; Insight 0
                    {selectedCard.index + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    {selectedCard.title}
                  </h3>
                </div>
              </div>

              {/* Description Body */}
              <div
                style={{ whiteSpace: "pre-line" }}
                className="text-slate-600 text-sm sm:text-base leading-relaxed max-h-[50vh] overflow-y-auto pr-3 border-y border-slate-100 py-4 my-4 font-normal"
              >
                {selectedCard.desc}
              </div>

              {/* Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    openWhatsApp(`${selectedCard.title} Inquiry`);
                    setSelectedCard(null);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <BsWhatsapp className="w-4 h-4" />
                  <span>Discuss on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setSelectedCard(null)}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TopInfoSection;
