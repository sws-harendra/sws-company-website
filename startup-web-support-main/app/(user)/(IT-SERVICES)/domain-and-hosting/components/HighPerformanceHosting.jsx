"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  IoFlashOutline,
  IoExpandOutline,
  IoShieldCheckmarkOutline,
  IoHeadsetOutline,
} from "react-icons/io5";

const hostingFeatures = [
  {
    icon: IoFlashOutline,
    title: "High-Speed Servers",
    description:
      " We use modern infrastructure and well optimized servers so your website loads fast and works smoothly without delays. This is especially useful for Patna based coaching centers and service providers where visitors expect quick information. When a site opens quickly, visitors feel comfortable staying longer and exploring more pages. A faster website also helps reduce bounce rates and builds trust with customers, because no one likes waiting for a slow page to load. This way, your website creates a better first impression and supports your business in the right direction.",
  },
  {
    icon: IoExpandOutline,
    title: "Full Scalability",
    description:
       "As your website traffic and business needs grow, your hosting plan can be upgraded easily without any complications. For example a local food brand starting with a basic website can later handle festival season traffic without slowdown. You do not have to worry about your site slowing down when more people start visiting. Our flexible hosting setup makes sure your website continues to perform well even during high traffic periods, so your customers always get a smooth experience.",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Robust Security",
    description:
      " From SSL certificates to regular backups and malware protection, our domain and hosting services are focused on keeping your website data safe at all times. This matters a lot for Patna based consultants and professional service providers who deal with client information. We take security seriously because your website carries your business reputation. When customers see a secure website, they automatically feel more confident in trusting your brand. That is why we treat security as an essential part of hosting, not something optional or secondary.",
  },
  {
    icon: IoHeadsetOutline,
    title: "24-Hour Customer Support",
    description:
      " Our technical support team is available day and night to handle any hosting related issues without delay. Local business owners often tell us they need quick help rather than long waiting times. If something goes wrong, you can reach out to us and get quick assistance instead of waiting endlessly. Our focus is to make sure your website stays live and running smoothly, so your business does not face unnecessary interruptions.",
  },
];

const HighPerformanceHosting = () => {
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
    hidden: { opacity: 0, y: 50 },
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

  return (
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            High-Performance Hosting to Elevate Your Startup's Online Presence
          </h2>
          <p className="text-lg text-sky-100 max-w-3xl mx-auto mt-4">
            Our domain hosting services are created to help startups and small
            businesses build a strong and dependable presence online from day
            one. Many new businesses in areas like Rajendra Nagar and Bailey
            Road start with this goal. In today’s competitive digital space,
            things like website speed, reliability, and security make a real
            difference in how customers see your business and how well your site
            performs on search engines. That is why we focus on hosting that
            delivers good performance, proper safety, and long term stability,
            so your website runs smoothly and supports your business growth
            without unnecessary worries.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          {hostingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white text-gray-800 p-8 rounded-xl shadow-lg text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-5">
                  <div className="bg-sky-100 text-sky-600 rounded-full p-4">
                    <Icon className="text-4xl" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HighPerformanceHosting;
