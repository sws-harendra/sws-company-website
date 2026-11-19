"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  IoAnalyticsOutline,
  IoColorPaletteOutline,
  IoCodeSlashOutline,
  IoBugOutline,
  IoRocketOutline,
} from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import { ArrowRight, Sparkles } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const processSteps = [
  {
    stepNumber: "01",
    phase: "Phase 1",
    icon: IoAnalyticsOutline,
    title: "Requirement & Business Analysis",
    description:
      "Every project starts with a clear discussion. Before development, we understand your idea, business flow, and goals. This step helps us plan the right Mobile App Development Process and decide which features and technologies will work best for you.",
    accentColor: "from-blue-500 to-cyan-500",
    bgAccent: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    stepNumber: "02",
    phase: "Phase 2",
    icon: IoColorPaletteOutline,
    title: "Designing (UI/UX)",
    description:
      "Our design team focuses on making apps that feel simple and natural to use. Wireframes and layouts are shared with you early so changes can be made easily. The goal is always clarity, not heavy or confusing designs.",
    accentColor: "from-indigo-500 to-purple-500",
    bgAccent: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    stepNumber: "03",
    phase: "Phase 3",
    icon: IoCodeSlashOutline,
    title: "Development",
    description:
      "Our developers handle Android App Development, iOS App Development, and backend systems with clean and reliable coding practices. We focus on performance, stability, and scalability so the app works well today and in the future.",
    accentColor: "from-sky-500 to-blue-600",
    bgAccent: "bg-sky-50 text-sky-600 border-sky-100",
  },
  {
    stepNumber: "04",
    phase: "Phase 4",
    icon: IoBugOutline,
    title: "Testing and Bug Fixing",
    description:
      "Before launch, every app goes through proper testing on different devices. This helps remove bugs and performance issues, ensuring the final app feels smooth, secure, and ready for real users.",
    accentColor: "from-amber-500 to-orange-500",
    bgAccent: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    stepNumber: "05",
    phase: "Phase 5",
    icon: IoRocketOutline,
    title: "Deployment & Support",
    description:
      "Once everything is approved, the app is launched on the required platforms. As a dependable mobile application development company, we don’t stop there. We continue to provide support after launch by handling updates, fixing issues, and making improvements so the app keeps running smoothly over time.",
    accentColor: "from-emerald-500 to-teal-500",
    bgAccent: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
];

const StandardProcess = () => {
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

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/60 to-white py-16 sm:py-24 overflow-hidden">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            Our Mobile App Development Process
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We follow a proven, transparent process to take your idea from
            concept to a fully functional mobile application, ensuring quality
            at every step.
          </p>

          <div className="w-12 h-1 bg-[#1e88e5] rounded-full mx-auto mt-5 shadow-xs" />
        </motion.div>

        {/* ================= 5-STEP BALANCED PROCESS GRID ================= */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            // First 3 steps take 2 cols each on desktop (3 * 2 = 6)
            // Last 2 steps take 3 cols each on desktop (2 * 3 = 6)
            const colSpanClass = index < 3 ? "lg:col-span-2" : "lg:col-span-3";

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(30,136,229,0.15)] hover:border-sky-300 transition-all duration-300 flex flex-col justify-between overflow-hidden ${colSpanClass}`}
              >
                {/* Top Colored Highlight Accent Bar on Hover */}
                <div
                  className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${step.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div>
                  {/* Step Top: Icon & Number Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:scale-105 ${step.bgAccent}`}
                    >
                      <Icon className="text-2xl sm:text-3xl" />
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {step.phase}
                      </span>
                      <span className="text-3xl sm:text-4xl font-black text-slate-200 group-hover:text-sky-500/30 transition-colors font-mono">
                        {step.stepNumber}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-[#1e88e5] transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Micro Step Progress Dots at Bottom */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-slate-500">
                    Step {index + 1} of 5
                  </span>
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3, 4].map((dot) => (
                      <span
                        key={dot}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          dot === index
                            ? "bg-[#1e88e5]"
                            : dot < index
                              ? "bg-slate-300"
                              : "bg-slate-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ================= BOTTOM ROADMAP BANNER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-50 via-sky-50/60 to-indigo-50 border border-sky-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
              Have a Mobile App Concept Ready to Build?
            </h4>
            <p className="text-sm text-gray-600">
              Speak directly with our senior development leads for a transparent
              roadmap & estimate.
            </p>
          </div>

          <button
            onClick={() =>
              openWhatsApp("Mobile App Development Process & Roadmap Inquiry")
            }
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap group/btn"
          >
            <BsWhatsapp className="w-4 h-4" />
            <span>Consult Development Team</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default StandardProcess;
