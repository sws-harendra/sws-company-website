"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';

const industriesData = [
  { icon: "realstate.png", name: 'Real estate' },
  { icon: "education.png", name: 'Education' },
  { icon: "healthcare.png", name: 'Healthcare' },
  { icon: "hospitality.png", name: 'Hospitality' },
  { icon: "finance.png", name: 'Finance' },
  { icon: "transport.png", name: 'Transport' },
  { icon: "ecomerce.png", name: 'eCommerce' },
  { icon: "event.png", name: 'Event' },
];

const IndustriesSection = () => {

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="bg-[#1e88e5] py-24 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">

        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.p
            className="text-sm font-semibold uppercase tracking-wider text-slate-100 mb-2"
            variants={itemVariants}
          >
            We Have Worked Across Multiple Industries
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white"
            variants={itemVariants}
          >
            Industries We Serve
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
        >
          {industriesData.map((industry, index) => {
            return (
              <motion.div
                key={index}
                className="group bg-sky-700 p-6 rounded-xl flex flex-col items-center justify-center gap-4 border border-sky-700 cursor-pointer transition-all duration-300"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  backgroundColor: '#082f49', // sky-900
                  borderColor: '#22d3ee', // cyan-400
                  transition: { type: 'spring', stiffness: 300 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-semibold text-slate-300 group-hover:text-white transition-colors text-center text-sm">
                  <img
                    src={industry.icon} alt="industry.img" />
                  <p>{industry.name}</p>
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;