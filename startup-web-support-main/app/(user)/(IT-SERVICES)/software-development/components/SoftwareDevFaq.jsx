"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const softwareFaqData = [
  {
    question: 'What is custom software development?',
    answer: 'Custom software development is the process of designing, building, deploying, and maintaining software for a specific set of users or functions. Unlike off-the-shelf software (like Microsoft Office), it is tailored to solve your business\'s unique challenges and processes.',
  },
  {
    question: 'Why should my business invest in custom software?',
    answer: 'Investing in custom software gives you a significant competitive advantage. It helps increase efficiency and productivity by automating tasks, solves specific problems that standard software cannot, and can be scaled and adapted as your business grows.',
  },
  {
    question: 'How much does custom software cost?',
    answer: 'The cost is determined by the scope, complexity of features, required integrations with other systems, and the technologies used. After a detailed requirement analysis, we provide a transparent and comprehensive quote with no hidden costs.',
  },
  {
    question: 'What is your software development lifecycle?',
    answer: 'We follow a structured and agile Software Development Lifecycle (SDLC). Our process includes: 1. Requirement Gathering & Analysis, 2. System Design & Architecture, 3. Development & Coding, 4. Rigorous Testing (QA), 5. Deployment & Integration, and 6. Ongoing Maintenance & Support.',
  },
  {
    question: 'How long will it take to develop our software?',
    answer: 'The timeline varies greatly. A smaller internal tool might take 2-4 months, whereas a large-scale enterprise system like an ERP or CRM could take a year or more. We often deliver value in phases (sprints) so you can start using core features sooner.',
  },
  {
    question: 'Do you provide support and maintenance after deployment?',
    answer: 'Yes, our partnership continues after the initial launch. We offer dedicated support and maintenance packages to ensure your software remains secure, up-to-date, and performs optimally. This includes bug fixes, security patches, and future enhancements.',
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

const SoftwareDevFaq = () => {
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
            Software Development - Frequently Asked Questions
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
          {softwareFaqData.map((item, index) => (
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

export default SoftwareDevFaq;