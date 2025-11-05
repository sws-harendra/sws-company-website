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
    description: 'As a local business in Patna or Bihar, ranking high on local search results is critical for success. We specialize in local SEO strategies that ensure your business is visible to potential customers in your geographic area.',
  },
  {
    icon: IoCodeWorkingOutline,
    title: 'On-Page SEO Optimization',
    description: 'Our on-page SEO service includes optimizing your website’s content, structure, and technical elements to improve its visibility on search engines. From meta tags to keyword optimization, we ensure your website follows the latest SEO practices.',
  },
  {
    icon: IoBuildOutline,
    title: 'Technical SEO Solutions',
    description: 'Our team ensures your website is fast, mobile-friendly, and error-free. We address technical SEO concerns including structured data implementation to improve search engine visibility, crawl problem rectification, and site speed enhancement.',
  },
  {
    icon: IoCreateOutline,
    title: 'SEO Content Writing',
    description: 'In SEO, content is king; our talented content writers produce excellent, keyword-optimized material that generates traffic and interacts with users. We promise that your content, whether it’s for a blog, a service website, or a product description, will rank highly and turn users into buyers.',
  },
  {
    icon: IoDocumentTextOutline,
    title: 'SEO Audits and Reporting',
    description: 'Our SEO reports give you a lot of information about how well your website is doing. We give you suggestions you can use to make your website’s SEO better and make sure it ranks higher in search engines.',
  },
  {
    icon: IoLinkOutline,
    title: 'Link-Building Services',
    description: 'Building high-quality backlinks is essential to SEO success. We offer ethical, white-hat link-building strategies that help increase your website’s authority and ranking.',
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
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-50 mb-4">
            Our Comprehensive SEO Services
          </h2>
          <p className="text-lg text-gray-50 max-w-3xl mx-auto leading-relaxed">
            We offer a full suite of SEO services designed to boost your online visibility, drive organic traffic, and achieve sustainable growth.
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