"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoLogoWhatsapp,      // WhatsApp icon
  IoChatbubblesOutline, // Communication
  IoRocketOutline,       // Growth/Potential
  IoPeopleOutline,       // Audience Interaction
  IoArrowForward,
  IoAnalyticsOutline
} from 'react-icons/io5';

// Key benefits for WhatsApp Marketing
const keyBenefits = [
  { icon: IoChatbubblesOutline, text: 'Direct Customer Communication' },
  { icon: IoRocketOutline, text: 'Boost Engagement & Sales' },
  { icon: IoPeopleOutline, text: 'Leverage a Powerful Tool' },
  { icon: IoAnalyticsOutline, text: 'Stand Out in the Market' }, // Reusing Analytics icon
];

// Replace with your actual background image path from the public folder
const BACKGROUND_IMAGE_URL = '/marketing.svg'; // Example: public/images/whatsapp-marketing-bg.jpg

const WhatsAppMarketingHero = () => {
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
    <section className="relative md:h-screen h-[60vh] w-full flex items-center justify-center text-center overflow-hidden md:py-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="WhatsApp Marketing Background"
          className="w-full h-full object-cover" 
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/80"></div> 
      </div>

      {/* Content */}
      <div className="relative z-10 text-white md:max-w-4xl md:px-6 px-3 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible" 
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg"
            variants={itemVariants}
          >
            Unlock Your Business Potential with <span className="text-sky-400">WhatsApp Marketing Services</span>! {/* sky Accent */}
          </motion.h1>

          

          <motion.ul 
            className="flex flex-wrap justify-center gap-x-6 gap-y-4 my-10"
            variants={containerVariants}
          >
            {keyBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.li key={index} className="flex items-center gap-2 text-slate-100" variants={itemVariants}>
                  <Icon className="text-xl text-sky-400 flex-shrink-0" /> {/* sky Icon */}
                  <span className="font-medium text-sm md:text-base">{benefit.text}</span>
                </motion.li>
              );
            })}
          </motion.ul>
            
          <motion.div variants={itemVariants}>
            <motion.button
              className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 gap-2 text-lg" // sky Button
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 20px rgba(22, 163, 74, 0.4)" }} 
              whileTap={{ scale: 0.95 }}
            >
              Start WhatsApp Campaign <IoArrowForward className="text-xl" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsAppMarketingHero;