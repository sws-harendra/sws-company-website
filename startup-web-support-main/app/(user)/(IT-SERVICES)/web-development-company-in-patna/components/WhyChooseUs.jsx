"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const textChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 14 },
  },
};

const WhyChooseUs = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#1e88e5] via-[#1565c0] to-[#0d47a1] text-white py-16 sm:py-24 font-sans overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Showcase with Floating Card */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full max-w-md">
              {/* Diffused Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400/30 to-sky-400/30 rounded-3xl blur-2xl pointer-events-none -z-10" />

              <div className="relative rounded-3xl p-3 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden">
                <img
                  src="web.jpg"
                  alt="Web Development Team"
                  className="w-full h-auto rounded-2xl object-cover shadow-inner"
                />

                {/* Floating pill badge */}
                <div className="absolute bottom-5 left-5 right-5 bg-slate-950/85 backdrop-blur-md text-white rounded-2xl p-4 border border-white/20 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-300 font-medium">Trusted by Startups &amp; Brands</p>
                      <h4 className="text-sm font-bold text-white">500+ Websites Launched</h4>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content & Metrics */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-cyan-200 mb-4 w-fit shadow-2xs"
              variants={textChildVariants}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Proven Web Excellence</span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-5"
              variants={textChildVariants}
            >
              Establish a Fast, Responsive Website with a Trusted Partner
            </motion.h2>

            <motion.p
              className="text-slate-100 text-base sm:text-lg leading-relaxed mb-8 font-normal"
              variants={textChildVariants}
            >
              Your website is the first impression of your business. We deliver not just impressive, but high-performing websites that grow your business. With expertise trusted by startups and established brands, we bring your online vision to life.
            </motion.p>

            {/* Metrics Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 sm:gap-6 mb-8"
              variants={textChildVariants}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 hover:bg-white/15 transition-all">
                <h3 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white mb-1.5 tracking-tight">
                  500+
                </h3>
                <p className="text-slate-200 text-sm font-semibold">Dynamic Projects Delivered</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 hover:bg-white/15 transition-all">
                <h3 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-100 mb-1.5 tracking-tight">
                  70%
                </h3>
                <p className="text-slate-200 text-sm font-semibold">of Indian Businesses are Online</p>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={textChildVariants}>
              <motion.button
                onClick={() => openWhatsApp("Website Development in Patna")}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-2xl shadow-[0_12px_28px_-6px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.4)] transition-all duration-200 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Hire Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#1e88e5]" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
