"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaChartLine, FaStore } from "react-icons/fa";
import { Sparkles } from "lucide-react";

const benefitsData = [
  {
    icon: FaTrophy,
    title: "Beat The Competition",
    description:
      "If you don't have a Web presence for your company now, then you are falling behind your competition because more than 70% of your competitors are already using Web presence for marketing and lead generation and growing their business rapidly.Businesses without an online presence miss enquiries and customers every single day. A strong website helps you stay visible, compete better, and grow at a steady pace.",
    accentColor: "from-amber-500 to-orange-500",
    bgAccent: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: FaChartLine,
    title: "Increase Reach & ROI",
    description:
      "With a Website or an application for your business, you can reach higher numbers of clients for your business and increase your ROI. A professionally built website helps you reach more people beyond your local area and gives better returns on the money you invest.",
    accentColor: "from-blue-500 to-cyan-500",
    bgAccent: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: FaStore,
    title: "24/7 Online Presence",
    description:
      "Your Website is an online store where your clients can go and check your products or services even if you are somewhere else. This is the ultimate benefit of having an online presence for your business. Your website works like an online shop or office that stays open all the time, even when you are not available.",
    accentColor: "from-emerald-500 to-teal-500",
    bgAccent: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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

const InvestmentBenefits = () => {
  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/70 to-white py-16 sm:py-24 font-sans text-slate-900 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ================= SECTION HEADER ================= */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-wider text-[#1e88e5] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#1e88e5]" />
            <span>High Return on Investment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4 max-w-4xl mx-auto">
            Why Invest in Website Development Services in Patna for Your Business?
          </h2>

          <div className="w-12 h-1 bg-[#1e88e5] rounded-full mx-auto mt-5 shadow-xs" />
        </motion.div>

        {/* ================= 3-COLUMN CARDS WITH WATERMARK NUMBERS ================= */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {benefitsData.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(30,136,229,0.15)] hover:border-sky-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top colored accent line on hover */}
                <div
                  className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${benefit.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Big watermark number */}
                <div className="absolute -top-3 -right-2 text-7xl sm:text-8xl font-black text-slate-100 select-none pointer-events-none group-hover:text-sky-50 transition-colors">
                  0{index + 1}
                </div>

                <div className="relative z-10">
                  <div className="mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl transition-all duration-300 shadow-2xs group-hover:scale-105 ${benefit.bgAccent}`}
                    >
                      <Icon />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-sky-600 transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default InvestmentBenefits;
