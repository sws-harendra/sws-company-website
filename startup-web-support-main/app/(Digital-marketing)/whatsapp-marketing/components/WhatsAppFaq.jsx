"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const whatsAppFaqData = [
  { question: 'What services do you provide in WhatsApp marketing?', answer: 'We offer bulk messaging, automated replies, multimedia campaigns (images, videos, documents), customer support via WhatsApp, lead generation forms, and API integration.' },
  { question: 'Why should I choose your WhatsApp marketing services?', answer: 'We provide strategic campaign planning, utilize official WhatsApp Business APIs for reliability, offer advanced segmentation and automation, and provide detailed analytics to measure your success.' },
  { question: 'Can I send bulk WhatsApp messages to customers?', answer: 'Yes, using the official WhatsApp Business API, we enable you to send approved template messages in bulk to opted-in customers for notifications, promotions, and updates.' },
  { question: 'Do you provide WhatsApp API integration?', answer: 'Yes, we specialize in integrating the WhatsApp Business API with your existing CRM, support desk, or other business systems for seamless communication workflows.' },
  { question: 'Can I send images, videos, and documents via WhatsApp campaigns?', answer: 'Absolutely. WhatsApp allows sending rich media like images, videos, PDFs, and other documents, making your campaigns more engaging and informative.' },
  { question: 'Is WhatsApp marketing effective for small businesses?', answer: 'Yes, highly effective! WhatsApp offers a direct and personal communication channel with high open rates, making it a cost-effective way for small businesses to engage customers, provide support, and drive sales.' },
  { question: 'Can I track campaign performance on WhatsApp?', answer: 'Yes, through the WhatsApp Business API, we can track key metrics like message delivery rates, read rates, and response rates. We provide detailed reports on campaign performance.' },
  { question: 'Do you offer customized WhatsApp marketing solutions?', answer: 'Yes, all our solutions are customized. We analyze your business needs, target audience, and goals to create a tailored WhatsApp marketing strategy and campaign plan.' },
  { question: 'Is customer data safe with your WhatsApp marketing services?', answer: 'Data security is our top priority. We use the official WhatsApp Business API which adheres to strict privacy and security standards, ensuring end-to-end encryption and compliance with data protection regulations.' },
  { question: 'Do you provide support for WhatsApp marketing campaigns?', answer: 'Yes, we provide ongoing support, monitoring, and optimization for your WhatsApp campaigns to ensure they continue to deliver the best possible results.' },
];

// Helper function to split the array into two columns
const splitArrayIntoColumns = (arr) => {
  const midPoint = Math.ceil(arr.length / 2);
  const col1 = arr.slice(0, midPoint);
  const col2 = arr.slice(midPoint);
  return [col1, col2];
};

const AccordionItem = ({ item, isOpen, onClick }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4"> 
        <motion.header
            className="flex justify-between items-center w-full p-6 cursor-pointer"
            onClick={onClick}
            initial={false}
        >
            <h3 className={`text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-sky-600' : 'text-gray-800'}`}>
            {item.question}
            </h3>
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
                <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                {item.answer}
                </p>
            </motion.section>
            )}
        </AnimatePresence>
        </div>
    );
};

const WhatsAppFaq = () => {
  const [expandedId, setExpandedId] = useState(whatsAppFaqData[0]?.question || null); 
  const [columns, setColumns] = useState([[], []]);

  useEffect(() => {
    setColumns(splitArrayIntoColumns(whatsAppFaqData));
  }, []);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-white py-10"> {/* Main background */}
      <div className="container mx-auto px-6 max-w-7xl"> 
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            WhatsApp Marketing - FAQs
          </h2>
        </motion.div>

        {/* Grid layout for columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> {/* 2 columns on lg screens */}
            {/* Column 1 */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    visible: { transition: { staggerChildren: 0.05 } } 
                }}
            >
                {columns[0].map((item) => (
                    <motion.div 
                    key={item.question} 
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    >
                    <AccordionItem
                        item={item}
                        isOpen={item.question === expandedId}
                        onClick={() => handleToggle(item.question)}
                    />
                    </motion.div>
                ))}
            </motion.div>

            {/* Column 2 */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1, delay: 0.1 }} // Slightly delay second column
                variants={{
                    visible: { transition: { staggerChildren: 0.05 } }
                }}
            >
                {columns[1].map((item) => (
                    <motion.div 
                    key={item.question} 
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    >
                    <AccordionItem
                        item={item}
                        isOpen={item.question === expandedId}
                        onClick={() => handleToggle(item.question)}
                    />
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppFaq;