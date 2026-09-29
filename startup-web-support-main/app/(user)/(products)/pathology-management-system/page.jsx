"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical,
  Activity,
  Shield,
  ShieldCheck,
  Cloud,
  Cpu,
  Coins,
  Headphones,
  LayoutDashboard,
  FileText,
  UserCheck,
  CheckCircle2,
  ArrowRight,
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
  Building2,
  Sparkles,
  Droplet,
  Send,
  MessageCircle,
  Clock,
  Gauge,
  Package,
  Globe,
  Lock,
  ExternalLink,
  ZoomIn,
  X,
  QrCode,
  Printer,
  Download,
} from "lucide-react";
import ContactUs from "@/components/ContactUs";

export default function PathologyLandingPage() {
  const [activeModule, setActiveModule] = useState("sample");
  const [activeDemoTab, setActiveDemoTab] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

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

  const productDemos = [
    {
      id: "analytics",
      title: "Live Executive Analytics & Lab Dashboard",
      shortTitle: "Live Analytics",
      image: "/pathology/product-demo.png",
      tag: "Executive Insights",
      description:
        "Comprehensive real-time dashboard displaying revenue, estimated profit, live collections, pending reports, and automated department volume breakdown.",
      badges: [
        "Live Revenue Tracking",
        "Turnaround Time (TAT)",
        "Department Share",
        "Branch Filter",
      ],
    },
    {
      id: "billing",
      title: "Point of Sale (POS) & Diagnostic Billing",
      shortTitle: "POS Billing",
      image: "/pathology/prooduct-demo1.png",
      tag: "Point of Sale",
      description:
        "High-speed patient test booking and invoice generation with automated doctor referral commission attribution, logistics tracking, and split payment modes.",
      badges: [
        "30-Second Billing",
        "Doctor Commission Attribution",
        "Split Payment Support",
        "Automated GST Receipts",
      ],
    },
    {
      id: "reports",
      title: "Test Results, Report Authorization & WhatsApp Dispatch",
      shortTitle: "Report Dispatch",
      image: "/pathology/product-demo2.png",
      tag: "Result Verification",
      description:
        "Batch verify test results, compare abnormal delta checks, attach digital doctor signatures, and trigger 1-click WhatsApp PDF report delivery to patients.",
      badges: [
        "Single-Click WhatsApp Delivery",
        "Digital Doctor Signatures",
        "Delta Check Alerts",
        "QR Code Verification",
      ],
    },
    {
      id: "report-1",
      title:
        "Automated CBC Diagnostic Report — Format 1 (QR & Barcode Verified)",
      shortTitle: "Report 1",
      image: "/pathology/1.jpg.jpeg",
      tag: "Smart Report 1",
      description:
        "Royal Navy & Gold Complete Blood Count (CBC) report automatically generated with reference ranges, abnormal flags, dynamic QR code verification, barcode sample ID, and digital doctor signature.",
      badges: [
        "Tamper-Proof QR Code",
        "Specimen Barcode ID",
        "Abnormal Delta Flags",
        "Doctor E-Signature",
      ],
    },
    {
      id: "report-2",
      title: "ISO 9001 Certified Clinical CBC Report — Format 2",
      shortTitle: "Report 2",
      image: "/pathology/2.jpg.jpeg",
      tag: "Smart Report 2",
      description:
        "Emerald Green accredited clinical report template equipped with ISO 9001 certified footer stamp, 24/7 emergency lab contact info, home sample collection marker, and authorized consultant signature.",
      badges: [
        "ISO 9001 Accredited",
        "24/7 Lab Helpline",
        "Home Collection Tag",
        "Standard Reference Intervals",
      ],
    },
    {
      id: "report-3",
      title: "Digital & WhatsApp Fast Release CBC Report — Format 3",
      shortTitle: "Report 3",
      image: "/pathology/6.jpg.jpeg",
      tag: "Smart Report 3",
      description:
        "Modern Teal layout optimized for instant WhatsApp dispatch, displaying patient UHID, sample collection timestamp, turnaround speed, and 1-tap download link.",
      badges: [
        "1-Click WhatsApp PDF",
        "Barcode Accession ID",
        "Collection Timestamp",
        "Custom Header Branding",
      ],
    },
  ];

  const reportTemplates = [
    {
      id: "navy-gold",
      title: "Navy Blue & Gold Standard CBC Report",
      badge: "Flagship Format",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      image: "/pathology/1.jpg.jpeg",
      tag: "Haematology CBC",
      accent: "from-blue-600 to-indigo-600",
      features: [
        "Dynamic QR Code for Patient Online Verification",
        "Specimen Barcode Accession ID (INV-2604-0001)",
        "Automated Abnormal Result Flagging",
        "Consultant Pathologist Digital E-Signature",
      ],
      description:
        "The gold-standard high-trust diagnostic report layout featuring clear tabular haematology results, automated abnormal flags, reference ranges, specimen barcode tracking, and verified QR code for instant smartphone scanning.",
    },
    {
      id: "emerald-clinical",
      title: "Emerald Green ISO 9001 Certified Report",
      badge: "ISO 9001 Accredited",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      image: "/pathology/2.jpg.jpeg",
      tag: "Clinical Pathology",
      accent: "from-emerald-600 to-teal-700",
      features: [
        "Official ISO 9001 Certified Quality Stamp in footer",
        "24/7 Helpline, Online Booking & Home Sample Collection markers",
        "Standard Reference Range Interval Matrix",
        "Digital signature with authorized medical consultant credentials",
      ],
      description:
        "Engineered for accredited diagnostic laboratories and hospital pathology departments. Features customizable accreditation badges, full emergency contact bar, home collection markers, and tamper-resistant digital sign-off.",
    },
    {
      id: "modern-teal",
      title: "Modern Teal Digital & WhatsApp Report",
      badge: "WhatsApp Ready",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
      image: "/pathology/6.jpg.jpeg",
      tag: "Digital Release",
      accent: "from-teal-600 to-cyan-700",
      features: [
        "Instant WhatsApp PDF delivery formatting with ultra-sharp vector text",
        "High-density Barcode (INV-2604-0002) for specimen accessioning",
        "Precise sample collection and report authorization timestamps",
        "Custom laboratory header branding, logo slot & corporate tagline",
      ],
      description:
        "Optimized for smartphone viewing and instant WhatsApp dispatch. Features clean modern typography, custom lab logo space, instant online booking links, and exact sample collection and report timestamps.",
    },
  ];

  const features = [
    {
      icon: <FlaskConical className="w-6 h-6 text-white" />,
      bgIcon: "bg-emerald-500",
      title: "Complete Diagnostic Automation",
      description:
        "From sample barcoding to digital signatures and automatic WhatsApp report delivery, our pathology software eliminates manual errors and saves hours every day.",
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      bgIcon: "bg-blue-600",
      title: "Secure & NABL-Ready",
      description:
        "Audit-ready report logging, role-based access for technicians and pathologists, and strict patient data security following healthcare compliance standards.",
    },
    {
      icon: <Cloud className="w-6 h-6 text-white" />,
      bgIcon: "bg-purple-600",
      title: "Instant Cloud & WhatsApp Delivery",
      description:
        "Patients receive PDF reports instantly on WhatsApp, SMS, and email the moment the pathologist digitally approves the test results.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-white" />,
      bgIcon: "bg-pink-500",
      title: "Analyzer Machine Interfacing",
      description:
        "Connect seamlessly with 3-part & 5-part hematology analyzers, biochemistry, and immunoassay machines to fetch test values directly without typing.",
    },
    {
      icon: <Coins className="w-6 h-6 text-white" />,
      bgIcon: "bg-amber-500",
      title: "Cost Effective & Scalable",
      description:
        "Get maximum value with transparent pricing designed for standalone pathology clinics as well as multi-branch diagnostic chains.",
    },
    {
      icon: <Headphones className="w-6 h-6 text-white" />,
      bgIcon: "bg-cyan-500",
      title: "24/7 Dedicated Support",
      description:
        "Our team of lab IT specialists is always ready to assist you with equipment interfacing, custom report headers, and rapid training.",
    },
  ];

  const modules = [
    {
      id: "sample",
      icon: <Droplet className="w-5 h-5" />,
      title: "Sample Barcoding",
      iconColor: "text-rose-600 bg-rose-50",
      description:
        "Generate unique barcode labels at registration for blood, urine, tissue, and swab samples. Phlebotomists scan tubes to track sample journey from collection, accessioning, centrifugation to analyzer loading without mix-ups.",
      highlights: [
        "Unique barcode generation per sample vial",
        "Sample status tracking (Collected, Received, Processing, Done)",
        "Rejection logging with reason codes",
        "Color-coded vacutainer tube guides",
      ],
    },
    {
      id: "test",
      icon: <FlaskConical className="w-5 h-5" />,
      title: "Test Master & Formats",
      iconColor: "text-violet-600 bg-violet-50",
      description:
        "Pre-loaded with 1,500+ standard pathology, hematology, serology, microbiology, and histopathology test parameters with age- and gender-specific reference intervals, critical panic limits, and formula calculations.",
      highlights: [
        "Customizable normal range values by age & gender",
        "Automatic calculated parameters (e.g. eGFR, A/G Ratio)",
        "Highlighting of abnormal & panic values in red",
        "NABL-compliant reporting templates",
      ],
    },
    {
      id: "analyzer",
      icon: <Cpu className="w-5 h-5" />,
      title: "Analyzer Interfacing (LIS)",
      iconColor: "text-blue-600 bg-blue-50",
      description:
        "Bi-directional and uni-directional interfacing with leading lab machines (Mindray, Sysmex, Horiba, Roche, Abbott, Erba). Automatically pulls raw patient test readings directly from analyzers to eliminate transcription errors.",
      highlights: [
        "Bi-directional machine barcode handshake",
        "Direct result import into patient test sheet",
        "Flagging of high/low delta check differences",
        "Multi-machine concurrent data capture",
      ],
    },
    {
      id: "approval",
      icon: <FileCheck className="w-5 h-5" />,
      title: "Digital Doctor Signatures",
      iconColor: "text-emerald-600 bg-emerald-50",
      description:
        "Empowers Chief Pathologists and Biochemists to review, verify, and digitally approve lab results from anywhere on their mobile phone, tablet, or PC with cryptographic digital signature certificates.",
      highlights: [
        "Single-click multi-report batch verification",
        "Secured cryptographic digital doctor signatures",
        "Remote verification support for visiting pathologists",
        "Audit trail of who verified and authorized tests",
      ],
    },
    {
      id: "whatsapp",
      icon: <Send className="w-5 h-5" />,
      title: "WhatsApp & SMS Reports",
      iconColor: "text-green-600 bg-green-50",
      description:
        "The moment a test report is authorized, the patient and referring doctor automatically receive an instant WhatsApp alert containing a secure, password-protected PDF link with QR code verification.",
      highlights: [
        "Official WhatsApp Business API integration",
        "Secure QR code printed on every report for authenticity",
        "Instant SMS alerts with direct download link",
        "Reduces printed paper costs and reception queues",
      ],
    },
    {
      id: "billing",
      icon: <FileText className="w-5 h-5" />,
      title: "Billing & Accounts",
      iconColor: "text-sky-600 bg-sky-50",
      description:
        "Fast, itemized billing for tests and health packages. Supports cash, UPI, credit cards, corporate credit, TPA, and partial payments with automated GST receipts and daily cash register reconciliation.",
      highlights: [
        "Fast 30-second patient billing workflow",
        "Automated GST invoice generation",
        "Discount approval codes & due payment tracking",
        "Shift-wise cash drawer closing reports",
      ],
    },
    {
      id: "referral",
      icon: <HeartHandshake className="w-5 h-5" />,
      title: "Doctor Referrals",
      iconColor: "text-indigo-600 bg-indigo-50",
      description:
        "Maintain doctor referral database and commission ledgers. Calculate percentage or flat referral incentives transparently, print doctor payment slips, and send daily summary statements automatically.",
      highlights: [
        "Configurable referral percentage per test/category",
        "Automated referral ledger & payout statement",
        "Referring doctor login portal to view their patients",
        "Confidential incentive calculation & reports",
      ],
    },
    {
      id: "reagents",
      icon: <Layers className="w-5 h-5" />,
      title: "Reagent Inventory",
      iconColor: "text-amber-600 bg-amber-50",
      description:
        "Track reagent kits, test tubes, consumables, batch numbers, and expiry dates. Get automated alerts when reagent stocks reach reorder level or when expiration dates approach.",
      highlights: [
        "Reagent consumption calculated per test run",
        "Batch number & expiry date tracking",
        "Low reagent stock warning alerts",
        "Vendor purchase orders and inward register",
      ],
    },
    {
      id: "phlebotomy",
      icon: <Smartphone className="w-5 h-5" />,
      title: "Home Collection App",
      iconColor: "text-pink-600 bg-pink-50",
      description:
        "Mobile application for field phlebotomists. Assign home sample collection bookings, route phlebotomists using GPS, collect digital payments, scan barcodes at patient doorstep, and log sample temperatures.",
      highlights: [
        "Real-time phlebotomist booking dispatch",
        "Doorstep barcode scanning & collection confirmation",
        "Digital payment QR code on phlebotomist app",
        "GPS tracking & estimated arrival notification for patients",
      ],
    },
    {
      id: "qc",
      icon: <Gauge className="w-5 h-5" />,
      title: "Quality Control (QC)",
      iconColor: "text-teal-600 bg-teal-50",
      description:
        "Ensure gold-standard analytical precision with automated Levey-Jennings QC charts, Westgard rules evaluation, and multi-level control tracking for hematology and biochemistry analyzers.",
      highlights: [
        "Automated Levey-Jennings control graphs",
        "Westgard rule violation alerts (1-3s, 2-2s, R-4s)",
        "Daily calibration logs and instrument maintenance notes",
        "NABL & ISO 15189 compliance documentation",
      ],
    },
    {
      id: "package",
      icon: <Package className="w-5 h-5" />,
      title: "Health Packages",
      iconColor: "text-purple-600 bg-purple-50",
      description:
        "Create promotional health checkup packages (e.g. Executive Full Body Checkup, Diabetic Profile, Senior Citizen Care) combining multiple tests at discounted bundled pricing.",
      highlights: [
        "Custom test bundling with unified price tag",
        "Package-level marketing posters with QR codes",
        "Dynamic seasonal package creation",
        "Integrated corporate annual screening packages",
      ],
    },
    {
      id: "multibranch",
      icon: <Building2 className="w-5 h-5" />,
      title: "Multi-Branch & B2B",
      iconColor: "text-cyan-600 bg-cyan-50",
      description:
        "Connect central reference laboratories with satellite collection centers, hospital labs, and franchise partners. Centralize sample accessioning, testing, and financial settlement seamlessly.",
      highlights: [
        "Central lab vs collection center branch control",
        "Sample courier batch dispatch & receiving manifest",
        "B2B partner rate lists and monthly billing ledgers",
        "Consolidated group-level revenue analytics",
      ],
    },
    {
      id: "patientportal",
      icon: <Globe className="w-5 h-5" />,
      title: "Patient UHID Portal",
      iconColor: "text-blue-600 bg-blue-50",
      description:
        "Empower patients with a personalized web portal. Patients can view historical test results, compare vital trend graphs (e.g. HbA1c or Thyroid over 12 months), and download old reports anytime with their phone number.",
      highlights: [
        "Lifetime digital medical test archive per UHID",
        "Trend graphs comparing past and present test results",
        "OTP-authenticated secure login",
        "Self-booking for home sample collections",
      ],
    },
    {
      id: "analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      title: "TAT & Lab Analytics",
      iconColor: "text-emerald-600 bg-emerald-50",
      description:
        "Track Turnaround Time (TAT) from sample collection to report authorization. Identify department bottlenecks, monitor most popular test panels, and track daily lab profits in real time.",
      highlights: [
        "Turnaround Time (TAT) compliance meters",
        "Top-selling test panel & referral doctor trends",
        "Departmental workload distribution charts",
        "Exportable financial & tax audit reports",
      ],
    },
    {
      id: "security",
      icon: <Lock className="w-5 h-5" />,
      title: "Role-Based Lab Access",
      iconColor: "text-slate-600 bg-slate-100",
      description:
        "Granular permission matrix tailored for pathology workflows. Control precisely what receptionists, lab technicians, phlebotomists, biochemists, and accountants can view, edit, approve, or export.",
      highlights: [
        "Technician cannot approve without pathologist sign-off",
        "Tamper-proof audit logs on all result edits",
        "Receptionists restricted from seeing medical test values",
        "IP-whitelisting & 2FA login protection",
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

  const scrollToGallery = () => {
    const el = document.getElementById("gallery");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased overflow-x-hidden">
      {/* Lightbox / Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
            >
              <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
                <span className="font-semibold text-sm sm:text-base">
                  {previewImage.title}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={previewImage.src}
                    download
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5 text-xs font-medium"
                    title="Download Report Image"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <button
                    onClick={() => setPreviewImage(null)}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="relative w-full h-[65vh] sm:h-[75vh] bg-slate-950 flex items-center justify-center p-2">
                <Image
                  src={previewImage.src}
                  alt={previewImage.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-blue-600 bg-blue-100/70 border border-blue-200/60 shadow-xs mb-6">
                <FlaskConical className="w-4 h-4 text-blue-600" />
                <span>Trusted by Diagnostic Labs &amp; Pathology Centers</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[44px] xl:text-[50px] font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-6">
                Smart, Accurate &amp;{" "}
                <span className="text-blue-600 block mt-1">
                  Paperless Pathology Lab Management Software
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                A Complete Diagnostic &amp; Pathology Management System that
                brings sample barcoding, analyzer machine interfacing, digital
                doctor signatures, and instant WhatsApp report delivery together
                on one secure platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-9">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-blue-600/25 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Book Free Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  target="_blank"
                  href="https://www.youtube.com/playlist?list=PL3Od0r7M26Uj_1TfpufZ6NHoiJrZEO5RP"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 font-semibold px-7 py-3.5 rounded-full shadow-xs transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <span>View Product Demo</span>
                  <Play className="w-4 h-4 fill-blue-600 text-blue-600" />
                </a>
              </div>

              {/* Highlights row */}
              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>99.99% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% NABL / ISO Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>24/7 Lab IT Support</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual with Real Product Demo Screenshot, Laboratory Backdrop & Specialist */}
            <motion.div
              className="lg:col-span-7 relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full max-w-[700px] h-[480px] sm:h-[520px] lg:h-[540px] flex items-center">
                {/* 1. Laboratory Image in Background (Right) */}
                {/* <div className="absolute right-0 top-6 sm:top-2 w-[280px] sm:w-[340px] lg:w-[380px] opacity-75 pointer-events-none select-none z-0 rounded-2xl overflow-hidden shadow-2xl border border-blue-100">
                  <Image
                    src="/pathology/image.png"
                    alt="Pathologist analyzing samples under digital microscope"
                    width={500}
                    height={400}
                    className="object-cover w-full h-[320px] sm:h-[360px]"
                    priority
                  />
                </div> */}

                {/* 2. Real Product Demo Screenshot inside Sleek Mac Browser Window (Center/Left) */}
                <div
                  onClick={() =>
                    setPreviewImage({
                      src: "/pathology/product-demo.png",
                      title:
                        "Executive Insights — Live Pathology Lab Analytics",
                    })
                  }
                  className="relative z-10 w-[92%] sm:w-[86%] lg:w-[82%] bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden backdrop-blur-sm cursor-pointer group transition-all duration-300 hover:shadow-blue-500/20"
                >
                  {/* Mac Window Chrome Top Bar */}
                  <div className="bg-slate-100 border-b border-slate-200 px-3.5 py-2.5 flex items-center justify-between select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-md px-3 py-0.5 text-[11px] text-slate-500 flex items-center gap-1.5 max-w-[260px] truncate shadow-2xs">
                      <Lock className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                      <span className="truncate">
                        sws-pathology.lab/dashboard/insights
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 flex items-center gap-1">
                        <ZoomIn className="w-3 h-3" /> Click to zoom
                      </span>
                    </div>
                  </div>

                  {/* Real Software Screenshot: product-demo.png */}
                  <div className="relative w-full h-[290px] sm:h-[340px] bg-slate-50 overflow-hidden">
                    <Image
                      src="/pathology/product-demo.png"
                      alt="SWS Pathology Software Executive Insights Live Demo"
                      fill
                      className="object-cover object-top group-hover:scale-[1.015] transition-transform duration-300"
                      priority
                    />

                    {/* Subtle Overlay Badge: Quality Assured */}
                    <div className="absolute bottom-2.5 right-2.5 pointer-events-none">
                      <div className="bg-white/95 backdrop-blur-md rounded-xl p-1 shadow-lg border border-slate-200/80 max-w-[130px]">
                        <Image
                          src="/hms/badge.png"
                          alt="Better Care Healthier Tomorrow"
                          width={130}
                          height={75}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Doctor/Pathologist in Foreground (using public/hms/doctor.png) */}
                <div className="absolute -right-3 sm:-right-6 bottom-0 w-[240px] sm:w-[280px] lg:w-[320px] pointer-events-none z-20">
                  <Image
                    src="/hms/doctor.png"
                    alt="Pathology Specialist with Diagnostic Tablet"
                    width={400}
                    height={520}
                    className="object-contain drop-shadow-xl"
                    priority
                  />
                </div>

                {/* 4. Floating Diagnostic Report Preview Badge */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="why-choose-us" className="py-20 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 shadow-xs mb-3.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-4">
              Pathology Software Built for Modern Diagnostic Centers
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Trusted by pathology laboratories, diagnostic chains, and hospital
              collection centers for zero-error reporting, fast turnaround
              times, and hassle-free daily operations.
            </p>
          </div>

          {/* 6 Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
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
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: ALL-IN-ONE MODULES                                  */}
      {/* ============================================================== */}
      <section id="modules" className="py-20 lg:py-24 bg-[#f8fafc] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 shadow-xs mb-3.5">
              <FlaskConical className="w-3.5 h-3.5 text-blue-600" />
              <span>Our Lab Modules</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-4">
              All-in-One Modules for Complete Pathology Automation
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Comprehensive modules designed specifically for pathology
              labs—from patient registration and sample accessioning to digital
              report authorization, doctor referral tracking, and reagent
              inventory.
            </p>
          </div>

          {/* 15 Modules Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-10">
            {modules.map((mod) => {
              const isSelected = activeModule === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-500/25 scale-[1.02]"
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
                </button>
              );
            })}
          </div>

          {/* Active Module Details Interactive Card */}
          <motion.div
            key={currentModuleData.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
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
                    Included in SWS Pathology Suite
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
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center"
          >
            {/* Stat 1: Uptime */}
            <motion.div
              variants={cardVariant}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{
                  rotate: [0, -8, 8, 0],
                  transition: { duration: 0.5 },
                }}
                className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3.5 shadow-sm"
              >
                <ShieldCheck className="w-6 h-6 text-white" />
              </motion.div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                99.99%
              </p>
              <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1">
                System Uptime
              </p>
            </motion.div>

            {/* Stat 2: Reports Generated */}
            <motion.div
              variants={cardVariant}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{
                  rotate: [0, -8, 8, 0],
                  transition: { duration: 0.5 },
                }}
                className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3.5 shadow-sm"
              >
                <FileCheck className="w-6 h-6 text-white" />
              </motion.div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                10k+
              </p>
              <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1">
                Lab Reports Generated
              </p>
            </motion.div>

            {/* Stat 3: Facilities */}
            <motion.div
              variants={cardVariant}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{
                  rotate: [0, -8, 8, 0],
                  transition: { duration: 0.5 },
                }}
                className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3.5 shadow-sm"
              >
                <Building2 className="w-6 h-6 text-white" />
              </motion.div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                20+
              </p>
              <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1">
                Labs &amp; Clinics Powered
              </p>
            </motion.div>

            {/* Stat 4: Support */}
            <motion.div
              variants={cardVariant}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{
                  rotate: [0, -8, 8, 0],
                  transition: { duration: 0.5 },
                }}
                className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3.5 shadow-sm"
              >
                <Headphones className="w-6 h-6 text-white" />
              </motion.div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                24/7
              </p>
              <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1">
                Lab Support Available
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: PRODUCT GALLERY & REAL SOFTWARE DEMO SHOWCASE       */}
      {/* ============================================================== */}
      <section id="gallery" className="py-20 lg:py-24 bg-white relative">
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
              <Monitor className="w-3.5 h-3.5 text-blue-600" />
              <span>Product Gallery &amp; Live Demos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-4">
              See Your Pathology Lab in Action
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore authentic screenshots of our pathology software in
              operation—from live revenue analytics to point-of-sale billing and
              one-click test reports.
            </p>
          </motion.div>

          {/* 3 Real Product Demo Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid lg:grid-cols-3 gap-8 items-stretch mb-12"
          >
            {productDemos.map((demo) => (
              <motion.div
                key={demo.id}
                variants={cardVariant}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Image Showcase Container with Browser Chrome Header */}
                <div>
                  {/* Browser Bar */}
                  <div className="bg-slate-100 border-b border-slate-200 px-3.5 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200/70">
                      {demo.tag}
                    </span>
                  </div>

                  {/* Clickable Image with Zoom on Hover */}
                  <div
                    onClick={() =>
                      setPreviewImage({
                        src: demo.image,
                        title: demo.title,
                      })
                    }
                    className="relative w-full h-[230px] sm:h-[260px] bg-slate-50 cursor-pointer overflow-hidden"
                  >
                    <Image
                      src={demo.image}
                      alt={demo.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Hover Overlay with Zoom Icon */}
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/30 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-blue-700 px-3.5 py-2 rounded-full font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                        <ZoomIn className="w-4 h-4" /> Click to Zoom
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {demo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {demo.description}
                    </p>
                  </div>

                  {/* Feature Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                    {demo.badges.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md"
                      >
                        ✓ {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive Feature Focus: Large Tabbed Walkthrough */}
          <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Software Preview
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Switch between core interfaces of SWS Pathology Management
                  System
                </p>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2">
                {productDemos.map((demo, idx) => (
                  <motion.button
                    key={demo.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveDemoTab(idx)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeDemoTab === idx
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {demo.shortTitle}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Active Tab Full Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDemoTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onClick={() =>
                  setPreviewImage({
                    src: productDemos[activeDemoTab].image,
                    title: productDemos[activeDemoTab].title,
                  })
                }
                className="relative w-full h-[320px] sm:h-[450px] lg:h-[540px] bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden cursor-pointer group"
              >
                <Image
                  src={productDemos[activeDemoTab].image}
                  alt={productDemos[activeDemoTab].title}
                  fill
                  className="object-contain object-top group-hover:scale-[1.01] transition-transform duration-300"
                />
                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg">
                  <ZoomIn className="w-4 h-4 text-blue-400" /> Click to View
                  Fullscreen
                </div>
              </motion.div>
            </AnimatePresence>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 shadow-xs mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Get in Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Book a Free Live Demo of SWS Pathology Software
            </h2>
            <p className="text-base text-slate-600">
              Speak with our pathology automation consultants to schedule a
              personalized live walkthrough for your diagnostic laboratory.
            </p>
          </div>

          <ContactUs
            page="pathology"
            title="Book Free Demo"
            subtitle="Get in touch with our team for a personalized walkthrough."
            showTitle={false}
          />
        </motion.div>
      </section>
    </div>
  );
}
