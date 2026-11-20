"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

const webFaqData = [
  {
    question: "Why is a professional website important for my business?",
    answer:
      "A professional website is your 24/7 digital storefront. It builds credibility with customers, serves as the foundation for your digital marketing, and allows you to reach a wider audience, generate leads, and showcase your services effectively.",
  },
  {
    question: "How much does a new website cost?",
    answer:
      "The cost of a website depends on its scope and complexity. A simple informational site (5-10 pages) will be less expensive than a large e-commerce platform or a site with a custom Content Management System (CMS). We provide a detailed, transparent quote after understanding your specific needs.",
  },
  {
    question: "How long will it take to build my website?",
    answer:
      "A standard business website typically takes 4-6 weeks from start to launch. For more complex projects, the timeline can extend to several months. The final timeline is always discussed and agreed upon before the project begins.",
  },
  {
    question: "Do you use WordPress, or do you build custom websites?",
    answer:
      "We offer both. For clients who need an easy-to-use blog or content editor, we build powerful custom websites on WordPress. For unique, high-performance applications, we build fully custom sites from scratch using modern frameworks like React and Next.js. We recommend the best solution for your goals.",
  },
  {
    question: "Will my website work correctly on mobile phones?",
    answer:
      "Absolutely. Every website we build uses a \"mobile-first\" approach, meaning it is fully responsive. Your site will look and function perfectly on all devices, including desktops, tablets, and smartphones, which is essential in today's market.",
  },
  {
    question: "What about support and maintenance after the website is live?",
    answer:
      "We believe in long-term partnerships. We offer various support and maintenance plans that include security updates, regular backups, performance monitoring, and technical assistance to ensure your website remains fast, secure, and effective.",
  },
];

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 mb-4 overflow-hidden ${
        isOpen
          ? "bg-white border-sky-300 shadow-[0_8px_30px_-6px_rgba(30,136,229,0.12)]"
          : "bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs"
      }`}
    >
      <button
        type="button"
        className="flex justify-between items-center w-full p-5 sm:p-6 text-left cursor-pointer focus:outline-hidden"
        onClick={onClick}
      >
        <h3
          className={`text-base sm:text-lg font-bold transition-colors duration-200 pr-4 ${
            isOpen ? "text-sky-600" : "text-slate-800"
          }`}
        >
          {item.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
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
            <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100">
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WebDevFaq = () => {
  const [expanded, setExpanded] = useState(0);

  return (
    <section className="relative bg-white py-16 sm:py-24 font-sans text-slate-900 overflow-hidden">
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
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Website Development - Frequently Asked Questions
          </h2>

          <div className="w-12 h-1 bg-[#1e88e5] rounded-full mx-auto mt-5 shadow-xs" />
        </motion.div>

        {/* ================= ACCORDION LIST ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          {webFaqData.map((item, index) => (
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

export default WebDevFaq;
