"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoMailOpenOutline } from 'react-icons/io5'; // Icon representing email/campaigns
import { imageVariants2 } from '@/components/GlobalCss';

// Replace with your actual image path from the public folder
const campaignImageUrl = "/email-marketing.svg"; // Example: /images/email-campaigns.png

const CustomEmailCampaigns = () => {
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
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Image */}
          <motion.div
            className="flex justify-center"
            initial="hidden"
            whileInView="visible"
            variants={imageVariants2}>
             <img
                src={campaignImageUrl} // Use your image path
                alt="Customized Email Campaigns"
                className="w-full  h-auto rounded-lg" 
             />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
             <motion.div className="flex items-center gap-3 mb-4" variants={itemVariants}>
                <IoMailOpenOutline className="text-3xl text-sky-600" />
                <p className="font-semibold text-sky-600 uppercase tracking-wider">
                  Tailored Strategies
                </p>
             </motion.div>

            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
              variants={itemVariants}
            >
              Customized Email Campaigns
            </motion.h2>

            <motion.p 
              className="text-gray-700 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Because we know that every startup is different, we make sure that your email strategies are fully aligned with your goals. Our writers can write emails that get people interested in your project, whether it's announcing a new product, running a special offer, or gathering leads.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomEmailCampaigns;