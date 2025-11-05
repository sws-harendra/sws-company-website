"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoPlayCircleOutline, 
  IoEyeOutline, 
  IoAnalyticsOutline, 
  IoHeartOutline,
  IoArrowForward
} from 'react-icons/io5';
import { gridContainerVariants, headerTextVariants, textChildVariants } from '@/components/GlobalCss';
import { buttonVariants } from '@/components/ui/button';

// Key benefits for Video Marketing
const keyBenefits = [
  { icon: IoEyeOutline, text: 'Build Brand Awareness' },
  { icon: IoAnalyticsOutline, text: 'Drive Conversions' },
  { icon: IoHeartOutline, text: 'Establish Personal Connection' },
  { icon: IoPlayCircleOutline, text: 'Showcase Products/Services' },
];

// Replace with your actual background image path from the public folder
const BACKGROUND_IMAGE_URL = '/marketing3.svg'; // Example: public/images/video-marketing-bg.jpg

const VideoMarketingHero = () => {


  return (
    <section className="relative md:h-screen h-[60vh] w-full flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="Video Marketing Background"
          className="w-full h-full object-cover" 
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/80"></div> 
      </div>

      {/* Content */}
      <div className="relative z-10 text-white max-w-4xl px-6">
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible" 
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg"
            variants={headerTextVariants}
          >
            Boost Your Brand with Professional <span className="text-sky-400">Video Marketing</span> in Patna {/* sky Accent */}
          </motion.h1>


          <motion.ul 
            className="flex flex-wrap justify-center gap-x-6 gap-y-4 my-10"
            variants={gridContainerVariants}
          >
            {keyBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.li key={index} className="flex items-center gap-2 text-slate-100" variants={textChildVariants}>
                  <Icon className="text-xl text-sky-400 flex-shrink-0" /> {/* sky Icon */}
                  <span className="font-medium text-sm md:text-base">{benefit.text}</span>
                </motion.li>
              );
            })}
          </motion.ul>
            
          <motion.div variants={buttonVariants}>
            <motion.button
              className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 gap-2 text-lg" // sky Button
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 20px rgba(220, 38, 38, 0.4)" }} 
              whileTap={{ scale: 0.95 }}
            >
              Start Your Video Project <IoArrowForward className="text-xl" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoMarketingHero;