"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  IoFlashOutline,
  IoPricetagOutline,
  IoTrendingUpOutline,
  IoBuildOutline,
} from "react-icons/io5";
import {
  gridContainerVariants,
  headerTextVariants,
  imageVariants2,
  textChildVariants,
} from "@/components/GlobalCss";
import ContactUs from "@/components/ContactUs";

const keyBenefits = [
  {
    icon: IoBuildOutline,
    title: "Simplify Operations",
  },
  {
    icon: IoFlashOutline,
    title: "Improve Performance",
  },
  {
    icon: IoPricetagOutline,
    title: "Cut Costs",
  },
  {
    icon: IoTrendingUpOutline,
    title: "Encourage Growth",
  },
];

const SoftwareBenefits = () => {
  return (
    <section className="bg-white text-gray-800 py-16 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={imageVariants2}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-sky-500/10 rounded-full blur-3xl"></div>
              <ContactUs page="software-development" />

              {/* <img
                src="software.jpg"
                alt="Software Development"
                className="relative w-full h-auto rounded-lg"
              /> */}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={gridContainerVariants}
          >
            <motion.p
              className="text-sm font-semibold uppercase tracking-wider text-sky-600 mb-2"
              variants={textChildVariants}
            >
              Benefits
            </motion.p>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
              variants={headerTextVariants}
            >
              Software Development Company in Patna
            </motion.h2>

            <motion.p
              className="text-gray-600 text-lg leading-relaxed mb-8"
              variants={textChildVariants}
            >
              Our organization specializes in developing unique solutions that
              greatly improve corporate performance. Using the newest technology
              helps us create programs meant to simplify your operations so your
              staff may concentrate on main business activities.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              variants={gridContainerVariants}
            >
              {keyBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white p-5 rounded-lg shadow-md border border-gray-100"
                    variants={textChildVariants}
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-sky-100 p-3 rounded-full">
                        <Icon className="text-2xl text-sky-600" />
                      </div>
                      <span className="font-semibold text-gray-800">
                        {benefit.title}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SoftwareBenefits;
