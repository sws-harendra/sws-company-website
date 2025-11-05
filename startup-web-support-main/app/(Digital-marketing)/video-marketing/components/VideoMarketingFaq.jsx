"use client"
import React, { useState, useEffect } from 'react'; // Added useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const videoFaqData = [
  { question: 'What services do you provide in video marketing?', answer: 'We create promotional, explainer, corporate, product, and social media videos designed to engage your audience and meet your business goals.' },
  { question: 'Why should I choose your video marketing services?', answer: 'Our team combines creative storytelling with strategic marketing. We focus on producing high-quality videos that are not only visually appealing but also drive results, like increased engagement, brand awareness, and conversions.' },
  { question: 'Do you create animated explainer videos?', answer: 'Yes, we specialize in creating engaging 2D and 3D animated explainer videos that simplify complex concepts and effectively communicate your message.' },
  { question: 'Can you make product promotional videos?', answer: 'Absolutely. We produce high-impact product videos, including demos, feature highlights, and lifestyle shots, designed to showcase your product\'s benefits and drive sales.' },
  { question: 'Do you provide corporate video production?', answer: 'Yes, we offer professional corporate video production services, including company story videos, interviews, event coverage, and training videos to enhance your brand communication.' },
  { question: 'Can you help with social media video marketing?', answer: 'Definitely. We create platform-optimized video content (short-form videos, stories, ads) for social media channels like Instagram, Facebook, LinkedIn, and TikTok to maximize reach and engagement.' },
  { question: 'How does video marketing help my business?', answer: 'Video marketing significantly boosts engagement, increases brand awareness, improves SEO rankings, drives website traffic, generates leads, and ultimately increases sales by connecting with your audience on a deeper level.' },
  { question: 'Do you handle YouTube video promotion?', answer: 'Yes, we provide YouTube channel management and video promotion services, including video SEO, audience growth strategies, and YouTube advertising campaigns.' },
  { question: 'Can you provide customized video marketing strategies?', answer: 'Yes, every strategy we develop is customized. We analyze your business goals, target audience, and industry to create a tailored video marketing plan that delivers the best results.' },
  { question: 'Do you offer affordable video marketing packages?', answer: 'We offer flexible and affordable video marketing packages designed to suit various budgets, especially for startups and small businesses, without compromising on quality.' },
];

// Helper function to split the array into two columns
const splitArrayIntoColumns = (arr) => {
  const midPoint = Math.ceil(arr.length / 2);
  const col1 = arr.slice(0, midPoint);
  const col2 = arr.slice(midPoint);
  return [col1, col2];
};


const AccordionItem = ({ item, isOpen, onClick }) => {
    // ... (AccordionItem code remains the same as before) ...
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

const VideoMarketingFaq = () => {
  // Use question text as unique ID for expansion state
  const [expandedId, setExpandedId] = useState(videoFaqData[0]?.question || null); 
  const [columns, setColumns] = useState([[], []]);

  // Split data into columns once on mount
  useEffect(() => {
    setColumns(splitArrayIntoColumns(videoFaqData));
  }, []);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-white py-10"> 
      <div className="container mx-auto px-6 max-w-7xl"> {/* Wider container */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Video Marketing - Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Grid layout for columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> {/* Changed md: to lg: */}
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
                    key={item.question} // Use question as key
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
                    key={item.question} // Use question as key
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

export default VideoMarketingFaq;