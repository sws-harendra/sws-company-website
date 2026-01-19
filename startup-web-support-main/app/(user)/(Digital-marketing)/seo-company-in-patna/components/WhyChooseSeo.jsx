"use client";
import React from "react";
import { motion } from "framer-motion";
import SeoInfoCards from "./SeoInfoCard";
import IndustrySeoCard from "./IndustryScoCard";

const WhyChooseSeo = () => {
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
    hidden: { opacity: 0, y: 30 },
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
    <section className="bg-white py-10 ">
      <SeoInfoCards />
      <IndustrySeoCard />
      <div className="container mx-auto px-6 max-w-5xl">
        {" "}
        {/* Slightly wider max-width */}
        <motion.div
          className="bg-white p-10 md:p-12 rounded-xl shadow-xl border border-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6 text-center"
            variants={itemVariants}
          >
            Why Choose Startup Web Support for SEO Services in Patna?
          </motion.h2>

          <motion.p
            className="text-gray-700 text-lg leading-relaxed mb-6"
            variants={itemVariants}
          >
            As one of the leading{" "}
            <span className="font-semibold text-blue-600">
              SEO agencies in Patna
            </span>
            , we offer comprehensive, result-driven SEO strategies tailored to
            your specific business needs. Our knowledge in search engine
            optimisation (SEO) guarantees that your website ranks on the top
            page of Google and other main search engines, so generating
            important natural traffic to your company.
          </motion.p>

          <motion.p
            className="text-gray-700 text-lg leading-relaxed"
            variants={itemVariants}
          >
            Our way of working follows the same standards you would expect from
            a best seo company, and our results stand strong when compared with
            any top seo company in india or top seo agency. Many local
            businesses trust us as their preferred web seo company because we
            focus on steady growth and consistent results instead of false
            promises.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSeo;
