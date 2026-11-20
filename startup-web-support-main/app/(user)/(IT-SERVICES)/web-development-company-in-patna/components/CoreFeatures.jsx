"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IoBrushOutline,
  IoTvOutline,
  IoCodeSlashOutline,
  IoBusinessOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { Sparkles } from "lucide-react";

const featuresData = [
  {
    icon: IoBrushOutline,
    title: "Custom Website Design",
    description:
      "We design websites according to your type of business, not using ready-made designs. The look and flow are planned so local customers feel comfortable while using it.",
    span: "lg:col-span-2",
    badge: "Bespoke UI/UX",
  },
  {
    icon: IoCodeSlashOutline,
    title: "SEO-Friendly Code",
    description:
      "The website is built properly from inside, so Google can read it easily and show it when people search for services like yours.",
    span: "lg:col-span-1",
    badge: "Organic Search Ready",
  },
  {
    icon: IoTvOutline,
    title: "Responsive web design",
    description:
      "Whether someone opens your website on a mobile phone, tablet, or computer, it should work properly everywhere without layout issues.",
    span: "lg:col-span-1",
    badge: "100% Mobile First",
  },
  {
    icon: IoBusinessOutline,
    title: "Business Website Development",
    description:
      "We build business websites that actually help you get calls, messages, and enquiries instead of just looking good.",
    span: "lg:col-span-1",
    badge: "Lead Generating",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Speed & Security Optimization",
    description:
      "The website is kept fast and secure so it opens quickly and customer data stays safe.",
    span: "lg:col-span-1",
    badge: "Fast & Protected",
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

const CoreFeatures = () => {
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
            <span>Core Features</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Build a Powerful Online Presence
          </h2>

          <p className="text-base sm:text-lg text-slate-100 max-w-3xl mx-auto leading-relaxed font-normal">
            Your website is not just something you make because everyone else has one. It shows how serious you are about your business. When people visit your site, they should feel confident, understand your work clearly, and know how to contact you without any effort.
          </p>

          <div className="w-12 h-1 bg-cyan-300 rounded-full mx-auto mt-5 shadow-xs" />
        </motion.div>

        {/* ================= BENTO GRID FEATURES ================= */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {featuresData.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className={`group relative bg-white/10 hover:bg-white/15 backdrop-blur-md p-7 sm:p-8 rounded-3xl border border-white/15 hover:border-cyan-300/50 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.15)] transition-all duration-300 flex flex-col justify-between ${feature.span}`}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-3xl text-cyan-300 group-hover:scale-105 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all duration-300 shadow-2xs">
                      <Icon />
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-cyan-200 border border-white/10">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-slate-100 text-base leading-relaxed font-normal">
                    {feature.description}
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

export default CoreFeatures;
