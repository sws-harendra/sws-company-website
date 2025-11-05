"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const ecommerceFaqData = [
  {
    question: 'Which e-commerce platforms do you work with?',
    answer: 'We specialize in a variety of powerful e-commerce platforms, including Shopify for quick setups, WooCommerce for flexibility with WordPress, and Magento for large-scale, feature-rich enterprise solutions. We choose the best platform based on your specific business needs and goals.',
  },
  {
    question: 'How much does an e-commerce website cost?',
    answer: 'The cost varies depending on the platform, number of products, complexity of features (like custom filters, subscriptions), and design requirements. A simple store can be quite affordable, while a large, custom platform will be a more significant investment. We provide a detailed quote after discussing your needs.',
  },
  {
    question: 'How long will it take to build my online store?',
    answer: 'A typical timeline can range from 4-6 weeks for a standard Shopify or WooCommerce store to several months for a highly custom-built platform. The final timeline depends on the project scope and the speed of feedback and content delivery.',
  },
  {
    question: 'What essential features should my e-commerce site have?',
    answer: 'Every great e-commerce site needs a secure and reliable payment gateway, an easy-to-manage product catalog, user accounts for customers, a mobile-responsive design, and powerful search and filtering capabilities to ensure a smooth user experience.',
  },
  {
    question: 'Do you provide support and maintenance after launch?',
    answer: 'Yes, absolutely. We offer ongoing support and maintenance packages to ensure your website remains secure, up-to-date, and performs optimally. We are your long-term partners in growth.',
  },
  {
    question: 'Will my e-commerce website be SEO-friendly?',
    answer: 'Definitely. We build all our e-commerce websites with SEO best practices from the ground up. This includes clean code, fast loading speeds, mobile-friendliness, and a logical site structure to help your products rank well in search engines.',
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
        <h3 className={`text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-gray-800'}`}>
          {item.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <IoChevronDown className={`text-2xl transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-gray-400'}`} />
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

const EcommerceFaq = () => {
  const [expanded, setExpanded] = useState(0);

  return (
    <section className="bg-white py-16 ">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Frequently Asked Questions
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
          {ecommerceFaqData.map((item, index) => (
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

export default EcommerceFaq;