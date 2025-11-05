"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoFlashOutline,
  IoExpandOutline,
  IoShieldCheckmarkOutline,
  IoHeadsetOutline
} from 'react-icons/io5';

const hostingFeatures = [
  {
    icon: IoFlashOutline,
    title: 'High-Speed Servers',
    description: 'We provide fast loading and effective running of your website by means of high-speed servers and modern technologies.',
  },
  {
    icon: IoExpandOutline,
    title: 'Full Scalability',
    description: 'Our hosting solutions let you readily change your plan as your traffic and requirements increase, ensuring your site can grow with your business.',
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: 'Robust Security',
    description: 'Your data is always safe with thorough security mechanisms covering SSL certificates and frequent backups, guaranteeing peace of mind.',
  },
  {
    icon: IoHeadsetOutline,
    title: '24-Hour Customer Support',
    description: 'Our customer support is always accessible to help with any technical problems, guaranteeing that your website is always operational.',
  },
];

const HighPerformanceHosting = () => {
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
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            High-Performance Hosting to Elevate Your Startup's Online Presence
          </h2>
          <p className="text-lg text-sky-100 max-w-3xl mx-auto mt-4">
            Our domain and hosting solutions are meant to provide startups the ideal basis for a strong online presence. Growing companies depend on dependability and performance.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          {hostingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white text-gray-800 p-8 rounded-xl shadow-lg text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-5">
                  <div className="bg-sky-100 text-sky-600 rounded-full p-4">
                    <Icon className="text-4xl" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
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

export default HighPerformanceHosting;