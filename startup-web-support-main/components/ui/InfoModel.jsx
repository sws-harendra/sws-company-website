"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function InfoModal({ open, onClose, title, desc }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Modal Box */}
        <motion.div
          className="bg-white max-w-2xl w-full rounded-2xl p-6 relative"
          initial={{ scale: 0.9, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 40 }}
          transition={{ type: "spring", stiffness: 120 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button onClick={onClose}
            className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-red-500">
            ✕
          </button>

          {/* Title */}
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            {title}
          </h3>

          {/* Description */}
          <div style={{whiteSpace:"pre-line"}} className="text-gray-600 text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
            {desc}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
