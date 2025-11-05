"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoCardOutline,
  IoGlobeOutline,
  IoShieldCheckmarkOutline,
  IoRocketOutline,
  IoEyeOutline,
  IoAnalyticsOutline
} from 'react-icons/io5';

const platformFeatures = [
  { icon: IoCardOutline, text: 'Manage subscriptions, goods, services, and sales.' },
  { icon: IoGlobeOutline, text: 'Modern payment gateways with multi-currency support.' },
  { icon: IoShieldCheckmarkOutline, text: 'Strong encryption and advanced fraud avoidance.' },
];

const businessBenefits = [
  { icon: IoRocketOutline, text: 'Stay competitive in a changing digital economy.' },
  { icon: IoEyeOutline, text: 'Expand brand visibility to a global audience.' },
  { icon: IoAnalyticsOutline, text: 'Boost your consumer base and enable development.' },
];

const GlobalEcommerce = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
            Enter the Global market with E-commerce Technology!
          </h2>
        </motion.div>

        <div className="bg-blue-900/20 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
            >
                <motion.h3 className="text-3xl font-bold text-cyan-300 mb-6" variants={itemVariants}>
                Our Platform Features
                </motion.h3>
                <motion.p className="text-blue-100 mb-8" variants={itemVariants}>
                Our e-commerce platform offers a complete solution for managing all types of online transactions.
                </motion.p>
                <ul className="space-y-5">
                {platformFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                    <motion.li key={index} className="flex items-start gap-4" variants={itemVariants}>
                        <Icon className="text-2xl text-cyan-300 mt-1 flex-shrink-0" />
                        <span className="text-lg text-blue-100">{feature.text}</span>
                    </motion.li>
                    );
                })}
                </ul>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
            >
                <motion.h3 className="text-3xl font-bold text-emerald-300 mb-6" variants={itemVariants}>
                Your Business Benefits
                </motion.h3>
                <motion.p className="text-blue-100 mb-8" variants={itemVariants}>
                E-commerce gives businesses the tools to show off their goods and services to people all over the world.
                </motion.p>
                <ul className="space-y-5">
                {businessBenefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                    <motion.li key={index} className="flex items-start gap-4" variants={itemVariants}>
                        <Icon className="text-2xl text-emerald-300 mt-1 flex-shrink-0" />
                        <span className="text-lg text-blue-100">{benefit.text}</span>
                    </motion.li>
                    );
                })}
                </ul>
            </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalEcommerce;