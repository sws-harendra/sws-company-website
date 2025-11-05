"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';

const semPpcFaqData = [
    {
    id: 1,
    question: 'What kinds of SEM and PPC services does Startup Web Support offer in Patna?',
    answer: 'We offer full SEM (Search Engine Marketing) and PPC (Pay-Per-Click) services, including Google Ads (search, display, remarketing), Bing Ads, YouTube ads, local PPC campaigns for Patna, SEM audits, and improvements. These services are made to fit the needs of businesses in Patna and Bihar.',
    },
    {
    id: 2,
    question: 'Why should you choose Startup Web Support for SEM/PPC in Patna and Bihar?',
    answer: 'Our agency combines local expertise with data-driven strategies. We focus on maximizing your ROI through targeted campaigns, transparent reporting, and continuous optimization, making us a trusted partner in Patna and Bihar.',
    },
    {
    id: 3,
    question: 'How do your PPC management services help businesses in the area?',
    answer: 'Our PPC management drives targeted traffic to your website immediately. We focus on relevant keywords and audience segments specific to Patna and Bihar, ensuring your ad spend attracts potential customers actively looking for your services.',
    },
    {
    id: 4,
    question: 'Do you offer PPC services to businesses in Patna?',
    answer: 'Yes, absolutely. We provide specialized PPC services tailored for businesses operating in Patna, focusing on local search terms and demographics to maximize local lead generation.',
    },
    {
    id: 5,
    question: 'What kinds of ads and platforms do you work with?',
    answer: 'We work with a variety of ad platforms, primarily Google Ads (Search, Display, Shopping, YouTube) and Bing Ads. We also manage paid campaigns on social media platforms like Facebook, Instagram, and LinkedIn.',
    },
    {
    id: 6,
    question: 'What does your process for auditing and improving SEM include?',
    answer: 'Our SEM audit involves a deep dive into your current campaigns, keyword performance, ad copy, landing pages, and competitor analysis. Based on the audit, we create an optimization roadmap to improve results.',
    },
    // Add the rest of the FAQ data here...
];

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-sky-500/50 last:border-b-0">
      <motion.header
        className="flex justify-between items-center w-full py-5 cursor-pointer"
        onClick={onClick}
        initial={false}
      >
        <h3 className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-sky-100'}`}>
          {item.question}
        </h3>
        <div className="text-2xl text-sky-300">
          {isOpen ? <IoRemoveOutline /> : <IoAddOutline />}
        </div>
      </motion.header>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto', marginTop: 0 },
              collapsed: { opacity: 0, height: 0, marginTop: -10 }, // Negative margin for smoother collapse
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            {/* Answer section with slightly different background */}
            <div className="bg-sky-700/30 p-5 rounded-md mb-5">
              <p className="text-sky-100 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

const SemPpcFaqColumns = () => {
  const [expanded, setExpanded] = useState(semPpcFaqData[0].id); // Keep the first item open initially

  return (
    // Section with sky-600 background
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-4xl"> {/* Using max-w-4xl for better readability */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            SEM & PPC - Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          className="bg-sky-700/40 rounded-xl p-4 md:p-8 border border-sky-500/50 shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {semPpcFaqData.map((item) => (
            <motion.div 
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <AccordionItem
                item={item}
                isOpen={item.id === expanded}
                onClick={() => setExpanded(item.id === expanded ? null : item.id)} // Allow closing by clicking again
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SemPpcFaqColumns;