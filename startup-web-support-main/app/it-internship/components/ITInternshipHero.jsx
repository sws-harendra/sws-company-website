"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoCodeWorkingOutline,   // Development/Coding
  IoSchoolOutline,        // Learning
  IoRocketOutline,        // Career Growth
  IoPeopleOutline,        // Teamwork/Mentorship
  IoArrowForward
} from 'react-icons/io5';

// Key benefits for the IT Internship
const keyBenefits = [
  { icon: IoCodeWorkingOutline, text: 'Hands-on Project Experience' },
  { icon: IoSchoolOutline, text: 'Mentorship from Experts' },
  { icon: IoPeopleOutline, text: 'Collaborative Team Environment' },
  { icon: IoRocketOutline, text: 'Career Development Opportunities' },
];

// Replace with your actual background image path from the public folder
const BACKGROUND_IMAGE_URL = '/internship.jpg'; // Example: public/images/internship-background.jpg

const ITInternshipHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3, 
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
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="IT Internship Background"
          className="w-full h-full object-cover" 
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80"></div> 
      </div>

      {/* Content */}
      <div className="relative z-10 text-white max-w-4xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible" 
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg"
            variants={itemVariants}
          >
            Launch Your Tech Career with Our <span className="text-sky-400">IT Internship Program</span> {/* sky Accent */}
          </motion.h1>

          <motion.ul 
            className="flex flex-wrap justify-center gap-x-6 gap-y-4 my-10"
            variants={containerVariants}
          >
            {keyBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.li key={index} className="flex items-center gap-2 text-slate-100" variants={itemVariants}>
                  <Icon className="text-xl text-sky-400 flex-shrink-0" /> {/* sky Icon */}
                  <span className="font-medium text-sm md:text-base">{benefit.text}</span>
                </motion.li>
              );
            })}
          </motion.ul>
            
          <motion.div variants={itemVariants}>
            <motion.button
              className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 gap-2 text-lg" // sky Button
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 20px rgba(13, 148, 136, 0.4)" }} 
              whileTap={{ scale: 0.95 }}
            >
              Apply Now <IoArrowForward className="text-xl" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ITInternshipHero;