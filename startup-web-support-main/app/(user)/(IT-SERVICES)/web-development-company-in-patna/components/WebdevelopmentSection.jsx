"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Code2,
  ShoppingCart,
  CalendarCheck,
  Car,
  Layers,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Headphones,
  Maximize2,
  MapPin,
} from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

export default function WebdevelopmentSection() {
  const serviceCards = [
    {
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      bgAccent: "bg-blue-50 border-blue-100 text-blue-600",
      gradient: "from-blue-500 to-cyan-500",
      title: "Website & CMS Development",
      description:
        "Fast, beautiful, and easily editable websites engineered for corporate identity and brand authority.",
      points: [
        "Business & corporate websites",
        "CMS for easy updates",
        "Responsive design",
        "SEO-friendly structure",
      ],
    },
    {
      icon: <Code2 className="w-6 h-6 text-purple-600" />,
      bgAccent: "bg-purple-50 border-purple-100 text-purple-600",
      gradient: "from-purple-500 to-indigo-500",
      title: "Custom Web Applications",
      description:
        "Tailored web application logic built from the ground up for seamless business workflows.",
      points: [
        "Full-stack web development",
        "Responsive web apps",
        "Enterprise solutions",
        " Cloud-based systems",
      ],
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-emerald-600" />,
      bgAccent: "bg-emerald-50 border-emerald-100 text-emerald-600",
      gradient: "from-emerald-500 to-teal-500",
      title: "E-Commerce & Marketplaces",
      description:
        "High-converting storefronts, multi-vendor stores, and streamlined checkout pipelines.",
      points: [
        "Custom ecommerce platforms",
        "Multi-vendor systems",
        "Secure payment integration",
        "Booking portals",
      ],
    },
    {
      icon: <CalendarCheck className="w-6 h-6 text-amber-600" />,
      bgAccent: "bg-amber-50 border-amber-100 text-amber-600",
      gradient: "from-amber-500 to-orange-500",
      title: "Booking & On-Demand Platforms",
      description:
        "Instant scheduling and appointment booking systems for services and consultations.",
      points: [
        "appointment booking",
        "Service portals",
        "EScheduling systems",
      ],
    },
    {
      icon: <Car className="w-6 h-6 text-sky-600" />,
      bgAccent: "bg-sky-50 border-sky-100 text-sky-600",
      gradient: "from-sky-500 to-blue-600",
      title: "Transport & Cab Booking",
      description:
        "Fleet coordination, trip dispatching, and booking solutions for transport businesses.",
      points: [
        "Cab booking applications",
        "Driver & trip management",
        "Vehicle rental platforms",
      ],
    },
    {
      icon: <Layers className="w-6 h-6 text-rose-600" />,
      bgAccent: "bg-rose-50 border-rose-100 text-rose-600",
      gradient: "from-rose-500 to-pink-500",
      title: "ERP & Enterprise Systems",
      description:
        "Unified business control dashboards, school management, and reservation engines.",
      points: [
        "ERP Development",
        "Hotel booking engines",
        "School tracking systems",
        "Admin dashboards",
      ],
    },
  ];

  const whyChooseHighlights = [
    {
      icon: <MapPin className="w-5 h-5 text-sky-600" />,
      title: "Local Business Focus",
      text: "We understand how businesses work in Patna and Bihar, so our solutions are practical and effective.",
    },
    {
      icon: <Maximize2 className="w-5 h-5 text-emerald-600" />,
      title: "Scalable Solutions",
      text: "Our systems grow with your business and handle more users and data easily.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
      title: "Secure Development",
      text: "We follow clean coding and security best practices to keep your data safe.",
    },
    {
      icon: <Headphones className="w-5 h-5 text-amber-600" />,
      title: "Long-Term Support",
      text: "We stay with you even after delivery to ensure smooth performance and updates.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    <section className="relative bg-gradient-to-b from-[#f8fbff] via-white to-[#f8fbff] py-16 sm:py-24 font-sans text-slate-900 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

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
            <span>Comprehensive Web Engineering</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4 max-w-4xl mx-auto">
            Professional Web Development Services in Patna for Scalable Digital Growth
          </h2>

          <div className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal space-y-3">
            <p>
              At Startup Web Support, our work is simple — We provide web development solutions in Patna that make daily business work easier, not complicated. As a trusted website development company, we create websites that are fast, secure, and easy to handle, even if you are not from a technical background.
            </p>
            <p>
              Whether you need a basic business website, a custom application, or a booking platform, we take a clear and practical approach. We focus on what your business actually needs today and make sure the website supports your work as you grow.
            </p>
          </div>

          <div className="w-12 h-1 bg-[#1e88e5] rounded-full mx-auto mt-6 shadow-xs" />
        </motion.div>

        {/* ================= TRUSTED COMPANY SUB-INTRO ================= */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-14 sm:mb-20 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
            A Trusted Website Development Company in Patna, Bihar
          </h3>
          <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
            <p>
              As an experienced website development company in bihar, we focus on building websites that look professional and work properly in real use. Our designers and developers pay attention to how people use the website and also make sure everything works smoothly in the backend.
            </p>
            <p>
              Many businesses know us as one of the best website development company in patna because we follow a clear process, communicate honestly, and stay available even after the website is live for updates and support.
            </p>
          </div>
        </motion.div>

        {/* ================= 6-SERVICE CARDS GRID ================= */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {serviceCards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(30,136,229,0.15)] hover:border-sky-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div
                className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:scale-105 ${card.bgAccent}`}
                  >
                    {card.icon}
                  </div>
                  <span className="text-xs font-black text-slate-300 uppercase tracking-widest">
                    0{index + 1}
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2.5 tracking-tight group-hover:text-sky-600 transition-colors">
                  {card.title}
                </h4>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                  {card.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
                  {card.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => openWhatsApp(`Inquiry for ${card.title}`)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-sky-700 bg-sky-50/80 hover:bg-sky-100 border border-sky-100 transition-colors cursor-pointer"
                >
                  <span>Inquire for {card.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= WHY CHOOSE STARTUP WEB SUPPORT ================= */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Why Choose Startup Web Support?
            </h3>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
              As a growing web development company in patna, our aim is straightforward — create digital solutions that are actually useful in day-to-day business. We avoid overcomplicating things and focus on work that helps your business run better and grow steadily.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: What Makes Us Different List */}
            <motion.div
              className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)] flex flex-col justify-between"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-sky-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>The SWS Advantage</span>
                </div>

                <h4 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                  What Makes Us Different
                </h4>

                <div className="space-y-4">
                  {[
                    "Trusted Patna web design agency that understands local markets and how businesses operate here",
                    "A skilled and friendly development team that is easy to talk to and quick to respond.",
                    "We handle everything from the first discussion to final delivery, so you don’t have to manage multiple people.",
                    "Custom and scalable solutions built around your business needs, not ready-made ideas.",
                    "Affordable pricing with support that doesn’t disappear after the website is live.",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3.5">
                      <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                      </div>
                      <span className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: 4 Highlight Cards */}
            <motion.div
              className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {whyChooseHighlights.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-slate-200/80 shadow-[0_6px_25px_-5px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-sky-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                      {card.icon}
                    </div>

                    <h5 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
                      {card.title}
                    </h5>

                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
