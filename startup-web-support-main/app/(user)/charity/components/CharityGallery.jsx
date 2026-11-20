"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Heart,
  Video as VideoIcon,
} from "lucide-react";
import charityService from "@/services/charity.service";
import {
  resolveCharityMedia,
  getYouTubeEmbedUrl,
  getVimeoEmbedUrl,
} from "@/lib/videoUtils";

export default function CharityGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchCharityMedia = async () => {
      try {
        setLoading(true);
        const data = await charityService.getAll({ page: 1, limit: 100 });
        setItems(data.charities || []);
      } catch (error) {
        console.error("Failed to fetch charity media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharityMedia();
  }, []);

  const activeItem = selectedIndex !== null ? items[selectedIndex] : null;
  const activeMedia = activeItem ? resolveCharityMedia(activeItem) : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % items.length);
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, items.length]);

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Simple, Basic Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            Our Charity Work
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Giving Back to Society
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Moments, initiatives, and community impact driven by Startup Web
            Support.
          </p>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-rose-500/20 border-t-rose-500 animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <ImageIcon className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-2" />
            <p className="text-base font-semibold text-zinc-700 dark:text-zinc-300">
              No charity photos or videos uploaded yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-6">
            {items.map((item, idx) => {
              const {
                isVideo,
                videoUrl,
                thumbnailUrl,
                isDirectVideo,
              } = resolveCharityMedia(item);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  onClick={() => setSelectedIndex(idx)}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {/* Thumbnail / Video Preview */}
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback to video element if image load fails
                        if (isDirectVideo && videoUrl) {
                          e.currentTarget.style.display = "none";
                          const vid = e.currentTarget.nextElementSibling;
                          if (vid) vid.style.display = "block";
                        }
                      }}
                    />
                  ) : null}

                  {/* Fallback Direct Video Frame when no image thumbnail is set */}
                  {(!thumbnailUrl || isDirectVideo) && videoUrl && (
                    <video
                      src={videoUrl}
                      preload="metadata"
                      muted
                      playsInline
                      style={{ display: thumbnailUrl ? "none" : "block" }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    />
                  )}

                  {!thumbnailUrl && !videoUrl && (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-800 text-zinc-400 p-4 text-center">
                      {isVideo ? (
                        <VideoIcon className="w-10 h-10 mb-2 text-rose-500" />
                      ) : (
                        <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                      )}
                      <span className="text-xs font-medium text-zinc-300 line-clamp-1">
                        {item.title}
                      </span>
                    </div>
                  )}

                  {/* Video Play Badge */}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-rose-600 transition-all shadow-lg">
                        <Play className="w-5 h-5 ml-0.5 fill-white" />
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay & Caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white pointer-events-none">
                    <h3 className="text-sm sm:text-base font-bold line-clamp-1 drop-shadow-sm">
                      {item.title}
                    </h3>
                    {(item.location || item.date) && (
                      <div className="flex items-center gap-3 text-xs text-zinc-300 mt-1">
                        {item.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-rose-400" />
                            {item.location}
                          </span>
                        )}
                        {item.date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-amber-400" />
                            {item.date}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox / Details Modal */}
      <AnimatePresence>
        {activeItem && activeMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 z-10 my-auto flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Display (Photo or Video) */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                {activeMedia.isVideo && activeMedia.videoUrl ? (
                  activeMedia.isYouTube ? (
                    <iframe
                      src={getYouTubeEmbedUrl(activeMedia.videoUrl)}
                      title={activeItem.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : activeMedia.isVimeo ? (
                    <iframe
                      src={getVimeoEmbedUrl(activeMedia.videoUrl)}
                      title={activeItem.title}
                      className="w-full h-full border-0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      controls
                      autoPlay
                      src={activeMedia.videoUrl}
                      poster={activeMedia.thumbnailUrl || undefined}
                      className="w-full h-full object-contain"
                    />
                  )
                ) : (
                  <img
                    src={activeMedia.thumbnailUrl || activeItem.image_url}
                    alt={activeItem.title}
                    className="w-full h-full object-contain"
                  />
                )}

                {/* Left / Right Navigation */}
                {items.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIndex(
                          (prev) => (prev - 1 + items.length) % items.length
                        );
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-all"
                      title="Previous"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIndex((prev) => (prev + 1) % items.length);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-all"
                      title="Next"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Details Section */}
              <div className="p-5 sm:p-6 overflow-y-auto">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                    {activeItem.title}
                  </h2>
                  <span className="text-xs text-zinc-400">
                    {selectedIndex + 1} of {items.length}
                  </span>
                </div>

                {(activeItem.location || activeItem.date) && (
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    {activeItem.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        {activeItem.location}
                      </span>
                    )}
                    {activeItem.date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        {activeItem.date}
                      </span>
                    )}
                  </div>
                )}

                {activeItem.description && (
                  <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                    {activeItem.description}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
