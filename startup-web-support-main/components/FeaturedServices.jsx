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
import { useState } from "react";

const servicesData = [
  {
    image: "website-development.png",
    title: "Website Development",
    description:
      "As a reliable web development company in Bihar, Startup Web Support provides custom web development services which are quick and responsive. We aim at boosting conversions which helps our clients create a strong digital presence for their business.",
  },
  {
    image: "app-development.png",
    title: "App Development",
    description:
      "We are a mobile app development company in India and a reliable app development agency. We build safe, secure and scalable mobile and web applications tailored to meet client’s business needs.",
  },
  {
    image: "ecommerce-website.png",
    title: "E-Commerce Website",
    description:
      "Our software development company creates fast e-commerce platforms. We offer secure payment gateway, efficient inventory management, and smooth user experiences.",
  },
  {
    image: "marketing.png",
    title: "Marketing Solutions",
    description:
      "As a digital marketing agency in Patna, we help businesses grow through SEO (search engine optimization), paid advertising, and performance marketing strategies.",
  },
  {
    image: "ads.png",
    title: "Premium Advertising",
    description:
      "We have a specialized team which analyse the demand and gives best advertising solutions that helps our clients connect with the right audience and boost their sales through data-driven campaigns.",
  },
  {
    image: "design.png",
    title: "Designing Solutions",
    description:
      "We make effective UI/UX and attractive designs that increase branding and user engagement across platforms.",
  },
];

const FeaturedServices = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Background Circles */}
      <div className="absolute right-[-20%] top-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-100 to-indigo-200 opacity-40" />
      <div className="absolute left-[-20%] bottom-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-100 to-indigo-200 opacity-40" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            variants={headerTextVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Our Featured Services
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            variants={headerTextVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We are an IT company in Patna that delivers powerful digital solutions
            to help businesses grow globally with scalable and innovative
            technology.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              layout
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              variants={cardVariants}
            >
              {/* Icon */}
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                variants={imageVariants}
              >
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-14 h-14 object-contain"
                  whileHover={bellShakeAnimation}
                />
              </motion.div>

              {/* Content */}
              <motion.div
                layout
                className="flex flex-col flex-grow text-left"
                variants={cardContentVariants}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>

                <p
                  className={`text-gray-600 text-sm leading-relaxed transition-all duration-300
                    ${expandedIndex === index ? "" : "line-clamp-4"}
                  `}
                >
                  {service.description}
                </p>

                {service.description.length > 120 && (
                  <button
                    onClick={() =>
                      setExpandedIndex(
                        expandedIndex === index ? null : index
                      )
                    }
                    className="mt-3 text-blue-600 font-medium hover:underline self-start"
                  >
                    {expandedIndex === index ? "Read Less" : "Read More"}
                  </button>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;
