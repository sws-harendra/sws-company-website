"use client"
import React, { useState, useEffect } from 'react'; // Added useEffect
import { motion } from 'framer-motion';
import {
    IoEnterOutline,       // 1. Onboarding
    IoBuildOutline,         // 2. Live Projects
    IoChatbubblesOutline,   // 3. Check-ins
    IoSchoolOutline,        // 4. Learning Sessions
    IoSyncCircleOutline,   // 5. Mid-Point Review
    IoRibbonOutline         // 6. Final Presentation
} from 'react-icons/io5';

const expectationsData = [
    { icon: IoEnterOutline, title: 'Onboarding and Training', description: 'Your journey begins with onboarding to learn about the company culture and tools. You receive training on technologies used, ensuring you are well-prepared.' },
    { icon: IoBuildOutline, title: 'Working on Live Projects', description: 'After training, you join a team and work on live projects like websites, apps, graphics, or marketing campaigns, gaining hands-on experience and building a portfolio.' },
    { icon: IoChatbubblesOutline, title: 'Weekly Check-Ins and Feedback', description: 'Regular check-ins with your mentor to discuss progress, challenges, and goals. Receive feedback, ask questions, and get advice on improving performance.' },
    { icon: IoSchoolOutline, title: 'Learning and Development Sessions', description: 'Participate in weekly sessions covering technical skills, soft skills, and career development to enhance your knowledge and professional growth.' },
    { icon: IoSyncCircleOutline, title: 'Mid-Point Review', description: 'At the halfway mark, a review with your mentor helps reflect on progress, identify areas for improvement, and set goals for the remaining internship.' },
    { icon: IoRibbonOutline, title: 'Final Presentation and Feedback', description: 'At the end, present your work to the team and receive feedback. Showcase what you’ve learned and demonstrate your impact on the company.' },
];

// Helper function to split the array into two columns
const splitArrayIntoColumns = (arr) => {
    const midPoint = Math.ceil(arr.length / 2);
    const col1 = arr.slice(0, midPoint);
    const col2 = arr.slice(midPoint);
    return [col1, col2];
};


const InternshipExpectations = () => {
    const [columns, setColumns] = useState([[], []]);

    useEffect(() => {
        setColumns(splitArrayIntoColumns(expectationsData));
    }, []);

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
        hidden: { opacity: 0, x: -30 }, // Animate from left
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

    return (
        <section className="bg-white py-24 ">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        What to Expect During the 6-Month IT Internship
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Our 6-month IT internship is structured to provide a well-rounded experience, combining hands-on work with learning and development opportunities. Here's what you can expect:
                    </p>
                </motion.div>

                {/* Grid layout for columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Column 1 */}
                    <motion.div
                        className="space-y-10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={containerVariants}
                    >
                        {columns[0].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="flex items-start gap-6 p-6 bg-slate-50 rounded-xl border border-slate-100"
                                    variants={itemVariants}
                                >
                                    <div className="flex flex-col items-center flex-shrink-0 mt-1">
                                        <div className="bg-sky-100 text-sky-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-2">
                                            {/* Calculate original index for numbering */}
                                            {expectationsData.findIndex(d => d.title === item.title) + 1}
                                        </div>
                                        <Icon className="text-3xl text-sky-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-base leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Column 2 */}
                    <motion.div
                        className="space-y-10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1, delay: 0.2 }} // Delay second column
                        variants={containerVariants}
                    >
                        {columns[1].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="flex items-start gap-6 p-6 bg-slate-50 rounded-xl border border-slate-100"
                                    variants={itemVariants}
                                >
                                    <div className="flex flex-col items-center flex-shrink-0 mt-1">
                                        <div className="bg-sky-100 text-sky-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-2">
                                            {/* Calculate original index for numbering */}
                                            {expectationsData.findIndex(d => d.title === item.title) + 1}
                                        </div>
                                        <Icon className="text-3xl text-sky-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-base leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default InternshipExpectations;