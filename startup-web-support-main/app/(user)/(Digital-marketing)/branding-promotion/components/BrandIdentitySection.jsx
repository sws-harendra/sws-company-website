"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoColorPaletteOutline } from 'react-icons/io5'; // Icon representing design/identity

const BrandIdentitySection = () => {
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
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 8,
                delay: 0.2
            },
        },
    };

    return (
        <section className="bg-white pt-16">
            <div className="container mx-auto px-6 max-w-6xl"> {/* Slightly larger max-width */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Left Column - Content */}
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
                            Brand Identity Development
                        </motion.h2>

                        <motion.p
                            className="text-gray-700 text-lg leading-relaxed"
                            variants={itemVariants}
                        >
                            Your brand identity is the foundation of your business. We help you create a cohesive and compelling brand identity that reflects your values, mission, and vision. From logo design and color schemes to typography and messaging, our team crafts a visual and verbal identity that sets you apart from the competition and connects with your audience on a deeper level.
                        </motion.p>
                    </motion.div>

                    {/* Right Column - Icon/Visual Accent */}
                    <motion.div
                        className="flex justify-center items-center"
                        variants={iconVariants}
                    >
                        <img src="/brand&permotion.svg" alt="brand&permotion" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BrandIdentitySection;