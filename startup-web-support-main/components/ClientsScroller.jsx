"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { headerTextVariants } from "./GlobalCss";
import clientService from "@/services/client.service";

const ClientsScroller = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const data = await clientService.getAll();
      setClients(data || []);
    } catch (error) {
      console.error("Failed to load clients:", error);
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Duplicate for seamless infinite scrolling
  const duplicatedClients = [...clients, ...clients];

  // Animation for continuous horizontal scroll
  const scrollerVariants = {
    animate: {
      x: [0, -1 * (224 * clients.length)],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: Math.max(clients.length * 4, 8), // at least some duration
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="py-24 bg-white font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={headerTextVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Few of our clients who trust us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            This team not only took the time to explain key concepts to us but
            acted as true partners through the entire process.
          </p>
        </motion.div>

        {/* Clients Scroller */}
        <div className="w-full overflow-hidden relative">
          {/* Gradient edges */}
          <div className="absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-slate-50 to-transparent" />
          <div className="absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-slate-50 to-transparent" />

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-8 text-gray-500"></div>
          ) : (
            <motion.div
              className="flex gap-16"
              variants={scrollerVariants}
              animate="animate"
            >
              {duplicatedClients.map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-40 h-24 flex items-center justify-center"
                >
                  <img
                    src={client.logo}
                    alt={client.brandName}
                    className="max-w-full max-h-full object-contain transition-all duration-300 cursor-pointer"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientsScroller;
