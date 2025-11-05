"use client"
import React from 'react';
import { motion } from 'framer-motion';
import {
    IoDocumentTextOutline, // 1. Prepare Application
    IoCloudUploadOutline,   // 2. Submit Application
    IoChatbubblesOutline,   // 3. Interview Process
    IoCheckmarkCircleOutline // 4. Acceptance
} from 'react-icons/io5';
import Link from 'next/link';

const applicationSteps = [
    {
        icon: IoDocumentTextOutline,
        title: 'Prepare Your Application',
        description: 'Update your resume to highlight relevant skills and experience. Write a cover letter explaining your interest and goals.',
    },
    {
        icon: IoCloudUploadOutline,
        title: 'Submit Your Application',
        description: 'Visit the careers page on the Startup Web Support website and complete the online application form. Attach your resume, cover letter, and any relevant work samples.',
    },
    {
        icon: IoChatbubblesOutline,
        title: 'Interview Process',
        description: 'If shortlisted, you will be invited for an interview. This may include technical assessments, coding challenges, and behavioral questions.',
    },
    {
        icon: IoCheckmarkCircleOutline,
        title: 'Acceptance and Onboarding',
        description: 'If selected, you will receive an offer letter with details about the program, start date, and onboarding process to get you started smoothly.',
    },
];

const HowToApplyInternship = () => {
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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
    };

    return (
        // Section with white background
        <section className="bg-white py-24 ">
            <div className="container mx-auto px-6 max-w-5xl"> {/* Slightly wider max-width */}

                {/* Header Section */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                        variants={itemVariants}
                    >
                        How to Apply for the 6-Month IT Internship
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed"
                        variants={itemVariants}
                    >
                        If you are passionate about technology and eager to gain hands-on experience in a dynamic environment, we encourage you to apply for the 6-month IT internship at Startup Web Support. Here’s how you can apply:
                    </motion.p>
                </motion.div>

                {/* Steps Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16" // 2x2 grid for steps
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    {applicationSteps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                className="bg-slate-50 p-8 rounded-xl border border-slate-100 flex items-start gap-6" // Light background cards
                                variants={itemVariants}
                            >
                                {/* Number and Icon */}
                                <div className="flex flex-col items-center flex-shrink-0 mt-1">
                                    <div className="bg-sky-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl mb-2">
                                        {index + 1}
                                    </div>
                                    <Icon className="text-3xl text-sky-500" />
                                </div>
                                {/* Title and Description */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Conclusion and CTA Button */}
                <motion.div
                    className="text-center bg-sky-50 p-10 rounded-xl border border-sky-100" // Highlighted conclusion box
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants} // Reuse container variants
                >
                    <motion.p
                        className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8"
                        variants={itemVariants}
                    >
                        The 6-month IT internship at Startup Web Support is an excellent opportunity for aspiring tech professionals. With a focus on hands-on learning, mentorship, and professional development, our program is designed to help you achieve your goals and make a meaningful impact. Apply today!
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <Link href="/contact">
                            <motion.button
                                className="inline-flex hover:cursor-pointer items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 gap-2 text-lg"
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Apply Now &rarr; {/* Changed icon */}
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default HowToApplyInternship;