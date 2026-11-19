"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Apple,
  Monitor,
  Rocket,
  Gamepad2,
  FileText,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { openWhatsApp } from "@/lib/whatsapp";

export default function AppDevelopmentServices() {
  const services = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      bgAccent: "bg-blue-50 border-blue-100 text-blue-600",
      gradient: "from-blue-500 to-cyan-500",
      title: "Custom Mobile App Development",
      description:
        "Tailored solutions that meet your specific requirements across various platforms including iOS, Android, and Windows.",
      features: [
        "Custom UI/UX design",
        "Native and cross-platform",
        "Integration with existing systems",
        "Performance optimization",
        "Scalability and security",
      ],
    },
    {
      icon: <Apple className="w-6 h-6 text-slate-900" />,
      bgAccent: "bg-slate-100 border-slate-200 text-slate-900",
      gradient: "from-slate-700 to-slate-900",
      title: "iOS App Development",
      description:
        "Robust and user-friendly iOS applications for iPhone, iPad, and Apple Watch, following best practices.",
      features: [
        "Swift and Objective-C development",
        "iPhone and iPad app development",
        "Apple Watch app development",
        "App Store submission & approval",
        "Ongoing maintenance & support",
      ],
    },
    {
      icon: <Smartphone className="w-6 h-6 text-emerald-600" />,
      bgAccent: "bg-emerald-50 border-emerald-100 text-emerald-600",
      gradient: "from-emerald-500 to-teal-500",
      title: "Android App Development",
      description:
        "High-performance apps providing a seamless experience across all Android devices and OS versions.",
      features: [
        "Dart and Flutter development",
        "Smartphone and tablet apps",
        "Wearable app development",
        "Google Play Store submission",
        "Ongoing maintenance & support",
      ],
    },
    {
      icon: <Rocket className="w-6 h-6 text-purple-600" />,
      bgAccent: "bg-purple-50 border-purple-100 text-purple-600",
      gradient: "from-purple-500 to-indigo-500",
      title: "Cross-Platform App Development",
      description:
        "Reach a wider audience with apps built using React Native and Flutter, running smoothly on both iOS and Android.",
      features: [
        "Single codebase for multiple platforms",
        "Consistent user experience",
        "Faster development and deployment",
        "Cost-effective solution",
        "Ongoing maintenance & support",
      ],
    },
    {
      icon: <Monitor className="w-6 h-6 text-indigo-600" />,
      bgAccent: "bg-indigo-50 border-indigo-100 text-indigo-600",
      gradient: "from-indigo-500 to-sky-500",
      title: "Progressive Web App (PWA) Development",
      description:
        "Combines the best of web and mobile app experiences with PWAs - fast, reliable, and native-like.",
      features: [
        "Responsive design",
        "Offline functionality",
        "Push notifications",
        "App-like performance",
        "SEO-updatable and maintenance",
      ],
    },
    {
      icon: <Gamepad2 className="w-6 h-6 text-pink-600" />,
      bgAccent: "bg-pink-50 border-pink-100 text-pink-600",
      gradient: "from-pink-500 to-rose-500",
      title: "Game Development",
      description:
        "Bring your game ideas to life with our expert game development services.",
      features: [
        "Engaging gameplay design",
        "Cross-platform game development",
        "Stunning graphics & animation",
        "Monetization strategies",
        "Post-launch support",
      ],
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
    <section className="relative bg-gradient-to-b from-[#f8fbff] via-white to-[#f8fbff] py-16 sm:py-24 overflow-hidden">
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-wider text-[#1e88e5] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#1e88e5]" />
            <span>FULL-SPECTRUM CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            Our Comprehensive App Development Services
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We offer a full spectrum of mobile development, from concept to
            launch, ensuring your app stands out in a crowded marketplace.
          </p>

          <div className="w-12 h-1 bg-[#1e88e5] rounded-full mx-auto mt-5 shadow-xs" />
        </motion.div>

        {/* ================= SERVICES 6-CARD GRID ================= */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-10px_rgba(30,136,229,0.18)] hover:border-sky-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Accent Line on Hover */}
              <div
                className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div>
                {/* Squircle Icon */}
                <div
                  className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-108 shadow-2xs ${service.bgAccent}`}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2.5 tracking-tight group-hover:text-[#1e88e5] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100 mb-6">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start text-xs sm:text-sm text-slate-700 gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => openWhatsApp(`${service.title} Inquiry`)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1e88e5] group-hover:text-blue-700 transition-colors cursor-pointer"
                >
                  <BsWhatsapp className="w-4 h-4 text-emerald-500" />
                  <span>Discuss Project</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <span className="text-[11px] font-mono text-slate-400">
                  0{index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
