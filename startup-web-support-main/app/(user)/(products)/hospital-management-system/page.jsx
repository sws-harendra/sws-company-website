"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Shield,
  ShieldCheck,
  Cloud,
  Users,
  Coins,
  Headphones,
  LayoutDashboard,
  FileText,
  UserCheck,
  Stethoscope,
  Bed,
  Hospital,
  Building2,
  Droplet,
  Pill,
  FlaskConical,
  Award,
  ArrowRight,
  CheckCircle2,
  Play,
  Calendar,
  Search,
  Bell,
  Monitor,
  Smartphone,
  BarChart3,
  Layers,
  Settings,
  User,
  HeartHandshake,
  FileCheck,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import ContactUs from "@/components/ContactUs";

export default function HMSLandingPage() {
  const [activeModule, setActiveModule] = useState("dashboard");

  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const features = [
    {
      icon: <Activity className="w-6 h-6 text-white" />,
      bgIcon: "bg-emerald-500",
      title: "Complete Healthcare Solution",
      description:
        "Our hospital management system in Patna is designed in a way where all hospital departments stay connected and work together without confusion.",
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      bgIcon: "bg-blue-600",
      title: "Secure & Reliable",
      description:
        "Data security was one of the top concerns while building our hospital management software in Patna because patient security is must.",
    },
    {
      icon: <Cloud className="w-6 h-6 text-white" />,
      bgIcon: "bg-purple-600",
      title: "Stable Cloud Solution",
      description:
        "The one of the best hospital management system in Patna runs on a stable cloud setup that delivers more than 99.99 percent uptime.",
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      bgIcon: "bg-pink-500",
      title: "User Friendly Interface",
      description:
        "Simple and clean interface makes it easy for staff, doctors and administrators to work efficiently without any technical hassle.",
    },
    {
      icon: <Coins className="w-6 h-6 text-white" />,
      bgIcon: "bg-amber-500",
      title: "Cost Effective",
      description:
        "Get maximum value with our feature-rich system at an affordable price, designed for hospitals of all sizes.",
    },
    {
      icon: <Headphones className="w-6 h-6 text-white" />,
      bgIcon: "bg-cyan-500",
      title: "Dedicated Support",
      description:
        "Our team is always ready to help you with quick support and training whenever you need it.",
    },
  ];

  const modules = [
    {
      id: "dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      title: "Dashboard",
      iconColor: "text-blue-600 bg-blue-50",
      description:
        "The dashboard is the first thing a hospital Owner sees when they login to our Hospital Management System. The owner or Administrator can monitor the entire facility functionality in real time. Instead of contacting different departments for updates, they can easily access real-time statistics from any device, anywhere.",
      highlights: [
        "Real-time OPD & IPD counts",
        "Financial & revenue collection summary",
        "Instant department status alerts",
        "Multi-device synchronized access",
      ],
    },
    {
      id: "billing",
      icon: <FileText className="w-5 h-5" />,
      title: "Billing",
      iconColor: "text-emerald-600 bg-emerald-50",
      description:
        "The Billing module automates and stores all charges, payments, and ledgers for every patient across OPD, IPD, Pathology, and Pharmacy. It eliminates human calculation errors, prevents billing delays, ensures 100% financial transparency, and enhances patient trust.",
      highlights: [
        "Automated GST & discount calculations",
        "Itemized OPD & IPD final billing",
        "Integrated payment gateways & cash registers",
        "Advance deposit & refund tracking",
      ],
    },
    {
      id: "patient",
      icon: <Users className="w-5 h-5" />,
      title: "Patient Management",
      iconColor: "text-sky-600 bg-sky-50",
      description:
        "Creates a single digital identity for every patient who visits the hospital. Instead of paper registers, patient records are stored safely on the cloud with a unique UHID (Unique Hospital Identification). Any patient's medical history can be accessed in seconds across all departments.",
      highlights: [
        "Unique UHID generation",
        "Complete digital patient history",
        "Quick demographic & emergency contact lookup",
        "Centralized document & ID attachment",
      ],
    },
    {
      id: "opd",
      icon: <Stethoscope className="w-5 h-5" />,
      title: "OPD Module",
      iconColor: "text-purple-600 bg-purple-50",
      description:
        "Handles all OPD doctor consultations, queue tracking, and service records in one synchronized window. Reduces overcrowding at reception, streamlines doctor scheduling, and includes digital prescription generation so patients receive legible prescriptions instantly.",
      highlights: [
        "Doctor token & queue management",
        "Digital prescription builder with drug dosage",
        "Follow-up scheduling & automated SMS reminders",
        "Doctor consultation fee tracking",
      ],
    },
    {
      id: "ipd",
      icon: <Hospital className="w-5 h-5" />,
      title: "IPD Module",
      iconColor: "text-pink-600 bg-pink-50",
      description:
        "Manages admitted patients from entry to discharge. Handles admission slips, bed allocation, doctor rounds, nurse vital charts, lab orders, medication administration, and printable discharge summaries with zero manual paperwork.",
      highlights: [
        "Admission slip & room/bed allocation",
        "Daily doctor round & nursing note records",
        "Medication chart & treatment scheduling",
        "One-click comprehensive discharge summary",
      ],
    },
    {
      id: "bed",
      icon: <Bed className="w-5 h-5" />,
      title: "Bed Management",
      iconColor: "text-cyan-600 bg-cyan-50",
      description:
        "Provides real-time interactive mapping of total, available, occupied, and reserved beds across all wards, ICU, and private rooms. Ward administrators can allocate, transfer, and discharge beds instantly without phone calls.",
      highlights: [
        "Visual color-coded ward & floor maps",
        "Instant bed status (Available, Occupied, Cleaning)",
        "Automated bed charges calculation per hour/day",
        "Rapid patient room transfer with history",
      ],
    },
    {
      id: "blood",
      icon: <Droplet className="w-5 h-5" />,
      title: "Blood Bank",
      iconColor: "text-rose-600 bg-rose-50",
      description:
        "Tracks blood component inventory, blood group stocks, donor profiles, cross-matching records, and expiry alerts. Ensures complete compliance with healthcare safety standards and prevents critical shortages.",
      highlights: [
        "Real-time blood group stock levels",
        "Donor registration & screening history",
        "Cross-match & requisition workflow",
        "Automated expiry date notifications",
      ],
    },
    {
      id: "pharmacy",
      icon: <Pill className="w-5 h-5" />,
      title: "Medicine Management",
      iconColor: "text-amber-600 bg-amber-50",
      description:
        "Complete pharmacy and inventory automation. Keeps live track of medicine stock, expiry dates, batch numbers, supplier purchases, and hospital pharmacy sales. Replaces manual registers and prevents stockouts of vital medicines.",
      highlights: [
        "Batch-wise inventory & expiry tracking",
        "Low-stock alerts & purchase order generation",
        "Direct prescription-to-pharmacy dispensing",
        "Sales, profit, and dump inventory analytics",
      ],
    },
    {
      id: "pathology",
      icon: <FlaskConical className="w-5 h-5" />,
      title: "Pathology",
      iconColor: "text-violet-600 bg-violet-50",
      description:
        "Manages diagnostic tests, sample barcodes, lab results, and patient report histories. Directly links test results to the patient's UHID, allowing doctors and patients to access verified lab reports online immediately.",
      highlights: [
        "Customizable test templates & normal ranges",
        "Barcode sample tracking",
        "Digital pathologist signatures on PDF reports",
        "Instant WhatsApp & email report delivery",
      ],
    },
    {
      id: "birth",
      icon: <Award className="w-5 h-5" />,
      title: "Birth Certificate",
      iconColor: "text-teal-600 bg-teal-50",
      description:
        "Simplifies generating and storing official birth records directly from hospital delivery data. Generates government-approved formatted certificates with parents' details, child birth weight, time, and doctor sign-off.",
      highlights: [
        "Pre-filled delivery room data sync",
        "Approved government-compliant layout",
        "Secure digital archiving & reprinting",
        "Parent identity & address verification",
      ],
    },
    {
      id: "death",
      icon: <ClipboardList className="w-5 h-5" />,
      title: "Death Certificate",
      iconColor: "text-slate-600 bg-slate-100",
      description:
        "Ensures lawful and sensitive documentation of death records. Seamlessly pulls patient IPD treatment history, cause of death certified by attending physicians, and generates authorized certificates instantly.",
      highlights: [
        "Standardized medical cause of death formatting",
        "Attending doctor digital sign-off",
        "Direct synchronization with IPD final bill closure",
        "Secure audit-compliant archival",
      ],
    },
    {
      id: "users",
      icon: <UserCheck className="w-5 h-5" />,
      title: "User Management",
      iconColor: "text-indigo-600 bg-indigo-50",
      description:
        "Controls user logins, secure credentials, and profile records for doctors, nurses, receptionists, pharmacists, and accountants. Ensures staff members only view data relevant to their role.",
      highlights: [
        "Multi-user credential management",
        "Department-level profile assignment",
        "Session monitoring & login history logs",
        "Two-factor authentication support",
      ],
    },
    {
      id: "hospital",
      icon: <Coins className="w-5 h-5" />,
      title: "Hospital Charge",
      iconColor: "text-emerald-600 bg-emerald-50",
      description:
        "Maintains standard pricing schedules for bed types, doctor consultations, operations, nursing care, equipment usage, and diagnostic investigations. Eliminates billing confusion with standardized hospital rate cards.",
      highlights: [
        "Categorized master service charge list",
        "Standardized procedure code mappings",
        "Emergency, TPA & corporate tariff tiers",
        "Transparent price updates with audit logs",
      ],
    },
    {
      id: "role",
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Role Management",
      iconColor: "text-purple-600 bg-purple-50",
      description:
        "Empowers administrators to configure fine-grained permissions for every role. Define exactly who can create, edit, approve, view, or delete records across all hospital modules to protect sensitive medical data.",
      highlights: [
        "Granular permission matrix (View, Edit, Delete, Export)",
        "Customizable roles (Receptionist, Doctor, Nurse, Admin)",
        "Tamper-proof audit logs for sensitive changes",
        "Quick access revocation for departed staff",
      ],
    },
    {
      id: "operation",
      icon: <Layers className="w-5 h-5" />,
      title: "Integrated Operational Modules",
      iconColor: "text-blue-600 bg-blue-50",
      description:
        "All modules are tightly connected into a cohesive ecosystem. Data entered at the reception flows seamlessly to doctor cabins, nursing stations, pharmacy counters, and billing desks—eliminating silos and double entry.",
      highlights: [
        "Zero duplicate data entry across departments",
        "Instant inter-departmental notifications",
        "Cloud-based real-time database synchronization",
        "Optimized for high-volume hospitals & clinics",
      ],
    },
  ];

  const currentModuleData =
    modules.find((m) => m.id === activeModule) || modules[0];

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFeatures = () => {
    const el = document.getElementById("why-choose-us");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased overflow-x-hidden">
      {/* ============================================================== */}
      {/* HERO SECTION                                                  */}
      {/* ============================================================== */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-sky-50/70 via-blue-50/40 to-white">
        {/* Subtle decorative glow circles */}
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
        <div className="absolute top-32 right-10 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Content */}
            <motion.div
              className="lg:col-span-5 text-left"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Badge */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-blue-600 bg-blue-100/70 border border-blue-200/60 shadow-xs mb-6"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Trusted by Healthcare Facilities</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-[44px] xl:text-[50px] font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-6"
              >
                Smart, Secure &amp;{" "}
                <span className="text-blue-600 block mt-1">
                  Paperless Hospital Management System
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl"
              >
                A Complete Hospital Management System that brings OPD IPD
                Billing Pharmacy Lab Beds management and Inventory together on
                one secure platform which can be accessed anytime and from
                anywhere without difficulty.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-4 mb-9"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-blue-600/25 transition-all duration-200 cursor-pointer"
                >
                  <span>Book Free Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToFeatures}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 font-semibold px-7 py-3.5 rounded-full shadow-xs transition-all duration-200 cursor-pointer"
                >
                  <span>Learn More</span>
                  <Play className="w-4 h-4 fill-blue-600 text-blue-600" />
                </motion.button>
              </motion.div>

              {/* Highlights row */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-slate-700"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>99.99% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>10+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>24/7 Support</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Hero Visual with Bed, Dashboard UI, Badge & Doctor */}
            <motion.div
              className="lg:col-span-7 relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full max-w-[700px] h-[480px] sm:h-[520px] lg:h-[540px] flex items-center">
                {/* 1. Hospital Bed in Background (Right) with subtle floating motion */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute right-0 top-6 sm:top-2 w-[280px] sm:w-[340px] lg:w-[380px] opacity-75 pointer-events-none select-none z-0"
                >
                  <Image
                    src="/hms/bed.png"
                    alt="Hospital Bed Care Unit"
                    width={500}
                    height={400}
                    className="object-contain"
                    priority
                  />
                </motion.div>

                {/* 2. Floating Modern Web Dashboard Mockup (Center/Left) */}
                <div className="relative z-10 w-[92%] sm:w-[86%] lg:w-[82%] bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden backdrop-blur-sm">
                  {/* Dashboard Top bar */}
                  <div className="bg-white border-b border-slate-100 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 max-w-[260px]">
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/70 rounded-lg px-2.5 py-1 text-xs text-slate-500 w-full">
                        <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">
                          Search patient, ID, or visit...
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative cursor-pointer p-1 text-slate-500 hover:text-slate-800">
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      </div>
                      <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                          DS
                        </div>
                        <div className="hidden sm:block text-left text-[11px] leading-tight">
                          <p className="font-semibold text-slate-800">
                            Dr. Sharma
                          </p>
                          <p className="text-slate-500 text-[10px]">Admin</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Inner Grid */}
                  <div className="grid grid-cols-12 min-h-[310px]">
                    {/* Dark Sidebar */}
                    <div className="col-span-3 sm:col-span-3 bg-[#0a1f44] text-white p-3 flex flex-col justify-between">
                      <div>
                        {/* Logo */}
                        <div className="flex items-center gap-1.5 mb-4 px-1">
                          <div className="font-extrabold text-sm tracking-wider text-sky-400">
                            SWS{" "}
                            <span className="text-white text-[11px] font-normal">
                              HMS
                            </span>
                          </div>
                        </div>

                        {/* Nav Items */}
                        <div className="space-y-1 text-[11px]">
                          <div className="flex items-center gap-2 bg-blue-600 text-white px-2 py-1.5 rounded-md font-medium shadow-xs">
                            <LayoutDashboard className="w-3.5 h-3.5" />
                            <span className="truncate">Dashboard</span>
                          </div>
                          {[
                            { name: "OPD", icon: Stethoscope },
                            { name: "IPD", icon: Hospital },
                            { name: "Billing", icon: FileText },
                            { name: "Pharmacy", icon: Pill },
                            { name: "Lab", icon: FlaskConical },
                            { name: "Inventory", icon: Layers },
                            { name: "Reports", icon: BarChart3 },
                            { name: "Settings", icon: Settings },
                          ].map((item, idx) => {
                            const ItemIcon = item.icon;
                            return (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-slate-300 hover:text-white px-2 py-1 rounded transition-colors"
                              >
                                <ItemIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span className="truncate">{item.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="col-span-9 sm:col-span-9 bg-[#f8fafc] p-3.5 flex flex-col justify-between">
                      {/* Metric Stat Cards */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-white border border-slate-100 rounded-xl p-2.5 shadow-xs flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] text-slate-500 truncate">
                              OPD Today
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-slate-900">
                              128
                            </p>
                          </div>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-xl p-2.5 shadow-xs flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-teal-500 text-white flex items-center justify-center shrink-0">
                            <Bed className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] text-slate-500 truncate">
                              IPD Today
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-slate-900">
                              24
                            </p>
                          </div>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-xl p-2.5 shadow-xs flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                            <Coins className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] text-slate-500 truncate">
                              Total Revenue
                            </p>
                            <p className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">
                              ₹ 2,48,500
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Lower Dashboard Section: Recent Appointments & Badge Card */}
                      <div className="grid grid-cols-12 gap-2.5 items-stretch">
                        {/* Recent Appointments Table */}
                        <div className="col-span-7 bg-white border border-slate-100 rounded-xl p-2.5 shadow-xs">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[11px] font-bold text-slate-800">
                              Recent Appointments
                            </p>
                            <span className="text-[9px] text-blue-600 font-medium">
                              View All
                            </span>
                          </div>

                          <div className="space-y-1.5 text-[9px] sm:text-[10px]">
                            {[
                              {
                                name: "Rahul Verma",
                                type: "OPD",
                                time: "10:30 AM",
                                status: "Checked In",
                                statusBg:
                                  "bg-emerald-50 text-emerald-700 border-emerald-200",
                              },
                              {
                                name: "Priya Sharma",
                                type: "OPD",
                                time: "11:00 AM",
                                status: "Waiting",
                                statusBg:
                                  "bg-amber-50 text-amber-700 border-amber-200",
                              },
                              {
                                name: "Amit Singh",
                                type: "IPD",
                                time: "11:30 AM",
                                status: "Admitted",
                                statusBg:
                                  "bg-blue-50 text-blue-700 border-blue-200",
                              },
                              {
                                name: "Neha Gupta",
                                type: "OPD",
                                time: "12:15 PM",
                                status: "Scheduled",
                                statusBg:
                                  "bg-purple-50 text-purple-700 border-purple-200",
                              },
                            ].map((row, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0"
                              >
                                <span className="font-semibold text-slate-700 truncate max-w-[70px]">
                                  {row.name}
                                </span>
                                <span className="text-slate-400">
                                  {row.type}
                                </span>
                                <span className="text-slate-400">
                                  {row.time}
                                </span>
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[8px] font-medium border ${row.statusBg}`}
                                >
                                  {row.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Better Care Badge Card (using public/hms/badge.png) */}
                        <div className="col-span-5 bg-white border border-slate-100 rounded-xl p-1.5 shadow-xs flex items-center justify-center overflow-hidden">
                          <Image
                            src="/hms/badge.png"
                            alt="Better Care Smarter Management Healthier Tomorrow"
                            width={220}
                            height={140}
                            className="object-contain w-full h-auto drop-shadow-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Doctor in Foreground Overlapping on the Right (using public/hms/doctor.png) */}
                <div className="absolute -right-3 sm:-right-6 bottom-0 w-[240px] sm:w-[280px] lg:w-[320px] pointer-events-none z-20">
                  <Image
                    src="/hms/doctor.png"
                    alt="Healthcare Professional with Digital Tablet"
                    width={400}
                    height={520}
                    className="object-contain drop-shadow-xl"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: WHY CHOOSE US                                       */}
      {/* ============================================================== */}
      <section id="why-choose-us" className="py-20 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 shadow-xs mb-3.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-4">
              Hospital ERP software Built for Modern Healthcare
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              This solution is trusted by leading healthcare providers who want
              smooth secure and efficient hospital operations that work well
              every day without complications.
            </p>
          </motion.div>

          {/* 6 Feature Cards Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={cardVariant}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex items-start gap-4 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bgIcon} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: ALL-IN-ONE MODULES                                  */}
      {/* ============================================================== */}
      <section id="modules" className="py-20 lg:py-24 bg-[#f8fafc] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 shadow-xs mb-3.5">
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
              <span>Our Modules</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-4">
              All-in-One Modules for Complete Hospital Automation
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Essential modules covering OPD management, IPD management,
              pathology, pharmacy, billing, and other key hospital operations
              are designed to simplify daily workflows and help staff work
              faster with better accuracy.
            </p>
          </motion.div>

          {/* 15 Modules Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-10"
          >
            {modules.map((mod) => {
              const isSelected = activeModule === mod.id;
              return (
                <motion.button
                  key={mod.id}
                  variants={cardVariant}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveModule(mod.id)}
                  className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-500/25"
                      : "bg-white text-slate-700 border-slate-200/80 hover:border-blue-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-white/20 text-white" : mod.iconColor
                      }`}
                    >
                      {mod.icon}
                    </div>
                    <span className="font-semibold text-xs sm:text-sm truncate">
                      {mod.title}
                    </span>
                  </div>
                  {isSelected && (
                    <ArrowRight className="w-4 h-4 text-white shrink-0 ml-1" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Active Module Details Interactive Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentModuleData.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-xl"
            >
              <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-white bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/25`}
                >
                  {React.cloneElement(currentModuleData.icon, {
                    className: "w-8 h-8",
                  })}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      {currentModuleData.title}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      Included in SWS HMS Suite
                    </span>
                  </div>

                  <p className="text-base text-slate-600 leading-relaxed mb-6">
                    {currentModuleData.description}
                  </p>

                  {/* Module Highlight Bullets */}
                  <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                    {currentModuleData.highlights.map((point, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: BLUE STATS BANNER                                   */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 py-14 lg:py-16 text-white shadow-inner">
        {/* Soft decorative background glows */}
        <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-sky-300/20 blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
            {/* Stat 1: Uptime */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3.5 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                99.99%
              </p>
              <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1">
                System Uptime
              </p>
            </div>

            {/* Stat 2: Experience */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3.5 shadow-sm">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                2+
              </p>
              <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1">
                Years Experience
              </p>
            </div>

            {/* Stat 3: Facilities */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3.5 shadow-sm">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                30+
              </p>
              <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1">
                Healthcare Facilities
              </p>
            </div>

            {/* Stat 4: Support */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3.5 shadow-sm">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                24/7
              </p>
              <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1">
                Support Available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: PRODUCT GALLERY                                     */}
      {/* ============================================================== */}
      <section id="gallery" className="py-20 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 shadow-xs mb-3.5">
              <Monitor className="w-3.5 h-3.5 text-blue-600" />
              <span>Product Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-4">
              See Your Hospital at a Glance
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Manage your hospital operations seamlessly from web and mobile,
              anytime, anywhere.
            </p>
          </div>

          {/* 3 Device Showcase Cards */}
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Card 1: Desktop Web Dashboard */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative w-full h-[320px] sm:h-[350px] flex items-center justify-center p-2">
                <div className="relative w-full h-full flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src="/hms/dashboard-web.png"
                    alt="Powerful Web Dashboard"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Monitor className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Powerful Web Dashboard
                </h3>
              </div>
            </div>

            {/* Card 2: Bed Dashboard Mobile */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative w-full h-[320px] sm:h-[350px] flex items-center justify-center p-2">
                <div className="relative w-full h-full flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src="/hms/bed-dashboard.png"
                    alt="Hospital Management on the Go"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Hospital Management on the Go
                </h3>
              </div>
            </div>

            {/* Card 3: Reports & Collections Mobile */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative w-full h-[320px] sm:h-[350px] flex items-center justify-center p-2">
                <div className="relative w-full h-full flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src="/hms/dashboard.png"
                    alt="Real-time Reports & Collections"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Real-time Reports &amp; Collections
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6: CONTACT & DEMO REQUEST FORM                         */}
      {/* ============================================================== */}
      <section
        id="contact"
        className="py-20 bg-[#f8fafc] border-t border-slate-200/60"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 shadow-xs mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Get in Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Book a Free Live Demo of SWS HMS
            </h2>
            <p className="text-base text-slate-600">
              Speak with our healthcare automation specialists to schedule a
              personalized walkthrough tailored to your hospital or clinic.
            </p>
          </div>

          <ContactUs
            page="hms"
            title="Book Free Demo"
            subtitle="Get in touch with our team for a personalized walkthrough."
            showTitle={false}
          />
        </div>
      </section>
    </div>
  );
}
