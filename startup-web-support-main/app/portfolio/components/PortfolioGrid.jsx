// components/PortfolioGrid.js
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoArrowForward } from 'react-icons/io5';
import Link from 'next/link'; // Import Link
import { dummyProjects } from '@/lib/portfolio.Data'; // Assuming you moved data to a separate file

const PortfolioGrid = () => {
  // ... (variants remain the same) ...
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 12 } } };

  return (
    <section className="bg-slate-50 py-24 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* ... (Section Header remains the same) ... */}
         <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Recent Work</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Take a look at some of the innovative solutions we've delivered for our clients across various industries.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {dummyProjects.map((project) => (
            <motion.div
              key={project.id}
              className="group bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full transition-all duration-300 transform hover:shadow-xl hover:-translate-y-2"
              variants={itemVariants}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm font-medium text-sky-600 mb-1">{project.category}</p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{project.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-5">{project.description}</p>
                
                {/* --- Changed a tag to Link --- */}
                <Link 
                  href={`/portfolio/${project.slug}`} // Dynamic route using slug
                  className="inline-flex items-center text-sky-600 font-semibold mt-auto group-hover:text-sky-700"
                >
                  View Project <IoArrowForward className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                 {/* --- End Change --- */}

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioGrid;