"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoBriefcaseOutline, IoArrowForward } from 'react-icons/io5';


const PortfolioHero = () => {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };


  return (
    <section className=" relative bg-[url(/portfolio.jpg)] bg-cover bg-no-repeat bg-center min-h-[50vh] flex items-center overflow-hidden "> {/* Adjusted height */}
      <div className="container mx-auto px-6 max-w-7xl bg-black/60 py-20 md:px-20 absolute inset-0 flex flex-col justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.div className="flex items-center gap-3 mb-4 justify-center" variants={itemVariants}>
                <IoBriefcaseOutline className="text-3xl text-sky-600" /> 
                <p className="font-semibold text-sky-600 uppercase tracking-wider">
                  Our Work
                </p>
             </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
              variants={itemVariants}
            >
              Explore Our Portfolio
            </motion.h1>

            <motion.div variants={itemVariants}>
              <motion.button
                className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 gap-2 text-lg" // Adjusted padding
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                View Case Studies <IoArrowForward className="text-xl" />
              </motion.button>
            </motion.div>
          </motion.div>
      </div>
    </section>
  );
};

export default PortfolioHero;