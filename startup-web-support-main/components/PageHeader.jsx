"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoChevronForward } from 'react-icons/io5';
import Link from 'next/link';

const PageHeader = ({ title, breadcrumbs }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative bg-[#1e88e5] text-white py-10 overflow-hidden m-5 rounded-2xl">
      <div className="container mx-auto px-6 max-w-7xl text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-2xl md:text-4xl font-bold"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          <motion.nav
            className="flex items-center justify-center md:gap-2 mt-4"
            aria-label="Breadcrumb"
            variants={itemVariants}
          >
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <Link
                  href={crumb.href}
                  className={`text-lg transition-colors duration-300 ${
                    index === breadcrumbs.length - 1
                      ? 'text-white font-semibold pointer-events-none'
                      : 'text-blue-200 hover:text-white'
                  }`}
                >
                  {crumb.name}
                </Link>
                {index < breadcrumbs.length - 1 && (
                  <IoChevronForward className="text-blue-300" />
                )}
              </React.Fragment>
            ))}
          </motion.nav>
        </motion.div>
      </div>

  
    </section>
  );
};

export default PageHeader;