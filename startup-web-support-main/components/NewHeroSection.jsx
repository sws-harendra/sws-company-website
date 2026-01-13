"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const texts = [
  {
    title: "We Build Websites That Grow Your Business",
    desc: "Startup Web Support creates fast, modern, and scalable websites designed to convert visitors into customers.",
    img: "/website_hero.jpg",
  },
  {
    title: "Mobile Apps That Power Your Startup",
    desc: "From idea to launch, we develop high-performance Android apps that users love.",
    img: "/app_hero.jpg",
  },
  {
    title: "Digital Marketing That Brings Real Leads",
    desc: "SEO, Google Ads, and social media strategies focused on ROI, not just traffic.",
    img: "/seo_hero.jpg",
  },
  {
    title: "One Partner for Web, App & Marketing",
    desc: "Everything your business needs online — development, branding, and growth support.",
    img: "/combined_hero.jpg",
  },
];

const NewHeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative font-sans min-h-screen bg-white overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />

      {/* Main Content */}

      <div className="absolute right-[-19%] top-1/2 -translate-y-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-100 to-indigo-200  opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:pb-40 flex flex-col lg:flex-row items-center justify-between min-h-screen gap-8 sm:gap-12 lg:gap-16">
        {/* LEFT SIDE TEXT */}
        <div
          className="absolute z-[-10] left-[30%] top-1/3 -translate-y-1/2 
                w-[120px] h-[120px] rounded-full 
                bg-gradient-to-tr from-blue-100 to-indigo-200 
                opacity-40"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left w-full"
        >
          <div
            className="absolute z-[-10] left-[10%] top-2/3 -translate-y-2/2 
                w-[120px] h-[120px] rounded-full 
                bg-gradient-to-tr from-blue-100 to-indigo-200 
                opacity-40"
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 sm:space-y-6"
            >
              <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#174466]">
                {texts[index].title}
              </motion.h1>

              <motion.p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {texts[index].desc}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4 justify-center lg:justify-start"
          >
            <Link href={"/contact-us"}                 
                className="w-full sm:w-auto hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 bg-[#009CDE] text-black font-semibold rounded-lg shadow-sm hover:bg-[#009CDE] transition-colors duration-200"
             >
 
                Get Started
            </Link>
            <Link href={"/portfolio"}  className="w-full hover:scale-105 sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-lg border-2 border-black hover:bg-blue-50 transition-colors duration-200"
>
              
                View Our Work
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full max-w-lg lg:max-w-none"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={texts[index].img}
                alt="Professional workspace"
                className="w-full h-auto rounded-xl sm:rounded-2xl shadow-xl"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default NewHeroSection;
