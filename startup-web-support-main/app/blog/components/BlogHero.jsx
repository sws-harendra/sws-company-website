"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoArrowForward } from 'react-icons/io5';
import { Newspaper } from 'lucide-react';
import { gridContainerVariants, headerTextVariants, textChildVariants } from '@/components/GlobalCss';


const BlogHero = () => {

  return (
    <section className=" relative bg-[url(/portfolio.jpg)] bg-cover bg-no-repeat bg-center min-h-[50vh] flex items-center overflow-hidden "> {/* Adjusted height */}
      <div className="container mx-auto px-6 max-w-7xl bg-black/60 py-20 md:px-20 absolute inset-0 flex flex-col justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={gridContainerVariants}
            className="text-center"
          >
            <motion.div className="flex items-center gap-3 mb-4 justify-center" variants={textChildVariants}>
                <Newspaper className="text-3xl text-sky-600" /> 
                <p className="font-semibold text-sky-600 uppercase tracking-wider">
                  Our Blog
                </p>
             </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
              variants={headerTextVariants}
            >
              Explore Our Blog
            </motion.h1>

            <motion.div variants={textChildVariants}>
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

export default BlogHero;