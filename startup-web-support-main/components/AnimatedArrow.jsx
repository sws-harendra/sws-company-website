"use client"
import { motion } from 'framer-motion';

const AnimatedArrow = () => {
  return (
    <div className="flex justify-center items-center">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-15 h-5 text-blue-600" // Tailwind classes
        
        animate={{
          x: [0, 10, 0], // 0 से 10px दाईं ओर, फिर वापस 0 पर
        }}
        transition={{
          duration: 1.5,           // एनीमेशन 1.5 सेकंड चलेगा
          ease: "easeInOut",       // स्मूथ स्टार्ट और एंड
          repeat: Infinity,        // एनीमेशन को अनंत बार दोहराएं
          repeatType: "loop",      // एनीमेशन को 0 से 10, फिर वापस 0 पर दोहराएं
        }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
      </motion.svg>
    </div>
  );
};

export default AnimatedArrow;