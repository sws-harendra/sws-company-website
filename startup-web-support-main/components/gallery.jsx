"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery({ images, heading }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6  min-h-screen">
      {" "}
      {heading && (
        <h3 className="mx-auto w-max text-xl p-3 font-bold">Gallery</h3>
      )}
      {/* --- GRID SECTION --- */}
      <div
        className="
          grid gap-4
          grid-cols-3 grid-rows-1
          auto-rows-[200px]
          grid-areas-gallery
        "
      >
        {images.map((img, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-2xl shadow-md group cursor-pointer gallery-item-${
              i + 1
            }`}
            onClick={() => setSelected(img)}
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 w-full bg-black/50 text-white text-sm py-2 px-3">
              {img.caption}
            </div>
          </div>
        ))}
      </div>
      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selected.src}
              alt={selected.caption}
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
