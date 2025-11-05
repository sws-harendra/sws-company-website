"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoMegaphoneOutline } from 'react-icons/io5'; // Icon representing PR/Outreach

const DigitalPrSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
            },
        },
    };

    const iconVariants = {
        hidden: { opacity: 0, scale: 0.5, rotate: -15 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 8,
                delay: 0.2
            },
        },
    };

    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Left Column - Icon/Visual Accent */}
                    <motion.div
                        className="flex justify-center items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={iconVariants}
                    >
                        <img src="/about.jpg" alt="Digital" />
                    </motion.div>
                    {/* Right Column - Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
                            variants={itemVariants}
                        >
                            Digital PR and Influencer Outreach
                        </motion.h2>

                        <motion.p
                            className="text-gray-700 text-lg leading-relaxed"
                            variants={itemVariants}
                        >
                            Building a strong online reputation is key to establishing trust and credibility. Our <span className="font-semibold text-blue-600">Digital PR services</span> focus on promoting your brand through press releases, guest posts, and media coverage in relevant industry publications. We also interact with people that share your brand values, using their reach to magnify your message and raise your profile.
                        </motion.p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default DigitalPrSection;