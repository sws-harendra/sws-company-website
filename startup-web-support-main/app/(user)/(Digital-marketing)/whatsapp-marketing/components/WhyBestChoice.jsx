"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoShieldCheckmarkOutline } from 'react-icons/io5'; // Icon representing trust/best choice

const WhyBestChoice = () => {
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
    // Section with white background
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-4xl text-center"> {/* Centered content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <IoShieldCheckmarkOutline className="text-6xl text-sky-600 mx-auto" /> 
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
            variants={itemVariants}
          >
            Why We're the Best Choice for Your Startup Web Support in Patna
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            As a leading provider of <span className="font-semibold text-gray-800">Startup Web Support in Patna</span>, we understand the challenges startups face in establishing their online presence. Our knowledgeable staff is committed to properly negotiating the digital terrain for you. Our <span className="font-semibold text-sky-600">WhatsApp marketing tools</span> will help you to increase sales, simplify your correspondence, and raise client involvement.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyBestChoice;