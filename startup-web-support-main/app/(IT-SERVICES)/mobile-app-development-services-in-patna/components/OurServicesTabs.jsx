"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaMobileAlt,
  FaDesktop,
  FaShoppingCart,
  FaApple,
  FaAndroid,
  FaWordpress,
  FaPhp,
  FaJava
} from 'react-icons/fa';
import { SiMagento, SiWoocommerce } from 'react-icons/si';
import Image from 'next/image';

const servicesData = [
  {
    id: 0,
    tabName: 'Mobile App',
    tabIcon: FaMobileAlt,
    title: 'Mobile App Development Services in Patna',
    description: 'We offer custom Mobile App Development Services for both Android and iOS platforms. Our team ensures your app is user-friendly, feature-rich, and performs flawlessly to help you reach a wider audience and grow your business.',
    mainImage: 'mobile-app.jpg',
    techIcons: [
      { icon: FaAndroid, name: 'Android', style: "text-green-600 text-2xl" },
      { icon: FaApple, name: 'iOS', style: "text-black text-2xl" },
    ],
  },
  {
    id: 1,
    tabName: 'Web',
    tabIcon: FaDesktop,
    title: 'Web Development',
    description: 'A website is a crucial requirement for businesses to build an online application. We use technologies like PHP, Java, and WordPress to deliver custom and scalable web solutions that meet your specific business needs.',
    mainImage: 'web.svg',
    techIcons: [
      { icon: FaPhp, name: 'PHP', style: "text-sky-600 text-2xl" },
      { icon: FaJava, name: 'Java', style: "text-sky-800 text-2xl" },
      { icon: FaWordpress, name: 'WordPress', style: "text-cyan-900 bg-white rounded-full text-2xl" },
    ],
  },
  {
    id: 2,
    tabName: 'E-Commerce',
    tabIcon: FaShoppingCart,
    title: 'E-Commerce Development',
    description: 'For your e-commerce needs, our services include building robust and secure online stores. We specialize in platforms like Magento and WooCommerce to provide seamless payment integration and inventory management.',
    mainImage: 'e-com.svg',
    techIcons: [
      { icon: SiMagento, name: 'Magento', style: "text-orange-600 text-2xl" },
      { icon: SiWoocommerce, name: 'WooCommerce', style: "text-violet-600 text-5xl" },
    ],
  },
];

const OurServicesTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-200 mb-2">
            APP DEVELOPMENT
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">Our Services</h2>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-sky-900/50 p-2 rounded-xl">
            {servicesData.map((service, index) => {
              const Icon = service.tabIcon;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`relative md:px-4 px-2 md:py-3 py-1 md:text-lg text-sm font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2
                    ${activeTab === index ? 'text-white' : 'text-sky-200 hover:bg-white/10'}`
                  }
                >
                  {activeTab === index && (
                    <motion.div
                      layoutId="active-pill-services"
                      className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10"><Icon /></span>
                  <span className="relative z-10">{service.tabName}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-sky-800/40 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="text-left">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  {servicesData[activeTab].title}
                </h3>
                <p className="text-sky-100 leading-relaxed mb-8">
                  {servicesData[activeTab].description}
                </p>

                <h4 className="text-xl font-semibold mb-4 text-sky-50">Technologies We Use:</h4>
                <div className="flex flex-wrap gap-4">
                  {servicesData[activeTab].techIcons.map((tech, i) => {
                    const TechIcon = tech.icon;
                    const TechStyle = tech.style
                    return (
                      <div key={i} className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg">
                        <TechIcon className={TechStyle} />
                        <span className="font-medium text-sky-100">{tech.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center">
                <img
                  src={servicesData[activeTab].mainImage}
                  alt={servicesData[activeTab].title}
                  className="rounded-lg w-full max-w-md"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default OurServicesTabs;