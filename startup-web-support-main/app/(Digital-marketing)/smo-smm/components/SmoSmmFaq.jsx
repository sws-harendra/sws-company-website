"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const smoSmmFaqData = [
  {
    question: 'What is the difference between SMO (Social Media Optimisation) and SMM (Social Media Marketing)?',
    answer: 'SMO is all about improving your social media presence without using paid ads. This means optimizing your profiles, posting good content, and getting people to interact with you. SMM is the use of paid ads on social media sites like Facebook, Instagram, LinkedIn, and others to get more people to know about your brand, visit your site, become leads, and make purchases.',
  },
  {
    question: 'Why should my company use both SMO and SMM at the same time?',
    answer: 'Using SMO and SMM together creates a powerful synergy. SMO builds a strong organic foundation, credibility, and community, while SMM provides immediate, targeted reach and accelerates results. Combining them ensures both long-term growth and short-term wins.',
  },
  {
    question: 'What SMO services do you provide?',
    answer: 'Our SMO services include profile optimization across all relevant platforms, content strategy development, hashtag research, community engagement, and brand reputation monitoring to enhance your organic social presence.',
  },
  {
    question: 'What kinds of SMM services are there?',
    answer: 'Our SMM services cover paid advertising campaigns on platforms like Facebook, Instagram, LinkedIn, Twitter, etc. This includes ad creation, audience targeting, budget management, A/B testing, and performance tracking.',
  },
  {
    question: 'How do SMO and SMM work together?',
    answer: 'SMO strengthens your profile and content, making your paid SMM campaigns more effective (better ad scores, more engaged audience). SMM can boost the visibility of your optimized content and profiles created through SMO, accelerating follower growth and engagement.',
  },
  {
    question: 'What kinds of platforms do you work with?',
    answer: 'We work with all major social media platforms, including Facebook, Instagram, LinkedIn, Twitter, Pinterest, YouTube, and TikTok, depending on your target audience and business goals.',
  },
  {
    question: 'How do you keep track of results?',
    answer: 'We use advanced analytics tools to track key performance indicators (KPIs) like reach, engagement rate, follower growth, website traffic from social media, lead generation, and conversions. We provide regular, detailed reports.',
  },
  {
    question: 'Why should you choose Startup Web Support in Patna for SMO and SMM?',
    answer: 'We combine deep understanding of the Patna market with proven social media strategies. Our expert team offers customized plans, affordable pricing, transparent reporting, and a commitment to delivering measurable results for your business.',
  },
];

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4"> {/* Adjusted border color for white theme */}
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

const SmoSmmFaq = () => {
  const [expanded, setExpanded] = useState(0); // Open the first item by default

  return (
    // Section with white background
    <section className="bg-white py-24 "> 
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            SMO & SMM - Frequently Asked Questions
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
          {smoSmmFaqData.map((item, index) => (
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

export default SmoSmmFaq;