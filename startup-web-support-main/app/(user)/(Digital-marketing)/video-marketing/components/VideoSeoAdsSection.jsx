"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoSearchOutline,     // SEO
  IoRocketOutline,     // Boosting/Growth
  IoMegaphoneOutline, // Advertising
  IoAnalyticsOutline,  // Power/Results
  IoVideocamOutline,   // Video
  IoPodiumOutline      // Ranking
} from 'react-icons/io5';

const VideoSeoAdsColumns = () => {
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
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Optional Main Heading */}
        {/* <motion.div className="text-center mb-16" ... > */}
        {/* <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Leverage Video for Maximum Impact</h2> */}
        {/* </motion.div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          
          {/* Column 1: SEO-Optimized Videos */}
          <motion.div
            className="bg-slate-50 p-8 rounded-xl border border-slate-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div className="flex items-center gap-3 mb-5" variants={itemVariants}>
              <IoSearchOutline className="text-4xl text-blue-600" />
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight"
                variants={itemVariants}
              >
                SEO-Optimized Videos
              </motion.h3>
            </motion.div>

            <motion.p 
              className="text-gray-700 leading-relaxed mb-6"
              variants={itemVariants}
            >
              Search engines love video. We integrate SEO techniques (keywords, tags, descriptions) into every video to ensure it's easily discoverable, boosting your site's ranking on Google and driving organic traffic.
            </motion.p>
            
            <motion.ul className="space-y-3" variants={containerVariants}>
                 <motion.li className="flex items-center gap-3 text-gray-800" variants={itemVariants}>
                    <IoPodiumOutline className="text-xl text-blue-500 flex-shrink-0" />
                    <span>Appear in relevant search results</span>
                 </motion.li>
                 <motion.li className="flex items-center gap-3 text-gray-800" variants={itemVariants}>
                    <IoRocketOutline className="text-xl text-blue-500 flex-shrink-0" />
                    <span>Drive organic website traffic</span>
                 </motion.li>
                 <motion.li className="flex items-center gap-3 text-gray-800" variants={itemVariants}>
                    <IoVideocamOutline className="text-xl text-blue-500 flex-shrink-0" />
                    <span>Increase content visibility</span>
                 </motion.li>
            </motion.ul>
          </motion.div>

          {/* Column 2: Video Advertising */}
          <motion.div
            className="bg-slate-50 p-8 rounded-xl border border-slate-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2, delay: 0.1 }} // Slight delay for second column
            variants={containerVariants}
          >
             <motion.div className="flex items-center gap-3 mb-5" variants={itemVariants}>
                <IoMegaphoneOutline className="text-4xl text-red-600" />
                <motion.h3 
                className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight"
                variants={itemVariants}
                >
                Video Advertising
                </motion.h3>
            </motion.div>

            <motion.p 
              className="text-gray-700 leading-relaxed mb-6"
              variants={itemVariants}
            >
              Target specific groups effectively with video ads on platforms like YouTube, Facebook, and Instagram. We craft high-converting video ads designed to generate leads and drive sales for your startup.
            </motion.p>
            
             <motion.ul className="space-y-3" variants={containerVariants}>
                 <motion.li className="flex items-center gap-3 text-gray-800" variants={itemVariants}>
                    <IoAnalyticsOutline className="text-xl text-red-500 flex-shrink-0" />
                    <span>Generate qualified leads</span>
                 </motion.li>
                 <motion.li className="flex items-center gap-3 text-gray-800" variants={itemVariants}>
                    <IoRocketOutline className="text-xl text-red-500 flex-shrink-0" /> {/* Reusing icon */}
                    <span>Increase sales conversions</span>
                 </motion.li>
                 <motion.li className="flex items-center gap-3 text-gray-800" variants={itemVariants}>
                    <IoAnalyticsOutline className="text-xl text-red-500 flex-shrink-0" /> {/* Reusing icon */}
                    <span>Achieve measurable ROI</span>
                 </motion.li>
            </motion.ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VideoSeoAdsColumns;