"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoLocationOutline, 
  IoCodeWorkingOutline, 
  IoBuildOutline, 
  IoCreateOutline, 
  IoDocumentTextOutline, 
  IoLinkOutline 
} from 'react-icons/io5';

const seoServicesData = [
  {
    icon: IoLocationOutline,
    title: 'Local SEO Services',
    description: 'If your business depends on local customers, then local visibility becomes crucial. Our local SEO strategies help your business appear in relevant local searches, allowing you to confidently compete with any top SEO company in Patna.',
  },
  {
    icon: IoCodeWorkingOutline,
    title: 'On-Page SEO Optimization',
    description: 'We take care of your website content structure and on page elements so that your site shows up better on Google and reaches the right people. As a provider of best seo services in patna, we make sure your website is easy for search engines to understand and comfortable for your visitors to use without any confusion.',
  },
  {
    icon: IoBuildOutline,
    title: 'Technical SEO Solutions',
    description: 'Website speed mobile usability and overall technical health matter a lot when it comes to Google rankings. As a professional seo company in bihar, we handle crawl issues improve website performance and make sure your site works smoothly on mobile laptop and desktop without any technical trouble.',
  },
  {
    icon: IoCreateOutline,
    title: 'SEO Content Writing',
    description: 'Strong content helps build trust and also improves rankings over time. We write content in a natural way keeping real people in mind, not just search engines. This practical approach has helped us grow as a reliable seo company in Patna that local businesses feel confident working with.',
  },
  {
    icon: IoDocumentTextOutline,
    title: 'SEO Audits and Reporting',
    description: 'We give you clear audits and simple reports so you can actually understand what is improving on your website. With a transparent way of working our seo services patna help you track real progress without any confusion or technical headache.',
  },
  {
    icon: IoLinkOutline,
    title: 'Link-Building Services',
    description: 'Quality backlinks help build authority and support long term rankings on Google. We follow ethical methods that match the working style of a professional seo agency patna, so your website grows steadily without any risk or shortcuts.',
  },
];

const SeoCoreServices = () => {
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
    <section className="bg-[#1e88e5] py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-50 mb-4">
            Comprehensive SEO Services Tailored for Businesses in Patna & Bihar
          </h2>
          <p className="text-lg text-gray-50  mx-auto leading-relaxed">
            We handle SEO for businesses in Patna and throughout Bihar in a simple and practical way. When it comes to SEO in Patna, we firmly believe that SEO is not just about rankings. The real goal is to build long-term visibility, customer trust, and grow your business gradually but steadily.<br></br>
            As a hands-on SEO agency in Patna, we don't use any ready-made formulas. We do proper planning, fix website technical issues, and create content that real people want to read. Whether your business is in Patna or any other part of Bihar, our goal is simple — to keep you visible online and competitive in the local market.

          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10" // Using 2 columns for a more detailed look
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {seoServicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="flex items-start gap-6 p-8 bg-sky-600/80 rounded-xl border border-sky-800 transition-all duration-300 hover:bg-sky-800/80 hover:shadow-lg hover:border-transparent"
                variants={itemVariants}
              >
                <div className="bg-sky-700 text-white rounded-lg p-4 mt-1 flex-shrink-0">
                  <Icon className="text-3xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SeoCoreServices;