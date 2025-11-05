"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const digitalMarketingFaqData = [
  {
    question: 'What services do you provide for digital marketing?',
    answer: 'To assist companies in increasing their brand awareness and online presence, we offer SEO, PPC (SEM), Social Media Management (SMO/SMM), Content Marketing, Email Marketing, Graphic Design, and WhatsApp Marketing services.',
  },
  {
    question: 'What makes Startup Web Support the best choice for digital marketing in Patna?',
    answer: 'Our data-driven approach, experienced team, and commitment to delivering measurable results set us apart. We focus on creating customized strategies that align with your specific business goals and target audience in Patna.',
  },
  {
    question: 'What makes both SEO and PPC important, and how do you use them together?',
    answer: 'SEO builds long-term organic visibility, while PPC provides immediate, targeted traffic. We use them together in a synergistic way: PPC data can inform SEO strategy, and strong SEO can improve PPC quality scores, leading to better overall results.',
  },
  {
    question: 'What do you do to manage your social media accounts?',
    answer: 'Our social media management includes creating engaging content calendars, posting regularly, interacting with your audience, running targeted ad campaigns, and providing detailed performance reports to track growth and engagement.',
  },
  {
    question: 'What are the benefits of content marketing for my business?',
    answer: 'Content marketing helps establish your brand as an authority, builds trust with your audience, improves SEO rankings through valuable keywords, generates leads, and drives customer loyalty by providing useful and informative content.',
  },
  {
    question: 'What can WhatsApp Marketing do for my business?',
    answer: 'WhatsApp Marketing allows for direct, personalized communication with your customers. It\'s effective for sending targeted promotions, providing customer support, sharing updates, and nurturing leads through a channel they actively use.',
  },
  {
    question: 'What do I need to do first to use your services?',
    answer: 'The first step is to contact us for a free consultation! We\'ll discuss your business goals, current online presence, and requirements. Based on this, we\'ll propose a customized digital marketing strategy and plan.',
  },
  {
    question: 'How do you set your prices?',
    answer: 'Our pricing is transparent and based on the specific services required, the scope of the project, and your business goals. We offer various packages and custom quotes to fit different budgets and needs.',
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

const Faq = () => {
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
            Digital Marketing - FAQs
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
          {digitalMarketingFaqData.map((item, index) => (
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

export default Faq;