"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaPenNib,
  FaSearchDollar,
} from "react-icons/fa";
import { Sparkles, Users, ShieldCheck } from "lucide-react";

const teamRoles = [
  {
    icon: FaLaptopCode,
    role: "Great Developers",
    description:
      "They make sure the website runs smoothly, opens fast, and works properly on mobile and computer.",
    accent: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: FaPaintBrush,
    role: "Graphic Designers",
    description:
      "They decide how the website looks so it feels clean and comfortable, not heavy or confusing.",
    accent: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    icon: FaPenNib,
    role: "Content Writers",
    description:
      "They write in simple language so local customers can easily understand your services.",
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    icon: FaSearchDollar,
    role: "SEO Experts",
    description:
      "They help your website appear on Google when people search for services like yours.",
    accent: "bg-amber-50 text-amber-600 border-amber-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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
      stiffness: 100,
      damping: 14,
    },
  },
};

const ReliableTeam = () => {
  return (
    <section className="relative bg-gradient-to-b from-white via-sky-50/25 to-white py-16 sm:py-24 font-sans text-slate-900 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ================= PART 1: WHY YOU NEED A RELIABLE PARTNER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-24">
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-wider text-[#1e88e5] mb-3 w-fit shadow-2xs"
              variants={itemVariants}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1e88e5]" />
              <span>Conversion-Focused Architecture</span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4"
              variants={itemVariants}
            >
              Why You Need A Reliable Web Development Company in Patna
            </motion.h2>

            <motion.h3
              className="text-xl sm:text-2xl font-bold text-sky-600 mb-5 tracking-tight"
              variants={itemVariants}
            >
              Your Website Should Work Harder
            </motion.h3>

            <motion.p
              className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal"
              variants={itemVariants}
            >
              Your website should help people understand your business quickly. When someone opens your site, they should know what you do, how to contact you, and why they should trust you. If a website confuses people, they simply close it and move on.
            </motion.p>
          </motion.div>

          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-3 bg-gradient-to-r from-sky-300/20 to-blue-400/20 rounded-3xl blur-2xl pointer-events-none -z-10" />

              <div className="relative bg-white rounded-3xl p-3 sm:p-4 border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                <img
                  src="/hero.jpg"
                  alt="Team working on web development"
                  className="w-full h-auto rounded-2xl object-cover"
                />

                <div className="absolute bottom-6 left-6 right-6 bg-slate-950/85 backdrop-blur-md text-white rounded-2xl p-4 border border-white/20 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-300 font-medium">Full Spectrum Support</p>
                      <h4 className="text-sm font-bold text-white">Cross-Functional Team</h4>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= PART 2: A SYNERGY OF EXPERTS ================= */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-wider text-[#1e88e5] mb-3 shadow-2xs">
            <Users className="w-3.5 h-3.5 text-[#1e88e5]" />
            <span>Dedicated Squad</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            A Synergy of Experts
          </h3>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Making a good website is team work. One person cannot handle everything properly. When different people handle different parts, the result is much better and more reliable.
          </p>

          <div className="w-12 h-1 bg-[#1e88e5] rounded-full mx-auto mt-5 shadow-xs" />
        </motion.div>

        {/* ================= 4-ROLE TEAM GRID ================= */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {teamRoles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(30,136,229,0.15)] hover:border-sky-300 transition-all duration-300 text-center flex flex-col items-center justify-between"
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl mb-5 mx-auto transition-all duration-300 group-hover:scale-105 shadow-2xs ${role.accent}`}
                  >
                    <Icon />
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight group-hover:text-sky-600 transition-colors">
                    {role.role}
                  </h4>

                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {role.description}
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

export default ReliableTeam;
