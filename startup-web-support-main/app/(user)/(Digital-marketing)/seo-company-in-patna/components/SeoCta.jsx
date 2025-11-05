"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoArrowForward } from 'react-icons/io5';

const SeoCta = () => {
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

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        duration: 1,
      },
    },
  };

  return (
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={imageVariants}
            className="flex justify-center"
          >
            {/* Replace with your actual CTA image URL */}
            <img
              src="marketing.svg" // Using a placeholder, replace with the handshake image
              alt="Get Started with SEO Services"
              className="w-full max-w-md h-auto"
            />
          </motion.div>

          {/* Right Column - Content */}
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
              Get Started with the <span className="text-sky-600">Best SEO Services in Patna</span> Today!
            </motion.h2>

            <motion.p 
              className="text-gray-700 text-lg leading-relaxed mb-4"
              variants={itemVariants}
            >
              Whether you're looking for affordable <span className="font-semibold text-sky-600">SEO services in Patna</span> or need to boost your local SEO in Bihar, Startup Web Support is here to help. We provide top-notch SEO solutions that are tailored to your business and focused on achieving results.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed mb-8"
              variants={itemVariants}
            >
              Ready to grow your business with the <span className="font-semibold text-sky-600">best SEO Company in Patna</span>? Contact us today to discuss your SEO needs, and let's create a strategy that gets your website the visibility it deserves!
            </motion.p>

            <motion.div variants={itemVariants}>
              <motion.button
                className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 gap-2 text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us Now <IoArrowForward className="text-xl" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SeoCta;