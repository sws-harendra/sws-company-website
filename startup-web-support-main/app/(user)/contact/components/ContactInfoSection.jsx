"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoLocationOutline, IoMailOutline, IoCallOutline } from 'react-icons/io5';

const contactDetails = [
  {
    icon: IoLocationOutline,
    title: 'Location:',
    detail: '3rd Floor, Parvati Tower, Phulwari Rd, Jagdeo Path, Patna, Bihar 800014',
    href: 'https://maps.google.com/?q=3rd+Floor,+Parvati+Tower,+Phulwari+Rd,+Jagdeo+Path,+Patna,+Bihar+800014' // Optional: Link to Google Maps
  },
  {
    icon: IoMailOutline,
    title: 'Email:',
    detail: 'info@startupwebsupport.com',
    href: 'mailto:info@startupwebsupport.com'
  },
  {
    icon: IoCallOutline,
    title: 'Phone:',
    detail: '+91 7479499718', // Corrected format assuming Indian number
    href: 'tel:+917479499718'
  },
];

const ContactInfo = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="bg-slate-50 py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Optional Heading */}
        {/* <motion.div className="text-center mb-16" ... > */}
          {/* <h2 className="text-4xl font-bold text-gray-900">Contact Details</h2> */}
        {/* </motion.div> */}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8" // 3-column grid
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {contactDetails.map((contact, index) => {
            const Icon = contact.icon;
            const isLink = contact.href; // Check if href exists

            const content = (
              <>
                <div className="flex justify-center mb-5">
                  <div className="bg-sky-100 text-sky-600 rounded-full p-4">
                    <Icon className="text-4xl" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                  {contact.title}
                </h3>
                <p className={`text-gray-600 leading-relaxed text-center ${isLink ? 'hover:text-sky-600 transition-colors' : ''}`}>
                  {contact.detail}
                </p>
              </>
            );

            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-start h-full transition-shadow duration-300 hover:shadow-xl" // Centered items, added hover shadow
                variants={itemVariants}
              >
                {isLink ? (
                  <a href={contact.href} target="_blank" rel="noopener noreferrer" className="w-full text-center">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;