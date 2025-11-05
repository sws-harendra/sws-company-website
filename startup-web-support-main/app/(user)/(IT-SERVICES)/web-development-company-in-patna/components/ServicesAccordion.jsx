"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShopify, FaWordpress, FaWix, FaOpencart, FaPhp, FaQuestionCircle } from 'react-icons/fa';
import { IoChevronDown } from 'react-icons/io5';
import { cardContentVariants, gridContainerVariants, textChildVariants } from '@/components/GlobalCss';

const servicesData = [
    {
        icon: FaShopify,
        title: 'Shopify Development',
        description: 'We build personalized, fast-responsive Shopify Websites and apps that help you sell your products online. Our experts customize themes, integrate third-party tools, and enhance the user experience to maximize profit. That makes us the best Web Development Company in Patna.',
    },
    {
        icon: FaWordpress,
        title: 'WordPress Development',
        description: 'We built portfolios, vlogs, and big Websites using WordPress + Elementor to deliver fully customized, SEO-friendly, and easy-to-manage Websites for all types of businesses. with our cutting-edge Website Development Services in Patna.',
    },
    {
        icon: FaWix,
        title: 'WIX, Weebly, Squarespace, And Duda',
        description: 'Do you need an alluring Website right away? And for that looking for a Web Development Company in Patna. We create dynamic and responsive Websites on all these platforms – perfect for small startups, businesses, and professionals who need a dependable online existence without technical hustle.',
    },
    {
        icon: FaOpencart,
        title: 'OpenCart, BigCommerce Development',
        description: 'For eCommerce brands, we build sturdy, expandable online stores with all the latest features, payment gateway integrations, and inventory management for smooth operations.',
    },
    {
        icon: FaPhp,
        title: 'PHP & Laravel Development',
        description: 'For businesses who need customization, we offer custom-designed solutions using PHP and Laravel in our Web Development Company in Patna. This ensures full control, security, and expandability as your business grows.',
    },
    {
        icon: FaQuestionCircle,
        title: 'Need Something Different?',
        description: 'We can help you to make your Website live through your needed platform. Contact us!',
    },
];

const AccordionItem = ({ item, isOpen, onClick }) => {
    const Icon = item.icon;

    return (
        <div className="border-b border-gray-200">
            <motion.header
                className="flex justify-between items-center w-full py-5 cursor-pointer"
                onClick={onClick}
                initial={false}
            >
                <div className="flex items-center gap-4">
                    <Icon className={`text-3xl transition-colors duration-300 ${isOpen ? 'text-sky-600' : 'text-gray-500'}`} />
                    <h3 className={`text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-gray-900' : 'text-gray-700'}`}>
                        {item.title}
                    </h3>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <IoChevronDown className={`text-2xl transition-colors duration-300 ${isOpen ? 'text-sky-600' : 'text-gray-400'}`} />
                </motion.div>
            </motion.header>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <p className="px-2 pb-6 text-gray-600 leading-relaxed">
                            {item.description}
                        </p>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};

const ServicesAccordion = () => {
    const [expanded, setExpanded] = useState(0);

    return (
        <section className="bg-white py-24 ">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={gridContainerVariants}
                className="container mx-auto px-6 max-w-4xl">
                <motion.div
                variants={cardContentVariants}
                 className="text-center mb-16">
                    <motion.h2
                    variants={textChildVariants}
                     className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Core Development Platforms
                    </motion.h2>
                    <motion.p variants={textChildVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We leverage a wide range of technologies to build the perfect solution for your business, ensuring performance, scalability, and a great user experience.
                    </motion.p>
                </motion.div>

                <div>
                    {servicesData.map((item, index) => (
                        <AccordionItem
                            key={index}
                            item={item}
                            isOpen={index === expanded}
                            onClick={() => setExpanded(index === expanded ? null : index)}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default ServicesAccordion;