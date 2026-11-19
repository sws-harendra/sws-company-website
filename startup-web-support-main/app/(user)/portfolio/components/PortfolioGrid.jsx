"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  Search,
  CheckCircle2,
  ArrowRight,
  Eye,
  Loader2,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import portfolioService from "@/services/portfolio.service";
import { openWhatsApp } from "@/lib/whatsapp";

// Fallback portfolio showcase items if database has no records
const defaultProjects = [
  {
    id: "proj-1",
    title: "HealthSync Hospital ERP",
    category: "Healthcare & ERP",
    image_url: "/hms/dashboard-web.png",
    description:
      "Enterprise healthcare platform managing 500+ beds, OPD queues, electronic health records, and multi-department billing in real time.",
    redirect_url: "/hms",
  },
  {
    id: "proj-2",
    title: "UrbanCart Multi-Vendor Platform",
    category: "E-Commerce",
    image_url: "/ecommerce/hero-section.png",
    description:
      "Modern marketplace featuring real-time inventory synchronization, instant payment gateway checkouts, and vendor dashboards.",
    redirect_url: "/ecommerce",
  },
  {
    id: "proj-3",
    title: "CityRide On-Demand Cab App",
    category: "Mobile Apps",
    image_url: "/cab-booking/homepage.jpeg",
    description:
      "Real-time driver dispatch application with live GPS navigation, dynamic surge pricing algorithms, and seamless digital wallets.",
    redirect_url: "/cab-booking",
  },
  {
    id: "proj-4",
    title: "MediLab Pathology Suite",
    category: "Healthcare & ERP",
    image_url: "/pathology/product-demo.png",
    description:
      "Automated clinical pathology system generating instant QR-verified lab reports, barcode sample tracking, and SMS notifications.",
    redirect_url: "/pathology",
  },
  {
    id: "proj-5",
    title: "EduVibe Interactive LMS",
    category: "EdTech",
    image_url: "/website_hero.jpg",
    description:
      "Scalable e-learning portal serving 20k+ concurrent students with live streaming classes, automated quizzes, and student portals.",
    redirect_url: "#",
  },
  {
    id: "proj-6",
    title: "FinTrack Corporate ERP",
    category: "FinTech & ERP",
    image_url: "/software.jpg",
    description:
      "Automated GST-compliant invoicing, payroll management, and expense auditing software built for enterprise operations.",
    redirect_url: "#",
  },
  {
    id: "proj-7",
    title: "QuickCommerce Delivery Network",
    category: "Mobile Apps",
    image_url: "/mobile-app.jpg",
    description:
      "Sub-15 minute grocery fulfillment mobile application with micro-warehouse routing and live driver telemetry.",
    redirect_url: "#",
  },
  {
    id: "proj-8",
    title: "ApexStore POS & Inventory",
    category: "E-Commerce",
    image_url: "/ecommerce/inventory.png",
    description:
      "Cloud POS and inventory control suite synchronizing physical retail barcode scanners with online storefronts.",
    redirect_url: "/ecommerce",
  },
  {
    id: "proj-9",
    title: "SmartDoctor Telehealth OPD",
    category: "Healthcare & ERP",
    image_url: "/hms/doctor.png",
    description:
      "HIPAA-compliant video consultation platform connecting patients with specialist doctors, digital prescriptions, and follow-ups.",
    redirect_url: "/hms",
  },
  {
    id: "proj-10",
    title: "SwiftPark Smart Mobility",
    category: "Mobile Apps",
    image_url: "/cab-booking/parking-assit.jpeg",
    description:
      "Automated vehicle parking reservation system featuring live sensor space detection and contactless payment scanning.",
    redirect_url: "/cab-booking",
  },
  {
    id: "proj-11",
    title: "PharmaCare Supply Chain",
    category: "Healthcare & ERP",
    image_url: "/hms/medicine.png",
    description:
      "Batch tracking, expiry management, and wholesale distributor ordering system for multi-chain pharmacies.",
    redirect_url: "/hms",
  },
  {
    id: "proj-12",
    title: "EliteWear Fashion Store",
    category: "E-Commerce",
    image_url: "/ecommerce/showcase.png",
    description:
      "Ultra-fast Next.js storefront engineered for high conversion rates with visual product configurators and 3D previews.",
    redirect_url: "/ecommerce",
  },
];

const categories = [
  "All",
  "Healthcare & ERP",
  "E-Commerce",
  "Mobile Apps",
  "EdTech",
  "FinTech & ERP",
  "Web Development",
];

// Intelligently infer category if backend records lack an explicit category
const getProjectCategory = (item) => {
  if (item.category && item.category.trim() !== "") return item.category;
  const text = `${item.title || ""} ${item.description || ""}`.toLowerCase();
  if (
    text.includes("health") ||
    text.includes("hospital") ||
    text.includes("doctor") ||
    text.includes("pathology") ||
    text.includes("medical") ||
    text.includes("clinic") ||
    text.includes("hms")
  ) {
    return "Healthcare & ERP";
  }
  if (
    text.includes("shop") ||
    text.includes("ecom") ||
    text.includes("cart") ||
    text.includes("store") ||
    text.includes("retail") ||
    text.includes("pos")
  ) {
    return "E-Commerce";
  }
  if (
    text.includes("app") ||
    text.includes("mobile") ||
    text.includes("cab") ||
    text.includes("ride") ||
    text.includes("ios") ||
    text.includes("android")
  ) {
    return "Mobile Apps";
  }
  if (
    text.includes("edu") ||
    text.includes("school") ||
    text.includes("learn") ||
    text.includes("student") ||
    text.includes("college") ||
    text.includes("academy") ||
    text.includes("lms")
  ) {
    return "EdTech";
  }
  if (
    text.includes("finance") ||
    text.includes("bank") ||
    text.includes("tax") ||
    text.includes("audit") ||
    text.includes("invoice") ||
    text.includes("gst") ||
    text.includes("erp") ||
    text.includes("billing")
  ) {
    return "FinTech & ERP";
  }
  return "Web Development";
};

const PortfolioGrid = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch paginated portfolios from database
  const loadPortfolios = useCallback(async (pageNum = 1) => {
    setLoading(true);
    try {
      const limit = 15;
      const data = await portfolioService.getAll({ page: pageNum, limit });

      let fetchedList = [];
      let totalPages = 1;
      let totalItems = 0;

      if (Array.isArray(data)) {
        fetchedList = data;
        totalItems = data.length;
        totalPages = Math.ceil(data.length / limit) || 1;
      } else if (Array.isArray(data?.portfolios)) {
        fetchedList = data.portfolios;
        totalItems = data.totalItems || data.total || data.count || 0;
        totalPages = data.totalPages || Math.ceil(totalItems / limit) || 1;
      } else if (Array.isArray(data?.data)) {
        fetchedList = data.data;
        totalItems = data.totalItems || data.total || 0;
        totalPages = data.totalPages || Math.ceil(totalItems / limit) || 1;
      }

      if (fetchedList.length > 0) {
        setProjects((prev) => {
          if (pageNum === 1) {
            return fetchedList;
          }
          const existingIds = new Set(
            prev.map((p) => String(p.id || p._id || p.title))
          );
          const newItems = fetchedList.filter(
            (p) => !existingIds.has(String(p.id || p._id || p.title))
          );
          return [...prev, ...newItems];
        });

        // Determine if there are more pages
        const moreAvailable =
          pageNum < totalPages || fetchedList.length === limit;
        setHasMore(moreAvailable);
      } else {
        if (pageNum === 1) {
          setProjects(defaultProjects);
        }
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching portfolios:", err);
      if (pageNum === 1) {
        setProjects(defaultProjects);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPortfolios(1);
  }, [loadPortfolios]);

  // Load More button handler
  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadPortfolios(nextPage);
  };

  // Filter projects by category and search term
  const filteredProjects = useMemo(() => {
    const list = projects.length > 0 ? projects : defaultProjects;

    return list.filter((item) => {
      const itemCategory = getProjectCategory(item);
      const matchesCategory =
        activeCategory === "All" ||
        itemCategory.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        itemCategory.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <section className="bg-slate-50/70 py-10 sm:py-16 font-sans text-slate-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* =======================================================================
            CONTROLS BAR: CATEGORY TABS & SEARCH
           ======================================================================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-10">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#009CDE] text-white shadow-[0_4px_14px_rgba(0,156,222,0.35)] scale-105"
                      : "bg-white text-slate-600 hover:text-[#009CDE] hover:bg-sky-50 border border-slate-200/90 shadow-2xs"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box & Project Count */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-full bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-[#009CDE] transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600 shadow-2xs whitespace-nowrap">
              <span>{filteredProjects.length} Projects</span>
            </div>
          </div>
        </div>

        {/* =======================================================================
            PORTFOLIO GRID
           ======================================================================= */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8">
            <p className="text-lg font-bold text-slate-700">No projects found</p>
            <p className="text-sm text-slate-500 mt-1">
              Try adjusting your search query or switching categories.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2 rounded-full bg-[#009CDE] text-white text-xs font-bold hover:bg-[#0086bf] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => {
              const projectCategory = getProjectCategory(project);

              return (
                <motion.div
                  key={project.id || project.title}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => openModal(project)}
                  className="group relative bg-white rounded-[26px] overflow-hidden border border-slate-200/80 shadow-[0_10px_30px_-6px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-8px_rgba(0,156,222,0.2)] hover:border-[#009CDE]/80 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Screenshot Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      unoptimized
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-white/95 text-slate-900 font-bold text-xs shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-3.5 h-3.5 text-[#009CDE]" />
                        <span>View Details</span>
                      </span>
                    </div>

                    {/* Category Pill */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[10px] font-bold text-[#009CDE] bg-white/95 border border-sky-200/80 px-2.5 py-0.5 rounded-full shadow-2xs backdrop-blur-md">
                        {projectCategory}
                      </span>
                    </div>
                  </div>

                  {/* Info Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-[#009CDE] transition-colors tracking-tight line-clamp-1 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 font-normal">
                        {project.description}
                      </p>
                    </div>

                    {/* Card Bottom Strip */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#009CDE]">
                      <span>Explore Project</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* =======================================================================
            PAGINATION: LOAD MORE PROJECTS BUTTON & STATUS
           ======================================================================= */}
        <div className="text-center mt-12 sm:mt-16">
          {loading && (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm shadow-2xs mb-4">
              <Loader2 className="w-4 h-4 animate-spin text-[#009CDE]" />
              <span>Fetching additional projects...</span>
            </div>
          )}

          {!loading && hasMore && (
            <motion.button
              onClick={handleLoadMore}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#009CDE] to-[#0086bf] hover:from-[#0086bf] hover:to-[#0074a6] text-white font-bold text-sm shadow-[0_4px_16px_rgba(0,156,222,0.32)] transition-all duration-200 cursor-pointer"
            >
              Load More Projects
            </motion.button>
          )}

          {!hasMore && filteredProjects.length > 0 && (
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              You&apos;ve viewed all projects 🎉
            </p>
          )}
        </div>
      </div>

      {/* =======================================================================
          INTERACTIVE PROJECT DETAILS MODAL
         ======================================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md transition-all cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden flex-shrink-0">
                <Image
                  unoptimized
                  src={selectedProject.image_url}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>

              <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#009CDE] bg-sky-50 border border-sky-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    {getProjectCategory(selectedProject)}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Live in Production</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
                  {selectedProject.title}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                  {selectedProject.redirect_url &&
                    selectedProject.redirect_url !== "#" && (
                      <Link
                        href={selectedProject.redirect_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#009CDE] to-[#0086bf] text-white font-bold text-sm shadow-md hover:scale-105 transition-all"
                      >
                        <span>View Live Platform</span>
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}

                  <button
                    onClick={() =>
                      openWhatsApp(
                        `Consultation for ${selectedProject.title} Project`
                      )
                    }
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
                  >
                    <BsWhatsapp className="w-4 h-4" />
                    <span>Get Similar Solution</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioGrid;
