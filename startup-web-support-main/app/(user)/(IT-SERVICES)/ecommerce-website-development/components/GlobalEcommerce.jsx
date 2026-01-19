"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoCardOutline,
  IoGlobeOutline,
  IoShieldCheckmarkOutline,
  IoRocketOutline,
  IoEyeOutline,
  IoAnalyticsOutline
} from 'react-icons/io5';

const platformFeatures = [
  { icon: IoCardOutline, text: 'Manage subscriptions, goods, services, and sales.' },
  { icon: IoGlobeOutline, text: 'Modern payment gateways with multi-currency support.' },
  { icon: IoShieldCheckmarkOutline, text: 'Strong encryption and advanced fraud avoidance.' },
];

const businessBenefits = [
  { icon: IoRocketOutline, text: 'Stay competitive in a changing digital economy.' },
  { icon: IoEyeOutline, text: 'Expand brand visibility to a global audience.' },
  { icon: IoAnalyticsOutline, text: 'Boost your consumer base and enable development.' },
];

const GlobalEcommerce = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
            Enter the Global market with E-commerce Technology!
          </h2>
          <p className="text-lg text-sky-100 max-w-4xl mx-auto mt-4">
            A professionally built ecommerce platform helps your business go beyond local boundaries. With the right Ecommerce Website Development, you can reach customers across cities, states and even different countries. Selling online allows your business to stay open round the clock, attract a wider audience and compete confidently in the global digital market.<br></br>
            Our Ecommerce Website Development in Patna solutions are planned with global growth in mind. This makes it easier for businesses to expand into new markets without the need to rebuild their entire system again.
          </p>
        </motion.div>

        <div className="bg-blue-900/20 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
            >
                <motion.h3 className="text-3xl font-bold text-cyan-300 mb-6" variants={itemVariants}>
                Our Platform Features
                </motion.h3>
                <motion.p className="text-blue-100 mb-8" variants={itemVariants}>
                    Our Ecommerce Website Development platforms are built to handle every part of your online store in a smooth and practical way. Each feature is created to reduce daily workload while supporting growth as your business expands over time.
                    You can manage products, services subscriptions and sales from one simple and user-friendly system.Let’s face it: 90% of your Patna customers are shopping on their phones. If your site takes more than 3 seconds to load on a budget smartphone, you’ve already lost the sale.<br></br><br></br>
                    The platform supports modern payment gateways with global and multi currency options
                    Secure architecture with built in fraud prevention helps protect all transactions
                    Reliable shopping cart setup ensures a smooth and hassle free checkout experience for customers.We design 'thumb-friendly' navigation, making it easy for users to add products to their cart while on the move.

                </motion.p>
                <ul className="space-y-5">
                {platformFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                    <motion.li key={index} className="flex items-start gap-4" variants={itemVariants}>
                        <Icon className="text-2xl text-cyan-300 mt-1 flex-shrink-0" />
                        <span className="text-lg text-blue-100">{feature.text}</span>
                    </motion.li>
                    );
                })}
                </ul>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
            >
                <motion.h3 className="text-3xl font-bold text-emerald-300 mb-6" variants={itemVariants}>
                Your Business Benefits
                </motion.h3>
                <motion.p className="text-blue-100 mb-8" variants={itemVariants}>
                    With professional Ecommerce Web Development, your business is no longer limited to one city or region. A strong ecommerce presence helps you compete confidently in today’s digital first market and grow faster without unnecessary limitations.
                    You can showcase your products and services to customers across different locations.<br></br><br></br>
                    Your brand visibility improves beyond local markets
                    A professional and secure online store helps build customer trust and credibility
                    You can expand your customer base and scale operations in a more organized way.

                </motion.p>
                <ul className="space-y-5">
                {businessBenefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                    <motion.li key={index} className="flex items-start gap-4" variants={itemVariants}>
                        <Icon className="text-2xl text-emerald-300 mt-1 flex-shrink-0" />
                        <span className="text-lg text-blue-100">{benefit.text}</span>
                    </motion.li>
                    );
                })}
                </ul>
            </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalEcommerce;