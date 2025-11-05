"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoBuildOutline,         // Hands-On Experience
  IoLibraryOutline,       // Diverse Learning
  IoSchoolOutline,        // Mentorship
  IoBarChartOutline,      // Professional Development
  IoPeopleOutline         // Networking
} from 'react-icons/io5';

const whyChooseReasons = [
  {
    icon: IoBuildOutline,
    title: 'Hands-On Experience',
    description: 'Gain real-world experience by working on live projects. Apply technical skills alongside experienced developers, designers, and marketers.',
  },
  {
    icon: IoLibraryOutline,
    title: 'Diverse Learning Opportunities',
    description: 'Our program covers web/app development, UI/UX, graphic design, and digital marketing, allowing you to explore different areas.',
  },
  {
    icon: IoSchoolOutline,
    title: 'Mentorship from Industry Experts',
    description: 'Be mentored by seasoned professionals passionate about sharing knowledge. Get guidance, feedback, and support throughout your internship.',
  },
  {
    icon: IoBarChartOutline,
    title: 'Professional Development',
    description: 'Includes workshops on project management, communication skills, and career planning to enhance your professional skills.',
  },
  {
    icon: IoPeopleOutline,
    title: 'Networking Opportunities',
    description: 'Connect with industry professionals and fellow interns. Build relationships that can open doors to future job opportunities.',
  },
  {
    icon: IoLibraryOutline,
    title: 'Diverse Learning Opportunities',
    description: 'Our program covers web/app development, UI/UX, graphic design, and digital marketing, allowing you to explore different areas.',
  },
];

const WhyChooseInternship= () => {
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
    // Section with #1e88e5 background
    <section className="bg-[#1e88e5] text-white py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6" // White text
            variants={itemVariants}
          >
            Why Choose Startup Web Support for Your IT Internship?
          </motion.h2>
          <motion.p 
            className="text-lg text-sky-100 max-w-4xl mx-auto leading-relaxed" // Light sky text
            variants={itemVariants}
          >
            We nurture talent and foster innovation. Our 6-month IT internship combines practical work with mentorship for a holistic learning experience. Here’s why you should join us:
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {whyChooseReasons.map((reason, index) => {
            const Icon = reason.icon;
             let gridClasses = '';
             if (whyChooseReasons.length === 5) {
                 if (index === 3) gridClasses = 'lg:col-start-1 lg:row-start-2';
                 if (index === 4) gridClasses = 'lg:col-start-2 lg:row-start-2';
             }

            return (
              <motion.div
                key={index}
                // Glassmorphism style card on sky background
                className={`bg-sky-700/40 backdrop-blur-sm p-8 rounded-xl border border-sky-500/50 flex flex-col h-full transition-all duration-300 transform hover:bg-sky-700/60 hover:-translate-y-2 ${gridClasses}`}
                variants={itemVariants}
              >
                <div className="flex justify-center mb-5">
                  <div className="bg-white text-sky-600 rounded-full p-4"> {/* White icon background */}
                    <Icon className="text-4xl" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-3"> {/* White title */}
                  {reason.title}
                </h3>
                <p className="text-sky-100 text-sm leading-relaxed text-center flex-grow"> {/* Light sky description */}
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseInternship;