"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';

const benefitsList = [
  { text: 'Uses the most leading and modern technologies.' },
  { text: 'Fast, mobile responsive, and SEO-friendly websites.' },
  { text: 'More than 30% of our clients boost their profits online.' },
  { text: 'Full team support for superior results over freelancers.' },
];

const BusinessValue = () => {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        duration: 1.2
      }
    }
  };

  return (
    <section className="bg-[#1e88e5] text-white py-16 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.p
              className="text-lg font-medium text-slate-100 mb-4 italic"
              variants={itemVariants}
            >
              "Leading Web Development Company in Patna for Your Business"
            </motion.p>

            <motion.h2
              className="text-3xl md:text-4xl font-bold leading-tight mb-8"
              variants={itemVariants}
            >
              Does hiring a Web Development Company in Patna add value to your business?
            </motion.h2>

            <motion.div
              className="bg-cyan-500/10 border border-sky-400 text-white rounded-lg p-4 text-center mb-8"
              variants={itemVariants}
            >
              <span className="font-bold text-lg">(70%) of Indian businesses are on internet now. Why aren't you?</span>
            </motion.div>

            <ul className="space-y-4 mb-10">
              {benefitsList.map((benefit, index) => (
                <motion.li key={index} className="flex items-start gap-3" variants={itemVariants}>
                  <FaCheckCircle className="text-sky-950 rounded-full text-xl mt-1 flex-shrink-0" />
                  <span className="text-slate-300 text-lg">{benefit.text}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={itemVariants}>
              <motion.button
                className="bg-sky-900 hover:sky-900 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Us
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={imageVariants}
            className="flex justify-center"
          >
            <img

              src="software.jpg"
              alt="Web Development Team"
              className="w-full rounded-2xl"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BusinessValue;