"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const seoFaqData = [
  {
    question: 'What kinds of SEO services do you offer?',
    answer: 'We provide a wide range of SEO services, such as local SEO, on-page optimization (content, meta tags, and structure), technical SEO (site speed, mobile-friendliness, and schema), SEO content writing, SEO audits and reporting, and white-hat link building.',
  },
  {
    question: 'Why should you pick [Your Company Name] for SEO in Patna?',
    answer: 'Our agency combines local market expertise with proven, data-driven SEO strategies. We have a track record of delivering measurable results (higher rankings, increased traffic, more leads) for businesses specifically in Patna and Bihar.',
  },
  {
    question: 'What is local SEO, and how can it help my Patna business?',
    answer: 'Local SEO focuses on improving your visibility in local search results (like "best restaurant near me"). For a Patna business, this means optimizing your Google Business Profile, local citations, and website content to attract nearby customers actively searching for your services.',
  },
  {
    question: 'What do you do with technical SEO?',
    answer: 'Technical SEO ensures search engines can easily crawl, index, and understand your website. This includes optimizing site speed, ensuring mobile-friendliness, implementing schema markup, fixing crawl errors, and managing site architecture.',
  },
  {
    question: 'Do you write content that is good for SEO?',
    answer: 'Yes, absolutely. Our content writing services focus on creating high-quality, keyword-optimized content (blogs, articles, service pages) that not only attracts search engines but also engages your target audience and encourages conversions.',
  },
  {
    question: 'What will I learn from your SEO audits and reports?',
    answer: 'Our audits provide a comprehensive analysis of your website\'s current SEO health, identifying strengths, weaknesses, and opportunities. Reports track key metrics like rankings, traffic, conversions, and backlink profile, showing the progress and impact of our efforts.',
  },
  {
    question: 'Is link building a part of your SEO plan?',
    answer: 'Yes, ethical link building is a crucial part of our comprehensive SEO strategy. We focus on acquiring high-quality, relevant backlinks from reputable sources to build your website\'s authority and improve its ranking potential.',
  },
  {
    question: 'What do you charge for your SEO services?',
    answer: 'Our pricing is tailored to your specific needs and goals. We offer various monthly packages based on the scope of work and competitiveness of your industry. Contact us for a custom quote.',
  },
  {
    question: 'How do I sign up for your SEO services?',
    answer: 'Signing up is easy! Simply contact us through our website or phone number for a free consultation. We\'ll discuss your business, goals, and provide a customized SEO proposal. Once approved, we\'ll kick off the project.',
  },
];

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4"> {/* Changed border color */}
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

const SeoFaq = () => {
  const [expanded, setExpanded] = useState(0);

  return (
    // Section with white background
    <section className="bg-white py-24 "> 
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            SEO Services - Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          whileInVew="visible" // Corrected prop name
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {seoFaqData.map((item, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
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

export default SeoFaq;