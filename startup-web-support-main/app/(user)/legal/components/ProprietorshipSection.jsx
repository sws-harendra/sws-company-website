"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoPersonOutline } from 'react-icons/io5'; // Icon representing sole proprietor
import { gridContainerVariants, headerTextVariants, imageVariants2, textChildVariants } from '@/components/GlobalCss';
import Link from 'next/link';

// Replace with your actual image path or URL
const proprietorshipImageUrl = "/proprietorship.jpg"; // Example: public/images/proprietorship-registration.png

const ProprietorshipSection = () => {

  return (
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
                src={proprietorshipImageUrl} // Use your image path
                alt="Proprietorship Registration Illustration"
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
                <IoPersonOutline className="text-3xl text-sky-600" />
                <p className="font-semibold text-sky-600 uppercase tracking-wider">
                  Business Structure
                </p>
             </motion.div>

            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6"
              variants={headerTextVariants}
            >
              Proprietorship Registration
            </motion.h2>

            <motion.p 
              className="text-gray-700 text-lg leading-relaxed mb-4"
              variants={textChildVariants}
            >
              A Sole Proprietorship is the simplest business structure where one individual owns and runs the business. It's easy to set up and requires minimal compliance, making it ideal for freelancers and small business owners starting out.
            </motion.p>
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed"
              variants={textChildVariants}
            >
              We assist in obtaining necessary registrations like GST (if applicable) and MSME/Udyam registration to establish your proprietorship firm legally and enable smooth operations.
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

export default ProprietorshipSection;