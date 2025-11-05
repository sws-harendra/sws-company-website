"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoPeopleOutline } from 'react-icons/io5'; // Icon representing partnership
import { gridContainerVariants, headerTextVariants, imageVariants2, textChildVariants } from '@/components/GlobalCss';
import Link from 'next/link';

// Replace with your actual image path or URL
const partnershipImageUrl = "/partnership.jpg"; // Example: public/images/partnership-registration.png

const PartnershipSection = () => {
  return (
    <section className="bg-[#1e88e5] py-10 md:py-16 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={gridContainerVariants}
          >
             <motion.div className="flex items-center gap-3 mb-4" variants={textChildVariants}>
                <IoPeopleOutline className="text-3xl text-sky-900" />
                <p className="font-semibold text-white uppercase tracking-wider">
                  Business Structure
                </p>
             </motion.div>

            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
              variants={headerTextVariants}
            >
              Partnership Firm Registration
            </motion.h2>

            <motion.p 
              className="text-white text-lg leading-relaxed mb-4"
              variants={textChildVariants}
            >
              A Partnership Firm involves two or more individuals agreeing to share the profits of a business. It allows pooling of resources and expertise. While registration is optional in India, a registered firm offers legal benefits like the ability to sue third parties.
            </motion.p>
            <motion.p 
              className="text-white text-lg leading-relaxed"
              variants={textChildVariants}
            >
              We guide you through the process of drafting a comprehensive Partnership Deed and assist with the optional registration under the Indian Partnership Act, 1932, along with other necessary compliances like PAN and GST registration.
            </motion.p>
             {/* Optional: Add a button if needed */}
            <motion.div className="mt-8" variants={textChildVariants}>
                <Link href="/contact" className="inline-flex items-center bg-sky-700 hover:bg-sky-800 text-white font-semibold py-3 px-6 rounded-lg shadow transition-colors">
                    Register Now
                </Link>
            </motion.div>
          </motion.div>

           {/* Right Column - Image */}
          <motion.div
            className="flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants2}
          >
             <img
                src={partnershipImageUrl} // Use your image path
                alt="Partnership Firm Registration Illustration"
                className="w-full max-w-lg h-auto rounded-lg" 
             />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;