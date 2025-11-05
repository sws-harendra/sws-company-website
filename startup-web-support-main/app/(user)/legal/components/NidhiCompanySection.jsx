"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoWalletOutline } from 'react-icons/io5'; // Icon representing finance/mutual benefit
import Link from 'next/link';
import { gridContainerVariants, headerTextVariants, imageVariants2, textChildVariants } from '@/components/GlobalCss';

// Replace with your actual image path or URL
const nidhiImageUrl = "/portfolio.jpg"; // Example: public/images/nidhi-company-registration.png

const NidhiCompanySection = () => {
    return (
        // Section with white background
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
                            src={nidhiImageUrl} // Use your image path
                            alt="Nidhi Company Registration Illustration"
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
                            <IoWalletOutline className="text-3xl text-sky-600" />
                            <p className="font-semibold text-sky-600 uppercase tracking-wider">
                                Mutual Benefit Structure
                            </p>
                        </motion.div>

                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6"
                            variants={headerTextVariants}
                        >
                            Nidhi Company Registration
                        </motion.h2>

                        <motion.p
                            className="text-gray-700 text-lg leading-relaxed mb-4"
                            variants={textChildVariants}
                        >
                            A Nidhi Company is a type of Non-Banking Financial Company (NBFC) recognized under Section 406 of the Companies Act, 2013. Its core business is borrowing and lending money only among its members (shareholders), promoting the habit of thrift and saving.
                        </motion.p>
                        <motion.p
                            className="text-gray-700 text-lg leading-relaxed"
                            variants={textChildVariants}
                        >
                            Registering a Nidhi Company involves incorporation as a public limited company with specific objectives and compliance requirements set by the MCA. We assist with the complete registration process, ensuring adherence to Nidhi Rules, 2014.
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

export default NidhiCompanySection;