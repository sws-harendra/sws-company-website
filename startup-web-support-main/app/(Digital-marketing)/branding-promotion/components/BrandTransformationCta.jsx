"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoSparklesOutline, 
  IoColorPaletteOutline, 
  IoMegaphoneOutline, 
  IoArrowForward 
} from 'react-icons/io5';

const keyBenefits = [
  { icon: IoSparklesOutline, text: 'Distinctive Brand Identity' },
  { icon: IoColorPaletteOutline, text: 'Compelling Visual Design' },
  { icon: IoMegaphoneOutline, text: 'Effective Promotion Strategies' },
];

const BrandTransformationCta = () => {
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
    <section className="bg-white py-10">
      <div className="container mx-auto px-6 max-w-7xl"> 
        <motion.div
          className="bg-gradient-to-br from-sky-50 to-indigo-100 p-10 md:p-16 rounded-2xl shadow-lg text-center border border-sky-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
            variants={itemVariants}
          >
            Transform Your Brand with Our Expert Services
          </motion.h2>

          <motion.p 
            className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
            Your startup may establish a powerful and long-lasting presence on the market using our branding and promotion services. Get in touch now to find out how we could assist you in developing a <span className="font-semibold text-sky-600">distinctive brand</span> that fuels digital age success and expansion.
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10"
            variants={containerVariants}
          >
            {keyBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div key={index} className="flex items-center gap-3 text-gray-800" variants={itemVariants}>
                  <Icon className="text-xl text-sky-500 flex-shrink-0" />
                  <span className="font-medium">{benefit.text}</span>
                </motion.div>
              );
            })}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <motion.button
              className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 gap-2 text-lg"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Building Your Brand <IoArrowForward className="text-xl" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandTransformationCta;