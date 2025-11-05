"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const faqData = [
  {
    question: 'What services do you offer in software development?',
    answer: 'We provide a complete range of services including custom software development, web applications, mobile apps, ERP, CRM, and cloud solutions tailored to your business needs.',
  },
  {
    question: 'Why should I choose your software development company?',
    answer: 'You should choose us for our experienced team, proven track record of successful projects, commitment to quality, and our transparent, client-focused process from start to finish.',
  },
  {
    question: 'Do you develop custom software for businesses?',
    answer: 'Yes, absolutely. Our specialty is creating custom software solutions that are specifically designed to solve your unique business challenges and improve operational efficiency.',
  },
  {
    question: 'Can you develop mobile applications along with software?',
    answer: 'Yes, we develop native and cross-platform mobile applications for both Android and iOS that can seamlessly integrate with your web or desktop software.',
  },
  {
    question: 'What technologies do you use in software development?',
    answer: 'We use a wide range of modern technologies including but not limited to JavaScript (React, Node.js), PHP (Laravel), Java, Python, and various database systems to build robust and scalable applications.',
  },
  {
    question: 'How much does custom software development cost?',
    answer: 'The cost of custom software development varies depending on the project\'s complexity, features, and timeline. We provide a detailed, transparent quote after understanding your specific requirements.',
  },
];

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
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

const FaqAccordion = () => {
  const [expanded, setExpanded] = useState(0);

  return (
    <section className="bg-whaite py-16 font-sans">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Frequently Ask Questions (FAQs)
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {faqData.map((item, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <AccordionItem
                item={item}
                isOpen={index === expanded}
                onClick={() => setExpanded(index === expanded ? null : index)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FaqAccordion;