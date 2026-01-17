"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoAnalyticsOutline, 
  IoColorPaletteOutline, 
  IoCodeSlashOutline, 
  IoBugOutline,
  IoRocketOutline
} from 'react-icons/io5';
import { headerTextVariants, textChildVariants } from '@/components/GlobalCss';

const processSteps = [
  {
    icon: IoAnalyticsOutline,
    title: 'Requirement & Business Analysis',
    description: 'Every project starts with a clear discussion. Before development, we understand your idea, business flow, and goals. This step helps us plan the right Mobile App Development Process and decide which features and technologies will work best for you.',
  },
  {
    icon: IoColorPaletteOutline,
    title: 'Designing (UI/UX)',
    description: 'Our design team focuses on making apps that feel simple and natural to use. Wireframes and layouts are shared with you early so changes can be made easily. The goal is always clarity, not heavy or confusing designs.',
  },
  {
    icon: IoCodeSlashOutline,
    title: 'Development',
    description: 'Our developers handle Android App Development, iOS App Development, and backend systems with clean and reliable coding practices. We focus on performance, stability, and scalability so the app works well today and in the future.',
  },
  {
    icon: IoBugOutline,
    title: 'Testing and Bug Fixing',
    description: 'Before launch, every app goes through proper testing on different devices. This helps remove bugs and performance issues, ensuring the final app feels smooth, secure, and ready for real users.',
  },
  {
    icon: IoRocketOutline,
    title: 'Deployment & Support',
    description: 'Once everything is approved, the app is launched on the required platforms. As a dependable mobile application development company, we don’t stop there. We continue to provide support after launch by handling updates, fixing issues, and making improvements so the app keeps running smoothly over time.',
  }
];

const StandardProcess = () => {
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
          <motion.h2
          variants={headerTextVariants}
           className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Mobile App Development Process
          </motion.h2>
          <motion.p
          variants={textChildVariants}
           className="text-lg text-gray-600 max-w-3xl mx-auto">
            We follow a proven, transparent process to take your idea from concept to a fully functional mobile application, ensuring quality at every step.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center mb-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', duration: 0.8 }}
        >
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:border-sky-500"
                variants={itemVariants}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-sky-100 text-sky-600 rounded-full p-3">
                    <Icon className="text-3xl" />
                  </div>
                  <span className="text-5xl font-extrabold text-gray-200">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StandardProcess;