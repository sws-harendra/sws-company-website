"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMobileAlt,
  FaDesktop,
  FaShoppingCart,
  FaApple,
  FaAndroid,
  FaWordpress,
  FaPhp,
  FaJava,
  FaMagento,
} from "react-icons/fa";
import { SiWoocommerce } from "react-icons/si";
import { BsWhatsapp } from "react-icons/bs";
import { ArrowRight, CheckCircle2, Sparkles, Layers } from "lucide-react";
import Image from "next/image";
import { openWhatsApp } from "@/lib/whatsapp";

const servicesData = [
  {
    id: 0,
    tabName: "Mobile App",
    tabIcon: FaMobileAlt,
    title: "Mobile App Development Services in Patna",
    description:
      "As a trusted Mobile App Development Company in Patna, we build mobile applications for Android and iOS platforms based on real business needs. Our apps are designed to be simple, smooth, and reliable so users feel comfortable using them. Whether you are launching a new idea or improving an existing system, we build apps that support growth step by step.",
    mainImage: "/mobile-app.jpg",
    floatingBadge: "Native & Cross-Platform",
    techIcons: [
      {
        icon: FaAndroid,
        name: "Android",
        textColor: "text-[#3DDC84]",
        bgColor: "bg-emerald-50 border-emerald-200",
      },
      {
        icon: FaApple,
        name: "iOS",
        textColor: "text-slate-900",
        bgColor: "bg-slate-100 border-slate-300",
      },
    ],
  },
  {
    id: 1,
    tabName: "Web",
    tabIcon: FaDesktop,
    title: "Web Development",
    description:
      "A strong website is often the base for any mobile application or digital system. Along with app development, we also provide app development services that connect smoothly with web platforms. Our team works with modern technologies to build web systems that are stable, scalable, and easy to manage as your business grows.",
    mainImage: "/web.svg",
    floatingBadge: "Scalable Cloud Architecture",
    techIcons: [
      {
        icon: FaPhp,
        name: "PHP",
        textColor: "text-[#777BB4]",
        bgColor: "bg-indigo-50 border-indigo-200",
      },
      {
        icon: FaJava,
        name: "Java",
        textColor: "text-[#E76F00]",
        bgColor: "bg-amber-50 border-amber-200",
      },
      {
        icon: FaWordpress,
        name: "WordPress",
        textColor: "text-[#21759B]",
        bgColor: "bg-sky-50 border-sky-200",
      },
    ],
  },
  {
    id: 2,
    tabName: "E-Commerce",
    tabIcon: FaShoppingCart,
    title: "E-Commerce Development",
    description:
      "For businesses planning to sell online, we provide e-commerce app development solutions that are simple to use and safe to run. From showing products properly to setting up payments and managing orders, everything is done in a clear and practical way so customers can shop easily, and business owners can handle daily sales work without stress or confusion.",
    mainImage: "/e-com.svg",
    floatingBadge: "Secure Checkout & Growth",
    techIcons: [
      {
        icon: FaMagento,
        name: "Magento",
        textColor: "text-[#EE672F]",
        bgColor: "bg-orange-50 border-orange-200",
      },
      {
        icon: SiWoocommerce,
        name: "WooCommerce",
        textColor: "text-[#96588A]",
        bgColor: "bg-purple-50 border-purple-200",
      },
    ],
  },
];

const OurServicesTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: 0.18 },
    },
  };

  const currentService = servicesData[activeTab];

  return (
    <section className="relative bg-[#1e88e5] text-white py-12 sm:py-16 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute bottom-50 -left-20 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/2 -right-20 w-80 h-80 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-6xl">
        {/* ================= COMPACT HEADER ================= */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Our Services
          </h2>
          <div className="mt-2.5 mx-auto w-12 h-1 rounded-full bg-gradient-to-r from-cyan-300 to-white/70" />
        </motion.div>

        {/* ================= COMPACT FLOATING PILL DOCK TABS ================= */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="inline-flex p-1.5 rounded-full bg-slate-950/40 backdrop-blur-xl border border-white/20 shadow-xl max-w-full overflow-x-auto">
            {servicesData.map((service, index) => {
              const Icon = service.tabIcon;
              const isActive = activeTab === index;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(index)}
                  className={`relative flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer outline-none whitespace-nowrap ${
                    isActive
                      ? "text-slate-900"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  {/* Sliding White Pill Highlight */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill-tab-dock"
                      className="absolute inset-0 bg-white rounded-full shadow-md"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 32,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <span
                    className={`relative z-10 transition-colors ${
                      isActive ? "text-[#1e88e5]" : "text-white/90"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>

                  {/* Title */}
                  <span className="relative z-10 font-bold tracking-tight">
                    {service.tabName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= COMPACT WHITE SHOWCASE CARD ================= */}
        <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 bg-white text-slate-900 shadow-[0_20px_60px_-15px_rgba(0,35,80,0.3)] border border-slate-100 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center"
            >
              {/* Left Column: Details & Tech */}
              <div className="lg:col-span-7 text-left">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-snug mb-3 tracking-tight">
                  {currentService.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed mb-5 font-normal">
                  {currentService.description}
                </p>

                {/* Technologies Section */}
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#1e88e5]" />
                    <span>Technologies We Use:</span>
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {currentService.techIcons.map((tech, i) => {
                      const TechIcon = tech.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-slate-50 hover:bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 shadow-2xs transition-all cursor-default"
                        >
                          <div
                            className={`w-6 h-6 rounded flex items-center justify-center border ${tech.bgColor}`}
                          >
                            <TechIcon className={`text-sm ${tech.textColor}`} />
                          </div>
                          <span className="font-semibold text-xs text-slate-800">
                            {tech.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => openWhatsApp(currentService.title)}
                    className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-semibold text-xs shadow-sm hover:shadow transition-all duration-200 cursor-pointer group/btn"
                  >
                    <BsWhatsapp className="w-3.5 h-3.5" />
                    <span>Discuss on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Graphic Showcase */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[340px] sm:max-w-[400px]">
                  {/* Subtle Background Pad */}
                  <div className="relative rounded-2xl   shadow-inner group">
                    {/* Floating Quality Tag */}

                    <div className="relative w-full aspect-[16/10] flex items-center justify-center rounded-xl overflow-hidden pt-3">
                      <Image
                        src={currentService.mainImage}
                        alt={currentService.title}
                        width={420}
                        height={260}
                        className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default OurServicesTabs;
