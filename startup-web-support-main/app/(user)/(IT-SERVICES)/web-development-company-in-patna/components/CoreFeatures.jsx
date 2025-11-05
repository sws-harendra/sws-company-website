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
    description: 'We are a professional Web Development Company in Patna, we don’t use pre-existing templates, we have a professionally built team of graphic designers who can build custom Websites that suit your companies and increase user engagement. Every project is built differently.',
    color: 'text-sky-300',
    span: 'lg:col-span-2', // यह कार्ड दूसरों से दोगुना चौड़ा होगा
  },
  {
    icon: IoCodeSlashOutline,
    title: 'SEO-Friendly Code',
    description: 'Each project we developed is designed with SEO friendly nature in mind – structured properly, fast-loading, and ready to rank on search engines.',
    color: 'text-sky-300',
    span: 'lg:col-span-1',
  },
  {
    icon: IoTvOutline,
    title: 'Responsive web design',
    description: 'Each Website must adapt to every device’s screen size, today everyone uses different types of devices like mobile, tablet, and pc, so your Website should run seamlessly on each device.',
    color: 'text-sky-300',
    span: 'lg:col-span-1',
  },
  {
    icon: IoBusinessOutline,
    title: 'Business Website Development',
    description: 'We design professional Websites for one’s business for lead generation and customer engagement that are designed specially and which caters to your target audience.',
    color: 'text-sky-300',
    span: 'lg:col-span-1',
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: 'Speed & Security Optimization',
    description: 'A fast and secure Website is in today’s demand in the digital world. SWS uses the latest tools and has the best team to ensure fast processing and security for one’s Website.',
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
            Your Website is more than just a digital presence – it’s your brand’s first impression and one of your most powerful marketing tools. Whether you're a startup, small business, or growing enterprise, we create digital experiences that help you stand out.
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