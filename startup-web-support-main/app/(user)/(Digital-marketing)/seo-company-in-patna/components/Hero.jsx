"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoArrowForward } from 'react-icons/io5';
import ContactUs from '@/components/ContactUs';

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
              Are you looking for the right partner to enhance your business's online presence in Patna? At Startup Web Support, we work closely with local businesses, just like you would with a trusted partner. As a trusted SEO company in Patna, our focus is simple — to increase your website's visibility, drive genuine organic traffic, and convert that traffic into real inquiries and leads that truly grow your business.
            </motion.p>
            
            <motion.p 
              className="text-gray-600 text-lg leading-relaxed mb-10"
              variants={itemVariants}
            >
              In today's competitive market, simply having a website isn't enough. The real difference is made when people search and can easily find you. Our practical and step-by-step SEO services in Patna help businesses achieve better rankings in local and regional searches. It's this consistent and results-oriented approach that leads many of our long-term clients to confidently call us the Best SEO Company in Patna.
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
<motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ContactUs page="seo-in-patna" />

              </motion.div>
          {/* Right Column - Image (Takes less space, acts as accent) */}
          {/* <motion.div
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
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;