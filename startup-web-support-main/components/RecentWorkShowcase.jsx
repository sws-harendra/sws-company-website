"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import portfolioService from "@/services/portfolio.service";
import { openWhatsApp } from "@/lib/whatsapp";

// Fallback portfolio showcase items with real company projects
const defaultProjects = [
  {
    id: "proj-1",
    title: "HealthSync Hospital ERP",
    category: "Healthcare & Cloud ERP",
    image_url: "/hms/dashboard-web.png",
    description:
      "Enterprise healthcare platform managing 500+ beds, OPD queues, electronic health records, and multi-department billing in real time.",
    redirect_url: "/hms",
  },
  {
    id: "proj-2",
    title: "UrbanCart Multi-Vendor Platform",
    category: "E-Commerce & Retail",
    image_url: "/ecommerce/hero-section.png",
    description:
      "Modern marketplace featuring real-time inventory synchronization, instant payment gateway checkouts, and vendor dashboards.",
    redirect_url: "/ecommerce",
  },
  {
    id: "proj-3",
    title: "CityRide On-Demand Cab App",
    category: "Mobile App & Logistics",
    image_url: "/cab-booking/homepage.jpeg",
    description:
      "Real-time driver dispatch application with live GPS navigation, dynamic surge pricing algorithms, and seamless digital wallets.",
    redirect_url: "/cab-booking",
  },
  {
    id: "proj-4",
    title: "MediLab Pathology Suite",
    category: "Laboratory Automation",
    image_url: "/pathology/product-demo.png",
    description:
      "Automated clinical pathology system generating instant QR-verified lab reports, barcode sample tracking, and SMS notifications.",
    redirect_url: "/pathology",
  },
  {
    id: "proj-5",
    title: "EduVibe Interactive LMS",
    category: "EdTech & Web App",
    image_url: "/website_hero.jpg",
    description:
      "Scalable e-learning portal serving 20k+ concurrent students with live streaming classes, automated quizzes, and student portals.",
    redirect_url: "#",
  },
  {
    id: "proj-6",
    title: "FinTrack Corporate ERP",
    category: "FinTech & Accounting",
    image_url: "/software.jpg",
    description:
      "Automated GST-compliant invoicing, payroll management, and expense auditing software built for enterprise operations.",
    redirect_url: "#",
  },
  {
    id: "proj-7",
    title: "QuickCommerce Delivery Network",
    category: "Mobile App & Delivery",
    image_url: "/mobile-app.jpg",
    description:
      "Sub-15 minute grocery fulfillment mobile application with micro-warehouse routing and live driver telemetry.",
    redirect_url: "#",
  },
  {
    id: "proj-8",
    title: "ApexStore POS & Inventory",
    category: "Cloud Retail Solution",
    image_url: "/ecommerce/inventory.png",
    description:
      "Cloud POS and inventory control suite synchronizing physical retail barcode scanners with online storefronts.",
    redirect_url: "/ecommerce",
  },
  {
    id: "proj-9",
    title: "SmartDoctor Telehealth OPD",
    category: "Telemedicine Platform",
    image_url: "/hms/doctor.png",
    description:
      "HIPAA-compliant video consultation platform connecting patients with specialist doctors, digital prescriptions, and follow-ups.",
    redirect_url: "/hms",
  },
  {
    id: "proj-10",
    title: "SwiftPark Smart Mobility",
    category: "IoT Parking Assistance",
    image_url: "/cab-booking/parking-assit.jpeg",
    description:
      "Automated vehicle parking reservation system featuring live sensor space detection and contactless payment scanning.",
    redirect_url: "/cab-booking",
  },
  {
    id: "proj-11",
    title: "PharmaCare Supply Chain",
    category: "Pharmaceutical Logistics",
    image_url: "/hms/medicine.png",
    description:
      "Batch tracking, expiry management, and wholesale distributor ordering system for multi-chain pharmacies.",
    redirect_url: "/hms",
  },
  {
    id: "proj-12",
    title: "EliteWear Fashion Store",
    category: "Headless E-Commerce",
    image_url: "/ecommerce/showcase.png",
    description:
      "Ultra-fast Next.js storefront engineered for high conversion rates with visual product configurators and 3D previews.",
    redirect_url: "/ecommerce",
  },
];

const RecentWorkShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch portfolios from database
  const fetchPortfolios = useCallback(async () => {
    try {
      const data = await portfolioService.getAll({ page: 1, limit: 30 });
      if (data?.portfolios?.length) {
        const combined = [...data.portfolios, ...defaultProjects];
        const unique = Array.from(
          new Map(combined.map((item) => [item.title, item])).values(),
        );
        setProjects(unique);
      } else {
        setProjects(defaultProjects);
      }
    } catch (err) {
      console.error("Error fetching portfolios:", err);
      setProjects(defaultProjects);
    }
  }, []);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  // Distribute projects into 3 distinct rows for the 3D tilted marquee wall
  const { row1, row2, row3 } = useMemo(() => {
    const list = projects.length >= 6 ? projects : defaultProjects;
    const third = Math.ceil(list.length / 3);
    const r1 = list.slice(0, third);
    const r2 = list.slice(third, third * 2);
    const r3 = list.slice(third * 2);

    return {
      row1: [...r1, ...r1, ...r1],
      row2: [...r2, ...r2, ...r2],
      row3: [...r3, ...r3, ...r3],
    };
  }, [projects]);

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
    <section className="relative bg-[#030712] pt-16 sm:pt-24 pb-16 sm:pb-24 overflow-hidden font-sans text-white select-none">
      {/* Background Soft Glows */}

      {/* Section Header */}
      <div className="container mx-auto px-4 max-w-7xl relative z-30 text-center mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Our Recent{" "}
            <span className="font-serif italic font-medium bg-gradient-to-r from-sky-400 via-[#009CDE] to-blue-400 bg-clip-text text-transparent px-1">
              Work
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Explore the high-performance web applications, enterprise software,
            and native mobile apps delivered by our engineering squad.
          </p>
        </motion.div>
      </div>

      {/* 3D Isometric Tilted Marquee Wall (Netflix Style) */}
      <div className="relative w-full overflow-hidden py-2 sm:py-4">
        {/* Soft Vignette Edge Masks */}
        <div className="absolute top-0 inset-x-0 h-14 sm:h-20 bg-gradient-to-b from-[#030712] via-[#030712]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 sm:h-40 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute left-0 inset-y-0 w-16 sm:w-44 bg-gradient-to-r from-[#030712] via-[#030712]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-44 bg-gradient-to-l from-[#030712] via-[#030712]/90 to-transparent z-20 pointer-events-none" />

        {/* Tilted Perspective Container */}
        <div className="w-[145vw] sm:w-[135vw] md:w-[125vw] -ml-[22vw] sm:-ml-[17vw] md:-ml-[12vw] transform -rotate-[10deg] sm:-rotate-[12deg] md:-rotate-[13deg] scale-[1.04] sm:scale-[1.08] origin-center flex flex-col gap-4 sm:gap-6 py-4 will-change-transform">
          {/* Row 1: Slides Left */}
          <div className="flex gap-4 sm:gap-6 w-max animate-portfolio-marquee-left hover:[animation-play-state:paused]">
            {row1.map((project, idx) => (
              <ProjectCard
                key={`r1-${project.id}-${idx}`}
                project={project}
                onSelect={() => openModal(project)}
              />
            ))}
          </div>

          {/* Row 2: Slides Right */}
          <div className="flex gap-4 sm:gap-6 w-max animate-portfolio-marquee-right hover:[animation-play-state:paused]">
            {row2.map((project, idx) => (
              <ProjectCard
                key={`r2-${project.id}-${idx}`}
                project={project}
                onSelect={() => openModal(project)}
              />
            ))}
          </div>

          {/* Row 3: Slides Left */}
          <div className="flex gap-4 sm:gap-6 w-max animate-portfolio-marquee-left-fast hover:[animation-play-state:paused]">
            {row3.map((project, idx) => (
              <ProjectCard
                key={`r3-${project.id}-${idx}`}
                project={project}
                onSelect={() => openModal(project)}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-[450px] bg-gradient-to-b from-[#009CDE]/12 via-blue-600/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-3xl" />
      </div>
      {/* Bottom CTA Actions */}
      <div className="container mx-auto px-4 max-w-7xl relative z-30 text-center mt-6 sm:mt-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-gradient-to-r from-[#009CDE] via-[#0086bf] to-[#0668E1] hover:from-[#0086bf] hover:to-[#0074a6] text-white rounded-2xl font-bold text-sm shadow-[0_4px_20px_rgba(0,156,222,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Explore All Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => openWhatsApp("Discuss Custom Software Project")}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold text-sm backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <BsWhatsapp className="w-4 h-4 text-emerald-400" />
            <span>Discuss Your Project</span>
          </button>
        </div>
      </div>

      {/* Interactive Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
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
              className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High-Resolution Screenshot */}
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex-shrink-0">
                <Image
                  src={selectedProject.image_url}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
              </div>

              {/* Project Meta Details */}
              <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#009CDE] bg-sky-950/80 border border-sky-800/80 px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedProject.category || "Fullstack Project"}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Live in Production</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                  {selectedProject.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {selectedProject.description ||
                    "High-performance digital product engineered with clean architecture, modern frontend frameworks, and resilient cloud backend services."}
                </p>

                {/* Modal Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
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
                        `Consultation for ${selectedProject.title} Project`,
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

      <style jsx>{`
        @keyframes portfolioMarqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }

        @keyframes portfolioMarqueeRight {
          0% {
            transform: translateX(-33.333333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes portfolioMarqueeLeftFast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }

        .animate-portfolio-marquee-left {
          animation: portfolioMarqueeLeft 42s linear infinite;
        }

        .animate-portfolio-marquee-right {
          animation: portfolioMarqueeRight 48s linear infinite;
        }

        .animate-portfolio-marquee-left-fast {
          animation: portfolioMarqueeLeftFast 38s linear infinite;
        }
      `}</style>
    </section>
  );
};

// Sub-component for individual project card in the marquee
const ProjectCard = ({ project, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="group relative w-[260px] sm:w-[320px] md:w-[360px] aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-[#009CDE] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(0,156,222,0.45)] transition-all duration-300 cursor-pointer bg-slate-900 flex-shrink-0 hover:scale-105 active:scale-98"
    >
      <Image
        src={project.image_url}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 360px"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

      <div className="absolute top-3 left-3 z-10">
        <span className="text-[10px] font-bold text-sky-200 bg-black/60 border border-white/15 px-2.5 py-0.5 rounded-full backdrop-blur-md uppercase tracking-wider">
          {project.category || "Web & Mobile"}
        </span>
      </div>

      <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/20 group-hover:bg-[#009CDE] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-md shadow-sm">
        <ArrowUpRight className="w-4 h-4" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 z-10">
        <h3 className="text-sm sm:text-base font-black text-white group-hover:text-sky-300 transition-colors tracking-tight truncate">
          {project.title}
        </h3>
        <p className="text-[11px] sm:text-xs text-slate-300 font-normal line-clamp-1 mt-0.5">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default RecentWorkShowcase;
