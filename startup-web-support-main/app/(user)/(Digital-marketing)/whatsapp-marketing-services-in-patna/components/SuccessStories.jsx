"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoChatbubblesOutline, // Consumer Interaction
  IoRepeatOutline,       // Conversion Rates
  IoMegaphoneOutline     // Brand Recognition
} from 'react-icons/io5';

// Placeholder for actual stories/logos
const placeholderStories = [1, 2, 3]; 

const SuccessStories = () => {
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
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
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
    // Section with sky-600 background and subtle gradient
    <section className="bg-[#1e88e5] text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Main Content Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Left: Heading and Text */}
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Success Stories
            </h2>
            <p className="text-lg text-sky-100 leading-relaxed">
              Don't take our word for it alone! Many Patna-based startups have changed their approaches using our WhatsApp tools. Using our knowledge, they have witnessed:
            </p>
          </motion.div>

          {/* Right: Key Outcomes */}
          <motion.div 
            className="space-y-5" 
            variants={containerVariants} // Stagger inside this container as well
          >
            <motion.div className="flex items-center gap-4 bg-sky-700/50 p-4 rounded-lg border border-sky-500/50" variants={itemVariants}>
              <IoChatbubblesOutline className="text-3xl text-sky-300 flex-shrink-0" />
              <span className="font-semibold text-sky-50">More Consumer Interaction</span>
            </motion.div>
            <motion.div className="flex items-center gap-4 bg-sky-700/50 p-4 rounded-lg border border-sky-500/50" variants={itemVariants}>
              <IoRepeatOutline className="text-3xl text-sky-300 flex-shrink-0" />
              <span className="font-semibold text-sky-50">Better Conversion Rates</span>
            </motion.div>
            <motion.div className="flex items-center gap-4 bg-sky-700/50 p-4 rounded-lg border border-sky-500/50" variants={itemVariants}>
              <IoMegaphoneOutline className="text-3xl text-sky-300 flex-shrink-0" />
              <span className="font-semibold text-sky-50">Notable Brand Recognition Gain</span>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default SuccessStories;