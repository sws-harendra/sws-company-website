"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoLocationSharp, IoArrowForward } from 'react-icons/io5';

const AreasServedCta = () => {
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
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-5xl"> {/* Centered and slightly wider content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Areas We Serve Section */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <IoLocationSharp className="text-5xl text-sky-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Areas We Serve in Patna and Bihar
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We proudly offer <span className="font-semibold text-gray-800">SEM and PPC services</span> to businesses across Patna, including key areas like Kankarbagh, Boring Road, Danapur, Patliputra Colony, and beyond. We also extend our services to businesses throughout Bihar, including <span className="font-semibold text-gray-800">Muzaffarpur, Gaya, Bhagalpur, Darbhanga</span>, and <span className="font-semibold text-gray-800">Purnia</span>.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.hr className="border-t border-gray-200 w-24 mx-auto mb-16" variants={itemVariants} />

          {/* Get Started Section */}
          <motion.div className="text-center" variants={itemVariants}>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Get Started with the Best SEM and PPC Services in Patna Today!
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              At Startup Web Support, we are committed to helping your business grow through effective <span className="font-semibold text-gray-800">SEM and PPC services</span>. Whether you need help managing <span className="font-semibold text-gray-800">Google Ads in Patna</span>, launching a <span className="font-semibold text-gray-800">local PPC campaign</span>, or optimizing your existing SEM strategy, our team is here to assist.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
              Ready to grow your business with the <span className="font-semibold text-sky-600">best SEM Company in Patna</span>? Contact us today for a free consultation, and let's create a strategy that gets your website the visibility it deserves!
            </p>
            <motion.button
              className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 gap-2 text-lg"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Free Consultation <IoArrowForward className="text-xl" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AreasServedCta;