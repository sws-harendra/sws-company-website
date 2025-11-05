"use client"
import React from 'react';
import { motion } from 'framer-motion';

// Replace with your actual image paths from the public folder
const ppcImageUrl = "/marketing4.svg"; // Example: /images/advertising-ppc.png
const traditionalImageUrl = "/marketing3.svg"; // Example: /images/advertising-traditional.png

const AdvertisingSections = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        damping: 10,
      },
    },
  };

  const imageVariants = (fromLeft = true) => ({
    hidden: { opacity: 0, x: fromLeft ? -50 : 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        duration: 1,
      },
    },
  });

  return (
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl space-y-24">
        
        {/* Section 1: Pay-per-click (PPC) Advertising */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6"
              variants={itemVariants}
            >
              Pay-per-click (PPC) Advertising for Instant Results
            </motion.h2>

            {/* Content directly from the image */}
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Our pay-per-click (PPC) advertising services are perfect for businesses that want results right away. We make and run targeted <span className="text-sky-600 font-semibold">pay-per-click (PPC)</span> programs on Google Ads and Bing, focussing on keywords that convert well and smart ad placements. Our team continuously monitors and optimizes your campaigns to maximize return on investment, ensuring every dollar spent contributes to your business growth.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={imageVariants(false)} // Animate from right
            className="flex justify-center"
          >
            <img
              src={ppcImageUrl} 
              alt="PPC Advertising"
              className="w-full max-w-md h-auto rounded-lg"
            />
          </motion.div>
        </div>

        {/* Section 2: Traditional Advertising */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={imageVariants(true)} // Animate from left
            className="flex justify-center order-1 lg:order-1" // Image on left for this row
          >
            <img
              src={traditionalImageUrl} 
              alt="Traditional Advertising"
              className="w-full max-w-md h-auto rounded-lg"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="order-2 lg:order-2" // Content on right for this row
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6"
              variants={itemVariants}
            >
              Traditional Advertising: Reaching a Wider Audience
            </motion.h2>

            {/* Content directly from the image */}
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Although digital marketing is rather important, <span className="text-sky-600 font-semibold">conventional advertising strategies</span> still have great worth. Our print ads, radio spots, and TV commercials—which help you reach a larger audience—particle our advertising offerings. We mix smart placement with artistic design to make sure your message gets to the correct people at the correct moment, therefore improving the visibility and influence of your brand.
            </motion.p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AdvertisingSections;