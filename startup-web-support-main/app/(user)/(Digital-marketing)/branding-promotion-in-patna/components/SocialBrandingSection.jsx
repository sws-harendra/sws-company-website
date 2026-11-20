"use client"
import React from 'react';
import { motion } from 'framer-motion';

// Replace with your actual image path from the public folder
const brandingImageUrl = "/marketing2.svg"; // Example: /images/social-branding.png

const SocialBrandingSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        duration: 1,
        delay: 0.2
      },
    },
  };

  return (
    // Section with sky-600 background
    <section className="bg-[#1e88e5] text-white py-24  overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              variants={itemVariants}
            >
              Social Media Branding and Management
            </motion.h2>

            <motion.p 
              className="text-lg text-sky-100 leading-relaxed" // Adjusted text color
              variants={itemVariants}
            >
              Promoting a brand and involving an audience can both benefit from social media. We build and oversee your social media profiles to provide your fans with a consistent brand voice and look. Our team crafts compelling content and runs targeted campaigns to increase your social media presence and drive brand loyalty.
            </motion.p>
            
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            className="flex justify-center items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
          >
             <div className="bg-white w-full p-4 rounded-xl shadow-2xl border-4 border-sky-400/50">
               <img
                  src={brandingImageUrl}
                  alt="Social Media Branding and Management"
                  className="w-full h-auto rounded-lg" 
               />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialBrandingSection;