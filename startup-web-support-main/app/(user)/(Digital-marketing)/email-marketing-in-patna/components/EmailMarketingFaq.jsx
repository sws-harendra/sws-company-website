"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const emailFaqData = [
    { question: 'What services do you provide in email marketing?', answer: 'We offer bulk email campaigns, automation, newsletters, promotional, and transactional emails tailored to engage your audience and drive results.' },
    { question: 'Why should I choose your email marketing services?', answer: 'We combine creative strategies with data analytics. Our team focuses on designing personalized campaigns, ensuring high deliverability, and tracking results to maximize your ROI and build strong customer relationships.' },
    { question: 'Do you design custom email templates?', answer: 'Yes, we design custom, responsive email templates that reflect your brand identity and are optimized for readability and engagement across all devices.' },
    { question: 'Can you automate email campaigns?', answer: 'Absolutely. We specialize in setting up automated email workflows (like welcome series, abandoned cart reminders, re-engagement campaigns) to nurture leads and engage customers at the right moments.' },
    { question: 'Do you provide bulk email marketing services?', answer: 'Yes, we manage bulk email campaigns efficiently, ensuring compliance with regulations like CAN-SPAM and GDPR, and focusing on maintaining high deliverability rates.' },
    { question: 'How do you ensure email deliverability?', answer: 'We employ best practices including list hygiene, proper sender authentication (SPF, DKIM), monitoring sender reputation, and crafting engaging content to ensure your emails reach the inbox, not the spam folder.' },
    { question: 'Can you track email marketing campaign results?', answer: 'Yes, detailed tracking and reporting are key parts of our service. We monitor metrics like open rates, click-through rates (CTR), conversion rates, bounce rates, and ROI to measure success and optimize future campaigns.' },
    { question: 'Do you segment email lists for better targeting?', answer: 'Definitely. List segmentation is crucial for effective email marketing. We segment your subscriber lists based on demographics, behavior, preferences, and purchase history to send highly relevant and personalized messages.' },
    { question: 'Is email marketing suitable for small businesses?', answer: 'Yes, email marketing is one of the most cost-effective digital marketing strategies, making it highly suitable for small businesses looking to build customer relationships, generate leads, and drive sales.' },
    { question: 'Do you provide ongoing support for email campaigns?', answer: 'Yes, we offer ongoing campaign management, monitoring, optimization, and reporting services to ensure your email marketing efforts continue to deliver results over the long term.' },
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

const EmailMarketingFaq = () => {
  const [expandedId, setExpandedId] = useState(emailFaqData[0].question); // Use a unique ID like question
  const [columns, setColumns] = useState([[], []]);

  // Split the data into two columns on component mount
  React.useEffect(() => {
    setColumns(splitArrayIntoColumns(emailFaqData));
  }, []);


  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-white py-24"> 
      <div className="container mx-auto px-6 max-w-7xl"> {/* Wider container for two columns */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Email Marketing - Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Grid layout for columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1 */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    visible: { transition: { staggerChildren: 0.05 } } // Faster stagger within column
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
                viewport={{ once: true, amount: 0.1, delay: 0.2 }} // Delay second column slightly
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

export default EmailMarketingFaq;