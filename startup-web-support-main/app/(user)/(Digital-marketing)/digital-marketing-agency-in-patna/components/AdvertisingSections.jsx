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
              Our PPC solutions are built for businesses that want fast leads and quick visibility in competitive markets. From proper keyword research and writing clear ad copies to bid management and regular campaign optimization we handle everything in a simple and practical way. We closely track clicks conversions and costs so the campaigns stay profitable and fully aligned with your business goals.
              This performance focused working style has helped many clients recognize us as the best digital marketing company in Bihar because we consistently deliver dependable results. In many cases businesses also compare our working standards and outcomes with the best digital marketing company in India, mainly because of our transparent reporting, clear communication and strong focus on consistent performance rather than short term hype.
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
              Even with the fast growth of digital platforms traditional advertising still plays an important role in building mass brand awareness. Many people still connect strongly with offline media which makes traditional channels useful for expanding reach and strengthening brand recall.<br></br><br></br>
              Our traditional advertising services include print ads, radio promotions and TV commercials that support wider brand exposure. By mixing creative ideas with smart placement we work like a full service best digital marketing company that builds brand presence across both online and offline platforms. This balanced approach helps maintain consistent messaging and clear brand communication across all customer touchpoints.
            </motion.p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AdvertisingSections;