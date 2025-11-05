"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoArrowForward } from 'react-icons/io5';

const CompactCtaBanner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Slightly slower stagger
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    // Section with sky-600 background and less vertical padding
    <section className="bg-sky-600 py-16 md:py-20 "> 
      <div className="container mx-auto px-6 max-w-7xl"> 
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left" // Horizontal layout on large screens
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Left Side: Text Content */}
          <motion.div className="lg:w-2/3" variants={itemVariants}>
            <h2 
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4"
            >
              Get Started Today!
            </h2>
            <p 
              className="text-lg text-sky-100 leading-relaxed"
            >
              Ready to elevate your startup? Partner with <span className="font-semibold text-white">Startup Web Support</span> for expert website solutions, content strategies, and ongoing support. Contact us to create a strategy that fuels your digital success.
            </p>
          </motion.div>

          {/* Right Side: Button */}
          <motion.div className="lg:w-auto flex-shrink-0" variants={itemVariants}>
            <motion.button
              className="inline-flex items-center bg-white text-sky-600 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 gap-2 text-lg transform hover:-translate-y-1" // White button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us Now <IoArrowForward className="text-xl" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompactCtaBanner;