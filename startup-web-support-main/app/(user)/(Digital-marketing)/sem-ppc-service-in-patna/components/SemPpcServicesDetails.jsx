"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoMegaphoneOutline, 
  IoLogoGoogle, 
  IoLocationOutline, 
  IoTvOutline, 
  IoSyncCircleOutline, 
  IoStorefrontOutline 
} from 'react-icons/io5';

const semPpcServices = [
  {
    icon: IoMegaphoneOutline,
    title: 'PPC Campaign Management',
    description: 'Our PPC services focus on creating, managing, and optimizing paid search campaigns across platforms like Google Ads, Bing Ads, and social media to maximize your ad spend and ROI.',
  },
  {
    icon: IoLogoGoogle,
    title: 'Google Ads Management',
    description: 'Our team creates and manages high-performing Google Ads campaigns, covering search ads, display advertising, and remarketing to help businesses reach the top of SERPs.',
  },
  {
    icon: IoLocationOutline,
    title: 'Local PPC Services',
    description: 'For businesses targeting a local audience, we offer tailored local PPC services in Patna. Our local SEM strategies help you connect with customers driving foot traffic and local leads.',
  },
  {
    icon: IoTvOutline,
    title: 'Display & YouTube Advertising',
    description: 'Our display advertising services enhance brand visibility across websites, apps, and YouTube. We create and manage YouTube ads that capture attention and drive engagement.',
  },
  {
    icon: IoSyncCircleOutline,
    title: 'SEM Audits and Optimization',
    description: 'We provide detailed SEM audits to evaluate your current campaign performance, including keyword research, ad copy optimization, and landing page improvements.',
  },
  {
    icon: IoStorefrontOutline,
    title: 'SEM for E-commerce Businesses',
    description: 'Our SEM and PPC solutions for e-commerce are designed to increase online sales using high-intent search traffic through Google Shopping ads and search campaigns.',
  },
];

const SemPpcServicesDetails = () => {
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
            Our SEM and PPC Services in Patna and Bihar
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We provide a complete range of SEM and PPC services in Patna, tailored to suit businesses of all sizes and industries, focused on driving results and maximizing your ROI.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {semPpcServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-slate-50 p-8 rounded-xl border border-slate-100 transition-all duration-300 transform hover:shadow-xl hover:border-sky-200 hover:-translate-y-2"
                variants={itemVariants}
              >
                <div className="flex justify-start mb-5"> {/* Icon aligned left */}
                  <div className="bg-sky-100 text-sky-600 rounded-lg p-3">
                    <Icon className="text-3xl" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SemPpcServicesDetails;