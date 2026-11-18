"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const technologies = [
  {
    name: "Next.js 15",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    description:
      "Fullstack React framework with edge server-side rendering, instant page transitions, and enterprise SEO.",
  },
  {
    name: "React 19",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description:
      "Modern UI library engineered for highly responsive, interactive, and seamless user experiences.",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description:
      "Strict type-safe architecture ensuring scalable, self-documenting code with zero runtime crashes.",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    description:
      "Utility-first styling engine delivering custom design systems with sub-second paint speeds.",
  },
  {
    name: "Node.js",
    category: "Backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    description:
      "Asynchronous event-driven runtime built for fast, resilient APIs and scalable microservices.",
  },
  {
    name: "Python",
    category: "Backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    description:
      "High-speed backend architecture optimized for AI integration, data processing, and automation.",
  },
  {
    name: "Laravel",
    category: "Backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    description:
      "Enterprise-grade framework featuring clean architectural patterns, robust security, and reliable APIs.",
  },
  {
    name: "Flutter",
    category: "Mobile",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    description:
      "Cross-platform mobile engine compiling to high-performance native iOS and Android apps.",
  },
  {
    name: "React Native",
    category: "Mobile",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description:
      "Native mobile applications with direct hardware integration and smooth 60+ FPS user interfaces.",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    description:
      "Battle-tested relational database engineered for mission-critical reliability and complex queries.",
  },
  {
    name: "MongoDB",
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    description:
      "High-throughput NoSQL document database built for flexible schemas and real-time operations.",
  },
  {
    name: "MySQL",
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    description:
      "Structured enterprise database trusted worldwide for high availability, transactional speed, and stability.",
  },
  {
    name: "Redis",
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    description:
      "In-memory data store for lightning-fast caching, session management, and real-time message queuing.",
  },
  {
    name: "Docker",
    category: "DevOps",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    description:
      "Containerization technology ensuring consistent, isolated environments from development to production.",
  },
  {
    name: "AWS & Cloud",
    category: "Cloud",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg",
    description:
      "Global cloud infrastructure providing high availability, auto-scaling, and edge content delivery.",
  },
];

export default function TechStack() {
  const [maxScroll, setMaxScroll] = useState(0);

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // Measure horizontal scroll distance
  useEffect(() => {
    const calculateDistance = () => {
      if (trackRef.current) {
        const scrollWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const paddingRight = viewportWidth < 640 ? 40 : 100;
        const distance = Math.max(
          0,
          scrollWidth - viewportWidth + paddingRight,
        );
        setMaxScroll(distance);
      }
    };

    calculateDistance();
    window.addEventListener("resize", calculateDistance);
    const timer = setTimeout(calculateDistance, 250);

    return () => {
      window.removeEventListener("resize", calculateDistance);
      clearTimeout(timer);
    };
  }, []);

  // Track vertical scroll through pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth translation across horizontal axis
  const rawX = useTransform(
    scrollYProgress,
    (progress) => -progress * maxScroll,
  );
  const smoothX = useSpring(rawX, {
    damping: 24,
    stiffness: 110,
    mass: 0.12,
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[320vh] bg-white text-slate-900 font-sans"
    >
      {/* Background Soft Glows */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] max-w-4xl h-[400px] bg-gradient-to-b from-[#38bdf8]/10 via-[#009CDE]/05 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-[-10%] top-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-sky-200/20 to-blue-300/10 blur-3xl" />
        <div className="absolute left-[-10%] bottom-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-sky-200/20 to-indigo-200/10 blur-3xl" />
      </div>

      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden z-10 py-6 sm:py-10">
        {/* Clean Center Heading */}
        <div className="container mx-auto px-4 max-w-7xl text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Engineered with{" "}
            <span className="font-serif italic font-medium bg-gradient-to-r from-[#009CDE] via-[#0086bf] to-[#0668E1] bg-clip-text text-transparent px-1">
              Modern Tech
            </span>
          </h2>
        </div>

        {/* Horizontal Cards Scroller */}
        <div className="w-full relative overflow-hidden py-10 -my-4">
          {/* Edge Fades */}
          <div className="absolute left-0 inset-y-0 w-8 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-8 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          {/* Gliding Track */}
          <motion.div
            ref={trackRef}
            style={{ x: smoothX }}
            className="flex items-center gap-5 sm:gap-6 px-6 sm:px-14 lg:px-20 py-4 w-max select-none will-change-transform"
          >
            {technologies.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => openWhatsApp(`${tech.name} Development Project`)}
                title={`Discuss ${tech.name} development`}
                className="group relative w-[290px] sm:w-[330px] md:w-[360px] h-[370px] sm:h-[400px] rounded-[30px] p-7 sm:p-8 bg-gradient-to-b from-white via-sky-50/40 to-blue-50/20 border border-sky-100/90 shadow-[0_12px_32px_-6px_rgba(0,156,222,0.12),0_2px_8px_rgba(0,0,0,0.02),inset_0_1px_2px_rgba(255,255,255,1)] hover:border-[#009CDE] hover:shadow-[0_20px_45px_-8px_rgba(0,156,222,0.28),0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300 cursor-pointer flex flex-col justify-between flex-shrink-0 overflow-hidden"
              >
                {/* Ambient Corner Flare */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-sky-200/40 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#009CDE]/0 group-hover:via-[#009CDE] to-transparent transition-all duration-300" />

                {/* Top Section: Category Badge + Arrow */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#009CDE] bg-sky-50/90 border border-sky-200/80 px-3 py-1 rounded-full uppercase tracking-wider">
                    {tech.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#009CDE] group-hover:text-white text-slate-400 flex items-center justify-center transition-colors shadow-2xs">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Middle Section: Bigger Logo & Typography */}
                <div className="my-auto">
                  {/* Bigger Logo Container */}
                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-[24px] bg-gradient-to-br from-sky-50 via-white to-blue-50 shadow-[0_6px_18px_-2px_rgba(0,156,222,0.16),inset_0_1px_2px_rgba(255,255,255,1)] border border-sky-100/80 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      unoptimized
                      src={tech.logo}
                      alt={tech.name}
                      width={52}
                      height={52}
                      className="w-13 h-13 sm:w-15 sm:h-15 object-contain drop-shadow-xs"
                    />
                  </div>

                  <h3 className="text-2xl sm:text-[26px] font-black text-slate-900 group-hover:text-[#009CDE] transition-colors tracking-tight mb-2">
                    {tech.name}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {tech.description}
                  </p>
                </div>

                {/* Bottom Section: Clean Link */}
                <div className="pt-4 border-t border-sky-100/80 flex items-center justify-between text-xs font-bold text-[#009CDE]">
                  <span>Discuss Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
