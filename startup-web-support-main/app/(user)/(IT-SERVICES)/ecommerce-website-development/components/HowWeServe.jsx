"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoBuildOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
  IoTrendingUpOutline
} from 'react-icons/io5';

const servicePillars = [
  {
    icon: IoBuildOutline,
    title: 'Modern Technology',
    description: 'We work with industry proven platforms like Magento Ecommerce Development, Woocommerce Ecommerce Development, and Opencart Ecommerce Development. These platforms help us build ecommerce solutions that are scalable, customizable and easy to manage based on different business requirements. Choosing the right platform from the start helps reduce future costs and ensures better performance as your business grows over time.',
  },
  {
    icon: IoPeopleOutline,
    title: 'Expert Team',
    description: 'Our team includes skilled professionals from Bihar and across India including experienced Ecommerce developer Patna specialists. This mix of local market understanding and wider industry experience helps us build ecommerce solutions that match real customer behavior, business needs and regional buying patterns.'
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: 'Holistic Quality',
    description: 'From clean and easy to use interfaces to a strong and reliable backend we maintain quality at every stage of development. Whether it is a simple shopping cart setup or a feature rich ecommerce system we make sure performance security and usability work together smoothly.',
  },
  {
    icon: IoTrendingUpOutline,
    title: 'Business Growth',
    description: 'As an established eCommerce App Development Company in Patna, we understand how important mobile commerce has become for businesses today. Our ecommerce solutions are built to work smoothly on smartphones and tablets so you can easily reach mobile users and keep them engaged.',
  },
];

const HowWeServe = () => {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How do We Serve You?
          </h2>
          <p className="text-lg text-gray-600 max-w-7xl mx-auto leading-relaxed">
            At Startup Web Support we believe a strong online store plays a major role in digital success. As a trusted Ecommerce Website Development Company in India, our development process is focused on long term stability performance and scalability. We’re not a faceless agency. We’re right here in Bihar, which means we’re available for a call or a meeting when things get urgent. We work closely with business owners to understand their goals and then build ecommerce solutions that support real business growth instead of short term results.By combining local insight from our Patna-based developers with global coding standards, we give you a store that feels local but looks international.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          {servicePillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:border-sky-200"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-5">
                  <div className="bg-sky-100 text-sky-600 rounded-full p-4">
                    <Icon className="text-4xl" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeServe;