"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoBulbOutline, 
  IoAnalyticsOutline, 
  IoDocumentsOutline 
} from 'react-icons/io5';

const whyBestPoints = [
  {
    icon: IoBulbOutline,
    title: 'Targeted Campaigns',
    description: 'Our main concentration is on running focused ad campaigns meant to turn visitors into leads or consumers. Our plans guarantee reaching the correct individuals at the correct moment.',
  },
  {
    icon: IoAnalyticsOutline, // Reusing icon for demonstration, change if needed
    title: 'Customized Solutions',
    description: 'Every business is different, and so are our SEM strategies. We create customized PPC campaigns tailored to your business goals and target audience.',
  },
  {
    icon: IoDocumentsOutline,
    title: 'Transparent Reporting',
    description: 'We provide regular reports and insights into your campaign performance. Our detailed analytics help you understand the ROI of your ad spend and identify opportunities for improvement.',
  },
];

const BestSemAgency = () => {
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
        damping: 12,
      },
    },
  };



  return (
    // Section with sky-600 background
    <section className="bg-[#1e88e5] text-white py-24  overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Text Content Section */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Why Startup Web Support is the Best SEM Agency in Patna and Bihar
          </motion.h2>
          <motion.p 
            className="text-lg text-sky-100 max-w-3xl mx-auto mb-12"
            variants={itemVariants}
          >
            Here's why businesses across Patna and Bihar trust us for their SEM and PPC services:
          </motion.p>
        </motion.div>

        {/* Points Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {whyBestPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                className="bg-sky-700/60 p-8 rounded-xl border border-sky-500/50 text-center transition-all duration-300 transform hover:bg-sky-700 hover:shadow-lg"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-5">
                  <div className="bg-white text-sky-600 rounded-full p-4">
                    <Icon className="text-4xl" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {point.title}
                </h3>
                <p className="text-sky-100 leading-relaxed text-sm">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default BestSemAgency;