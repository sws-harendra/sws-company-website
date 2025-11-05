"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoCreateOutline, 
  IoVideocamOutline, 
  IoImageOutline, 
  IoShareSocialOutline, 
  IoBulbOutline 
} from 'react-icons/io5';

const contentServices = [
  { icon: IoCreateOutline, text: 'Engaging Blog Posts & Articles' },
  { icon: IoVideocamOutline, text: 'Compelling Videos & Storytelling' },
  { icon: IoImageOutline, text: 'Eye-catching Graphics & Infographics' },
  { icon: IoShareSocialOutline, text: 'Targeted Social Media Content' },
  { icon: IoBulbOutline, text: 'Comprehensive Content Plans' },
];

// Replace with a relevant image URL for Content Creation
const CONTENT_IMAGE_URL = '/content.svg'; // Example: public/images/content-creation.jpg

const ContentStrategySection = () => {
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

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        duration: 1,
        delay: 0.3,
      },
    },
  };

  return (
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              variants={itemVariants}
            >
              Content Creation and Strategy
            </motion.h2>

            <motion.p 
              className="text-lg text-sky-100 leading-relaxed mb-8"
              variants={itemVariants}
            >
              Any branding plan depends much on high-quality content. Developing interesting blogs, videos, graphics, and social media posts that highlight your brand story and draw your target clients falls under our content production services. We also create thorough content plans fit for your company objectives, therefore guaranteeing consistent messaging on all media.
            </motion.p>

            <motion.ul 
              className="space-y-4"
              variants={containerVariants} // Stagger for list items
            >
              {contentServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.li key={index} className="flex items-center gap-4" variants={itemVariants}>
                    <Icon className="text-3xl text-cyan-300 flex-shrink-0" />
                    <span className="font-semibold text-lg text-sky-50">{service.text}</span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            className="flex justify-center items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
          >
             <img
                src={CONTENT_IMAGE_URL}
                alt="Content Creation and Strategy"
                className="w-full h-auto rounded-xl shadow-lg border border-sky-400/50" 
             />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContentStrategySection;