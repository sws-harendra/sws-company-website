"use client"
import { motion } from 'framer-motion';
import { BsArrowRightCircle } from 'react-icons/bs';

const AboutUs = () => {

  const imageVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', duration: 1.5 },
    },
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const textItemVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 50 },
    },
  };

  return (
    <section className="bg-[#1e88e5] py-5 md:py-10 text-white font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <img
              src="/about.jpg"
              alt="IT Solutions Illustration"
              className="w-full h-auto object-contain rounded-xl"
            />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center text-left"
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.p
              className="text-sm font-semibold uppercase tracking-wider text-blue-200"
              variants={textItemVariants}
            >
              About Us
            </motion.p>

            <motion.h2
              className="text-4xl md:text-5xl font-bold mt-2 leading-tight"
              variants={textItemVariants}
            >
              What do we provide?
            </motion.h2>

            <motion.p
              className="mt-6 text-lg text-blue-100 leading-relaxed"
              variants={textItemVariants}
            >
              As the <strong>best IT company in Patna</strong>, we provide comprehensive
              IT solutions, including software development, network security,
              and cloud services. Our team of experts is dedicated to
              delivering innovative and customized technology solutions
              that drive your business forward. With us, you can experience
              seamless integration and exceptional support for all your IT
              needs.
            </motion.p>

            <motion.div variants={textItemVariants} className="mt-8">
              <motion.button
                className="bg-gray-900/40 hover:bg-gray-900/60 text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-3 transition-all duration-300"
                whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
                whileTap={{ scale: 0.95 }}
              >
                Read More
                <BsArrowRightCircle className="text-xl" />
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;