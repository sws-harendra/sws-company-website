"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const webFaqData = [
  {
    question: 'Why is a professional website important for my business?',
    answer: 'A professional website is your 24/7 digital storefront. It builds credibility with customers, serves as the foundation for your digital marketing, and allows you to reach a wider audience, generate leads, and showcase your services effectively.',
  },
  {
    question: 'How much does a new website cost?',
    answer: 'The cost of a website depends on its scope and complexity. A simple informational site (5-10 pages) will be less expensive than a large e-commerce platform or a site with a custom Content Management System (CMS). We provide a detailed, transparent quote after understanding your specific needs.',
  },
  {
    question: 'How long will it take to build my website?',
    answer: 'A standard business website typically takes 4-6 weeks from start to launch. For more complex projects, the timeline can extend to several months. The final timeline is always discussed and agreed upon before the project begins.',
  },
  {
    question: 'Do you use WordPress, or do you build custom websites?',
    answer: 'We offer both. For clients who need an easy-to-use blog or content editor, we build powerful custom websites on WordPress. For unique, high-performance applications, we build fully custom sites from scratch using modern frameworks like React and Next.js. We recommend the best solution for your goals.',
  },
  {
    question: 'Will my website work correctly on mobile phones?',
    answer: 'Absolutely. Every website we build uses a "mobile-first" approach, meaning it is fully responsive. Your site will look and function perfectly on all devices, including desktops, tablets, and smartphones, which is essential in today\'s market.',
  },
  {
    question: 'What about support and maintenance after the website is live?',
    answer: 'We believe in long-term partnerships. We offer various support and maintenance plans that include security updates, regular backups, performance monitoring, and technical assistance to ensure your website remains fast, secure, and effective.',
  },
];

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

const WebDevFaq = () => {
  const [expanded, setExpanded] = useState(0);

  return (
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Website Development - Frequently Asked Questions
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
          {webFaqData.map((item, index) => (
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

export default WebDevFaq;