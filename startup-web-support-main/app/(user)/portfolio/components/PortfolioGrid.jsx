"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoArrowForward,
  IoClose,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import Link from "next/link";
import portfolioService from "@/services/portfolio.service";

const PortfolioGrid = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Fetch paginated data
  const fetchPortfolios = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await portfolioService.getAll({ page, limit: 6 });
      if (data?.portfolios?.length) {
        setProjects((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newOnes = data.portfolios.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newOnes];
        });
        setHasMore(page < data.totalPages);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching portfolios:", err);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setImageLoaded(false);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
            Our Recent Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the innovative solutions and stunning designs we've crafted
            for our clients across various industries.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group cursor-pointer rounded-2xl bg-white shadow-lg border border-gray-200/60 overflow-hidden flex flex-col h-full transition-all duration-500 transform hover:shadow-2xl hover:-translate-y-3"
              // variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              onClick={() => openModal(project)}
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex flex-col flex-grow px-6 pt-2 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-gray-600 text-base leading-relaxed flex-grow mb-6 line-clamp-3">
                    {project.description}
                  </p>
                )}
                {project.redirect_url && (
                  <Link
                    href={project.redirect_url}
                    className="inline-flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group/link shadow-lg hover:shadow-xl"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-center">View Project</span>
                    {/* <IoArrowForward className="ml-2 transition-transform duration-300 group-hover/link:translate-x-1" /> */}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More / Status */}
        <div className="text-center mt-16">
          {loading && (
            <motion.div
              className="flex justify-center items-center space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600 font-medium">
                Loading amazing projects...
              </p>
            </motion.div>
          )}

          {!loading && hasMore && (
            <motion.button
              onClick={handleLoadMore}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Projects
            </motion.button>
          )}

          {!hasMore && projects.length > 0 && (
            <motion.p
              className="text-gray-500 text-lg mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              That's all for now! 🎉
            </motion.p>
          )}
        </div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-3/6 rounded-3xl overflow-hidden shadow-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <IoClose className="w-6 h-6 text-gray-900" />
              </button>

              {/* Image Container */}
              <div className="relative aspect-video max-h-[70vh] bg-gray-100">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <motion.img
                  src={selectedProject.image_url}
                  alt={selectedProject.title}
                  className="w-full h-full object-contain"
                  variants={imageVariants}
                  initial="hidden"
                  animate={imageLoaded ? "visible" : "hidden"}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              {/* Project Info */}
              <div className="px-8 bg-white text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedProject.title}
                </h3>
                {selectedProject.description && (
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>
                )}
                {selectedProject.redirect_url && (
                  <Link
                    href={selectedProject.redirect_url}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    target="_blank"
                  >
                    View Full Project
                    <IoArrowForward className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioGrid;
