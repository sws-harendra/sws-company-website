"use client"
import React from 'react';
import { motion } from 'framer-motion';

// Replace with your actual image paths from the public folder
const socialMediaImageUrl = "/marketing.svg"; // Example: /images/marketing-social.png
const contentMarketingImageUrl = "/marketing2.svg"; // Example: /images/marketing-content.png

const MarketingSections = () => {
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
        damping: 10,
      },
    },
  };

  const imageVariants = (fromLeft = true) => ({
    hidden: { opacity: 0, x: fromLeft ? -50 : 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        duration: 1,
      },
    },
  });

  return (
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl space-y-24">
        
        {/* Section 1: Targeted Social Media Marketing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="order-2 lg:order-1"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6"
              variants={itemVariants}
            >
              Targeted Social Media Marketing
            </motion.h2>

            {/* Content directly from the image */}
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Social media is a great way for businesses to connect with people and get them to love their brand. At Startup Web Support IT Company, we create tailored <span className="text-sky-600 font-semibold">social media marketing</span> strategies that engage your audience and promote your products or services across platforms like Facebook, Instagram, LinkedIn, and Twitter. Our team crafts compelling content, runs targeted ad campaigns, and monitors performance to ensure maximum engagement and return on investment.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={imageVariants(false)} // Animate from right
            className="flex justify-center order-1 lg:order-2"
          >
            <img
              src={socialMediaImageUrl} 
              alt="Social Media Marketing"
              className="w-full max-w-md h-auto rounded-lg"
            />
          </motion.div>
        </div>

        {/* Section 2: Content Marketing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={imageVariants(true)} // Animate from left
            className="flex justify-center"
          >
            <img
              src={contentMarketingImageUrl} 
              alt="Content Marketing"
              className="w-full max-w-md h-auto rounded-lg"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6"
              variants={itemVariants}
            >
              Content Marketing: Building Authority and Trust
            </motion.h2>

            {/* Content directly from the image */}
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Content is king when it comes to digital marketing. Our <span className="text-sky-600 font-semibold">content marketing services</span> focus on creating valuable, relevant, and consistent content that attracts and retains a clearly defined audience. We produce high-quality blog posts, articles, videos, infographics, and more to establish your brand as an authority in your industry. We enhance conversions and reader confidence by providing interesting and informative content.
            </motion.p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default MarketingSections;