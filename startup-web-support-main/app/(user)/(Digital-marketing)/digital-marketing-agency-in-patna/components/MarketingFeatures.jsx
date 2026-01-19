"use client";
import React from "react";
import { motion } from "framer-motion";

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
        type: "spring",
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
        type: "spring",
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
              Social media marketing gives the best results when campaigns are
              planned properly and guided by real data not guesswork. Just
              posting content regularly is not enough to achieve business goals.
              A clear strategy is needed to reach the right audience with the
              right message at the right time. Startup Web Support works as a
              reliable Patna digital marketing agency, creating targeted social
              media strategies that are directly connected to specific business
              objectives.<br></br>
              <br></br>
              We create platform specific campaigns for Facebook, Instagram,
              LinkedIn and Twitter using each platform in a way that matches its
              audience and purpose. Our team regularly tracks performance like
              reach engagement and conversions so campaigns can be improved
              continuously and deliver better results over time.
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
              Quality content plays a big role in how people see and trust a
              brand. When content is informative and presented well it helps
              answer customer questions, builds credibility and creates long
              term trust. Instead of pushing sales messages, content marketing
              focuses on educating and guiding people which naturally builds
              stronger relationships over time.<br></br>
              Our content marketing services include blogs, articles, videos and visual creatives that are planned carefully to educate audiences while still supporting clear conversion goals. Every piece of content is created to add real value, improve engagement and show the brand’s knowledge in its field. Whether you are a new business trying to build visibility or a growing brand looking to strengthen authority we work like a strategic digital marketing agency for startups, helping businesses build authority and maintain a consistent and professional voice across all digital platforms.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MarketingSections;
