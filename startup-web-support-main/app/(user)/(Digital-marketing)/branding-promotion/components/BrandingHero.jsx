"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoSparklesOutline, 
  IoMegaphoneOutline, 
  IoColorPaletteOutline, 
  IoAnalyticsOutline,
  IoArrowForward
} from 'react-icons/io5';

// Key aspects of branding & promotion
const keyAspects = [
  { icon: IoSparklesOutline, text: 'Strong Brand Identity' },
  { icon: IoColorPaletteOutline, text: 'Innovative Design' },
  { icon: IoMegaphoneOutline, text: 'Targeted Promotion' },
  { icon: IoAnalyticsOutline, text: 'Long-Term Development' },
];

// Replace with your actual background image path from the public folder
const BACKGROUND_IMAGE_URL = '/brand&permotion.svg'; // Example: public/images/branding-background.jpg

const BrandingHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="relative md:h-screen h-[60vh] w-full flex items-center justify-center text-center overflow-hidden md:py-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="Branding and Promotion Background"
          className="w-full h-full object-cover" 
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/80"></div> 
      </div>

      {/* Content */}
      <div className="relative z-10 text-white md:max-w-4xl w-full md:px-6 px-3">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible" 
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg"
            variants={itemVariants}
          >
            Elevate Your Startup with <br className="hidden md:block"/> Expert <span className="text-sky-400">Branding and Promotion</span> Services
          </motion.h1>

          <motion.ul 
            className="flex flex-wrap justify-center gap-x-6 gap-y-4 my-10"
            variants={containerVariants}
          >
            {keyAspects.map((aspect, index) => {
              const Icon = aspect.icon;
              return (
                <motion.li key={index} className="flex items-center gap-2 text-slate-100" variants={itemVariants}>
                  <Icon className="text-xl text-sky-400 flex-shrink-0" />
                  <span className="font-medium text-sm md:text-base">{aspect.text}</span>
                </motion.li>
              );
            })}
          </motion.ul>
            
          <motion.div variants={itemVariants}>
            <motion.button
              className="inline-flex items-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 gap-2 text-lg"
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 20px rgba(22, 163, 175, 0.4)" }} 
              whileTap={{ scale: 0.95 }}
            >
              Build Your Brand <IoArrowForward className="text-xl" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandingHero;