"use client"
import React from 'react';
import { motion } from 'framer-motion';
import {
    IoRocketOutline,       // Empowering Businesses
    IoBulbOutline,          // Innovative Solutions
    IoPersonOutline,        // Customer-Centric
    IoGlobeOutline         // Digital Future / Worldwide
} from 'react-icons/io5';

// Replace with your actual image path from the public folder
const visionMissionImageUrl = "/m&v.jpg"; // Example: public/images/vision-mission.png

const visionPoints = [
    { icon: IoRocketOutline, text: 'Empowering Businesses Digitally' },
    { icon: IoBulbOutline, text: 'Innovative Solutions for All' },
    { icon: IoPersonOutline, text: 'Customer-Centric Excellence' },
    { icon: IoGlobeOutline, text: 'Building a Digital Future' },
];

const VisionMissionSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 80,
                duration: 1,
                delay: 0.2
            },
        },
    };

    return (
        <section className="bg-white py-24 ">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column - Image */}
                    <motion.div
                        className="flex justify-center items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={imageVariants}
                    >
                        <img
                            src={visionMissionImageUrl} // Use your image path
                            alt="Our Vision and Mission"
                            className="w-full  h-auto rounded-lg"
                        />
                    </motion.div>
                    {/* Right Column - Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                    >
                        <motion.p
                            className="text-sm font-semibold uppercase tracking-wider text-sky-600 mb-2"
                            variants={itemVariants}
                        >
                            OUR VISION
                        </motion.p>

                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
                            variants={itemVariants}
                        >
                            Our Vision & Mission
                        </motion.h2>

                        <motion.blockquote
                            className="relative text-xl italic text-gray-700 border-l-4 border-sky-500 pl-6 mb-8"
                            variants={itemVariants}
                        >
                            "Proactively assist emerging businesses that are leveraging advancements worldwide."
                        </motion.blockquote>

                        <motion.ul
                            className="space-y-4"
                            variants={containerVariants} // Stagger for list items
                        >
                            {visionPoints.map((point, index) => {
                                const Icon = point.icon;
                                return (
                                    <motion.li key={index} className="flex items-center gap-4" variants={itemVariants}>
                                        <Icon className="text-2xl text-sky-500 flex-shrink-0" />
                                        <span className="text-lg font-medium text-gray-800">{point.text}</span>
                                    </motion.li>
                                );
                            })}
                        </motion.ul>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default VisionMissionSection;