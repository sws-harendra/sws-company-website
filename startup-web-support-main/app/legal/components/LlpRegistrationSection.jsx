"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoBriefcaseOutline } from 'react-icons/io5'; // Icon representing LLP/Business
import Link from 'next/link';
import { gridContainerVariants, headerTextVariants, imageVariants2, textChildVariants } from '@/components/GlobalCss';

// Replace with your actual image path or URL
const llpImageUrl = "/llp-registration.jpg"; // Example: public/images/llp-registration.png

const LlpRegistrationSection = () => {

    return (
        // Section with white background
        <section className="bg-white py-10 md:py-16">
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
                            src={llpImageUrl} // Use your image path
                            alt="LLP Registration Illustration"
                            className="w-full max-w-md h-auto rounded-lg"
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
                            <IoBriefcaseOutline className="text-3xl text-sky-600" />
                            <p className="font-semibold text-sky-600 uppercase tracking-wider">
                                Business Structure
                            </p>
                        </motion.div>

                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6"
                            variants={headerTextVariants}
                        >
                            LLP (Limited Liability Partnership) Registration
                        </motion.h2>

                        <motion.p
                            className="text-gray-700 text-lg leading-relaxed mb-4"
                            variants={textChildVariants}
                        >
                            A Limited Liability Partnership (LLP) combines the flexibility of a partnership with the benefits of limited liability like a company. Partners are not personally liable for the business's debts or negligence of other partners, making it a safer structure.
                        </motion.p>
                        <motion.p
                            className="text-gray-700 text-lg leading-relaxed"
                            variants={textChildVariants}
                        >
                            Registering an LLP involves obtaining Designated Partner Identification Numbers (DPINs), Digital Signatures (DSCs), name approval, and filing the incorporation document (FiLLiP) with the MCA. We handle the entire process efficiently for you.
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

export default LlpRegistrationSection;