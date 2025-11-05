"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoRibbonOutline, 
  IoBulbOutline, 
  IoPricetagsOutline, 
  IoPeopleOutline 
} from 'react-icons/io5';

const whyChooseUsPoints = [
  {
    icon: IoRibbonOutline,
    title: 'Proven Track Record',
    description: 'Our SEO services have repeatedly shown outstanding results; our clients have seen higher ranks, more website traffic, and better conversions.',
  },
  {
    icon: IoBulbOutline,
    title: 'Customized SEO Strategies',
    description: 'Every business is unique, and so are our SEO strategies. We create customized plans that align with your business goals and target audience.',
  },
  {
    icon: IoPricetagsOutline,
    title: 'Affordable SEO Packages',
    description: 'We have flexible SEO packages that can be changed to fit the needs of any Patna and Bihar business. We have a plan for every type of business.',
  },
  {
    icon: IoPeopleOutline,
    title: 'Expert Team of SEO Specialists',
    description: 'Our team of SEO experts in Patna has years of experience in optimizing websites for search engines, making us one of the top SEO companies in Bihar.',
  },
];

const WhyBestSeo = () => {
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

  return (
    // Section with a sky background
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Startup Web Support is the Best SEO Company in Patna
          </h2>
          <p className="text-lg text-sky-100 max-w-3xl mx-auto">
            Here's why businesses in Patna and Bihar trust us as their preferred SEO partner:
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8" // Using a 2-column grid
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {whyChooseUsPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                className="bg-sky-700/50 p-8 rounded-xl border border-sky-500/50 transition-all duration-300 transform hover:bg-sky-700 hover:shadow-lg"
                variants={itemVariants}
              >
                <div className="flex items-start gap-5">
                  <div className="bg-white text-sky-600 rounded-lg p-3 mt-1 flex-shrink-0">
                    <Icon className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sky-100 leading-relaxed text-sm">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyBestSeo;