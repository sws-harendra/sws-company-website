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
    title: '500+ Projects Delivered',
    description: 'We have successfully completed projects for businesses from different industries, each with its own requirements.',
  },
  {
    icon: FaCogs,
    title: 'Experienced in All Technologies',
    description: 'Our team works comfortably with Java, PHP, Laravel, CMS platforms, and other tools needed to build practical solutions.',
  },
  {
    icon: FaUsers,
    title: 'Multi-Industry Expertise',
    description: ' We have worked with businesses from eCommerce, healthcare, education, real estate, and service-based sectors, so we understand different needs.',
  },
  {
    icon: FaShieldAlt,
    title: 'Secure & Scalable Websites',
    description: ' Our websites are built in a way that they stay secure and can handle more visitors as your business grows.',
  },
  {
    icon: FaStar,
    title: 'Honest & Transparent Pricing',
    description: ' We explain everything clearly before starting, so there are no surprises or hidden charges later.',
  },
  {
    icon: FaHeadset,
    title: 'Quick & Trustable Support',
    description: 'You get quick responses and real human support whenever you need help or guidance.',
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
          We don’t just develop websites and move on. We focus on building reliable digital solutions that stay stable over time and help your business grow step by step.
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