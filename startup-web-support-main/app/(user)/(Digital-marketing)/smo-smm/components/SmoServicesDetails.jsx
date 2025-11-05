"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoPersonCircleOutline, 
  IoPricetagOutline, 
  IoCreateOutline, 
  IoAnalyticsOutline, 
  IoChatboxEllipsesOutline,
  IoMegaphoneOutline, // Added for Social Media Advertising
  IoChatbubblesOutline, // Added for Audience Engagement
  IoStarOutline, // Added for Influencer Marketing
  IoBarChartOutline // Added for Performance Tracking
} from 'react-icons/io5';

const smoServices = [
  // Previous 5 services
  {
    icon: IoPersonCircleOutline,
    title: 'Profile Optimization',
    description: 'We ensure your social media profiles are fully optimized with engaging bios, high-quality images, and updated information to attract and retain followers.',
  },
  {
    icon: IoPricetagOutline,
    title: 'Hashtag Strategy',
    description: 'Our professionals design a thorough hashtag approach to help your brand trend in Patna and beyond and raise the exposure of your postings.',
  },
  {
    icon: IoCreateOutline,
    title: 'Content Strategy',
    description: 'From compelling posts to eye-catching visuals, we create content that resonates with your audience and encourages social sharing.',
  },
  {
    icon: IoAnalyticsOutline,
    title: 'Regular Monitoring',
    description: 'We monitor performance indicators and keep refining your social media plan to guarantee highest interaction.',
  },
  {
    icon: IoChatboxEllipsesOutline,
    title: 'Reputation Management',
    description: 'We manage your online reputation by responding to customer reviews, handling queries, and addressing concerns in real time.',
  },
  // Added 4 new services from the image
  {
    icon: IoMegaphoneOutline,
    title: 'Social Media Advertising',
    description: 'We design and implement paid ad campaigns on platforms like Facebook, Instagram, and LinkedIn to target specific demographics in Patna and beyond.',
  },
  {
    icon: IoChatbubblesOutline,
    title: 'Audience Engagement',
    description: 'We don’t just create content; we foster engagement. Our staff interacts with your audience directly via comments, messages, and debates.',
  },
  {
    icon: IoStarOutline,
    title: 'Influencer Marketing',
    description: 'Leverage the power of influencers to build trust and expand your reach. We collaborate with top influencers in your niche to promote your brand effectively.',
  },
  {
    icon: IoBarChartOutline,
    title: 'Performance Tracking',
    description: 'We use advanced analytics to track campaign performance and tweak strategies to ensure you’re getting the best results.',
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
        type: 'spring',
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
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Startup Web Support, we provide a broad spectrum of SMO services meant to increase the awareness of your company on social media channels:
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