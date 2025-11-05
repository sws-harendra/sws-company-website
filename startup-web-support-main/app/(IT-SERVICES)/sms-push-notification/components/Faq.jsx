"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';

const notificationFaqData = [
  {
    question: 'What is the difference between an SMS and a push notification?',
    answer: 'An SMS is a text message sent to a phone number via a cellular network and does not require an app or internet. A Push Notification is a message sent from a mobile app to a user\'s device, which requires the app to be installed and the device to have internet access.',
  },
  {
    question: 'When should I use SMS vs. a push notification?',
    answer: 'Use SMS for urgent alerts, and reaching a wide audience where you only have phone numbers. Use Push Notifications to engage your existing app users, send rich content like images, and drive them back to specific sections of your app.',
  },
  {
    question: 'What are the main benefits of using these services?',
    answer: 'The key benefits include extremely high open rates (especially for SMS), instant message delivery, increased customer engagement and retention, and the ability to drive sales through targeted promotions and alerts.',
  },
  {
    question: 'Do I need a mobile app to use your services?',
    answer: 'For SMS services, you do not need an app; you only need your customers\' phone numbers. For our Push Notification service, you must have a mobile app that your users have installed on their devices.',
  },
  {
    question: 'Can I send messages to specific groups of users?',
    answer: 'Yes, absolutely. Our platform allows for powerful audience segmentation. You can send targeted messages to users based on criteria like their location, purchase history, app usage, and other demographics to make your campaigns highly effective.',
  },
  {
    question: 'How can I measure the performance of my campaigns?',
    answer: 'We provide a comprehensive analytics dashboard. You can track key metrics in real-time, such as delivery rates, open rates, and click-through rates. This data helps you understand your audience and optimize future campaigns for better results.',
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
    <section className="bg-white py-16 ">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            SMS & Push Notifications - FAQs
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
          {notificationFaqData.map((item, index) => (
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