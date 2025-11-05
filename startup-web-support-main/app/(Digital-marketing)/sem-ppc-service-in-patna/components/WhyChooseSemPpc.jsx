"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoRibbonOutline, 
  IoPricetagsOutline, 
  IoPeopleOutline 
} from 'react-icons/io5';

const whyChooseUsPoints = [
  {
    icon: IoRibbonOutline,
    title: 'Proven Track Record',
    description: 'We’ve helped businesses across Patna and Bihar achieve measurable success through targeted SEM campaigns and Google Ads management.',
  },
  {
    icon: IoPricetagsOutline,
    title: 'Affordable SEM and PPC Packages',
    description: 'We offer flexible pricing to suit the needs of small businesses, startups, and large enterprises.',
  },
  {
    icon: IoPeopleOutline,
    title: 'Expert Team',
    description: 'Our certified PPC specialists have years of experience managing high-performance ad campaigns on Google, Bing, and social media platforms.',
  },
];

const WhyChooseSemPpc = () => {
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
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Why Choose Startup Web Support for SEM and PPC in Patna?
          </motion.h2>
          <motion.p 
            className="text-lg text-sky-100 max-w-4xl mx-auto leading-relaxed mb-6"
            variants={itemVariants}
          >
            In today's competitive digital landscape, businesses need a smart marketing strategy to stay ahead. Our <span className="font-semibold">SEM services in Patna</span> focus on delivering paid search marketing campaigns that drive targeted traffic, improve brand visibility, and increase your return on investment (ROI). Whether you are a local business in Patna or a growing enterprise in Bihar, we offer customized SEM and PPC strategies that align with your business goals.
          </motion.p>
          <motion.p 
             className="text-lg text-sky-100 max-w-4xl mx-auto leading-relaxed font-semibold"
             variants={itemVariants}
           >
            With Startup Web Support, you'll benefit from our:
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8" // 3-column grid for the points
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {whyChooseUsPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                className="bg-sky-700/60 p-8 rounded-xl border border-sky-500/50 text-center transition-all duration-300 transform hover:bg-sky-700 hover:shadow-lg hover:-translate-y-2"
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

export default WhyChooseSemPpc;