"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShopify,
  FaWordpress,
  FaWix,
  FaOpencart,
  FaPhp,
  FaQuestionCircle,
} from "react-icons/fa";
import { ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const servicesData = [
  {
    icon: FaShopify,
    title: "Shopify Development",
    tagline: "E-Commerce & High-Converting Storefronts",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-600",
    description:
      "We build personalized, fast-responsive Shopify Websites and apps that help you sell your products online. Our experts customize themes, integrate third-party tools, and enhance the user experience to maximize profit. That makes us the best Web Development Company in Patna.",
  },
  {
    icon: FaWordpress,
    title: "WordPress Development",
    tagline: "CMS, Portfolios & Elementor Solutions",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    iconBg: "bg-sky-100 text-[#21759B]",
    description:
      "We built portfolios, vlogs, and big Websites using WordPress + Elementor to deliver fully customized, SEO-friendly, and easy-to-manage Websites for all types of businesses. with our cutting-edge Website Development Services in Patna.",
  },
  {
    icon: FaWix,
    title: "WIX, Weebly, Squarespace, And Duda",
    tagline: "Rapid Turnaround & Visual Builders",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    iconBg: "bg-purple-100 text-purple-600",
    description:
      "Do you need an alluring Website right away? And for that looking for a Web Development Company in Patna. We create dynamic and responsive Websites on all these platforms – perfect for small startups, businesses, and professionals who need a dependable online existence without technical hustle.",
  },
  {
    icon: FaOpencart,
    title: "OpenCart, BigCommerce Development",
    tagline: "Scalable Multi-Vendor & Online Retail",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    iconBg: "bg-orange-100 text-[#EE672F]",
    description:
      "For eCommerce brands, we build sturdy, expandable online stores with all the latest features, payment gateway integrations, and inventory management for smooth operations.",
  },
  {
    icon: FaPhp,
    title: "PHP & Laravel Development",
    tagline: "Robust Full-Stack Web Applications",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    iconBg: "bg-indigo-100 text-[#777BB4]",
    description:
      "For businesses who need customization, we offer custom-designed solutions using PHP and Laravel in our Web Development Company in Patna. This ensures full control, security, and expandability as your business grows.",
  },
  {
    icon: FaQuestionCircle,
    title: "Need Something Different?",
    tagline: "Tailor-Made Stacks & Custom APIs",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    iconBg: "bg-blue-100 text-blue-600",
    description:
      "We can help you to make your Website live through your needed platform. Contact us!",
  },
];

const AccordionItem = ({ item, isOpen, onClick }) => {
  const Icon = item.icon;

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden mb-4 ${
        isOpen
          ? "bg-white border-sky-300 shadow-[0_12px_30px_-6px_rgba(30,136,229,0.12)]"
          : "bg-white/80 border-slate-200/80 hover:border-slate-300 hover:bg-white shadow-2xs"
      }`}
    >
      <button
        type="button"
        className="flex items-center justify-between w-full p-5 sm:p-6 text-left cursor-pointer focus:outline-hidden"
        onClick={onClick}
      >
        <div className="flex items-center gap-4 sm:gap-5">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 transition-transform duration-300 ${item.iconBg} ${
              isOpen ? "scale-105" : ""
            }`}
          >
            <Icon />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}
              >
                {item.tagline}
              </span>
            </div>
            <h3
              className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${
                isOpen ? "text-slate-900" : "text-slate-800"
              }`}
            >
              {item.title}
            </h3>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
            isOpen ? "bg-sky-50 text-sky-600" : "bg-slate-100 text-slate-400"
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100">
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal mb-5">
                {item.description}
              </p>

              <button
                type="button"
                onClick={() =>
                  openWhatsApp(`Inquiry regarding ${item.title} Services`)
                }
                className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors"
              >
                <span>Discuss {item.title} on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ServicesAccordion = () => {
  const [expanded, setExpanded] = useState(0);

  return (
    <section className="relative bg-gradient-to-b from-[#f8fbff] via-white to-[#f8fbff] py-16 sm:py-24 font-sans text-slate-900 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
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
            <span>Versatile Tech Stack</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Our Core Development Platforms
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-3.5 leading-relaxed font-normal">
            We use different tools and technologies based on what actually fits your business and budget. The focus is on building something that runs smoothly, stays safe, and is easy for customers and staff to use without confusion.
          </p>

          <div className="w-12 h-1 bg-[#1e88e5] rounded-full mx-auto mt-5 shadow-xs" />
        </motion.div>

        {/* ================= ACCORDION ITEMS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          {servicesData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={index === expanded}
              onClick={() => setExpanded(index === expanded ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesAccordion;
