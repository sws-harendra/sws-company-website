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
    description: 'Our strategy revolves around using the newest technology and best practices to create a strong e-commerce platform fit for your particular requirements.',
  },
  {
    icon: IoPeopleOutline,
    title: 'Expert Team',
    description: 'Some of the top web developers in India make up our team, committed to designing original and interesting ideas that support brand building and customer attraction.',
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: 'Holistic Quality',
    description: 'Every website we create is not only aesthetically pleasing but also security and performance optimally suited to provide a flawless and safe online experience.',
  },
  {
    icon: IoTrendingUpOutline,
    title: 'Business Growth',
    description: 'By concentrating on these important components, we offer a safe online buying experience that raises customer pleasure and stimulates corporate expansion.',
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
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Startup Web Support, we understand that a well-designed online site is essential for success. Our strategy is built on key components to ensure a flawless, safe, and expansive corporate solution.
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