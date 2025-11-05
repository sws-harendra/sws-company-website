"use client"
import { motion } from 'framer-motion';

const page = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-md">
      <motion.div
        className="w-16 h-16 border-4 border-white border-t-blue-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ loop: Infinity, ease: 'linear', duration: 1 }}
      />
    </div>
  );
};

export default page;