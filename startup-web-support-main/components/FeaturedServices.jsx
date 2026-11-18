"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { getWhatsAppUrl, openWhatsApp } from "@/lib/whatsapp";
import {
  bellShakeAnimation,
  cardContentVariants,
  cardVariants,
  gridContainerVariants,
  headerTextVariants,
  imageVariants,
} from "./GlobalCss";

const servicesData = [
  {
    image: "/website-development.png",
    title: "Website Development",
    description:
      "Startup Web Support builds high-speed, mobile-responsive custom websites. Clean layout architecture, rapid loading speed, and modern SEO that convert visitors into paying clients.",
  },
  {
    image: "/app-development.png",
    title: "App Development",
    description:
      "We design and build secure, intuitive mobile apps for iOS and Android. Engineered for smooth user experiences, scalable architecture, and reliable enterprise performance.",
  },
  {
    image: "/ecommerce-website.png",
    title: "E-Commerce Website",
    description:
      "Full-featured online stores with automated payment gateways, product catalogs, live inventory tracking, and frictionless checkout flows to maximize retail revenue.",
  },
  {
    image: "/marketing.png",
    title: "Marketing Solutions",
    description:
      "Results-driven digital marketing and SEO services in Patna. Practical, transparent campaigns that deliver verified enquiries, organic search growth, and real customers.",
  },
  {
    image: "/ads.png",
    title: "Premium Advertising",
    description:
      "Data-backed Paid Social Media Marketing and Google Search campaigns. Strategic targeting, tight budget control, and maximum lead return tailored to audience behavior.",
  },
  {
    image: "/design.png",
    title: "Designing Solutions",
    description:
      "Professional graphic design, UI/UX design, and corporate branding assets that build instant trust and ensure your company stands out across digital platforms.",
  },
  {
    image: "/finance.png",
    title: "Financial & ERP Software",
    description:
      "Custom accounting, billing, and financial software designed for everyday business operations. 100% compliant, easy to operate, and equipped with error-free reporting.",
  },
  {
    image: "/it-solution.png",
    title: "Web & Software Solutions",
    description:
      "Reliable web application development delivering practical digital systems that automate operational workflows, enhance efficiency, and support long-term growth.",
  },
];

const FeaturedServices = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-white overflow-hidden font-sans">
      {/* =========================================================================
          BACKGROUND: AMBIENT GLOW & VERTICAL LIGHT ACCENTS (Matching Hero Styling)
         ========================================================================= */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft Ambient Radial Glow Behind Header */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-[420px] bg-gradient-to-b from-[#38bdf8]/10 via-[#009CDE]/04 to-transparent rounded-full blur-3xl" />

        {/* Top & Bottom Ambient Glow Circles */}
        <div className="absolute right-[-10%] top-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-sky-200/20 to-blue-300/10 blur-3xl" />
        <div className="absolute left-[-10%] bottom-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-sky-200/20 to-indigo-200/10 blur-3xl" />

        {/* Ambient Top Subtle Horizon Line */}
        <div className="absolute top-0 inset-x-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#009CDE]/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* =======================================================================
            SECTION HEADER (World-Class Typography & Announcement Pill)
           ======================================================================= */}
        <div className="text-center mb-16 sm:mb-20">
          {/* Master Heading */}
          <motion.h2
            className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.14] mb-4 sm:mb-5"
            variants={headerTextVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Our Featured{" "}
            <span className="font-serif italic font-medium bg-gradient-to-r from-[#009CDE] via-[#0086bf] to-[#0668E1] bg-clip-text text-transparent px-1 drop-shadow-xs">
              Services
            </span>
          </motion.h2>

          {/* Subheading Narrative */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal px-2"
            variants={headerTextVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Delivering scalable, secure, and revenue-focused technology
            solutions engineered to help businesses in Patna and beyond lead in
            the digital era.
          </motion.p>
        </div>

        {/* =======================================================================
            SERVICES GRID (Highlighted Glassmorphic Cards)
           ======================================================================= */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {servicesData.map((service, index) => {
            const whatsappUrl = getWhatsAppUrl(service?.title);

            return (
              <motion.div
                key={index}
                layout
                whileHover={{ scale: 1.025, y: -6 }}
                onClick={() => openWhatsApp(service?.title)}
                className="relative overflow-hidden flex flex-col justify-between h-full bg-gradient-to-b from-white via-white to-sky-50/30 backdrop-blur-2xl p-6 rounded-[26px] border border-sky-100 shadow-[0_10px_26px_-8px_rgba(0,156,222,0.08),0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,1)] hover:border-[#009CDE]/60 hover:shadow-[0_16px_36px_-6px_rgba(0,156,222,0.16),0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer group/card before:absolute before:top-0 before:inset-x-0 before:h-[3px] before:bg-gradient-to-r before:from-transparent before:via-[#009CDE]/80 before:to-transparent"
                variants={cardVariants}
              >
                {/* Luminous Inner Corner Glow Highlight */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-br from-[#38bdf8]/15 via-[#009CDE]/06 to-transparent rounded-full blur-2xl pointer-events-none group-hover/card:scale-125 transition-transform duration-500" />

                {/* Subtle Digital Circuit Mesh Texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#009CDE08_1px,transparent_1px),linear-gradient(to_bottom,#009CDE08_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none rounded-[26px] opacity-40" />

                {/* Card Body */}
                <div className="relative z-10 flex flex-col items-start text-left">
                  {/* Borderless 3D Soft Cushion Icon Box */}
                  <motion.div
                    className="w-16 h-16 rounded-[22px] bg-gradient-to-br from-sky-50/80 via-white to-sky-100/40 shadow-[0_4px_12px_-2px_rgba(0,156,222,0.10),inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center flex-shrink-0 mb-5 group-hover/card:scale-108 group-hover/card:shadow-[0_8px_18px_-2px_rgba(0,156,222,0.18)] transition-all duration-300"
                    variants={imageVariants}
                  >
                    <Image
                      fetchPriority="high"
                      src={service.image}
                      alt={service.title}
                      width={44}
                      height={44}
                      className="object-contain drop-shadow-[0_4px_8px_rgba(0,156,222,0.25)]"
                      whileHover={bellShakeAnimation}
                    />
                  </motion.div>

                  {/* Text Content */}
                  <motion.div
                    layout
                    className="flex flex-col text-left"
                    variants={cardContentVariants}
                  >
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover/card:text-[#009CDE] transition-colors duration-200">
                      {service.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mt-2.5 font-normal">
                      {service.description}
                    </p>
                  </motion.div>
                </div>

                {/* Bottom CTA Action Button */}
                <div className="mt-6 pt-2 relative z-10">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      openWhatsApp(service?.title);
                    }}
                    className="group/btn inline-flex items-center justify-center gap-2.5 w-full px-4 py-3 bg-gradient-to-r from-[#009CDE] to-[#0086bf] hover:from-[#0086bf] hover:to-[#0074a6] text-white font-bold text-sm rounded-xl shadow-[0_4px_14px_rgba(0,156,222,0.32)] hover:shadow-[0_6px_20px_rgba(0,156,222,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  >
                    <BsWhatsapp className="w-4 h-4 transition-transform duration-200 group-hover/btn:scale-115 text-white" />
                    <span>Get Free Quotation</span>
                    <ArrowUpRight className="w-4 h-4 text-white/80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;
