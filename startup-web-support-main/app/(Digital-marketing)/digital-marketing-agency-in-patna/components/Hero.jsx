"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoSearchOutline, 
  IoShareSocialOutline, 
  IoAnalyticsOutline, 
  IoArrowForward 
} from 'react-icons/io5';

const coreServices = [
  {
    icon: IoSearchOutline,
    title: 'Search Engine Optimisation (SEO)',
    description: 'Achieve higher rankings and boost organic traffic by optimizing your website structure, content, and authority.',
    gradient: 'from-sky-500 to-cyan-400', // Icon gradient
  },
  {
    icon: IoAnalyticsOutline,
    title: 'Pay-Per-Click (PPC) Advertising',
    description: 'Drive targeted traffic and immediate results with strategically managed PPC campaigns on Google Ads and social media.',
    gradient: 'from-purple-500 to-pink-400', // Icon gradient
  },
  {
    icon: IoShareSocialOutline,
    title: 'Social Media Management',
    description: 'Engage your audience, build brand loyalty, and drive conversions through effective social media strategies.',
    gradient: 'from-red-500 to-orange-400', // Icon gradient
  },
];

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly increased stagger
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 }, // Increased initial y offset
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90, // Adjusted stiffness
        damping: 12, // Adjusted damping
      },
    },
  };

  return (
    // Section with subtle gradient background
    <section className="bg-gradient-to-br from-sky-50 via-white to-cyan-50 py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          whileInView="visible"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Digital Marketing: <span className="text-sky-600">The Future of Advertising</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            In the digital era, online visibility is crucial. At **Startup Web Support**, the leading <span className="font-semibold">Advertising & Marketing Company in Patna</span>, we cover the full spectrum – from SEO and PPC to Social Media Management, crafting personalized plans for your success.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          whileInView="visible"
          variants={containerVariants}
        >
          {coreServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                variants={itemVariants}
              >
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-center mb-6">
                    {/* Icon with gradient background */}
                    <div className={`bg-gradient-to-br ${service.gradient} text-white rounded-full p-4 shadow-md`}>
                      <Icon className="text-4xl" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center flex-grow mb-6">
                    {service.description}
                  </p>
                  <a href="#" className="flex items-center justify-center text-sky-600 font-semibold mt-auto group">
                    Learn More
                    <IoArrowForward className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;