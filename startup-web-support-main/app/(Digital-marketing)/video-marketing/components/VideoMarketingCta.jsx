"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoPlayForwardCircleOutline, IoArrowForward } from 'react-icons/io5';

const VideoMarketingCta = () => {
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

  return (
    // Section with sky-600 background and subtle pattern/texture if desired
    <section className="bg-[#1e88e5] text-white py-10 relative overflow-hidden">

      <div className="container mx-auto px-6 max-w-6xl relative z-10"> 
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center" // Use grid for layout flexibility
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Left Column: Main Message */}
          <motion.div className="lg:col-span-2 text-center lg:text-left" variants={itemVariants}>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              variants={itemVariants}
            >
              Start Your Video Marketing Journey Today
            </motion.h2>

            <motion.p 
              className="text-lg text-sky-100 leading-relaxed mb-6"
              variants={itemVariants}
            >
              Video marketing is no longer a luxury—it's a necessity for startups looking to build their brand, engage with their audience, and drive growth. If you're ready to take your startup to the next level with <span className="font-semibold text-white underline decoration-cyan-400 decoration-2">professional video marketing services</span>, Startup Web Support is here to help.
            </motion.p>
          </motion.div>

          {/* Right Column: CTA */}
          <motion.div 
            className="lg:col-span-1 bg-sky-700/60 p-8 rounded-xl border border-sky-500/50 backdrop-blur-sm text-center" 
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.8 }} // Different animation for the CTA box
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 0.3 }}
          >
             <IoPlayForwardCircleOutline className="text-6xl text-cyan-300 mx-auto mb-4" />
             <h3 className="text-2xl font-semibold mb-3">Ready to Grow?</h3>
             <p className="text-sky-100 mb-6 text-sm">
                Contact us today to discuss how we can create a <span className="font-semibold text-white">video marketing strategy</span> tailored to your startup's goals and budget. Let's craft videos that captivate, engage, and convert.
             </p>
             <motion.button
                className="inline-flex items-center bg-white text-sky-600 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 gap-2 text-base" // Slightly smaller button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Discuss Your Project <IoArrowForward className="text-lg" />
              </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoMarketingCta;