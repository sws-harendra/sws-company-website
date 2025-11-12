"use client";
import { motion } from "framer-motion";
import {
  bellShakeAnimation,
  cardContentVariants,
  cardVariants,
  gridContainerVariants,
  headerTextVariants,
  imageVariants,
} from "./GlobalCss";
import { IoBrowsers } from "react-icons/io5";

const servicesData = [
  {
    image: "website-development.png",
    title: "Website Development",
    description:
      "We craft responsive, high-performing websites that enhance your brand presence and deliver exceptional user experiences.",
  },
  {
    image: "app-development.png",
    title: "App Development",
    description:
      "We design and develop scalable mobile and web applications tailored to your business needs with modern technologies.",
  },
  {
    image: "ecommerce-website.png",
    title: "E-Commerce Website",
    description:
      "We build secure and user-friendly e-commerce websites that boost your online sales, streamline inventory, and deliver seamless shopping experiences.",
  },
  {
    image: "marketing.png",
    title: "Marketing Solutions",
    description:
      "Our marketing strategies are designed to boost your brand visibility and drive targeted growth.",
  },
  {
    image: "ads.png",
    title: "Premium Advertising",
    description:
      "Reach your ideal audience with our premium advertising solutions, crafted for maximum impact.",
  },
  {
    image: "design.png",
    title: "Designing Solutions",
    description:
      "Transform your ideas into stunning visuals with our innovative and creative design solutions.",
  },
];

const FeaturedServices = () => {
  return (
    <section className="relative py-20 bg-white font-sans overflow-hidden">
      {/* Decorative background circle */}
      {/* Outer colored gradient circle */}
      <div className="absolute right-[-19%] top-1/2 -translate-y-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-100 to-indigo-200  opacity-40" />
      {/* Solid color ring */}
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            variants={headerTextVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            Our Featured Services
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={headerTextVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.2 }}
          >
            We provide services that help in expanding your business worldwide,
            whether you are a start-up or big enterprise.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-4 gap-8"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
              variants={cardVariants}
            >
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                variants={imageVariants}
              >
                <motion.img
                  initial={{ rotate: [0] }}
                  whileHover={bellShakeAnimation}
                  whileTap={bellShakeAnimation}
                  src={service.image}
                  alt={service.title}
                  className="w-15 h-15 object-contain"
                />
              </motion.div>

              <motion.div className="text-left" variants={cardContentVariants}>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {service.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>{" "}
      <div className="absolute left-[0%] top-1/2 -translate-y-3/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-100 to-indigo-200  opacity-40" />
    </section>
  );
};

export default FeaturedServices;
