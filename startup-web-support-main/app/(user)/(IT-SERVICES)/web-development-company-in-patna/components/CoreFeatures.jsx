"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoBrushOutline, 
  IoTvOutline, 
  IoCodeSlashOutline, 
  IoBusinessOutline, 
  IoCartOutline, 
  IoShieldCheckmarkOutline 
} from 'react-icons/io5';

const featuresData = [
  {
    icon: IoBrushOutline,
    title: 'Custom Website Design',
    description: ' We design websites according to your type of business, not using ready-made designs. The look and flow are planned so local customers feel comfortable while using it.',
    color: 'text-sky-300',
    span: 'lg:col-span-2', // यह कार्ड दूसरों से दोगुना चौड़ा होगा
  },
  {
    icon: IoCodeSlashOutline,
    title: 'SEO-Friendly Code',
    description: 'The website is built properly from inside, so Google can read it easily and show it when people search for services like yours.',
    color: 'text-sky-300',
    span: 'lg:col-span-1',
  },
  {
    icon: IoTvOutline,
    title: 'Responsive web design',
    description: ' Whether someone opens your website on a mobile phone, tablet, or computer, it should work properly everywhere without layout issues.',
    color: 'text-sky-300',
    span: 'lg:col-span-1',
  },
  {
    icon: IoBusinessOutline,
    title: 'Business Website Development',
    description: ' We build business websites that actually help you get calls, messages, and enquiries instead of just looking good.',
    color: 'text-sky-300',
    span: 'lg:col-span-1',
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: 'Speed & Security Optimization',
    description: 'The website is kept fast and secure so it opens quickly and customer data stays safe.',
    color: 'text-sky-300',
    span: 'lg:col-span-1',
  },
];

const CoreFeatures = () => {
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
        damping: 10,
      },
    },
  };

  return (
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Build a Powerful Online Presence
          </h2>
          <p className="text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
             Your website is not just something you make because everyone else has one. It shows how serious you are about your business. When people visit your site, they should feel confident, understand your work clearly, and know how to contact you without any effort.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          {featuresData.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className={`bg-sky-800/50 p-8 rounded-xl border border-sky-700 transition-all duration-300 transform hover:border-sky-500 hover:-translate-y-2 ${feature.span}`}
                variants={itemVariants}
              >
                <Icon className={`text-4xl mb-5 ${feature.color}`} />
                <h3 className={`text-2xl font-semibold mb-3 ${feature.color}`}>
                  {feature.title}
                </h3>
                <p className="text-slate-200 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreFeatures;