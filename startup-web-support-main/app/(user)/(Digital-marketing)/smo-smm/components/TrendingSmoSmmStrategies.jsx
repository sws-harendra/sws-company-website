"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoVideocamOutline, 
  IoPeopleOutline, 
  IoLocationOutline, 
  IoCartOutline 
} from 'react-icons/io5';

const trendingStrategies = [
  {
    icon: IoVideocamOutline,
    title: 'Reels and Short Videos',
    description: 'With platforms like Instagram and TikTok gaining immense popularity, we focus on creating engaging short-form video content that grabs attention.',
  },
  {
    icon: IoPeopleOutline,
    title: 'User-Generated Content',
    description: 'Encouraging your customers to share their experiences and feature your brand organically helps build trust and credibility.',
  },
  {
    icon: IoLocationOutline,
    title: 'Localized Marketing',
    description: 'Patna businesses benefit from localized social media campaigns that speak directly to the community, helping to build a loyal customer base.',
  },
  {
    icon: IoCartOutline,
    title: 'Social Commerce',
    description: 'With the rise of shopping features on platforms like Facebook and Instagram, we integrate social commerce strategies to increase conversions.',
  },
];

const TrendingSmoSmmStrategies = () => {
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
    // Section with sky-600 background
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Trending Social Media Strategies in Patna
          </motion.h2>
          <motion.p 
            className="text-lg text-sky-100 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Successful 2025 requires keeping ahead of social media trends. Among the newest trends we are including into our plans are:
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8" // 2-column layout for the strategies
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {trendingStrategies.map((strategy, index) => {
            const Icon = strategy.icon;
            return (
              <motion.div
                key={index}
                className="bg-sky-700/60 p-8 rounded-xl border border-sky-500/50 flex items-start gap-6 transition-all duration-300 transform hover:bg-sky-700 hover:shadow-lg"
                variants={itemVariants}
              >
                <div className="bg-white text-sky-600 rounded-lg p-3 mt-1 flex-shrink-0">
                  <Icon className="text-3xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {strategy.title}
                  </h3>
                  <p className="text-sky-100 text-sm leading-relaxed">
                    {strategy.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingSmoSmmStrategies;