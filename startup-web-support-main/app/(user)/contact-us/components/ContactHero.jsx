"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoMailOutline } from 'react-icons/io5'; // Contact related icon

const ContactHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2, // Small delay for content after bg animation (if any)
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
    // Section with a professional gradient background
    <section className="bg-[#1e88e5] text-white py-5 relative overflow-hidden">
        {/* Optional decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-3000"></div>

      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10"> 
        <motion.div
          initial="hidden"
          animate="visible" // Animate on load for hero sections
          variants={containerVariants}
        >
          {/* Icon */}
          <motion.div variants={itemVariants} className="mb-6">
            <IoMailOutline className="text-6xl mx-auto opacity-80" /> 
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg"
            variants={itemVariants}
          >
            Get In Touch
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-sky-100 max-w-2xl mx-auto mt-6 leading-relaxed drop-shadow-md"
            variants={itemVariants}
          >
            We're here to help! Whether you have a question about our services, need a custom quote, or want to discuss your project, feel free to reach out. Let's build something great together.
          </motion.p>
          
          {/* Optional: Breadcrumbs if it's a subpage */}
          {/* <motion.nav className="mt-8 text-sky-200" variants={itemVariants}>
               Home / Contact Us
             </motion.nav> */}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;