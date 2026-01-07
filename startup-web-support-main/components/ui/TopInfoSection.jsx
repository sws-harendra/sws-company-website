"use client";
import { motion } from "framer-motion";
import TopCard from "./TopCard";
import InfoCard from "./InfoCard";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

const TopInfoSection = () => {
  return (
    <section className="bg-[#1e88e5] py-24 mt-16">
      <div className="container mx-auto px-6 max-w-7xl">

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {TopCard.map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              desc={card.desc}
              variants={itemVariants}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default TopInfoSection;
