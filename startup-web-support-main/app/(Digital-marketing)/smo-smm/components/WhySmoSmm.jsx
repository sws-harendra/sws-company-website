"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoEyeOutline, IoMegaphoneOutline } from 'react-icons/io5';

const WhySmoSmm = () => {
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
        damping: 10,
      },
    },
  };

  return (
    // Section with sky-600 background
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-5xl"> 
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-center text-white" // Text color changed to white
            variants={itemVariants}
          >
            Why Choose SMO & SMM for Your Business?
          </motion.h2>

          <motion.p 
            className="text-lg leading-relaxed mb-12 text-center max-w-3xl mx-auto text-sky-100" // Text color adjusted
            variants={itemVariants}
          >
            In the digital era, having a solid online presence is essential for success. Both SMO and SMM play crucial roles in helping businesses reach their audience effectively.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SMO Card */}
            <motion.div 
              className="bg-sky-700/60 p-8 rounded-xl border border-sky-500/50 h-full backdrop-blur-sm" // Card style adjusted
              variants={itemVariants}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white text-sky-600 p-3 rounded-lg"> {/* Icon background */}
                  <IoEyeOutline className="text-3xl" />
                </div>
                <h3 className="text-2xl font-semibold text-white">SMO (Social Media Optimization)</h3>
              </div>
              <p className="text-sky-100 leading-relaxed"> {/* Text color adjusted */}
                This means making changes to your content and social media sites so that your readers like them more. It's all about making your business more visible on the internet and making it easier for people to find.
              </p>
            </motion.div>

            {/* SMM Card */}
            <motion.div 
              className="bg-sky-700/60 p-8 rounded-xl border border-sky-500/50 h-full backdrop-blur-sm" // Card style adjusted
              variants={itemVariants}
            >
               <div className="flex items-center gap-4 mb-4">
                <div className="bg-white text-sky-600 p-3 rounded-lg"> {/* Icon background */}
                  <IoMegaphoneOutline className="text-3xl" />
                </div>
                <h3 className="text-2xl font-semibold text-white">SMM (Social Media Marketing)</h3>
              </div>
              <p className="text-sky-100 leading-relaxed"> {/* Text color adjusted */}
                SMM, on the other hand, involves using social media platforms like Facebook, Instagram, Twitter, and LinkedIn to promote your business, products, or services. The goal is to increase engagement, generate leads, and convert followers into loyal customers.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySmoSmm;