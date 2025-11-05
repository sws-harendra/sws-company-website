"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoPersonOutline } from 'react-icons/io5'; // Icon representing One Person
import Link from 'next/link';
import { gridContainerVariants, imageVariants2, textChildVariants } from '@/components/GlobalCss';

// Replace with your actual image path or URL
const opcImageUrl = "/pvt-ltd.jpg"; // Example: public/images/opc-registration.png

const OpcRegistrationSection = () => {
    return (
        // Section with #1e88e5 background
        <section className="bg-[#1e88e5] text-white py-10 md:py-16 overflow-hidden">
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
                            <IoPersonOutline className="text-3xl text-cyan-300" /> {/* Adjusted icon color */}
                            <p className="font-semibold text-cyan-300 uppercase tracking-wider"> {/* Adjusted text color */}
                                Business Structure
                            </p>
                        </motion.div>

                        <motion.h2
                            className="text-3xl md:text-4xl font-bold leading-tight mb-6" // Text color is white by default
                            variants={textChildVariants}
                        >
                            One Person Company (OPC) Registration
                        </motion.h2>

                        <motion.p
                            className="text-lg leading-relaxed mb-4 text-sky-100" // Adjusted text color
                            variants={textChildVariants}
                        >
                            An One Person Company (OPC) allows a single entrepreneur to operate a corporate entity with limited liability protection, which was previously only available to private limited companies. It combines the benefits of a sole proprietorship (single owner) and a company structure.
                        </motion.p>
                        <motion.p
                            className="text-lg leading-relaxed text-sky-100" // Adjusted text color
                            variants={textChildVariants}
                        >
                            Ideal for solo entrepreneurs looking for credibility and limited liability, OPC registration involves similar steps to a private limited company but with simpler compliance. We provide complete support for registering your OPC with the MCA.
                        </motion.p>
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
                            src={opcImageUrl} // Use your image path
                            alt="One Person Company Registration Illustration"
                            className="w-full max-w-md h-auto rounded-lg"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default OpcRegistrationSection;