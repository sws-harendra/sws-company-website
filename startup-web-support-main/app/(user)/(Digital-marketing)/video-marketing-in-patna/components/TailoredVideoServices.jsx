"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoChatboxEllipsesOutline, // Brand Storytelling
  IoBulbOutline,            // Explainer Videos
  IoVideocamOutline,        // Product Demos
  IoHeartOutline,           // Customer Testimonials
  IoShareSocialOutline     // Social Media Videos
} from 'react-icons/io5';
import { gridContainerVariants, headerTextVariants, textChildVariants } from '@/components/GlobalCss';

const videoServices = [
  {
    icon: IoChatboxEllipsesOutline,
    title: 'Brand Storytelling Videos',
    description: 'Share the story behind your startup, your mission, and what sets you apart. A well-told brand story can create an emotional connection, fostering loyalty and trust.',
  },
  {
    icon: IoBulbOutline,
    title: 'Explainer Videos',
    description: 'Simplify complex ideas or products with engaging explainer videos. We help you create content that breaks down your offerings in an easy-to-understand way.',
  },
  {
    icon: IoVideocamOutline,
    title: 'Product Demos',
    description: 'Showcase the features and benefits of your products with detailed demo videos, great for e-commerce startups or demonstrating solutions.',
  },
  {
    icon: IoHeartOutline,
    title: 'Customer Testimonials',
    description: 'Nothing builds credibility like customer testimonials. We create authentic videos featuring satisfied customers sharing their positive experiences.',
  },
   {
    icon: IoChatboxEllipsesOutline,
    title: 'Brand Storytelling Videos',
    description: 'Share the story behind your startup, your mission, and what sets you apart. A well-told brand story can create an emotional connection, fostering loyalty and trust.',
  },
  {
    icon: IoShareSocialOutline,
    title: 'Social Media Videos',
    description: 'Our team designs bite-sized, highly shareable videos optimized for platforms like Facebook, Instagram, and LinkedIn to maximize engagement and reach.',
  },
];

const TailoredVideoServices = () => {

  return (
    // Section with sky-600 background
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          variants={gridContainerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={headerTextVariants}
          >
            Tailored Video Marketing Services for Startups in Patna
          </motion.h2>
          <motion.p 
            className="text-lg text-sky-100 max-w-4xl mx-auto leading-relaxed mb-6"
            variants={textChildVariants}
          >
            At Startup Web Support, we offer full video marketing services specially designed to meet the needs of startups. Whether your company is a tech startup, a retail store, or a Patna service provider, we assist you in producing videos that appeal to your target market and improve the profile of your brand.
          </motion.p>
           <motion.p 
            className="text-lg text-sky-100 max-w-4xl mx-auto leading-relaxed font-semibold"
            variants={textChildVariants}
          >
           Our video marketing services include:
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" // Using 3 columns, last row will center items if needed or adjust grid
          variants={gridContainerVariants}
        >
          {videoServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-sky-700/60 p-8 rounded-xl border border-sky-500/50 flex flex-col h-full backdrop-blur-sm transition-all duration-300 hover:bg-sky-700 hover:shadow-lg" 
                variants={gridContainerVariants}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white text-sky-600 rounded-lg p-3 flex-shrink-0">
                    <Icon className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sky-100 text-sm leading-relaxed flex-grow"> 
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TailoredVideoServices;