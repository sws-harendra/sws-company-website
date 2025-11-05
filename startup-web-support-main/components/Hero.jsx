"use client"
import { motion } from 'framer-motion';
import { gridContainerVariants, textChildVariants } from './GlobalCss';

const BACKGROUND_VIDEO_URL = 'hero.mp4';

const HeroSection = () => {
  return (
    <section className="relative py-10 h-[95vh]  w-full flex items-center justify-center text-center overflow-hidden">
      <video
        className="absolute inset-0 object-cover w-full h-full -z-10"
        src={BACKGROUND_VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      <div className="relative z-10 text-white max-w-4xl px-6">
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter drop-shadow-lg"

            variants={textChildVariants}
          >
            Powering Innovation <br /> for a Digital Future
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl font-light max-w-2xl mx-auto drop-shadow-md"
            variants={textChildVariants}
          >
            We are your trusted partner in navigating the complex world of technology, delivering cutting-edge software solutions and digital experiences that drive growth and efficiency.
          </motion.p>

          <motion.div className="mt-10 space-x-4 space-y-4" variants={textChildVariants}>
            <motion.button
              className="bg-sky-800 hover:bg-sky-900 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Services
            </motion.button>
            <motion.button
              className="bg-transparent border border-white hover:bg-white hover:text-sky-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Get a Free Consultation
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;