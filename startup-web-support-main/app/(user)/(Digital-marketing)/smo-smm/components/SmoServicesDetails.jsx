"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  IoPersonCircleOutline,
  IoPricetagOutline,
  IoCreateOutline,
  IoAnalyticsOutline,
  IoChatboxEllipsesOutline,
  IoMegaphoneOutline, // Added for Social Media Advertising
  IoChatbubblesOutline, // Added for Audience Engagement
  IoStarOutline, // Added for Influencer Marketing
  IoBarChartOutline, // Added for Performance Tracking
} from "react-icons/io5";

const smoServices = [
  // Previous 5 services
  {
    icon: IoPersonCircleOutline,
    title: "Profile Optimization",
    description:
      "We optimize your social media profiles with clear messaging professional visuals and locally relevant information. This helps your brand look credible trustworthy and easy to connect with for the Patna audience right from the first interaction.",
  },
  {
    icon: IoPricetagOutline,
    title: "Hashtag Strategy",
    description:
      " Our team creates smart location focused hashtag plans that support effective social media marketing strategies. These hashtags help your posts reach the right audience across Patna and nearby local areas.",
  },
  {
    icon: IoCreateOutline,
    title: "Content Strategy",
    description:
      "From relatable captions to engaging creatives our content planning follows current content writing in patna trends. We use a tone and style that feels natural and connects genuinely with your target audience in the local market.",
  },
  {
    icon: IoAnalyticsOutline,
    title: "Regular Monitoring",
    description:
      " Social media needs daily attention. We regularly track engagement reach and audience behaviour and make timely changes to ensure steady growth and consistent visibility for your business.",
  },
  {
    icon: IoChatboxEllipsesOutline,
    title: "Reputation Management",
    description:
      "We handle comments, messages and reviews in a professional manner to protect your brand image. This helps build long term trust and creates a positive reputation for your business in the local market.",
  },
  // Added 4 new services from the image
  {
    icon: IoMegaphoneOutline,
    title: "Social Media Advertising",
    description:
      " Our paid campaigns are planned with proper targeting by combining Social Media Advertising in Patna with performance driven ppc services in patna to bring quality leads and genuine business inquiries.",
  },
  {
    icon: IoChatbubblesOutline,
    title: "Audience Engagement",
    description:
      " As a reliable social media marketing agency in patna we actively connect with your audience through comments replies and conversations that feel natural and human instead of automated.",
  },
  {
    icon: IoStarOutline,
    title: "Influencer Marketing",
    description:
      "We work with relevant local influencers and creators to improve brand credibility and increase reach through trusted local voices in Patna.",
  },
  {
    icon: IoBarChartOutline,
    title: "Performance Tracking",
    description:
      "Every campaign is carefully tracked and analysed. We regularly refine our strategies to deliver clear measurable results and help your business stay ahead of competitors.",
  },
];

const SmoServicesDetails = () => {
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
        damping: 12,
      },
    },
  };

  return (
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our SMO Services in Patna
          </h2>
          <p className="text-lg text-gray-600 max-w-7xl mx-auto leading-relaxed">
            At Startup Web Support we offer result driven SMO Services in Patna
            that help local businesses improve their visibility and build real
            trust on social media platforms. We believe in keeping things
            practical and realistic by focusing on what actually works for
            businesses running in Patna and nearby areas instead of chasing
            fancy numbers<br></br>
            Our approach is based on real engagement with real people, steady
            growth over time and social media strategies that bring actual
            business value. Whether you want to attract more local customers or
            build a stronger brand presence our SMO Services in Patna are
            designed to support your business goals at the ground level.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" // 3-column grid is perfect for 9 items
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {smoServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-slate-50 p-8 rounded-xl border border-slate-100 transition-all duration-300 transform hover:shadow-lg hover:border-sky-200 hover:-translate-y-2"
                variants={itemVariants}
              >
                <div className="flex items-start gap-5">
                  <div className="bg-sky-100 text-sky-600 rounded-lg p-3 mt-1 flex-shrink-0">
                    <Icon className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
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

export default SmoServicesDetails;
