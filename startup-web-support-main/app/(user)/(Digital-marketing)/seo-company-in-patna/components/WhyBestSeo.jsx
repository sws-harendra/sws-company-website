"use client";
import React from "react";
import { motion } from "framer-motion";
import SeoIntroCard from "./ScoIntroCard";
import {
  IoRibbonOutline,
  IoBulbOutline,
  IoPricetagsOutline,
  IoPeopleOutline,
} from "react-icons/io5";

const whyChooseUsPoints = [
  {
    icon: IoRibbonOutline,
    title: "Proven Track Record",
    description:
      "Our clients see real improvement in rankings better website traffic and more genuine conversions that support business growth.",
  },
  {
    icon: IoBulbOutline,
    title: "Customized SEO Strategies",
    description:
      "Every SEO plan is created based on actual business goals and market needs which reflects the working quality of a top seo agency in india.",
  },
  {
    icon: IoPricetagsOutline,
    title: "Affordable SEO Packages",
    description:
      " Our pricing is flexible and practical so small businesses startups and growing companies can all move forward online without pressure.",
  },
  {
    icon: IoPeopleOutline,
    title: "Expert Team of SEO Specialists",
    description:
      "Our experienced team delivers performance and results that match the expectations people usually have from a best seo service provider in india.",
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
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    // Section with a sky background
    <>
      <section className="bg-[#1e88e5] text-white py-24 mb-8">
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
              Here's why businesses in Patna and Bihar trust us as their
              preferred SEO partner:
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
      <SeoIntroCard />
    </>
  );
};

export default WhyBestSeo;
