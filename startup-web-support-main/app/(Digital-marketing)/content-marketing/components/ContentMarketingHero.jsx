"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoCreateOutline,       // Content Creation
  IoBulbOutline,          // Strategy
  IoAnalyticsOutline,     // SEO / Results
  IoPeopleOutline,        // Audience Engagement
  IoArrowForward
} from 'react-icons/io5';

// Key aspects for Content Marketing
const keyAspects = [
  { icon: IoCreateOutline, text: 'High-Quality Content Creation' },
  { icon: IoBulbOutline, text: 'Strategic Content Planning' },
  { icon: IoAnalyticsOutline, text: 'SEO Optimization' },
  { icon: IoPeopleOutline, text: 'Audience Engagement' },
];

// Replace with your actual background image path from the public folder
const BACKGROUND_IMAGE_URL = '/marketing.svg'; // Example: public/images/content-marketing-bg.jpg

const ContentMarketingHero = () => {
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
    <section className="relative md:h-screen h-[60vh] w-full flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="Content Marketing Background"
          className="w-full h-full object-cover" 
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/80"></div> 
      </div>

      {/* Content */}
      <div className="relative z-10 text-white max-w-5xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible" 
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg"
            variants={itemVariants}
          >
            Elevate Your Business with Premier <span className="text-sky-400">Content Marketing</span> in Patna {/* sky Accent */}
          </motion.h1>

          <motion.ul 
            className="flex flex-wrap justify-center gap-x-6 gap-y-4 my-10"
            variants={containerVariants}
          >
            {keyAspects.map((aspect, index) => {
              const Icon = aspect.icon;
              return (
                <motion.li key={index} className="flex items-center gap-2 text-slate-100" variants={itemVariants}>
                  <Icon className="text-xl text-sky-400 flex-shrink-0" /> {/* sky Icon */}
                  <span className="font-medium text-sm md:text-base">{aspect.text}</span>
                </motion.li>
              );
            })}
          </motion.ul>
            
          <motion.div variants={itemVariants}>
            <motion.button
              className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 md:px-10 px-4 rounded-full shadow-lg transition-all duration-300 gap-2 text-lg" // sky Button
              whileHover={{ scale: 1.05, y: -3}} 
              whileTap={{ scale: 0.95 }}
            >
              Develop Your Content Strategy <IoArrowForward className="text-xl" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContentMarketingHero;