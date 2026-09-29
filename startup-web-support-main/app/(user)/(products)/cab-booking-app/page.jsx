"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Shield,
  ShieldCheck,
  Cloud,
  MapPin,
  Coins,
  Headphones,
  FileText,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Play,
  Monitor,
  Smartphone,
  BarChart3,
  Layers,
  Building2,
  Sparkles,
  Send,
  Gauge,
  Globe,
  Lock,
  ZoomIn,
  X,
  Navigation,
  Wallet,
  Users,
  Route,
  BellRing,
  Wrench,
} from "lucide-react";
import ContactUs from "@/components/ContactUs";

export default function CabAppFullProductPage() {
  const [activeModule, setActiveModule] = useState("booking");
  const [activeDemoTab, setActiveDemoTab] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const productDemos = [
    {
      id: "booking",
      title: "Instant Ride Booking Engine (One Way, Round Trip & Outstation)",
      shortTitle: "Ride Booking",
      image: "/cab-booking/homepage.jpeg",
      tag: "Customer App",
      description:
        "Intuitive rider home screen to book one-way, round-trip, and outstation cabs. Includes quick service switcher for cabs, technicians, and parking assist with calendar date & time selection.",
      badges: [
        "One-Way & Outstation",
        "Instant Fare Estimate",
        "Pickup & Drop Autocomplete",
        "Live Calendar Picker",
      ],
    },
    {
      id: "tracking",
      title: "Live Trip Tracking, Ride OTP & Driver Dispatch",
      shortTitle: "Live Tracking",
      image: "/cab-booking/mybooking.jpeg",
      tag: "Live Ride Status",
      description:
        "Comprehensive trip manager showing active vehicle details (Toyota Innova Crysta), start ride OTP (4829), real-time driver GPS tracking, route directions, and digital UPI payment receipts.",
      badges: [
        "Start Ride OTP (4829)",
        "Live GPS Radar",
        "Instant Fare Breakdown",
        "UPI & Google Pay",
      ],
    },
    {
      id: "parking",
      title: "Smart Parking Assist, Live Map Radar & Valet Reservation",
      shortTitle: "Parking Assist",
      image: "/cab-booking/parking-assit.jpeg",
      tag: "Smart Parking",
      description:
        "Integrated parking finder allowing users to reserve guaranteed slots on Google Maps, find nearest hubs, and book valet services or EV charging points with instant confirmations.",
      badges: [
        "Live Map Radar",
        "Guaranteed Slots",
        "Valet Service Ready",
        "EV Charging Station Filter",
      ],
    },
    {
      id: "technician",
      title: "On-Demand Roadside Assistance & Mobile Mechanics",
      shortTitle: "Technician 24/7",
      image: "/cab-booking/technician.jpeg",
      tag: "Roadside Rescue",
      description:
        "Instant emergency service booking for roadside battery jumpstart, flat tire replacement, and computerized OBD-II vehicle diagnostic scans with 10-15 minute arrival guarantee.",
      badges: [
        "~10 Min Arrival",
        "Battery Jumpstart (₹299)",
        "Flat Tire Fix (₹249)",
        "OBD-II Computer Scan",
      ],
    },
    {
      id: "coupons",
      title: "Dynamic Promo Codes, Festive Discounts & Offers Engine",
      shortTitle: "Offers & Deals",
      image: "/cab-booking/coupon.jpeg",
      tag: "Growth Engine",
      description:
        "Boost customer retention with flat discounts, first-ride promo codes (FIRST50, CABSAVE100), automated cashback, and category-specific city & airport ride offers.",
      badges: [
        "Instant Promo Codes",
        "Flat ₹100 / 50% Discounts",
        "Category Rules",
        "100% Verified Deals",
      ],
    },
    {
      id: "profile",
      title: "User Profile, In-App Wallet & Professional Partner Hub",
      shortTitle: "Profile & Wallet",
      image: "/cab-booking/profile.jpeg",
      tag: "Account & Wallet",
      description:
        "Complete rider account center with in-app wallet balance, saved places, emergency SOS 24x7, and an integrated portal for drivers and technicians to onboard and earn.",
      badges: [
        "In-App Digital Wallet",
        "24/7 Emergency SOS",
        "Driver & Partner Onboarding",
        "Garage & Vehicle Manager",
      ],
    },
  ];

  const features = [
    {
      icon: <Car className="w-6 h-6 text-white" />,
      bgIcon: "bg-emerald-500",
      title: "Complete Ride Automation",
      description:
        "From booking and driver assignment to trip tracking, billing and payouts, our software removes manual dispatching and saves hours every day.",
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      bgIcon: "bg-blue-600",
      title: "Safe & Compliant",
      description:
        "Driver KYC and document verification, SOS button, trip sharing and role-based access keep riders, drivers and your data protected.",
    },
    {
      icon: <Cloud className="w-6 h-6 text-white" />,
      bgIcon: "bg-purple-600",
      title: "Instant Booking Confirmations",
      description:
        "Riders receive driver details, cab number and live tracking link on WhatsApp, SMS and email the moment a trip is confirmed.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      bgIcon: "bg-pink-500",
      title: "GPS & Maps Integration",
      description:
        "Live vehicle tracking, route optimization, geofencing and accurate distance-based fares powered by leading map APIs.",
    },
    {
      icon: <Coins className="w-6 h-6 text-white" />,
      bgIcon: "bg-amber-500",
      title: "Cost Effective & Scalable",
      description:
        "Transparent pricing for single-city taxi operators as well as multi-city fleets and cab aggregators.",
    },
    {
      icon: <Headphones className="w-6 h-6 text-white" />,
      bgIcon: "bg-cyan-500",
      title: "24/7 Dedicated Support",
      description:
        "Our team helps with app branding, payment gateway setup, fare rules and rapid training for your dispatch staff.",
    },
  ];

  const modules = [
    {
      id: "booking",
      icon: <Car className="w-5 h-5" />,
      title: "Ride Booking",
      iconColor: "text-rose-600 bg-rose-50",
      description:
        "Accept bookings from the rider app, website, call center or WhatsApp. Support local, airport, outstation, round-trip and hourly rental rides with scheduled and instant booking.",
      highlights: [
        "Instant and advance ride scheduling",
        "Local, outstation, airport & rental trips",
        "Booking status tracking (Requested, Assigned, On Trip, Completed)",
        "Cancellation logging with reason codes",
      ],
    },
    {
      id: "dispatch",
      icon: <Navigation className="w-5 h-5" />,
      title: "Smart Dispatch",
      iconColor: "text-violet-600 bg-violet-50",
      description:
        "Automatically assign the nearest available driver or let dispatchers assign manually. Set retry rules, driver timeouts and priority for vehicle categories.",
      highlights: [
        "Nearest-driver auto assignment",
        "Manual dispatch from admin panel",
        "Auto re-dispatch if a driver declines",
        "Multi-category vehicles (Hatchback, Sedan, SUV, Tempo Traveller)",
      ],
    },
    {
      id: "tracking",
      icon: <MapPin className="w-5 h-5" />,
      title: "Live GPS Tracking",
      iconColor: "text-blue-600 bg-blue-50",
      description:
        "Track every cab on a live map. Riders get a tracking link with ETA, and admins can monitor route deviation, idle time and speed violations.",
      highlights: [
        "Real-time vehicle location on map",
        "Shareable live trip link for riders & family",
        "Route deviation and overspeed alerts",
        "Trip history with route replay",
      ],
    },
    {
      id: "fare",
      icon: <Gauge className="w-5 h-5" />,
      title: "Fare & Pricing Engine",
      iconColor: "text-emerald-600 bg-emerald-50",
      description:
        "Configure base fare, per-km and per-minute rates, night charges, waiting charges, tolls and surge pricing for each city and vehicle type.",
      highlights: [
        "City and vehicle-wise fare rules",
        "Surge and peak-hour pricing",
        "Coupons, promo codes & discounts",
        "Upfront fare estimate for riders",
      ],
    },
    {
      id: "driverapp",
      icon: <Smartphone className="w-5 h-5" />,
      title: "Driver App",
      iconColor: "text-pink-600 bg-pink-50",
      description:
        "A simple mobile app for drivers to go online, accept trips, navigate, collect cash or digital payments and view daily earnings.",
      highlights: [
        "One-tap trip accept and start with OTP",
        "In-app turn-by-turn navigation",
        "Daily earnings and trip history",
        "Document expiry reminders",
      ],
    },
    {
      id: "payments",
      icon: <Wallet className="w-5 h-5" />,
      title: "Payments & Wallet",
      iconColor: "text-sky-600 bg-sky-50",
      description:
        "Accept cash, UPI, cards, net banking and in-app wallet. Supports corporate credit, partial advance payments and automated GST invoices.",
      highlights: [
        "UPI, card, wallet and cash support",
        "Automated GST invoice generation",
        "Advance booking payments and refunds",
        "Daily settlement and cash reconciliation",
      ],
    },
    {
      id: "payouts",
      icon: <FileText className="w-5 h-5" />,
      title: "Commission & Payouts",
      iconColor: "text-indigo-600 bg-indigo-50",
      description:
        "Set commission per vehicle type or trip category, add driver incentives and bonuses, and generate transparent payout statements for drivers and vehicle owners.",
      highlights: [
        "Configurable commission per trip type",
        "Incentives, bonuses and penalties",
        "Weekly driver payout statements",
        "Vehicle-owner and partner ledgers",
      ],
    },
    {
      id: "fleet",
      icon: <Wrench className="w-5 h-5" />,
      title: "Fleet & Vehicle Management",
      iconColor: "text-amber-600 bg-amber-50",
      description:
        "Maintain vehicle records, documents, insurance, permits and service schedules. Get alerts before documents expire or servicing is due.",
      highlights: [
        "RC, insurance, permit and PUC expiry alerts",
        "Service and maintenance schedule",
        "Fuel and expense tracking per vehicle",
        "Vehicle-to-driver mapping",
      ],
    },
    {
      id: "kyc",
      icon: <UserCheck className="w-5 h-5" />,
      title: "Driver Onboarding & KYC",
      iconColor: "text-teal-600 bg-teal-50",
      description:
        "Onboard drivers digitally. Upload license, Aadhaar, police verification and vehicle papers, then approve or reject from the admin panel.",
      highlights: [
        "Digital document upload and verification",
        "Approval workflow with status tracking",
        "Driver rating and performance scoring",
        "Block or suspend drivers instantly",
      ],
    },
    {
      id: "safety",
      icon: <BellRing className="w-5 h-5" />,
      title: "Safety & SOS",
      iconColor: "text-red-600 bg-red-50",
      description:
        "Built-in SOS button, emergency contacts, trip sharing and ride OTP verification to make every trip safer for riders and drivers.",
      highlights: [
        "One-tap SOS alert to admin and contacts",
        "Ride start OTP verification",
        "Live trip sharing with family",
        "Incident logs and audit trail",
      ],
    },
    {
      id: "notify",
      icon: <Send className="w-5 h-5" />,
      title: "WhatsApp & SMS Alerts",
      iconColor: "text-green-600 bg-green-50",
      description:
        "Send booking confirmation, driver details, arrival alerts and trip receipts automatically through WhatsApp Business API, SMS and email.",
      highlights: [
        "Official WhatsApp Business API integration",
        "Driver arrival and trip start alerts",
        "Digital receipt after trip completion",
        "Custom notification templates",
      ],
    },
    {
      id: "corporate",
      icon: <Building2 className="w-5 h-5" />,
      title: "Corporate & B2B Rides",
      iconColor: "text-cyan-600 bg-cyan-50",
      description:
        "Manage corporate accounts, employee transport, travel agents and franchise partners with dedicated rate cards and monthly billing.",
      highlights: [
        "Corporate accounts with credit limits",
        "Employee ride approval and cost centers",
        "Agent and partner rate lists",
        "Consolidated monthly invoices",
      ],
    },
    {
      id: "multicity",
      icon: <Globe className="w-5 h-5" />,
      title: "Multi-City Operations",
      iconColor: "text-blue-600 bg-blue-50",
      description:
        "Run multiple cities or franchise branches from a single dashboard with separate fare rules, drivers, staff and revenue reports.",
      highlights: [
        "City-wise fare and service area setup",
        "Branch and franchise access control",
        "Cross-city outstation routing",
        "Group-level revenue analytics",
      ],
    },
    {
      id: "analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Reports & Analytics",
      iconColor: "text-emerald-600 bg-emerald-50",
      description:
        "Track bookings, cancellations, revenue, driver performance and peak demand hours. Identify high-demand zones and improve fleet utilization.",
      highlights: [
        "Revenue, profit and trip reports",
        "Cancellation and acceptance rate trends",
        "Top drivers and top routes",
        "Exportable financial and tax reports",
      ],
    },
    {
      id: "security",
      icon: <Lock className="w-5 h-5" />,
      title: "Role-Based Access",
      iconColor: "text-slate-600 bg-slate-100",
      description:
        "Granular permissions for admins, dispatchers, accountants, city managers and support agents so each user sees only what they need.",
      highlights: [
        "Dispatchers cannot edit fares or payouts",
        "Tamper-proof audit logs on changes",
        "Support agents see limited rider data",
        "IP-whitelisting & 2FA login protection",
      ],
    },
  ];

  const currentModuleData =
    modules.find((m) => m.id === activeModule) || modules[0];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased overflow-x-hidden">
      {/* Lightbox */}
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
                <button
                  onClick={() => setPreviewImage(null)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
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

      {/* HERO */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-sky-50/70 via-blue-50/40 to-white">
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
        <div className="absolute top-32 right-10 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <motion.div
              className="lg:col-span-5 text-left"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-blue-600 bg-blue-100/70 border border-blue-200/60 shadow-xs mb-6">
                <Car className="w-4 h-4 text-blue-600" />
                <span>Trusted by Taxi Operators &amp; Cab Fleets</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[44px] xl:text-[50px] font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-6">
                Smart, Fast &amp;{" "}
                <span className="text-blue-600 block mt-1">
                  Complete Cab Booking Software
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                A complete taxi and ride-hailing management system that brings
                booking, smart dispatch, live GPS tracking, driver app, payments
                and instant WhatsApp confirmations together on one secure
                platform.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-9">
                <button
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-blue-600/25 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Book Free Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTo("gallery")}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 font-semibold px-7 py-3.5 rounded-full shadow-xs transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <span>View Product Demo</span>
                  <Play className="w-4 h-4 fill-blue-600 text-blue-600" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-slate-700">
                {[
                  "99.99% Uptime",
                  "Rider + Driver Apps Included",
                  "24/7 Support",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-7 relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full max-w-[620px] h-[520px] sm:h-[560px] flex items-center justify-center">
                {/* Decorative soft glowing background circle */}
                <div className="absolute w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

                {/* Primary Screen: Booking Homepage inside sleek Mobile Frame */}
                <div
                  onClick={() =>
                    setPreviewImage({
                      src: "/cab-booking/homepage.jpeg",
                      title: "SWS Cab Booking App — Ride Booking Interface",
                    })
                  }
                  className="relative z-10 w-[240px] sm:w-[270px] h-[460px] sm:h-[500px] bg-slate-900 rounded-[38px] p-2.5 shadow-2xl border-4 border-slate-800 cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-white">
                    <Image
                      src="/cab-booking/homepage.jpeg"
                      alt="SWS Cab Booking App Ride Booking"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-blue-700 px-3 py-1.5 rounded-full font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                        <ZoomIn className="w-3.5 h-3.5" /> Tap to Zoom
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Overlapping Screen: Live Ride Tracking / My Bookings */}
                <div
                  onClick={() =>
                    setPreviewImage({
                      src: "/cab-booking/mybooking.jpeg",
                      title: "SWS Cab Booking App — Live Ride Tracking & OTP",
                    })
                  }
                  className="absolute right-0 sm:right-4 bottom-2 sm:bottom-4 z-20 w-[190px] sm:w-[220px] h-[380px] sm:h-[420px] bg-slate-900 rounded-[34px] p-2 shadow-2xl border-4 border-slate-800/90 cursor-pointer group hover:scale-105 transition-transform duration-300 hidden xs:block"
                >
                  <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-white">
                    <Image
                      src="/cab-booking/mybooking.jpeg"
                      alt="SWS Cab Booking Live Ride Tracking"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-blue-700 px-2.5 py-1 rounded-full font-semibold text-[11px] flex items-center gap-1 shadow-lg">
                        <ZoomIn className="w-3 h-3" /> Zoom
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-choose-us" className="py-20 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 shadow-xs mb-3.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-4">
              Cab Booking Software Built for Modern Taxi Businesses
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Trusted by taxi operators, travel agencies, and cab aggregators
              for faster bookings, higher fleet utilization, and hassle-free
              daily operations.
            </p>
          </div>

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

      {/* MODULES */}
      <section id="modules" className="py-20 lg:py-24 bg-[#f8fafc] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 shadow-xs mb-3.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Our Modules</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-4">
              All-in-One Modules for Complete Cab Business Automation
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Everything you need to run a taxi business—from ride booking and
              smart dispatch to driver payouts, fleet management, and corporate
              billing.
            </p>
          </div>

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

          <motion.div
            key={currentModuleData.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-xl"
          >
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-white bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/25">
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
                    Included in SWS Cab Suite
                  </span>
                </div>
                <p className="text-base text-slate-600 leading-relaxed mb-6">
                  {currentModuleData.description}
                </p>
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

      {/* STATS */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 py-14 lg:py-16 text-white shadow-inner">
        <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-sky-300/20 blur-2xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
            {[
              { icon: ShieldCheck, value: "99.99%", label: "System Uptime" },
              { icon: Route, value: "10k+", label: "Trips Booked" },
              { icon: Users, value: "300+", label: "Fleet Operators Powered" },
              { icon: Headphones, value: "24/7", label: "Support Available" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3.5 shadow-sm">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                  {value}
                </p>
                <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 shadow-xs mb-3.5">
              <Monitor className="w-3.5 h-3.5 text-blue-600" />
              <span>Product Gallery &amp; Live Demos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-4">
              See Your Cab Business in Action
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore real screens from our cab booking software—from live
              dispatch and fare calculation to driver trips and payouts.
            </p>
          </div>

          {/* 6 Real Product Demo Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-14">
            {productDemos.map((demo) => (
              <div
                key={demo.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                      {demo.tag}
                    </span>
                  </div>
                  <div
                    onClick={() =>
                      setPreviewImage({ src: demo.image, title: demo.title })
                    }
                    className="relative w-full h-[320px] sm:h-[360px] bg-slate-100 cursor-pointer overflow-hidden p-3 flex items-center justify-center"
                  >
                    <div className="relative w-[180px] sm:w-[200px] h-full rounded-2xl overflow-hidden shadow-md border-2 border-slate-700/80 bg-white">
                      <Image
                        src={demo.image}
                        alt={demo.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/30 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-blue-700 px-3.5 py-2 rounded-full font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                        <ZoomIn className="w-4 h-4" /> Click to Zoom
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {demo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {demo.description}
                    </p>
                  </div>
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
              </div>
            ))}
          </div>

          <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Interactive Mobile App Walkthrough
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Switch between live screens of SWS Cab Booking &amp; Mobility
                  Suite
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {productDemos.map((demo, idx) => (
                  <button
                    key={demo.id}
                    onClick={() => setActiveDemoTab(idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeDemoTab === idx
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {demo.shortTitle}
                  </button>
                ))}
              </div>
            </div>

            <div
              onClick={() =>
                setPreviewImage({
                  src: productDemos[activeDemoTab].image,
                  title: productDemos[activeDemoTab].title,
                })
              }
              className="relative w-full h-[380px] sm:h-[500px] lg:h-[580px] bg-gradient-to-b from-slate-100 to-slate-200/70 rounded-2xl border border-slate-200/80 shadow-inner overflow-hidden cursor-pointer group flex items-center justify-center p-4 sm:p-6"
            >
              <div className="relative w-[220px] sm:w-[280px] h-[350px] sm:h-[460px] lg:h-[520px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-slate-900 bg-white">
                <Image
                  src={productDemos[activeDemoTab].image}
                  alt={productDemos[activeDemoTab].title}
                  fill
                  className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-300"
                />
              </div>
              <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg">
                <ZoomIn className="w-4 h-4 text-blue-400" /> Click to View
                Fullscreen
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
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
              Book a Free Live Demo of SWS Cab Booking Software
            </h2>
            <p className="text-base text-slate-600">
              Talk to our taxi software consultants to schedule a personalized
              live walkthrough for your cab business.
            </p>
          </div>

          <ContactUs
            page="cab-booking"
            title="Book Free Demo"
            subtitle="Get in touch with our team for a personalized walkthrough."
            showTitle={false}
          />
        </div>
      </section>
    </div>
  );
}
