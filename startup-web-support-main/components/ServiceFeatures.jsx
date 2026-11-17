"use client"
import { motion } from 'framer-motion';
import { bellShakeAnimation, cardVariants, gridContainerVariants, headerTextVariants, textChildVariants } from './GlobalCss';
import AnimatedArrow from './AnimatedArrow';
import { BsWhatsapp } from 'react-icons/bs';
import { getWhatsAppUrl, openWhatsApp } from '@/lib/whatsapp';

const serviceItems = [
    {
        image: 'marketing.png', // Placeholder image
        title: 'Accounting and Financial Solutions',
        description: 'Our safe,dependable and fast accounting software makes financial tasks easier. It also ensures that the calculations are correct and they follow the regulations by governing authorities..',
    },
    {
        image: 'it-solution.png', // Placeholder image
        title: 'Web Solutions',
        description: 'We focus on custom web development services for each client according to their needs. We create responsive websites, web portals, and high-quality softwares that improve your online presence.',
    },
    {
        image: 'app-dev.png', // Placeholder image
        title: 'App Development',
        description: ' As a reliable mobile app development company, we create user-friendly and scalable mobile applications that improve user engagement and business performance.',
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
                         Use our digital solutions to unlock your business’s full potential. From automation to marketing and development, we support businesses through every stage of digital growth. As a {' '}
                        <strong className="text-blue-600 font-semibold">software company in patna</strong>,
                       our focus remains on long-term stability and real business progress.
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
                    {serviceItems.map((item, index) => {
                        const whatsappUrl = getWhatsAppUrl(item.title);
                        return (
                            <motion.div
                                key={index}
                                className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full cursor-pointer group"
                                variants={cardVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => openWhatsApp(item.title)}
                            >
                                <div>
                                    <motion.img
                                        initial={{ rotate: [0] }}
                                        whileHover={bellShakeAnimation}
                                        whileTap={bellShakeAnimation}
                                        src={item.image}
                                        alt={item.title}
                                        className="w-16 h-16 object-contain mb-6 mx-auto"
                                    />
                                    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 group-hover:text-[#009CDE] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-base mb-6">
                                        {item.description}
                                    </p>
                                </div>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openWhatsApp(item.title);
                                    }}
                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-blue-600 border-2 border-blue-200 hover:border-[#009CDE] hover:bg-[#009CDE] hover:text-white transition-all duration-300 mx-auto"
                                >
                                    <BsWhatsapp className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />
                                    <span>Get Free Quotation</span>
                                    <AnimatedArrow />
                                </a>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default ServiceFeatures;