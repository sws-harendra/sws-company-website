"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import InfoModal from "./InfoModel";

export default function InfoCard({ title, desc, variants }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <motion.div
        variants={variants}
        whileHover={{ y: -8, scale: 1.03 }}
        className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-3">{title}</h3>

        {/* Short Text */}
        <p className="text-sm text-slate-200 mb-4">
          {desc.slice(0, 120)}...
        </p>

        {/* Read More */}
        <button
          onClick={() => setOpen(true)}
          className="text-sm font-semibold text-cyan-300 hover:text-cyan-400 transition"
        >
          Read More →
        </button>
      </motion.div>

      {/* POPUP */}
      <InfoModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        desc={desc}
      />
    </>
  );
}
