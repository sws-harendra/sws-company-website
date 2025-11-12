"use client";
import { motion } from "framer-motion";
import { FaRocket, FaMobileAlt, FaCheckCircle, FaUsers } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import {
  gridContainerVariants,
  textChildVariants,
} from "@/components/GlobalCss";
import { buttonVariants } from "@/components/ui/button";
import ContactUs from "@/components/ContactUs";

const statsData = [
  {
    icon: FaRocket,
    endValue: 10,
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: FaMobileAlt,
    endValue: 1200,
    suffix: "+",
    label: "Apps Developed",
  },
  {
    icon: FaCheckCircle,
    endValue: 100,
    suffix: "%",
    label: "Projects Delivered",
  },
  {
    icon: FaUsers,
    endValue: 100,
    suffix: "%",
    label: "Client Satisfaction",
  },
];

const AppDevHero = () => {
  return (
    <section className="bg-white ">
      <div className="container mx-auto px-6 max-w-7xl pt-10 pb-12">
        <motion.div className="text-center" variants={gridContainerVariants}>
          <motion.p
            className="text-sm font-semibold uppercase tracking-wider text-sky-600 mb-2"
            variants={textChildVariants}
          >
            Welcome to
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-sky-900"
            variants={textChildVariants}
          >
            Startup Web Support
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto mt-4"
            variants={textChildVariants}
          >
            Want to get a mobile application according to your needs? SWS is
            here to help you get the best options ensuring that you get all the
            latest features.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
          <motion.div variants={gridContainerVariants}>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              variants={textChildVariants}
            >
              A Pioneer in Mobile App Development Services in Patna
            </motion.h2>
            <motion.p
              className="text-gray-600 leading-relaxed mb-8"
              variants={textChildVariants}
            >
              If you are looking for Mobile App Development Services in Patna,
              Bihar then you are now at the correct spot. At Startup Web
              Support, we offer cost-efficient Mobile App Development services.
            </motion.p>
            <motion.div variants={buttonVariants}>
              <motion.button
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-3 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read More <FiArrowRight />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", duration: 0.8 }}
          > */}
          <ContactUs page="mobile-app-development-services-in-patna" />
          {/* <img
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Team discussing a project"
              className="rounded-lg shadow-2xl"
            /> */}
          {/* </motion.div> */}
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={gridContainerVariants}
          >
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={textChildVariants}
                >
                  <Icon className="text-4xl text-sky-500 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium mt-2">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppDevHero;
