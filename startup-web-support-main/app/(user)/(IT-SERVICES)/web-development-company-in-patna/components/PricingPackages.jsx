"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const packagesData = [
  {
    name: 'Standard Plan',
    price: '10,000',
    priceUnit: 'INR',
    description: 'Best for informational websites and startups.',
    features: [
      'Home Page + 4 Pages',
      'Informative Website',
      'SEO Friendly Design',
      'Mobile Responsive',
    ],
    buttonText: 'Choose Startup Plan',
    featured: false,
  },
  {
    name: 'Premium Plan',
    price: '20,000',
    priceUnit: 'INR',
    description: 'Ideal for dynamic websites and small businesses.',
    features: [
      'Everything in Standard, plus:',
      'Dynamic Website Features',
      'Admin Panel',
      'Basic eCommerce Functionality',
    ],
    buttonText: 'Choose Small Business Plan',
    featured: true,
  },
  {
    name: 'Custom Plan',
    price: 'Custom',
    priceUnit: '',
    description: 'Tailored solutions for large-scale businesses.',
    features: [
      'Everything in Premium, plus:',
      'Advanced Custom Features',
      'Full eCommerce Suite',
      'Dedicated Support',
    ],
    buttonText: 'Contact for Pricing',
    featured: false,
  },
];

const PricingPackages = () => {
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
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Our Website Development Packages In India
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          {packagesData.map((pkg, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl p-8 h-full flex flex-col transition-all duration-300
                ${pkg.featured 
                  ? 'bg-sky-700 border-2 border-sky-500 transform lg:scale-110 shadow-2xl shadow-sky-500/20' 
                  : 'bg-sky-700/50 border border-slate-700'}`
              }
              variants={itemVariants}
            >
              {pkg.featured && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="bg-sky-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-2">{pkg.name}</h3>
                <p className="text-slate-300 mb-6">{pkg.description}</p>
                <div className="mb-6">
                  <span className={`text-5xl font-extrabold ${pkg.featured ? 'text-sky-400' : 'text-white'}`}>
                    {pkg.price}
                  </span>
                  {pkg.priceUnit && <span className="text-slate-300 ml-1">{pkg.priceUnit}</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8 text-slate-200 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-sky-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 mt-auto
                  ${pkg.featured 
                    ? 'bg-sky-500 hover:bg-sky-600 text-white' 
                    : 'bg-sky-700 hover:bg-sky-600 text-slate-300'}`
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {pkg.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPackages;