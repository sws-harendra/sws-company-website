"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const contentFaqData = [
    { question: 'What services do you provide in content marketing?', answer: 'We offer blog writing, SEO content, social media posts, email content, website copy, infographics, video scripts, and more to cover all your content needs.' },
    { question: 'Why should I choose your content marketing services?', answer: 'Our team focuses on creating high-quality, strategic content that aligns with your brand voice, engages your target audience, supports your SEO efforts, and ultimately drives conversions.' },
    { question: 'Do you provide SEO-optimized content writing?', answer: 'Yes, absolutely. SEO is integrated into our content creation process. We conduct keyword research and naturally weave relevant terms into compelling content that ranks well and provides value to readers.' },
    { question: 'Can you create blogs and articles for my website?', answer: 'Definitely. We specialize in creating well-researched, informative, and engaging blog posts and articles tailored to your industry and audience, helping establish your thought leadership.' },
    { question: 'Do you provide social media content creation?', answer: 'Yes, we create platform-specific content (posts, captions, visuals, short videos) designed to maximize engagement and reach on social media channels like Facebook, Instagram, LinkedIn, etc.' },
    { question: 'How does content marketing help my business?', answer: 'Content marketing helps by attracting and retaining a clearly defined audience, building brand awareness and trust, improving search engine rankings, generating leads, and positioning your business as an industry expert.' },
    { question: 'Do you provide email marketing content?', answer: 'Yes, we write compelling content for email newsletters, promotional emails, drip campaigns, and automated sequences to nurture leads and engage subscribers.' },
    { question: 'Can you develop content strategies for businesses?', answer: 'Yes, developing a comprehensive content strategy is a core part of our service. We define target audiences, content pillars, distribution channels, and KPIs to ensure your content efforts are focused and effective.' },
    { question: 'Do you provide content for startups and small businesses?', answer: 'Absolutely. We understand the unique challenges of startups and small businesses and offer scalable, affordable content marketing solutions tailored to their specific needs and budgets.' },
    { question: 'Do you track and analyze content performance?', answer: 'Yes, tracking performance is crucial. We use analytics tools to monitor key metrics like website traffic, engagement rates, conversion rates, and SEO rankings attributed to content, providing regular reports.' },
];

// Helper function to split the array into two columns
const splitArrayIntoColumns = (arr) => {
  const midPoint = Math.ceil(arr.length / 2);
  const col1 = arr.slice(0, midPoint);
  const col2 = arr.slice(midPoint);
  return [col1, col2];
};

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

const ContentMarketingFaq = () => {
  // Use question text as unique ID for expansion state
  const [expandedId, setExpandedId] = useState(contentFaqData[0]?.question || null); 
  const [columns, setColumns] = useState([[], []]);

  // Split data into columns once on mount
  useEffect(() => {
    setColumns(splitArrayIntoColumns(contentFaqData));
  }, []);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-white py-24"> {/* Main background */}
      <div className="container mx-auto px-6 max-w-7xl"> 
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Content Marketing - Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Grid layout for columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> {/* 2 columns on lg screens */}
            {/* Column 1 */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    visible: { transition: { staggerChildren: 0.05 } } 
                }}
            >
                {columns[0].map((item) => (
                    <motion.div 
                    key={item.question} 
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    >
                    <AccordionItem
                        item={item}
                        isOpen={item.question === expandedId}
                        onClick={() => handleToggle(item.question)}
                    />
                    </motion.div>
                ))}
            </motion.div>

            {/* Column 2 */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1, delay: 0.1 }} // Slightly delay second column
                variants={{
                    visible: { transition: { staggerChildren: 0.05 } }
                }}
            >
                {columns[1].map((item) => (
                    <motion.div 
                    key={item.question} 
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    >
                    <AccordionItem
                        item={item}
                        isOpen={item.question === expandedId}
                        onClick={() => handleToggle(item.question)}
                    />
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContentMarketingFaq;