"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaAward,
  FaUsers,
  FaLaptopCode,
  FaStar,
  FaLightbulb,
  FaHeadset,
  FaFileCode,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Sparkles } from "lucide-react";

const strengthsData = [
  {
    icon: FaAward,
    title: "2000+ Projects Delivered",
    description:
      "We have earned the trust of every client by successfully delivering thousands of projects across various domains.",
  },
  {
    icon: FaStar,
    title: "High Client Ratings",
    description:
      "Our track record speaks for itself, with thousands of satisfied clients across the globe praising our work.",
  },
  {
    icon: FaLaptopCode,
    title: "Experienced in All Technologies",
    description:
      "Our team is skilled in Java, Shopify, WordPress, PHP, Laravel, WIX, and more to build exactly what you need.",
  },
  {
    icon: FaUsers,
    title: "Experienced & Skilled Web Developers",
    description:
      "Certified and experienced full-stack website development professionals in every tool, ensuring top-notch solutions.",
  },
  {
    icon: FaLightbulb,
    title: "Multi-Industry Expertise",
    description:
      "We have served diverse sectors including eCommerce, healthcare, education, real estate, and more with tailored solutions.",
  },
  {
    icon: FaHeadset,
    title: "Quick & Trustable Support",
    description:
      "Get fast response times with real human support to resolve your queries and issues promptly and efficiently.",
  },
  {
    icon: FaFileCode,
    title: "Highly Efficient Code & Design",
    description:
      "We craft smooth, responsive, and SEO-friendly websites with clean, optimized code for superior performance.",
  },
  {
    icon: FaCalendarAlt,
    title: "Since 2017",
    description:
      "Years of consistency and client’s trust. We have been a reliable partner in digital growth for over half a decade.",
  },
  {
    icon: FaMoneyBillWave,
    title: "Honest, Affordable & Transparent Pricing",
    description:
      "We believe in clear communication and providing value with no hidden charges, ensuring a trustworthy partnership.",
  },
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
  hidden: { opacity: 0, y: 25 },
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

const CoreStrengths = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#1e88e5] via-[#1565c0] to-[#0d47a1] text-white py-16 sm:py-24 font-sans overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
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
            <span>Core Strengths</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            More Reasons to Hire Startup Web Support
          </h2>

          <p className="text-base sm:text-lg text-slate-100 max-w-3xl mx-auto leading-relaxed font-normal">
            We are a dependable web development company serving businesses across Bihar.
          </p>

          <div className="w-12 h-1 bg-cyan-300 rounded-full mx-auto mt-5 shadow-xs" />
        </motion.div>

        {/* ================= 9-CARD STRENGTHS GRID ================= */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {strengthsData.map((strength, index) => {
            const Icon = strength.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/15 hover:border-cyan-300/50 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.15)] transition-all duration-300 flex flex-col justify-between"
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div>
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-2xl text-cyan-300 mb-5 group-hover:scale-105 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all duration-300 shadow-2xs">
                    <Icon />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                    {strength.title}
                  </h3>

                  <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-normal">
                    {strength.description}
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

export default CoreStrengths;
