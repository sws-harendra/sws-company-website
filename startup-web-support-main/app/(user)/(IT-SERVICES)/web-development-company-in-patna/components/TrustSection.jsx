"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaAward,
  FaUsers,
  FaCogs,
  FaStar,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";
import { Sparkles } from "lucide-react";

const advantagesData = [
  {
    icon: FaAward,
    title: "500+ Projects Delivered",
    description:
      "We have successfully completed projects for businesses from different industries, each with its own requirements.",
    accentColor: "from-blue-500 to-cyan-500",
    bgAccent: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: FaCogs,
    title: "Experienced in All Technologies",
    description:
      "Our team works comfortably with Java, PHP, Laravel, CMS platforms, and other tools needed to build practical solutions.",
    accentColor: "from-indigo-500 to-purple-500",
    bgAccent: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    icon: FaUsers,
    title: "Multi-Industry Expertise",
    description:
      "We have worked with businesses from eCommerce, healthcare, education, real estate, and service-based sectors, so we understand different needs.",
    accentColor: "from-sky-500 to-blue-600",
    bgAccent: "bg-sky-50 text-sky-600 border-sky-100",
  },
  {
    icon: FaShieldAlt,
    title: "Secure & Scalable Websites",
    description:
      "Our websites are built in a way that they stay secure and can handle more visitors as your business grows.",
    accentColor: "from-emerald-500 to-teal-500",
    bgAccent: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    icon: FaStar,
    title: "Honest & Transparent Pricing",
    description:
      "We explain everything clearly before starting, so there are no surprises or hidden charges later.",
    accentColor: "from-amber-500 to-orange-500",
    bgAccent: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: FaHeadset,
    title: "Quick & Trustable Support",
    description:
      "You get quick responses and real human support whenever you need help or guidance.",
    accentColor: "from-rose-500 to-pink-500",
    bgAccent: "bg-rose-50 text-rose-600 border-rose-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const TrustSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/70 to-white py-16 sm:py-24 font-sans text-slate-900 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

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
            <span>Why Partner With Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Why Partner With Us?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            We don’t just develop websites and move on. We focus on building reliable digital solutions that stay stable over time and help your business grow step by step.
          </p>

          <div className="w-12 h-1 bg-[#1e88e5] rounded-full mx-auto mt-5 shadow-xs" />
        </motion.div>

        {/* ================= 6-CARD ADVANTAGES GRID ================= */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {advantagesData.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(30,136,229,0.15)] hover:border-sky-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top colored highlight accent bar on hover */}
                <div
                  className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${advantage.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center text-2xl transition-all duration-300 shadow-2xs group-hover:scale-105 ${advantage.bgAccent}`}
                    >
                      <Icon />
                    </div>
                    <span className="text-xs font-black text-slate-300 uppercase tracking-widest">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-sky-600 transition-colors">
                    {advantage.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                    {advantage.description}
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

export default TrustSection;
