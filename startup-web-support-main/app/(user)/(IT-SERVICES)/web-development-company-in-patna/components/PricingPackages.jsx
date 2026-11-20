"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, ArrowRight, Zap } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const packagesData = [
  {
    name: "Standard Plan",
    price: "10,000",
    priceUnit: "INR",
    description: "Best for informational websites and startups.",
    features: [
      "Home Page + 4 Pages",
      "Informative Website",
      "SEO Friendly Design",
      "Mobile Responsive",
    ],
    buttonText: "Choose Startup Plan",
    featured: false,
    badge: "Startup Friendly",
  },
  {
    name: "Premium Plan",
    price: "20,000",
    priceUnit: "INR",
    description: "Ideal for dynamic websites and small businesses.",
    features: [
      "Everything in Standard, plus:",
      "Dynamic Website Features",
      "Admin Panel",
      "Basic eCommerce Functionality",
    ],
    buttonText: "Choose Small Business Plan",
    featured: true,
    badge: "Most Popular Choice",
  },
  {
    name: "Custom Plan",
    price: "Custom",
    priceUnit: "",
    description: "Tailored solutions for large-scale businesses.",
    features: [
      "Everything in Premium, plus:",
      "Advanced Custom Features",
      "Full eCommerce Suite",
      "Dedicated Support",
    ],
    buttonText: "Contact for Pricing",
    featured: false,
    badge: "Enterprise Grade",
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
  hidden: { opacity: 0, y: 35 },
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

const PricingPackages = () => {
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
            <span>Transparent Investment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Our Website Development Packages In India
          </h2>

          <div className="w-12 h-1 bg-cyan-300 rounded-full mx-auto mt-5 shadow-xs" />
        </motion.div>

        {/* ================= 3-COLUMN PRICING CARDS ================= */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {packagesData.map((pkg, index) => (
            <motion.div
              key={index}
              className={`relative rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 backdrop-blur-md ${
                pkg.featured
                  ? "bg-white text-slate-900 border-2 border-cyan-300 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] lg:-translate-y-2"
                  : "bg-white/10 text-white border border-white/15 hover:border-white/30 hover:bg-white/15 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.15)]"
              }`}
              variants={itemVariants}
            >
              {/* Floating Pill Badge */}
              {pkg.featured ? (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-sky-600 to-[#1e88e5] text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    {pkg.badge}
                  </span>
                </div>
              ) : (
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-cyan-200 border border-white/10">
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div>
                <h3
                  className={`text-2xl font-black mb-2 tracking-tight ${
                    pkg.featured ? "text-slate-900" : "text-white"
                  }`}
                >
                  {pkg.name}
                </h3>

                <p
                  className={`text-sm mb-6 ${
                    pkg.featured ? "text-slate-600" : "text-slate-200"
                  }`}
                >
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="mb-7 pb-7 border-b border-white/15">
                  <div className="flex items-baseline gap-1">
                    {pkg.price !== "Custom" && (
                      <span
                        className={`text-2xl font-bold ${
                          pkg.featured ? "text-sky-600" : "text-cyan-300"
                        }`}
                      >
                        ₹
                      </span>
                    )}
                    <span
                      className={`text-4xl sm:text-5xl font-black tracking-tight ${
                        pkg.featured ? "text-slate-900" : "text-white"
                      }`}
                    >
                      {pkg.price}
                    </span>
                    {pkg.priceUnit && (
                      <span
                        className={`text-xs font-bold uppercase ml-1.5 ${
                          pkg.featured ? "text-slate-500" : "text-slate-300"
                        }`}
                      >
                        {pkg.priceUnit}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3.5 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          pkg.featured ? "text-sky-600" : "text-cyan-300"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium leading-relaxed ${
                          pkg.featured ? "text-slate-700" : "text-slate-100"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <motion.button
                onClick={() =>
                  openWhatsApp(
                    `${pkg.name} Web Development Package (₹${pkg.price})`
                  )
                }
                className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md ${
                  pkg.featured
                    ? "bg-[#1e88e5] hover:bg-sky-600 text-white shadow-sky-600/25"
                    : "bg-white hover:bg-slate-100 text-slate-900"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{pkg.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPackages;
