"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaAward, 
  FaUsers, 
  FaCogs, 
  FaStar, 
  FaShieldAlt, 
  FaHeadset 
} from 'react-icons/fa';
import { textChildVariants } from '@/components/GlobalCss';

const advantagesData = [
  {
    icon: FaAward,
    title: '2000+ Projects Delivered',
    description: 'We have earned the trust of every client we have dealt with by successfully delivering thousands of projects.',
  },
  {
    icon: FaCogs,
    title: 'Experienced in All Technologies',
    description: 'Our team is skilled in Java, Shopify, WordPress, PHP, Laravel, WIX, and more to build exactly what you need.',
  },
  {
    icon: FaUsers,
    title: 'Multi-Industry Expertise',
    description: 'We have served diverse sectors including eCommerce, healthcare, education, real estate, and more.',
  },
  {
    icon: FaShieldAlt,
    title: 'Secure & Scalable Websites',
    description: 'Security and scalability are built into every project, ensuring your website performs reliably under any load.',
  },
  {
    icon: FaStar,
    title: 'Honest & Transparent Pricing',
    description: 'We believe in clear communication and providing value with no hidden charges, ensuring a trustworthy partnership.',
  },
  {
    icon: FaHeadset,
    title: 'Quick & Trustable Support',
    description: 'Get fast response times with real human support to resolve your queries and issues promptly.',
  },
];

const OurAdvantages = () => {
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
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative py-24  overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.h2 variants={textChildVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Partner With Us?
          </motion.h2>
          <motion.p variants={textChildVariants} className="text-lg text-slate-300 max-w-3xl mx-auto">
            We deliver more than just a website; we deliver a complete digital solution designed for performance, reliability, and growth.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          {advantagesData.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center"
                variants={itemVariants}
                whileHover={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  y: -5,
                  transition: { type: 'spring', stiffness: 300 }
                }}
              >
                <div className="flex justify-center mb-5">
                  <div className="bg-sky-900/20 text-sky-600 rounded-full p-4">
                    <Icon className="text-4xl" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {advantage.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default OurAdvantages;