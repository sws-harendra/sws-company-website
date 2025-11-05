"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoShareSocialOutline, 
  IoChatbubblesOutline, 
  IoRocketOutline, 
  IoAnalyticsOutline,
  IoArrowForward
} from 'react-icons/io5';

// Key benefits for SMO/SMM
const keyBenefits = [
  { icon: IoShareSocialOutline, text: 'Enhanced Brand Awareness' },
  { icon: IoChatbubblesOutline, text: 'Increased Audience Engagement' },
  { icon: IoRocketOutline, text: 'Significant Traffic Growth' },
  { icon: IoAnalyticsOutline, text: 'Measurable Customer Interactions' },
];

// Replace with your actual background image path from the public folder
const BACKGROUND_IMAGE_URL = '/marketing3.svg'; // Example: public/images/social-media-background.jpg

const SmoSmmHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Adjusted stagger timing
        delayChildren: 0.3, // Delay children animation slightly after bg loads
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
          alt="Social Media Marketing Background"
          className="w-full h-full object-cover" 
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/80"></div> 
      </div>

      {/* Content */}
      <div className="relative z-10  text-white max-w-4xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible" 
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg"
            variants={itemVariants}
          >
            Startup Web Support: <br className="hidden md:block"/> <span className="text-sky-400">SMO & SMM Services</span> in Patna
          </motion.h1>

          <motion.ul 
            className="flex flex-wrap justify-center gap-x-6 gap-y-4 my-10"
            variants={containerVariants} // Stagger inside the main container
          >
            {keyBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.li key={index} className="flex items-center gap-2 text-slate-100" variants={itemVariants}>
                  <Icon className="text-xl text-sky-400 flex-shrink-0" />
                  <span className="font-medium text-sm md:text-base">{benefit.text}</span>
                </motion.li>
              );
            })}
          </motion.ul>
            
          <motion.div variants={itemVariants}>
            <motion.button
              className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold md:py-4 md:px-10 px-4 py-3 rounded-full shadow-lg transition-all duration-300 gap-2 text-lg"
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 20px rgba(2, 132, 199, 0.4)" }} // Added shadow on hover
              whileTap={{ scale: 0.95 }}
            >
              Boost Your Social Presence <IoArrowForward className="text-xl" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SmoSmmHero;