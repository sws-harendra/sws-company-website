"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoShieldCheckmarkOutline } from 'react-icons/io5'; // Icon for privacy/security

const PrivacyPolicyHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
    // Section with a subtle, professional gradient
    <section className="bg-[#1e88e5] text-gray-800 py-10 relative overflow-hidden">

      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10"> 
        <motion.div
          initial="hidden"
          animate="visible" 
          variants={containerVariants}
        >
          {/* Icon */}
          <motion.div variants={itemVariants} className="mb-3">
            <IoShieldCheckmarkOutline className="text-6xl text-white mx-auto" /> 
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight tracking-tight"
            variants={itemVariants}
          >
            Privacy Policy
          </motion.h1>

        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicyHero;