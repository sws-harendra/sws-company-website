"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAndroid, FaApple, FaCashRegister, FaLink } from 'react-icons/fa';
import Image from 'next/image';

const servicesData = [
  {
    icon: FaAndroid,
    tabName: 'Android',
    title: 'Custom Android App Development',
    description: "Google’s Android Platform offers Apps for smartphones, Tablets, Google TV and so many other electronic devices. With a powerful installed base for various Operating systems, the reach of Applications is massive. Our team of specialists at Startup Web Support creates mobile Applications that are effectively embedded with powerful technology, yet is very cost-effective. The developers here guarantee optimum security and ease of use making the Applications immensely usable in mobiles.",
    image: 'mobile-app.jpg',
  },
  {
    icon: FaApple,
    tabName: 'iPhone',
    title: 'Elegant iOS App Solutions',
    description: "We build beautiful, high-performance native iOS applications for iPhone and iPad. Our team leverages the latest Apple technologies like Swift and SwiftUI to create seamless user experiences that capture the essence of your brand and engage your users on the world's most advanced mobile platform.",
    image: 'app-dev.png',
  },
  {
    icon: FaCashRegister,
    tabName: 'POP',
    title: 'Point of Sale (POS) Systems',
    description: "Modernize your retail or service business with our custom Point of Sale (POS) solutions. We develop intuitive and reliable POS applications that handle transactions, inventory management, customer data, and reporting, all integrated into one seamless system to streamline your operations.",
    image: 'web.svg',
  },
  {
    icon: FaLink,
    tabName: 'Blockchain',
    title: 'Decentralized Blockchain Applications',
    description: "Step into the future with our Blockchain development services. We create secure, transparent, and decentralized applications (dApps) for various industries, including finance, supply chain, and more. Harness the power of blockchain to build trust and efficiency into your digital ecosystem.",
    image: 'blockchain.svg',
  },
];

const VerticalTabServices = () => {
  const [activeTab, setActiveTab] = useState(0);

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, type: 'spring' } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  return (
    <section className="bg-white  pt-20  md:pb-0 pb-10 ">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-600 mb-2">
            SERVICE
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Our Services
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            For the last 8 years, we have been serving the Indian as well as international markets with our website, mobile App Development Services in Patna, and digital marketing services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <div className="flex flex-row flex-wrap justify-center md:flex-col gap-2">
              {servicesData.map((service, index) => {
                const Icon = service.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`relative w-full p-4 text-left rounded-lg transition-all duration-300 flex items-center gap-4
                      ${activeTab === index ? 'bg-white shadow-lg' : 'bg-transparent hover:bg-gray-200'}`
                    }
                  >
                    {activeTab === index && (
                      <motion.div layoutId="active-tab-indicator" className="absolute inset-0 bg-stone-100 rounded-lg shadow-lg" />
                    )}
                    <div className={`relative z-10 p-3 rounded-md transition-colors duration-300 ${activeTab === index ? 'bg-sky-100 text-sky-600' : 'bg-gray-200 text-gray-600'}`}>
                      <Icon className="text-2xl" />
                    </div>
                    <span className={`relative z-10 text-base md:text-lg font-semibold transition-colors duration-300 ${activeTab === index ? 'text-gray-900' : 'text-gray-700'}`}>
                      {service.tabName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="relative w-full min-h-[400px] md:min-h-[450px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                >
                  <div className="order-2 lg:order-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{servicesData[activeTab].title}</h3>
                    <p className="text-gray-600 leading-relaxed">{servicesData[activeTab].description}</p>
                  </div>
                  <div className="flex justify-center order-1 lg:order-2">
                    <img
                      src={servicesData[activeTab].image}
                      alt={servicesData[activeTab].title}
                      className="rounded-lg max-w-sm w-full"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerticalTabServices;