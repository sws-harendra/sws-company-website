"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaChartLine, FaStore } from 'react-icons/fa';

const benefitsData = [
  {
    icon: FaTrophy,
    title: 'Beat The Competition',
    description: "If you don't have a Web presence for your company now, then you are falling behind your competition because more than 70% of your competitors are already using Web presence for marketing and lead generation and growing their business rapidly.",
  },
  {
    icon: FaChartLine,
    title: 'Increase Reach & ROI',
    description: 'With a Website or an application for your business, you can reach higher numbers of clients for your business and increase your ROI.',
  },
  {
    icon: FaStore,
    title: '24/7 Online Presence',
    description: "Your Website is an online store where your clients can go and check your products or services even if you are somewhere else. This is the ultimate benefit of having an online presence for your business.",
  },
];

const InvestmentBenefits = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Why Invest in Website Development Services in Patna for Your Business?
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          {benefitsData.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
              >
                <div className="absolute -top-4 -right-4 text-8xl font-extrabold text-gray-100 opacity-80">
                  0{index + 1}
                </div>
                
                <div className="relative z-10">
                  <div className="bg-sky-100 text-sky-600 rounded-full p-4 inline-block mb-6">
                    <Icon className="text-4xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
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

export default InvestmentBenefits;