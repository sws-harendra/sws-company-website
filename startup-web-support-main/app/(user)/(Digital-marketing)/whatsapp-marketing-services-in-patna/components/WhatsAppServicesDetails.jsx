"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoMegaphoneOutline,      // Broadcast Messages
  IoHeadsetOutline,        // Customer Support
  IoShareOutline,          // Content Sharing
  IoFunnelOutline,         // Lead Generation
  IoChatboxEllipsesOutline // Automated Responses
} from 'react-icons/io5';

const whatsappServices = [
  {
    icon: IoMegaphoneOutline,
    title: 'Broadcast Messages',
    description: 'Send updates, offers, and announcements to multiple customers simultaneously, ensuring your message reaches a wider audience.',
  },
  {
    icon: IoHeadsetOutline,
    title: 'Customer Support',
    description: 'Respond to questions, fix problems, and quickly offer help using WhatsApp as a customer care channel.',
  },
  {
    icon: IoShareOutline,
    title: 'Content Sharing',
    description: 'Share pictures, videos, and documents, along with other types of multimedia material, to get your audience’s attention.',
  },
  {
    icon: IoFunnelOutline,
    title: 'Lead Generation',
    description: 'Capture leads directly through WhatsApp by promoting exclusive offers and driving potential customers to your business.',
  },
  {
    icon: IoChatboxEllipsesOutline,
    title: 'Automated Responses',
    description: 'Set up automated responses for common queries to ensure that your customers receive immediate assistance, even outside of business hours.',
  },
   {
    icon: IoMegaphoneOutline,
    title: 'Broadcast Messages',
    description: 'Send updates, offers, and announcements to multiple customers simultaneously, ensuring your message reaches a wider audience.',
  },
];

const WhatsAppServicesDetails = () => {
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
    // Section with white background
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            At Startup Web Support, we offer full WhatsApp marketing options that are tailored to the needs of business owners in Patna. What we have to offer includes:
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" // Using 3 columns, last row will adjust
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {whatsappServices.map((service, index) => {
            const Icon = service.icon;
            // Adjust grid span for the last items if count is 5
            let colSpan = '';
            if (whatsappServices.length === 5) {
              if (index === 3) colSpan = 'md:col-start-1 lg:col-start-auto'; // Reset start for md, auto for lg
              if (index === 4) colSpan = 'md:col-start-auto lg:col-start-2'; // Center last item on lg
            }
            
            return (
              <motion.div
                key={index}
                className={`bg-slate-50 p-8 rounded-xl border border-slate-100 transition-all duration-300 transform hover:shadow-lg hover:border-sky-200 hover:-translate-y-2 ${colSpan}`} // sky accent color on hover
                variants={itemVariants}
              >
                <div className="flex items-start gap-5">
                  <div className="bg-sky-100 text-sky-600 rounded-lg p-3 mt-1 flex-shrink-0"> {/* sky icon background */}
                    <Icon className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsAppServicesDetails;