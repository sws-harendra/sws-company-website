"use client"
import { motion } from 'framer-motion';
import { gridContainerVariants, imageVariants2, textChildVariants } from '@/components/GlobalCss';
import Image from 'next/image';


const BusinessValue = () => {
  return (
    <section className="bg-white py-24  overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={gridContainerVariants}
        >
          <motion.p
            className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 italic"
            variants={textChildVariants}
          >
            "Leading Web Development Company in Patna for Your Business"
          </motion.p>
          <motion.div
            className="inline-block bg-gradient-to-r from-sky-600 to-sky-900 text-white rounded-lg px-6 py-3 shadow-md mb-8"
            variants={textChildVariants}
          >
            <span className="text-lg md:text-xl font-bold">
              (70%) of Indian businesses are on internet now. Why aren't you?
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
            variants={textChildVariants}
          >
            Does hiring a Web Development Company in Patna add value to your business in India?
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            className="text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={gridContainerVariants}
          >
            <motion.p className="text-gray-700 leading-relaxed mb-6" variants={textChildVariants}>
              Use most leading technologies - the fastest growing Web Development Company in Patna for fast mobile responsive and SEO-friendly Website Development Services in Patna, Bihar. More than 70% of small businesses have a Website, whereas 30% of small businesses with a Website make more than 30% of their profit online. And 27% Of Business Owners use a Web Development Company in Patna for their Web support.
            </motion.p>
            <motion.p className="text-gray-700 leading-relaxed mb-6" variants={textChildVariants}>
              Website Development Services in Patna, <strong className="text-sky-600 font-semibold">app development</strong>, and{' '}
              <strong className="text-sky-600 font-semibold">SEO Services</strong>
            </motion.p>
            <motion.p className="text-gray-700 leading-relaxed mb-8" variants={textChildVariants}>
              To know more about your Web development needs for your venture for faster development, contact us for FREE Web Consulting. Hire Startup Web Support now for the best Website Development Services in Patna.
            </motion.p>

            <motion.button
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              variants={textChildVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Us
            </motion.button>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={imageVariants2}
          >
            <img
              src="/hero.jpg"
              alt="Business Value Illustration"
              className="w-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BusinessValue;