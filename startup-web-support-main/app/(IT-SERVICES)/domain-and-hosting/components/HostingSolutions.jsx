"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoServerOutline,
  IoShieldCheckmarkOutline,
  IoTimerOutline,
  IoHeadsetOutline,
  IoKeypadOutline,
  IoMailOutline
} from 'react-icons/io5';
import Image from 'next/image';

const hostingFeatures = [
  { icon: IoServerOutline, text: 'Scalable Hosting Options' },
  { icon: IoShieldCheckmarkOutline, text: 'Robust Security Features' },
  { icon: IoTimerOutline, text: '99.9% Uptime Guarantee' },
  { icon: IoHeadsetOutline, text: 'Round-the-clock Support' },
  { icon: IoKeypadOutline, text: 'Easy-to-use Control Panel' },
  { icon: IoMailOutline, text: 'Professional Email Accounts' },
];

const HostingSolutions = () => {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
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
        duration: 1
      },
    },
  };

  return (
    <section className="bg-white py-16 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={imageVariants}
          >
            <Image
              width={100}
              height={100}
              src="domain.svg"
              alt="Domain and Hosting Solutions"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.p 
              className="text-sm font-semibold uppercase tracking-wider text-sky-600 mb-2"
              variants={itemVariants}
            >
              BENEFITS
            </motion.p>

            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6"
              variants={itemVariants}
            >
              Reliable Domain and Hosting Solutions for Your Startup's Success
            </motion.h2>

            <motion.p 
              className="text-gray-600 text-lg leading-relaxed mb-8"
              variants={itemVariants}
            >
              Designed to fit startups' demands, our domain and hosting services offer dependable, safe solutions to maintain your web presence. Our hosting options are meant for scalability so that your website may grow as your company grows.
            </motion.p>
            
            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5"
              variants={containerVariants}
            >
              {hostingFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.li key={index} className="flex items-center gap-4" variants={itemVariants}>
                    <div className="bg-sky-100 text-sky-600 p-3 rounded-full">
                      <Icon className="text-xl" />
                    </div>
                    <span className="font-semibold text-gray-700">{feature.text}</span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HostingSolutions;