"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const brandingFaqData = [
  {
    question: 'What services do you offer in branding and promotion?',
    answer: 'We provide brand strategy, digital marketing, social media, SEO, and advertising services to build a strong and lasting impression for your company.',
  },
  {
    question: 'Why should I choose your branding and promotion services?',
    answer: 'Our team combines creative design with data-driven digital strategies. We focus on building a cohesive brand identity that resonates with your target market and developing promotion plans that deliver measurable results and long-term growth.',
  },
  {
    question: 'Do you provide social media branding services?',
    answer: 'Yes, we specialize in creating a consistent and compelling brand presence across all relevant social media platforms, including profile optimization, content creation, and engagement strategies.',
  },
  {
    question: 'Can you design logos and brand identities?',
    answer: 'Absolutely. Crafting a unique and memorable brand identity is core to our services. This includes logo design, color palette selection, typography guidelines, and overall visual style development.',
  },
  {
    question: 'Do you help with online reputation management?',
    answer: 'Yes, managing your online reputation is crucial for branding. We monitor online mentions, manage reviews, and implement strategies to build and protect a positive brand image online.',
  },
  {
    question: 'How do you promote businesses online?',
    answer: 'We use a multi-channel approach including Search Engine Optimization (SEO), Pay-Per-Click (PPC) advertising, Social Media Marketing (SMM), Content Marketing, and Email Marketing, tailored to your specific business goals.',
  },
  {
    question: 'Do you provide customized branding solutions?',
    answer: 'Yes, every business is unique. We don\'t use templates. All our branding solutions, from strategy to design, are customized to reflect your specific values, mission, and target audience.',
  },
  {
    question: 'Can you promote startups and small businesses?',
    answer: 'Definitely. We specialize in helping startups and small businesses establish a strong brand foundation and implement cost-effective promotion strategies to gain visibility and attract customers in a competitive market.',
  },
  {
    question: 'Do you provide both online and offline promotion?',
    answer: 'Our primary focus is on digital branding and online promotion strategies. However, we can consult and collaborate on integrating offline elements (like print materials) to ensure brand consistency across all channels.',
  },
  {
    question: 'Do you offer long-term brand promotion strategies?',
    answer: 'Yes, we believe branding is an ongoing effort. We develop sustainable, long-term promotion strategies that adapt to market changes and help your brand grow consistently over time.',
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

const BrandingFaq = () => {
  const [expanded, setExpanded] = useState(0); // Open the first item by default

  return (
    // Section with light gray background
    <section className="bg-white py-24 "> 
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Branding & Promotion - FAQs
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {brandingFaqData.map((item, index) => (
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
                onClick={() => setExpanded(index === expanded ? null : index)} // Allow closing by clicking again
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandingFaq;