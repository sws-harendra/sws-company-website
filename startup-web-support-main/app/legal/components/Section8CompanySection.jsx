"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoLeafOutline } from 'react-icons/io5'; // Icon representing non-profit/charitable work
import { gridContainerVariants, headerTextVariants, imageVariants2, textChildVariants } from '@/components/GlobalCss';
import Link from 'next/link';

// Replace with your actual image path or URL
const section8ImageUrl = "/about.jpg"; // Example: public/images/section8-registration.png

const Section8CompanySection = () => {


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
                            <IoLeafOutline className="text-3xl text-cyan-300" /> {/* Adjusted icon color */}
                            <p className="font-semibold text-cyan-300 uppercase tracking-wider"> {/* Adjusted text color */}
                                Non-Profit Organization
                            </p>
                        </motion.div>

                        <motion.h2
                            className="text-3xl md:text-4xl font-bold leading-tight mb-6" // Text color is white by default
                            variants={headerTextVariants}
                        >
                            Section 8 Company Registration
                        </motion.h2>

                        <motion.p
                            className="text-lg leading-relaxed mb-4 text-sky-100" // Adjusted text color
                            variants={textChildVariants}
                        >
                            A Section 8 Company is established for promoting non-profit objectives such as commerce, art, science, sports, education, research, social welfare, religion, charity, or environmental protection. These companies apply their profits, if any, towards promoting their objects and are prohibited from paying any dividend to their members.
                        </motion.p>
                        <motion.p
                            className="text-lg leading-relaxed text-sky-100" // Adjusted text color
                            variants={textChildVariants}
                        >
                            Registering as a Section 8 Company provides credibility and offers tax exemptions under Section 80G. We assist with the entire registration process, including obtaining the necessary licenses and approvals from the Central Government (MCA).
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
                            src={section8ImageUrl} // Use your image path
                            alt="Section 8 Company Registration Illustration"
                            className="w-full max-w-lg h-auto rounded-lg"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Section8CompanySection;