"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoLocationOutline,   // Local Expertise
  IoPricetagsOutline, // Cost-Effective Solutions
  IoRibbonOutline      // Proven Track Record
} from 'react-icons/io5';

const benefitsData = [
  {
    icon: IoLocationOutline,
    title: 'Local Expertise',
    description: 'Being based in Patna, we understand the local market dynamics and customer preferences. Our insights benefit businesses targeting audiences both locally and globally.',
  },
  {
    icon: IoPricetagsOutline,
    title: 'Cost-Effective Solutions',
    description: 'We believe that good web help shouldn’t cost a lot of money. Our prices are reasonable, so you can be sure you’re getting the most for your money without compromising quality.',
  },
  {
    icon: IoRibbonOutline,
    title: 'Proven Track Record',
    description: 'Our portfolio showcases a range of successful projects for startups across various industries. We are proud of our capacity to produce outcomes above customer expectations.',
  },
];

const PartnershipBenefits = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Benefits of Partnering with <span className="text-sky-900">Startup Web Support</span>
          </h2>
          {/* Optional: Add a short introductory sentence if needed */}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8" // 3-column grid
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {benefitsData.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="bg-slate-50 p-8 rounded-xl border border-slate-100 transition-all duration-300 transform hover:shadow-lg hover:border-sky-200 hover:-translate-y-2" 
                variants={itemVariants}
              >
                <div className="flex justify-center mb-5"> {/* Center icon */}
                  <div className="bg-sky-100 text-sky-600 rounded-full p-4">
                    <Icon className="text-4xl" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-3"> {/* Centered title */}
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center"> {/* Centered description */}
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipBenefits;