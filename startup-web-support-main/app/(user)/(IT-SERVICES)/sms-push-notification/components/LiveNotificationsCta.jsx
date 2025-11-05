"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoChatbubblesOutline,
  IoRocketOutline,
  IoAnalyticsOutline,
  IoShieldCheckmarkOutline
} from 'react-icons/io5';

const keyFeatures = [
  { icon: IoChatbubblesOutline, text: 'Real-Time Updates & Alerts' },
  { icon: IoRocketOutline, text: 'Segmented Marketing Campaigns' },
  { icon: IoAnalyticsOutline, text: 'Performance Monitoring' },
  { icon: IoShieldCheckmarkOutline, text: 'Increase Sales & Retention' },
];

const LiveNotificationsCta = () => {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="bg-[#1e88e5] py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              variants={itemVariants}
            >
              Deliver Real-Time Updates and Boost Customer Engagement
            </motion.h2>

            <motion.p
              className="text-lg text-sky-100 mt-6"
              variants={itemVariants}
            >
              Our SMS and push notification services help startups connect with their audience and get customers more involved through real-time updates, marketing messages, and critical warnings.
            </motion.p>
            
            <ul className="space-y-5 my-8">
              {keyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.li key={index} className="flex items-center gap-4" variants={itemVariants}>
                    <Icon className="text-2xl text-cyan-300 flex-shrink-0" />
                    <span className="text-lg font-medium text-sky-50">{feature.text}</span>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div variants={itemVariants}>
              <motion.button
                className="bg-white text-sky-600 font-bold py-3 px-8 rounded-lg shadow-lg text-lg transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: 'spring' }}
          >
            <div className="relative w-80 h-[34rem] bg-slate-800 rounded-[3rem] p-4 border border-slate-900 shadow-2xl">
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-full"></div>
              <div className="w-full h-full bg-slate-700 rounded-[2rem] overflow-hidden">
                <img src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-full h-full object-cover" alt="Phone background"/>
                
                <motion.div
                  className="absolute top-20 left-4 right-4 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-start gap-3"
                  animate={{ y: [0, -10, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                >
                  <div className="bg-red-500 text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center text-sm font-bold">YT</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">YouTube</p>
                    <p className="text-gray-700 text-sm">Your new video is getting lots of views!</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-48 left-4 right-4 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-start gap-3"
                  animate={{ y: [0, -10, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut', delay: 2.5 }}
                >
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center text-xl font-bold">
                    <IoChatbubblesOutline />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">New Message</p>
                    <p className="text-gray-700 text-sm">Hey, your order has been shipped!</p>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LiveNotificationsCta;