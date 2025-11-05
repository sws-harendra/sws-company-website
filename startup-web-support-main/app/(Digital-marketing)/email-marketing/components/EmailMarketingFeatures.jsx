"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoPeopleOutline, IoInfiniteOutline } from 'react-icons/io5'; // Icons for List Management & Automation

const featuresData = [
  {
    icon: IoPeopleOutline,
    title: 'List Management and Segmentation',
    description: 'Effective email marketing starts with a well-maintained subscriber list. We handle your email lists, making sure are categorized based on consumer behavior, demographics, and preferences and are current. This lets us send very focused emails that boost open rates and produce better outcomes.',
  },
  {
    icon: IoInfiniteOutline,
    title: 'Automated Email Workflows',
    description: 'Automation is key to maximizing the efficiency of your email marketing efforts. We design and implement automated email workflows that keep your audience engaged at every stage of the customer journey. From welcome emails and drip campaigns to re-engagement strategies, we help you maintain consistent communication.',
  },
];

const EmailMarketingFeatures = () => {
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
    <section className="bg-[#1e88e5] text-white py-24">
      <div className="container mx-auto px-6 max-w-7xl">
    
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10" // 2-column layout
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {featuresData.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-sky-700/60 p-8 rounded-xl border border-sky-500/50 flex flex-col h-full backdrop-blur-sm transition-all duration-300 hover:bg-sky-700 hover:shadow-lg" // Glassmorphism effect
                variants={itemVariants}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="bg-white text-sky-600 rounded-lg p-3 flex-shrink-0">
                    <Icon className="text-3xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sky-100 leading-relaxed text-base flex-grow"> {/* Adjusted text color */}
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default EmailMarketingFeatures;