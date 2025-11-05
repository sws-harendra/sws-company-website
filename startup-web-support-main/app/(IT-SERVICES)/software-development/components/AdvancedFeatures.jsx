"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoPhonePortraitOutline,
  IoServerOutline,
  IoExtensionPuzzleOutline,
  IoAccessibilityOutline,
  IoShieldCheckmarkOutline,
  IoEllipsisHorizontalCircleOutline
} from 'react-icons/io5';
import { headerTextVariants, textChildVariants } from '@/components/GlobalCss';

const premiumFeatures = [
  { icon: IoPhonePortraitOutline, text: 'Mobile-Friendly Layout' },
  { icon: IoServerOutline, text: 'Strong Backend Support' },
  { icon: IoExtensionPuzzleOutline, text: 'Engaging and Responsive' },
  { icon: IoAccessibilityOutline, text: 'User Friendly Interface' },
  { icon: IoShieldCheckmarkOutline, text: 'Security' },
  { icon: IoEllipsisHorizontalCircleOutline, text: 'And More' },
];

const AdvancedFeatures = () => {
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
    <section className="bg-[#1e88e5] py-24  overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.h2 variants={headerTextVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Custom Software Development Services
          </motion.h2>
          <motion.p variants={textChildVariants} className="text-lg text-sky-100 max-w-4xl mx-auto leading-relaxed">
            Acknowledging customer needs and providing 100% satisfaction are key aspects of the corporate environment. Our team of skilled designers in Bihar, India, produces top-notch applications with the latest technologies.
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              className="relative z-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={containerVariants}
            >
              <motion.p 
                className="font-semibold uppercase tracking-wider text-sky-300 mb-2"
                variants={itemVariants}
              >
                BENEFITS
              </motion.p>
              <motion.h3 
                className="text-3xl md:text-4xl font-bold text-white mb-8"
                variants={itemVariants}
              >
                Premium Features
              </motion.h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {premiumFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div 
                      key={index} 
                      className="bg-sky-900/30 backdrop-blur-xl p-6 rounded-2xl border border-sky-600/50 shadow-lg"
                      variants={itemVariants}
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-sky-600 text-white p-3 rounded-full">
                          <Icon className="text-2xl" />
                        </div>
                        <span className="text-lg font-medium text-white">{feature.text}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: 'spring', duration: 1 }}
            >
              <img
                src="web.svg"
                alt="Custom Software Development"
                className="w-full max-w-lg h-auto rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;