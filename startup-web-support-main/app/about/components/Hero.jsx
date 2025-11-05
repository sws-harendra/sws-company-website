"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoDiamondOutline, IoBulbOutline, IoPeopleOutline } from 'react-icons/io5'; // Relevant icons

// Replace with your actual image path from the public folder
const aboutUsImageUrl = "/about.jpg"; // Example: public/images/who-are-we-modern.png

const WhoAreWeModern = () => {
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
        damping: 12,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
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
    <section className="bg-white py-24  relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-sky-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Left Column - Content */}
          <motion.div>
             <motion.p 
                className="text-sm font-semibold uppercase tracking-wider text-sky-600 mb-2"
                variants={itemVariants}
             >
                ABOUT US
             </motion.p>

            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8"
              variants={itemVariants}
            >
              Who are we?
            </motion.h2>

            <motion.p 
              className="text-gray-700 text-lg leading-relaxed mb-6"
              variants={itemVariants}
            >
              At <span className="font-semibold text-sky-700">Startup Web Support</span>, we are dedicated to providing Patna companies with creative IT solutions. Our leading firm specializes in web development, mobile app development, graphic design, and digital marketing. We are committed to providing tailored solutions that improve online presence and stimulate development.
            </motion.p>
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed mb-8"
              variants={itemVariants}
            >
              Our <span className="font-semibold text-sky-700">customer-centric approach</span> means every project is customized to fit our clients' unique requirements. Focusing on quality, creativity, and dependability, we are your reliable partner for all your digital needs, enabling your company to flourish in today's competitive market.
            </motion.p>

            <motion.div className="flex flex-wrap gap-6" variants={containerVariants}>
                <motion.div className="flex items-center gap-3 text-gray-800" variants={itemVariants}>
                    <IoDiamondOutline className="text-2xl text-sky-500" />
                    <span className="font-medium">Quality Solutions</span>
                </motion.div>
                <motion.div className="flex items-center gap-3 text-gray-800" variants={itemVariants}>
                    <IoBulbOutline className="text-2xl text-sky-500" />
                    <span className="font-medium">Creative Approach</span>
                </motion.div>
                <motion.div className="flex items-center gap-3 text-gray-800" variants={itemVariants}>
                    <IoPeopleOutline className="text-2xl text-sky-500" />
                    <span className="font-medium">Client-Centric</span>
                </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image with modern styling */}
          <motion.div
            className="flex justify-center lg:justify-end relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
          >
             <img
                src={aboutUsImageUrl} 
                alt="Who We Are - Modern Illustration"
                className="w-full h-auto rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500" 
             />
             {/* Additional decorative element */}
             <div className="absolute -bottom-8 -left-8 lg:-right-8 lg:bottom-16 w-32 h-32 bg-sky-200 opacity-60 rounded-full filter blur-xl z-[-1]"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoAreWeModern;