"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import bannerService from "@/services/banner.service";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await bannerService.getAll();
        setSlides(data);
      } catch (err) {
        console.error("Error fetching banners:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (!slides.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides]);

  if (loading) {
    return (
      <section className="w-full h-[70vh] flex items-center justify-center bg-gray-100 text-gray-600">
        {/* Loading banners... */}
      </section>
    );
  }

  if (!slides.length) {
    return (
      <section className="w-full h-[70vh] flex items-center justify-center bg-gray-100 text-gray-500">
        No banners found.
      </section>
    );
  }

  const slide = slides[currentSlide];

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative w-full py-10 md:h-[88vh] h-[60vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <img
            src={slide.image_url}
            alt={slide.title}
            className="object-cover w-full h-full brightness-50"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text + Buttons */}
      <div className="relative z-10 text-white max-w-5xl px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.h1
              className="text-4xl md:text-7xl font-extrabold leading-tight drop-shadow-lg"
              variants={itemVariants}
            >
              {slide.title}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-xl font-light max-w-3xl mx-auto drop-shadow-md"
              variants={itemVariants}
            >
              {slide.description}
            </motion.p>

            <motion.div
              className="mt-10 flex justify-center items-center md:gap-4 gap-2"
              variants={itemVariants}
            >
              {slide.button1_title && (
                <Link
                  href={slide.button1_url || "#"}
                  className="bg-primary-brand-color hover:bg-sky-700 text-white font-semibold md:py-3 md:px-8 px-3 py-2 rounded-full shadow-lg transition-all duration-300"
                >
                  {slide.button1_title}
                </Link>
              )}
              {slide.button2_title && (
                <Link
                  href={slide.button2_url || "#"}
                  className="bg-transparent border border-white hover:bg-white hover:text-sky-600 text-white font-semibold md:py-3 md:px-8 px-3 py-2 rounded-full shadow-lg transition-all duration-300"
                >
                  {slide.button2_title}
                </Link>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
