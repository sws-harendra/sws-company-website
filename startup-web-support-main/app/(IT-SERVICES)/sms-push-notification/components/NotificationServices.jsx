"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoChatbubblesOutline,
  IoRocketOutline,
  IoAnalyticsOutline,
  IoPersonAddOutline
} from 'react-icons/io5';
import { gridContainerVariants, headerTextVariants, textChildVariants } from '@/components/GlobalCss';

const serviceBenefits = [
  {
    icon: IoChatbubblesOutline,
    title: 'Increase App Engagement',
    description: 'Instantly reach your customers with personalized messages, updates, and promotions directly on their mobile devices.',
  },
  {
    icon: IoRocketOutline,
    title: 'Drive More Sales',
    description: 'Promote special offers, new products, or limited-time deals to encourage immediate action and boost your revenue.',
  },
  {
    icon: IoAnalyticsOutline,
    title: 'Monitor Real-time Performance',
    description: 'Modern targeting choices and analytics let you customize your ads for particular groups and monitor their real-time performance.',
  },
  {
    icon: IoPersonAddOutline,
    title: 'Improve Customer Retention',
    description: 'We offer extensive notification systems to improve your marketing campaigns and build lasting relationships with your customers.',
  },
];

const NotificationServices = () => {
 

  return (
    <section className="bg-white py-16 ">
      <div className="container mx-auto px-6 md:px-24 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
        >
          <motion.h2 variants={headerTextVariants} className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Engage Your Audience with Effective SMS and Push Notification Services
          </motion.h2>
          <motion.p variants={textChildVariants} className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Our Push-notification and SMS systems are meant to enable entrepreneurs to properly contact their audience and increase customer interaction.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={gridContainerVariants}
        >
          {serviceBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="bg-slate-50 p-8 rounded-xl border border-slate-100 transition-all duration-300 transform hover:shadow-xl hover:border-slate-200 hover:-translate-y-2"
                variants={textChildVariants}
              >
                <div className="flex items-start gap-6">
                  <div className="bg-sky-100 text-sky-600 rounded-lg p-4">
                    <Icon className="text-4xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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

export default NotificationServices;