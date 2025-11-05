"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoWalletOutline,
  IoGlobeOutline,
  IoShieldCheckmarkOutline,
  IoArrowForward
} from 'react-icons/io5';

const ecommerceFeatures = [
  {
    icon: IoWalletOutline,
    title: 'Complete Transaction Management',
    description: 'Our system easily and securely enables several transaction kinds including payments, refunds, and invoicing, whether you are managing subscriptions, providing goods or services, or running sales.',
  },
  {
    icon: IoGlobeOutline,
    title: 'Modern & Global Payments',
    description: 'Combining modern payment gateways with multi-currency capability guarantees flawless transactions for clients all around. Managing online transactions has never been more quick or easy.',
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: 'Advanced Security & Fraud Avoidance',
    description: 'Strong encryption and fraud avoidance techniques also protect every transaction, thereby giving your clients and you piece of mind and ensuring complete security.',
  },
];

const EcommerceFeatures = () => {
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
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">
            BENEFITS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            E-commerce Website Development in Patna
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Our e-commerce platform offers a complete solution for managing all kinds of online transactions, providing a one-stop shop for your digital company needs.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          {ecommerceFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg flex flex-col h-full transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500"
                variants={itemVariants}
              >
                <div className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Icon className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow mb-6">{feature.description}</p>
                <a href="#" className="flex items-center text-blue-600 font-semibold mt-auto group">
                  Learn More
                  <IoArrowForward className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default EcommerceFeatures;