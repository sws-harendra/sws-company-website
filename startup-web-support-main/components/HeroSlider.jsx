"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const heroSlides = [
  {
    id: 1,
    image: '/hero.png', 
    heading: 'Custom Software Development',
    subheading: 'We build scalable and secure software solutions that solve your unique business challenges and drive efficiency.',
    button1Text: 'Explore Services',
    button2Text: 'Request a Quote',
  },
  {
    id: 2,
    image: '/hero.jpg',
    heading: 'Dynamic Web Presence',
    subheading: 'From corporate websites to high-performance web applications, we create digital experiences that captivate your audience.',
    button1Text: 'View Portfolio',
    button2Text: 'Learn More',
  },
  {
    id: 3,
    image: '/mobile-app.jpg',
    heading: 'Engaging Mobile Applications',
    subheading: 'Our expert team brings your vision to life with native and cross-platform mobile apps that are intuitive and user-friendly.',
    button1Text: 'Our Process',
    button2Text: 'Consult an Expert',
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[currentSlide];

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative w-full py-10 md:h-[88vh] h-[60vh] flex items-center justify-center text-center overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={slide.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <img
            src={slide.image}
            alt={slide.heading}
            className="object-cover w-full h-full brightness-50"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute  bg-black/50"></div>

      <div className="relative z-10 text-white max-w-5xl px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.h1
              className="text-4xl md:text-7xl font-extrabold leading-tight tracking-tighter drop-shadow-lg"
              variants={itemVariants}
            >
              {slide.heading}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-xl font-light max-w-3xl mx-auto drop-shadow-md"
              variants={itemVariants}
            >
              {slide.subheading}
            </motion.p>
      

            <motion.div className="mt-10 flex justify-center items-center md:gap-4 gap-2" variants={itemVariants}>
              <Link
                href="#"
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold md:py-3 md:px-8 px-3 py-2 rounded-full shadow-lg transition-all duration-300"
              >
                {slide.button1Text}
              </Link>
              <Link
                href="#"
                className="bg-transparent border border-white hover:bg-white hover:text-sky-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
              >
                {slide.button2Text}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;