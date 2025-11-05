"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoShieldHalfOutline } from 'react-icons/io5'; // Icon representing safety/protection

const ChildSafetyHero = () => {
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
    // Section with #1e88e5 background and controlled height
    <section 
      className="bg-[#1e88e5] text-white relative overflow-hidden flex items-center justify-center" 
    >
      <div className="container mx-auto px-6 max-w-5xl text-center relative z-10 py-5"> {/* Added padding */}
        <motion.div
          initial="hidden"
          animate="visible" 
          variants={containerVariants}
        >
          {/* Icon */}
          <motion.div variants={itemVariants} className="mb-4">
            <IoShieldHalfOutline className="text-5xl md:text-6xl mx-auto opacity-80" /> 
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-md"
            variants={itemVariants}
          >
            Child Safety Policy
          </motion.h1>

          <motion.p 
            className="text-lg text-sky-100 max-w-2xl mx-auto mt-4 leading-relaxed drop-shadow-sm"
            variants={itemVariants}
          >
            Our commitment to protecting minors and ensuring a safe online environment when interacting with our services.
          </motion.p>
          
          {/* Optional: Breadcrumbs */}
          {/* <motion.nav className="mt-6 text-sky-200 text-sm" variants={itemVariants}>
               Home / Legal / Child Safety
             </motion.nav> */}
        </motion.div>
      </div>
    </section>
  );
};

export default ChildSafetyHero;