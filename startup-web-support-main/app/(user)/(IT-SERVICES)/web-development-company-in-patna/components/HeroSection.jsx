"use client"
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textChildVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const imageVariants2 = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 80, duration: 1.5 },
    },
  };

  return (
    <section className="bg-white text-gray-800 min-h-screen flex items-center py-20 lg:py-0 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex items-center bg-slate-100 rounded-full p-1 mb-6"
              variants={textChildVariants}
            >
              <span className="bg-sky-600 text-white text-xs font-semibold rounded-full px-3 py-1">
                Best
              </span>
              <span className="text-gray-700 text-sm font-medium ml-3 mr-2">
                Website Development Services in Patna
              </span>
            </motion.div>

            <motion.h1
              className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight"
              variants={textChildVariants}
            >
              <span className="block text-2xl md:text-3xl text-gray-600">Leading Web Development Company in Patna.</span>
              Web Development Company In Patna, Bihar Trusted by 2000+ Clients
            </motion.h1>

            <motion.p
              className="mt-6 text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
              variants={textChildVariants}
            >
              Looking for the best Web Development Company in Patna for your venture? Step up and use Startup Web Support - the best Web Development Company in Patna, Bihar for the best Website development, app development, and digital marketing at the best available prices.
            </motion.p>

            <motion.div
              className="mt-8 flex items-center justify-center lg:justify-start gap-4"
              variants={textChildVariants}
            >
              <motion.button
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                FREE Quote!
                <FaArrowRight size={12} />
              </motion.button>

              <span className="text-gray-500 font-semibold">OR</span>

              <motion.button
                className="bg-transparent hover:bg-slate-100 text-sky-600 font-bold py-3 px-6 rounded-lg border-2 border-sky-600 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Our Packages
              </motion.button>
            </motion.div>
          </motion.div>

          <div className="flex justify-center lg:justify-end">
            <motion.img
              variants={imageVariants2}
              initial="hidden"
              animate="visible"
              src="/web.jpg"
              alt="Business Value Illustration"
              className="w-full object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;