"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaAward, 
  FaUsers, 
  FaLaptopCode, 
  FaStar, 
  FaLightbulb,
  FaHeadset,
  FaFileCode,
  FaCalendarAlt,
  FaMoneyBillWave
} from 'react-icons/fa';

const strengthsData = [
  {
    icon: FaAward,
    title: '2000+ Projects Delivered',
    description: 'We have earned the trust of every client by successfully delivering thousands of projects across various domains.',
  },
  {
    icon: FaStar,
    title: 'High Client Ratings',
    description: 'Our track record speaks for itself, with thousands of satisfied clients across the globe praising our work.',
  },
  {
    icon: FaLaptopCode,
    title: 'Experienced in All Technologies',
    description: 'Our team is skilled in Java, Shopify, WordPress, PHP, Laravel, WIX, and more to build exactly what you need.',
  },
  {
    icon: FaUsers,
    title: 'Experienced & Skilled Web Developers',
    description: 'Certified and experienced full-stack website development professionals in every tool, ensuring top-notch solutions.',
  },
  {
    icon: FaLightbulb,
    title: 'Multi-Industry Expertise',
    description: 'We have served diverse sectors including eCommerce, healthcare, education, real estate, and more with tailored solutions.',
  },
  {
    icon: FaHeadset,
    title: 'Quick & Trustable Support',
    description: 'Get fast response times with real human support to resolve your queries and issues promptly and efficiently.',
  },
  {
    icon: FaFileCode,
    title: 'Highly Efficient Codes & Design',
    description: 'We craft smooth, responsive, and SEO-friendly websites with clean, optimized code for superior performance.',
  },
  {
    icon: FaCalendarAlt,
    title: 'Since 2017',
    description: 'Years of consistency and client’s trust. We have been a reliable partner in digital growth for over half a decade.',
  },
  {
    icon: FaMoneyBillWave,
    title: 'Honest, Affordable & Transparent Pricing',
    description: 'We believe in clear communication and providing value with no hidden charges, ensuring a trustworthy partnership.',
  },
];

const CoreStrengths = () => {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 10,
      },
    },
  };

  return (
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={itemVariants}
          >
            More Reasons to Hire Startup Web Support
          </motion.h2>
          <motion.p
            className="text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            We are a reliable Web Development Company in Patna, Bihar. Let us show you why we should be the first choice for your business needs.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          {strengthsData.map((strength, index) => {
            const Icon = strength.icon;
            return (
              <motion.div
                key={index}
                className="bg-sky-700 p-8 rounded-xl border border-slate-700 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-500/20"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="text-sky-300 rounded-full p-4 mb-6 flex-shrink-0">
                  <Icon className=" bg-gradient-to-r from-sky-700 to to-sky-950 rounded-full p-2 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-3">
                  {strength.title}
                </h3>
                <p className="text-slate-200 leading-relaxed text-sm flex-grow">
                  {strength.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreStrengths;