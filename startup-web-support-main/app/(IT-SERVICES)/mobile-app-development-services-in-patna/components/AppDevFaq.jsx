"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const appFaqData = [
  {
    question: 'Why should I choose your company for my app development?',
    answer: 'We offer a complete end-to-end service, from initial idea to launch and post-launch support. Our experienced team uses a transparent, agile process, focusing on delivering a high-quality product that provides a strong return on your investment.',
  },
  {
    question: 'Do you build for both Android and iOS?',
    answer: 'Yes. We develop native apps for the best performance on a single platform (iOS or Android). We also build cross-platform apps using frameworks like React Native to reach both audiences faster and more cost-effectively. We will help you choose the best strategy for your project.',
  },
  {
    question: 'What is your app development process like?',
    answer: 'Our process is collaborative and structured for success. It includes key phases: 1. Discovery & Strategy, 2. UI/UX Design & Prototyping, 3. Development & Coding, 4. Quality Assurance (Testing), 5. Deployment to App Stores, and 6. Ongoing Support & Maintenance.',
  },
  {
    question: 'How much will my mobile app cost?',
    answer: 'The cost of an app depends entirely on its complexity, the number of features, and the platforms you are targeting. After an initial consultation to understand your vision, we provide a detailed, no-obligation quote with a clear breakdown of costs.',
  },
  {
    question: 'How long will it take to develop my app?',
    answer: 'Timelines vary based on the project scope. A simple Minimum Viable Product (MVP) can take around 3-4 months, while a more complex, full-featured application might take 6 months or longer. We establish a clear project timeline from the start.',
  },
  {
    question: 'What happens after my app is launched on the app stores?',
    answer: 'Our partnership doesn\'t end at launch. We offer comprehensive support and maintenance packages to handle OS updates, bug fixes, performance monitoring, and future feature enhancements, ensuring your app\'s long-term success.',
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

const AppDevFaq = () => {
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
            App Development - Frequently Asked Questions
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
          {appFaqData.map((item, index) => (
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

export default AppDevFaq;