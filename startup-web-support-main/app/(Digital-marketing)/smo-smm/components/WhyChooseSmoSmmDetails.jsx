"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoBulbOutline, 
  IoRibbonOutline, 
  IoPeopleOutline, 
  IoPricetagsOutline 
} from 'react-icons/io5';

const reasonsData = [
  {
    icon: IoBulbOutline,
    title: 'Customized Strategies',
    description: 'Every company is unique, hence we design customised social media plans depending on your particular objectives.',
  },
  {
    icon: IoRibbonOutline,
    title: 'Proven Track Record',
    description: 'Our team has a proven track record of delivering results for businesses in Patna across various industries.',
  },
  {
    icon: IoPeopleOutline,
    title: 'Expert Team',
    description: 'We make sure that your social media efforts get the best results by working with a dedicated team of social media experts, content writers, and marketing experts.',
  },
  {
    icon: IoPricetagsOutline,
    title: 'Affordable Pricing',
    description: 'We have low prices without lowering the standard of our services, which makes it easier for new and small businesses to get good social media services.',
  },
];

const WhyChooseSmoSmmDetails = () => {
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

  return (
    // Section with white background
    <section className="bg-white md:py-24 py-10">
      <div className="container mx-auto md:px-16 px-10 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Why Choose Startup Web Support for SMO & SMM Services in Patna?
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Startup Web Support stands out as the leading provider of <span className="font-semibold text-sky-600">SMO and SMM services in Patna</span> for several reasons:
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8" // 2-column layout for better readability
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {reasonsData.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                className="bg-slate-50 p-8 rounded-xl border border-slate-100 flex items-start gap-6 transition-all duration-300 transform hover:shadow-lg hover:border-sky-200"
                variants={itemVariants}
              >
                <div className="bg-sky-100 text-sky-600 rounded-lg p-3 mt-1 flex-shrink-0">
                  <Icon className="text-3xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSmoSmmDetails;