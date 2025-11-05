"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoBusinessOutline } from 'react-icons/io5'; // Icon representing a company
import { gridContainerVariants, headerTextVariants, imageVariants2, textChildVariants } from '@/components/GlobalCss';
import Link from 'next/link';

// Replace with your actual image path or URL
const pvtLtdImageUrl = "/pvt-ltd.jpg"; // Example: public/images/pvt-ltd-registration.png

const PrivateLimitedSection = () => {

  return (
    // Removed  from the main section class
    <section className="bg-white py-10 md:py-16 overflow-hidden"> 
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Image */}
          <motion.div
            className="flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants2}
          >
             <img
                src={pvtLtdImageUrl} // Use your image path
                alt="Private Limited Company Registration Illustration"
                className="w-full max-w-lg h-auto rounded-lg" 
             />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={gridContainerVariants}
          >
             <motion.div className="flex items-center gap-3 mb-4" variants={textChildVariants}>
                <IoBusinessOutline className="text-3xl text-sky-600" />
                <p className="font-semibold text-sky-600 uppercase tracking-wider">
                  Business Structure
                </p>
             </motion.div>

            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6"
              variants={headerTextVariants}
            >
              Private Limited Company Registration
            </motion.h2>

            <motion.p 
              className="text-gray-700 text-lg leading-relaxed mb-4"
              variants={textChildVariants}
            >
              A Private Limited Company is a popular choice for startups and growing businesses due to its separate legal identity, limited liability for shareholders, and ability to raise funds easily. It offers credibility and is preferred by investors.
            </motion.p>
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed"
              variants={textChildVariants}
            >
              Our services cover the entire registration process with the Ministry of Corporate Affairs (MCA), including obtaining Director Identification Numbers (DIN), Digital Signature Certificates (DSC), name approval (RUN), and filing incorporation documents like MoA and AoA.
            </motion.p>
              <motion.div className="mt-8" variants={textChildVariants}>
                <Link href="/contact" className="inline-flex items-center bg-sky-700 hover:bg-sky-800 text-white font-semibold py-3 px-6 rounded-lg shadow transition-colors">
                    Register Now
                </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrivateLimitedSection;