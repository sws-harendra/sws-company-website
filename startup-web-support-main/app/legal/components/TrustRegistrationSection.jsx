"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoHandRightOutline } from 'react-icons/io5'; // Icon representing Trust/Charity
import { gridContainerVariants, headerTextVariants, imageVariants2, textChildVariants } from '@/components/GlobalCss';
import Link from 'next/link';

// Replace with your actual image path or URL
const trustImageUrl = "/trust.png"; // Example: public/images/trust-registration.png

const TrustRegistrationSection = () => {
    return (
        // Section with #1e88e5 background
        <section className="bg-[#1e88e5] text-white py-20 md:py-24 overflow-hidden">
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
                            <IoHandRightOutline className="text-3xl text-cyan-300" /> {/* Adjusted icon color */}
                            <p className="font-semibold text-cyan-300 uppercase tracking-wider"> {/* Adjusted text color */}
                                Legal Structure
                            </p>
                        </motion.div>

                        <motion.h2
                            className="text-3xl md:text-4xl font-bold leading-tight mb-6" // Text color is white by default
                            variants={headerTextVariants}
                        >
                            Trust Registration
                        </motion.h2>

                        <motion.p
                            className="text-lg leading-relaxed mb-4 text-blue-100" // Adjusted text color
                            variants={textChildVariants}
                        >
                            A Trust is a legal arrangement typically used for charitable, religious, or educational purposes. It involves transferring assets to trustees who manage them for the benefit of specified beneficiaries or objectives. Trusts offer benefits like tax exemptions (under Section 12A/80G) for charitable activities.
                        </motion.p>
                        <motion.p
                            className="text-lg leading-relaxed text-blue-100" // Adjusted text color
                            variants={textChildVariants}
                        >
                            We provide comprehensive assistance in drafting the Trust Deed according to your objectives and registering it under the Indian Trusts Act, 1882, or relevant state laws, ensuring legal compliance for your noble cause.
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
                        variants={textChildVariants}
                    >
                        <img
                            src={trustImageUrl} // Use your image path
                            alt="Trust Registration Illustration"
                            className="w-full max-w-lg h-auto rounded-lg"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default TrustRegistrationSection;