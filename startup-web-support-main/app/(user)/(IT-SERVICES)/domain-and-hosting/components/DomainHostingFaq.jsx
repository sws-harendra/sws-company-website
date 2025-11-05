"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const domainFaqData = [
  {
    question: 'What is a domain name and why do I need one?',
    answer: 'A domain name is your website\'s unique address on the internet (e.g., www.yourcompany.com). You need one so that customers can easily find and remember your site. It is a crucial part of your brand identity.',
  },
  {
    question: 'What is web hosting?',
    answer: 'Web hosting is a service that stores your website\'s files (code, images, videos) on a server and makes them accessible to visitors on the internet. Without hosting, your website cannot be live online.',
  },
  {
    question: 'What is the difference between various hosting types (Shared, VPS, Dedicated)?',
    answer: 'Shared Hosting is the most affordable, where you share a server with other websites. VPS (Virtual Private Server) offers more resources and control. Dedicated Hosting gives you an entire server to yourself, providing the highest performance and security. We help you choose the best one for your needs.',
  },
  {
    question: 'Do you offer professional email accounts?',
    answer: 'Yes, we do. With our hosting packages, you can create professional email addresses like "yourname@yourcompany.com". This builds trust and looks much more professional than using a generic Gmail or Yahoo address.',
  },
  {
    question: 'What is an SSL certificate and do I need one?',
    answer: 'An SSL certificate encrypts the data between your website and your visitors, protecting sensitive information like passwords and credit card details. It is essential for security, trust (it enables the "https" and padlock icon), and also helps with Google search rankings.',
  },
  {
    question: 'How do you ensure my website is always online (uptime)?',
    answer: 'We guarantee a 99.9% uptime for our hosting services. Our servers are monitored 24/7, and we use high-quality hardware and infrastructure to ensure your website is always fast, reliable, and available to your customers.',
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

const DomainHostingFaq = () => {
  const [expanded, setExpanded] = useState(0);

  return (
    <section className="bg-slate-50 py-24 ">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Domain & Hosting FAQs
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
          {domainFaqData.map((item, index) => (
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

export default DomainHostingFaq;