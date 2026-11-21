"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import blogService from "@/services/blog.service";
import {
  MapPin,
  Search,
  ArrowLeft,
  Calendar,
  User,
  BookOpen,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// Canonical formatting helper for location strings (e.g. "patna" -> "Patna")
function normalizeLocation(loc) {
  if (!loc || typeof loc !== "string") return "";
  return loc
    .trim()
    .split(",")
    .map((seg) =>
      seg
        .trim()
        .split(/\s+/)
        .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : ""))
        .filter(Boolean)
        .join(" ")
    )
    .filter(Boolean)
    .join(", ");
}

function LocationBlogsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlLocation = searchParams.get("location") || "";

  const [allLocationBlogs, setAllLocationBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(
    urlLocation ? urlLocation.trim().toLowerCase() : "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Sync state if urlLocation changes
  useEffect(() => {
    if (urlLocation) {
      setSelectedLocation(urlLocation.trim().toLowerCase());
    } else {
      setSelectedLocation("all");
    }
  }, [urlLocation]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await blogService.getAll();
        // Only blogs with is_location_blog enabled and published
        const locationPosts = (data || []).filter(
          (b) => b.status === "published" && b.is_location_blog
        );
        setAllLocationBlogs(locationPosts);
      } catch (err) {
        console.error("Failed to load location blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Group unique locations case-insensitively
  const locationStats = useMemo(() => {
    const map = new Map();

    allLocationBlogs.forEach((post) => {
      const raw = post.location;
      if (!raw || !raw.trim()) return;

      const key = raw.trim().toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          key,
          name: normalizeLocation(raw),
          count: 0,
        });
      }
      map.get(key).count += 1;
    });

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [allLocationBlogs]);

  // Handle location pill click
  const handleSelectLocation = (key) => {
    setSelectedLocation(key);
    if (key === "all") {
      router.push("/blog/locations", { scroll: false });
    } else {
      router.push(`/blog/locations?location=${encodeURIComponent(key)}`, {
        scroll: false,
      });
    }
  };

  // Filter posts based on selected location and search query
  const filteredBlogs = useMemo(() => {
    return allLocationBlogs.filter((post) => {
      const postLocKey = (post.location || "").trim().toLowerCase();

      // Location match
      const matchesLocation =
        selectedLocation === "all" || postLocKey === selectedLocation;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title?.toLowerCase().includes(query) ||
        post.short_description?.toLowerCase().includes(query) ||
        (post.location && post.location.toLowerCase().includes(query));

      return matchesLocation && matchesSearch;
    });
  }, [allLocationBlogs, selectedLocation, searchQuery]);

  const activeLocationObj = locationStats.find(
    (l) => l.key === selectedLocation
  );

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 md:py-16 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Top Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to General Blog
          </Link>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
            📍 City & Regional Articles
          </span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-700 font-medium text-xs mb-4 border border-sky-200 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            <span>Targeted Local SEO & Growth Insights</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Browse Blogs by Location
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Discover localized web development, software solutions, and digital
            growth strategies crafted for your specific city and market.
          </p>
        </div>

        {/* Location Filter & Search Bar Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/80 mb-10 space-y-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
              <SlidersHorizontal className="w-4 h-4 text-sky-600" />
              <span>Select Location:</span>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search by topic or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Interactive Location Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
            <button
              onClick={() => handleSelectLocation("all")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedLocation === "all"
                  ? "bg-gradient-to-r from-[#1a4468] to-[#029bd2] text-white shadow-md shadow-sky-500/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
              }`}
            >
              <span>All Locations</span>
              <span
                className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedLocation === "all"
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {allLocationBlogs.length}
              </span>
            </button>

            {locationStats.map((loc) => {
              const isActive = selectedLocation === loc.key;
              return (
                <button
                  key={loc.key}
                  onClick={() => handleSelectLocation(loc.key)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#1a4468] to-[#029bd2] text-white shadow-md shadow-sky-500/20"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  <MapPin className={`w-3 h-3 ${isActive ? "text-white" : "text-sky-600"}`} />
                  <span>{loc.name}</span>
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {loc.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Location Indicator */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Showing:</span>
            <span className="font-bold text-gray-900">
              {activeLocationObj ? activeLocationObj.name : "All Locations"}
            </span>
            <span className="text-gray-400">&bull;</span>
            <span className="text-xs font-medium text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
              {filteredBlogs.length}{" "}
              {filteredBlogs.length === 1 ? "article" : "articles"} found
            </span>
          </div>

          {selectedLocation !== "all" && (
            <button
              onClick={() => handleSelectLocation("all")}
              className="text-xs font-semibold text-sky-600 hover:underline cursor-pointer"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-gray-500">Loading location blogs...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredBlogs.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center max-w-lg mx-auto shadow-xs">
            <MapPin className="w-12 h-12 text-sky-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              No Location Blogs Found
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {selectedLocation !== "all"
                ? `There are no articles available for "${
                    activeLocationObj?.name || selectedLocation
                  }" yet.`
                : "No location-based articles have been published yet."}
            </p>
            <button
              onClick={() => {
                setSelectedLocation("all");
                setSearchQuery("");
                router.push("/blog/locations");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white transition-all shadow-md cursor-pointer"
            >
              View All Locations
            </button>
          </div>
        )}

        {/* Blog Cards Grid */}
        {!loading && filteredBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-200/80 overflow-hidden flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1.5"
              >
                {/* Featured Image */}
                <Link
                  href={`/${post.slug}`}
                  className="block relative aspect-video overflow-hidden bg-gray-100"
                >
                  <Image
                    src={post.image_url || "/placeholder.png"}
                    alt={post.title}
                    width={600}
                    height={380}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {post.location && (
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#1a4468] shadow-md flex items-center gap-1.5 border border-sky-100">
                      <MapPin className="w-3.5 h-3.5 text-[#029bd2]" />
                      <span>{normalizeLocation(post.location)}</span>
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1 font-medium text-sky-700">
                      <User className="w-3 h-3" />
                      {post.author || "SWS Team"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(
                        post.published_at || post.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors line-clamp-2 mb-3">
                    <Link href={`/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* Short description */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {post.short_description || "Read full article to learn more."}
                  </p>

                  {/* CTA link */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <Link
                      href={`/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 group-hover:text-sky-700 transition-all"
                    >
                      <span>Read Full Article</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    {post.location && (
                      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        {normalizeLocation(post.location)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LocationBlogsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin"></div>
        </div>
      }
    >
      <LocationBlogsContent />
    </Suspense>
  );
}
