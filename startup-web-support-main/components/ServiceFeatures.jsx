"use client"
import { motion } from 'framer-motion';
import { bellShakeAnimation, cardVariants, gridContainerVariants, headerTextVariants, textChildVariants } from './GlobalCss';
import Link from 'next/link';
import AnimatedArrow from './AnimatedArrow';

const serviceItems = [
    {
        image: 'marketing.png', // Placeholder image
        title: 'Accounting and Financial Solutions',
        description: 'We offer robust accounting and financial services to streamline your business operations, ensuring accuracy and compliance with the latest regulations.',
    },
    {
        image: 'it-solution.png', // Placeholder image
        title: 'Web Solutions',
        description: 'Our web solutions encompass responsive design, development, and SEO optimization, creating a powerful online presence tailored to your brand\'s needs.',
    },
    {
        image: 'app-dev.png', // Placeholder image
        title: 'App Development',
        description: 'From concept to launch, we build custom mobile applications that are intuitive, scalable, and designed to enhance user engagement and business growth.',
    },
];

const ServiceFeatures = () => {

    return (
        <section className="py-20 bg-white font-sans text-center">
            <div className="container mx-auto px-6 max-w-7xl">

                <motion.div
                    className="mb-16 md:mb-20"
                    variants={headerTextVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                >
                    <motion.p
                        className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2"
                        variants={textChildVariants}
                    >
                        Service & Feature
                    </motion.p>
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto"
                        variants={textChildVariants}
                    >
                        We Provide Solutions for Your Business
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed"
                        variants={textChildVariants}
                    >
                        Use our digital solutions to realize the full potential of your company. We provide an
                        extensive range of services to assist you in navigating the always-changing digital
                        environment. We have the knowledge and experience to optimize your business
                        processes and help you reach your objectives, from automation and data analysis to{' '}
                        <strong className="text-blue-600 font-semibold">web design and marketing</strong>.
                    </motion.p>
                </motion.div>

                {/* === सर्विसेज का ग्रिड === */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                    variants={gridContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                >
                    {serviceItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full"
                            variants={cardVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 1.1 }} transition={{ duration: 0.3 }}
                        >
                            <div>
                                <motion.img
                                    initial={{ rotate: [0] }}
                                    whileHover={bellShakeAnimation}
                                    whileTap={bellShakeAnimation}
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 object-contain mb-6 mx-auto" // इमेज को सेंटर करने के लिए mx-auto
                                />
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-base mb-6">
                                    {item.description}
                                </p>
                            </div>
                            <Link href="#" className="text-blue-600 hover:text-blue-700 flex items-center font-semibold py-1 ps-5 rounded-lg border-2 border-blue-200 hover:border-blue-300 transition-colors duration-300 mx-auto">
                                Learn More<AnimatedArrow />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ServiceFeatures;