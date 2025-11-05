"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoChatbubbleEllipsesOutline, // Instant Communication
  IoWalletOutline,            // Cost-Effective
  IoBarChartOutline,          // High Engagement Rates
  IoPersonOutline             // Personalized Interaction
} from 'react-icons/io5';

const whyChooseWhatsApp = [
  {
    icon: IoChatbubbleEllipsesOutline,
    title: 'Instant Communication',
    description: 'WhatsApp allows businesses to engage with their customers in real-time. Communicate right away to improve client satisfaction with updates, responses, or promotional messaging.',
  },
  {
    icon: IoWalletOutline,
    title: 'Cost-Effective',
    description: 'Traditional marketing can be expensive, but WhatsApp marketing offers a budget-friendly alternative. Reach your target audience without breaking the bank.',
  },
  {
    icon: IoBarChartOutline,
    title: 'High Engagement Rates',
    description: 'Open and response rates of messages sent on WhatsApp are better than those of emails. Your audience is thus more likely to see and act upon your messaging.',
  },
  {
    icon: IoPersonOutline,
    title: 'Personalized Interaction',
    description: 'WhatsApp enables personalized communication, allowing you to tailor your messages based on customer preferences and behaviors. Build stronger relationships and foster loyalty.',
  },
];

const WhyWhatsAppMarketing = () => {
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
    <section className="bg-[#1e88e5] text-white py-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose WhatsApp Marketing?
          </h2>
          {/* Optional: Add a short introductory sentence if needed */}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8" // 2x2 grid layout
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {whyChooseWhatsApp.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="bg-sky-700/60 p-8 rounded-xl border border-sky-500/50 backdrop-blur-sm transition-all duration-300 hover:bg-sky-700 hover:shadow-lg" // Glassmorphism effect
                variants={itemVariants}
              >
                <div className="flex items-start gap-5">
                  <div className="bg-white text-sky-600 rounded-lg p-3 mt-1 flex-shrink-0">
                    <Icon className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sky-100 text-sm leading-relaxed">
                      {benefit.description}
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

export default WhyWhatsAppMarketing;