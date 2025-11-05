"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoArrowForward } from 'react-icons/io5';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly slower stagger for emphasis
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
        stiffness: 80, // Softer spring
        damping: 15,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.7, rotate: 10 }, // Different entry animation
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 50, // Softer spring for image
        duration: 1.2,
      },
    },
  };

  return (
    <section className="bg-white to-white py-14 md:py-22 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content (Takes more space) */}
          <motion.div
            className="text-center lg:text-left"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
              variants={itemVariants}
            >
              Seeking the <span className="text-sky-600">Top SEO Company</span> in Patna?
            </motion.h1>

            <motion.p 
              className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6"
              variants={itemVariants}
            >
              Look no further! **Startup Web Support** delivers specialized, top-tier SEO services across Patna and Bihar. We empower businesses like yours to achieve higher rankings, boost organic traffic, and **generate valuable leads.
            </motion.p>
            
            <motion.p 
              className="text-gray-600 text-lg leading-relaxed mb-10"
              variants={itemVariants}
            >
              As Patna's most trusted SEO partner, we focus on driving your business growth through strategic Digital Marketing.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <motion.button
                className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 gap-2 text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Your Free SEO Analysis <IoArrowForward className="text-xl" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Image (Takes less space, acts as accent) */}
          <motion.div
            className=" flex justify-center lg:justify-end"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={imageVariants}
          >
            <img
              src="/marketing.svg" // Replace with your actual SEO image URL
              alt="SEO Company Patna"
              className="w-full h-auto" // Slightly smaller max width
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;