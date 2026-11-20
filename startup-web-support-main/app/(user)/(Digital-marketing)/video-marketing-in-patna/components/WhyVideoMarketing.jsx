"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoVideocamOutline } from 'react-icons/io5'; // Icon representing video
import { gridContainerVariants, headerTextVariants, imageVariants2, textChildVariants } from '@/components/GlobalCss';

// Replace with your actual image path from the public folder
const videoMarketingImportanceImageUrl = "/marketing3.svg"; // Example: public/images/why-video-marketing.jpg

const WhyVideoMarketing = () => {

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={gridContainerVariants}
          >
             <motion.div className="flex items-center gap-3 mb-4" variants={textChildVariants}>
                <IoVideocamOutline className="text-3xl text-sky-600" /> {/* sky accent */}
                <p className="font-semibold text-sky-600 uppercase tracking-wider">
                  Impactful & Affordable
                </p>
             </motion.div>

            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
              variants={headerTextVariants}
            >
              Why Video Marketing Matters for Startups
            </motion.h2>

            <motion.p 
              className="text-gray-700 text-lg leading-relaxed mb-6"
              variants={textChildVariants}
            >
              Startups can struggle with constrained funds and resources. But video marketing offers a reasonably cheap and very powerful means of reaching a large audience without sacrificing impact or quality. In a manner that language and photos cannot accomplish, a well-made film can convey the objective of your startup, highlight important offerings, and feature client quotes.
            </motion.p>
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed"
              variants={textChildVariants}
            >
              Video material is easier to find and share than ever before thanks to the rapid growth of sites like YouTube, Instagram, and TikTok. When you use video marketing for your company, you can get more people to your website, get them to interact with it more, and improve your SEO rankings. Studies have also shown that video material keeps people's attention longer.
            </motion.p>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            className="flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants2}
          >
             <img
                src={videoMarketingImportanceImageUrl} // Use your image path
                alt="Why Video Marketing Matters"
                className="w-full h-auto rounded-lg shadow-md" 
             />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyVideoMarketing;