"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  IoWalletOutline,
  IoGlobeOutline,
  IoShieldCheckmarkOutline,
  IoArrowForward,
} from "react-icons/io5";

const ecommerceFeatures = [
  {
    icon: IoWalletOutline,
    title: "Complete Transaction Management",
    description:
      "With our Ecommerce Web Development in Patna solutions managing online transactions becomes simple and well organized. We design ecommerce systems where you can easily track payments, refunds invoices and complete order flow from one easy to use dashboard. This reduces manual work, lowers chances of errors and gives business owners better control over daily operations.In the Bihar market, Cash on Delivery (COD) management is a headache. We build systems that automate order verification to reduce fake orders and RTO (Return to Origin) losses.",
  },
  {
    icon: IoGlobeOutline,
    title: "Modern & Global Payments",
    description:
      "With our Ecommerce Web Development in Patna solutions managing online transactions becomes simple and well organized. We design ecommerce systems where you can easily track payments, refunds invoices and complete order flow from one easy to use dashboard. This reduces manual work, lowers chances of errors and gives business owners better control over daily operations.In the Bihar market, Cash on Delivery (COD) management is a headache. We build systems that automate order verification to reduce fake orders and RTO (Return to Origin) losses.",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Advanced Security & Fraud Avoidance",
    description:
      "Security is never an afterthought in our development process. With our Custom Ecommerce Development approach we use strong encryption secure checkout layers and advanced fraud prevention techniques. Security isn't just a buzzword for us. We use SSL encryption and SQL injection protection specifically to keep local customer data safe from growing regional cyber threats. These steps help protect customer data payment details and important business information from possible threats.",
  },
];

const EcommerceFeatures = () => {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">
            BENEFITS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            E-commerce Website Development in Patna
          </h2>
          <p className="text-lg text-gray-600 max-w-7xl mx-auto mt-4">
            Our Ecommerce Website Development in Patna services are created to
            help businesses build a strong reliable and future ready online
            presence. We understand that every business has different goals.
            Some businesses are launching their first online store while others
            want to grow an existing ecommerce setup. Our focus is on building
            ecommerce platforms that are easy to manage, stable for daily use
            and flexible enough to support long term growth without regular
            technical issues.We’ve seen too many local businesses in areas like
            Boring Road or Exhibition Road get stuck with 'slow' templates that
            can’t handle real-world traffic.<br></br><br></br>As a professional Ecommerce Website
            Development Company in India, we do not follow a one size fits all
            approach. Every ecommerce website is planned based on business size,
            product type, target audience and future expansion plans. This way
            your online store continues to support your business and stays
            profitable as your needs grow over time.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          {ecommerceFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg flex flex-col h-full transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500"
                variants={itemVariants}
              >
                <div className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Icon className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-grow mb-6">
                  {feature.description}
                </p>
                <a
                  href="#"
                  className="flex items-center text-blue-600 font-semibold mt-auto group"
                >
                  Learn More
                  <IoArrowForward className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default EcommerceFeatures;
