"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  Truck,
  BarChart3,
  Smartphone,
  Settings,
  ArrowRight,
  CheckCircle2,
  Play,
  Zap,
  Shield,
  ShieldCheck,
  Cloud,
  Coins,
  Headphones,
  LayoutDashboard,
  FileText,
  Package,
  Tag,
  Percent,
  Star,
  Award,
  Search,
  Bell,
  User,
  UserCheck,
  Heart,
  TrendingUp,
  Sparkles,
  Clock,
  Lock,
  Building2,
  Globe,
  Box,
  Send,
  Mail,
  Layers,
  Store,
  ZoomIn,
  X,
  ExternalLink,
  Sliders,
  Flame,
} from "lucide-react";
import ContactUs from "@/components/ContactUs";

export default function EcommerceProductPage() {
  const [activeModule, setActiveModule] = useState("catalog");
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
      id: "storefront",
      title: "High-Converting Flagship Customer Storefront",
      shortTitle: "Live Storefront",
      image: "/ecommerce/showcase.png",
      tag: "Live Storefront",
      description:
        "Sleek, luxury consumer storefront engineered for maximum conversion with interactive variant selectors, sticky 'Add to Cart', high-definition product visualizers, and sub-second page loads.",
      badges: [
        "Sub-Second Load Times",
        "Sticky 'Grab Yours Now' CTA",
        "Interactive Specs & Audio Badges",
        "Mobile-Responsive Layout",
      ],
    },
    {
      id: "slider-studio",
      title: "Hero Section Images & Slider Studio Manager",
      shortTitle: "Slider Studio",
      image: "/ecommerce/hero-section.png",
      tag: "Store Merchandising",
      description:
        "Interactive homepage slider management studio. Schedule promotional banners, link targeted collections, preview live simulators, and toggle carousel campaigns instantly without writing code.",
      badges: [
        "Dynamic Sliding Carousels",
        "Live Simulator Preview",
        "Scheduled Flash Campaigns",
        "Interactive Clickable Slides",
      ],
    },
    {
      id: "trending",
      title: "Trending Bestsellers & Merchandising Engine",
      shortTitle: "Bestsellers Sync",
      image: "/ecommerce/trending.png",
      tag: "Homepage Sync",
      description:
        "Real-time visual merchandising controller to curate trending bestsellers, flash deals, custom badges (e.g. Free Spotify, Engraving Available), and synchronize active products on the homepage.",
      badges: [
        "Real-time Storefront Sync",
        "Custom Product Badges",
        "Dynamic Discount Calculator",
        "Instant Section On/Off Switch",
      ],
    },
    {
      id: "inventory",
      title: "Products Inventory & Real-Time Stock Control",
      shortTitle: "Inventory Hub",
      image: "/ecommerce/inventory.png",
      tag: "Catalog Control",
      description:
        "Centralized inventory hub tracking total SKUs, active in-stock counts, low-stock threshold alerts (<10), pricing tiers (MRP vs Sale Price), and instant multi-attribute catalog search.",
      badges: [
        "Real-Time Stock Deduction",
        "Low-Stock Trigger Warnings",
        "MRP vs Sale Price Margin Editor",
        "Fast SKU & Spec Search",
      ],
    },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      bgIcon: "bg-emerald-500",
      title: "Lightning-Fast Storefronts",
      description:
        "Sub-second page load times with headless Next.js architecture, optimized image pipelines, and edge caching for peak holiday traffic.",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-white" />,
      bgIcon: "bg-blue-600",
      title: "Multi-Payment & 1-Click COD",
      description:
        "Pre-integrated with Razorpay, Stripe, PhonePe and Cash on Delivery.",
    },
    {
      icon: <Truck className="w-6 h-6 text-white" />,
      bgIcon: "bg-purple-600",
      title: "Automated Shipping & Tracking",
      description:
        "Direct integration with Shiprocket for instan pickup scheduling, and live tracking SMS.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-white" />,
      bgIcon: "bg-pink-500",
      title: "Mobile App & PWA Ready",
      description:
        "Turn your web store into high-converting iOS and Android native apps with push notifications, bottom navigation.",
    },
    {
      icon: <Coins className="w-6 h-6 text-white" />,
      bgIcon: "bg-amber-500",
      title: "Zero Hidden Transaction Cuts",
      description:
        "Own 100% of your customer data and profit margins without revenue-sharing cuts or mandatory third-party marketplace commissions.",
    },
    {
      icon: <Headphones className="w-6 h-6 text-white" />,
      bgIcon: "bg-cyan-500",
      title: "24/7 Dedicated Support",
      description:
        "Our dedicated e-commerce engineers handle server uptime, payment gateway webhooks, seasonal scaling, and security patches around the clock.",
    },
  ];

  const modules = [
    {
      id: "catalog",
      icon: <ShoppingBag className="w-5 h-5" />,
      title: "Product Catalog & Variants",
      iconColor: "text-blue-600 bg-blue-50",
      description:
        "Manage unlimited products with multi-dimensional variants (size, color, material, bundle kits). Features rich media zoom, bulk CSV import/export, dynamic pricing tiers, and SEO meta tags.",
      highlights: [
        "Multi-attribute variant matrix & pricing",
        "High-resolution 360° image & video galleries",
        "Bulk product import/export via Excel/CSV",
        "Dynamic low-stock countdown badges",
      ],
    },
    {
      id: "checkout",
      icon: <Zap className="w-5 h-5" />,
      title: "1-Page Express Checkout",
      iconColor: "text-emerald-600 bg-emerald-50",
      description:
        "Engineered to minimize cart drop-offs. Pre-fills saved customer addresses, validates PIN codes instantly, checks serviceable courier zones, and completes orders in under 3 clicks.",
      highlights: [
        "1-click guest & phone OTP login",
        "Auto PIN code city/state lookup & COD validation",
        "Upsell & cross-sell recommendations in cart",
        "Saved cards & instant UPI intent flows",
      ],
    },
    {
      id: "orders",
      icon: <FileText className="w-5 h-5" />,
      title: "Order Fulfillment Hub",
      iconColor: "text-indigo-600 bg-indigo-50",
      description:
        "Centralized fulfillment desk to process, pack, and manifest orders. Print GST compliant tax invoices, packing slips, barcode thermal shipping labels, and track return requests seamlessly.",
      highlights: [
        "One-click bulk invoice & shipping label printing",
        "Split shipment for multi-warehouse orders",
        "Automated WhatsApp & SMS order status triggers",
        "RTO (Return to Origin) reduction analytics",
      ],
    },
    {
      id: "shipping",
      icon: <Truck className="w-5 h-5" />,
      title: "Logistics & AWB Automation",
      iconColor: "text-purple-600 bg-purple-50",
      description:
        "Real-time courier rate comparison and intelligent routing. Assign orders to the fastest or lowest-cost courier partner automatically based on delivery PIN code performance.",
      highlights: [
        "Multi-courier API synchronization (Shiprocket, Delhivery)",
        "Automated AWB assignment & pickup generation",
        "Branded tracking page with live courier map updates",
        "Automated NDR (Non-Delivery Report) customer calling",
      ],
    },
    {
      id: "payments",
      icon: <CreditCard className="w-5 h-5" />,
      title: "Payment Gateways & Wallets",
      iconColor: "text-sky-600 bg-sky-50",
      description:
        "Accept payments worldwide. Supports international currencies, domestic UPI, Net Banking, credit/debit cards, BNPL (Buy Now Pay Later), and automated customer refund processing.",
      highlights: [
        "Multi-gateway fallback to prevent failed transactions",
        "Zero-delay instant refund processing",
        "Fraud detection & chargeback protection",
        "COD verification via automated WhatsApp OTP",
      ],
    },
    {
      id: "inventory",
      icon: <Package className="w-5 h-5" />,
      title: "Multi-Warehouse Inventory",
      iconColor: "text-amber-600 bg-amber-50",
      description:
        "Sync stock levels in real time across physical retail outlets, dark stores, and online channels. Prevent overselling with reserved cart locking and automated purchase orders.",
      highlights: [
        "Multi-location warehouse stock balancing",
        "Real-time inventory deduction on checkout",
        "Low-stock automated supplier purchase orders",
        "Barcode scanner support for stock dispatch",
      ],
    },
    {
      id: "cart",
      icon: <Mail className="w-5 h-5" />,
      title: "Abandoned Cart Recovery",
      iconColor: "text-rose-600 bg-rose-50",
      description:
        "Recover up to 25% of lost revenue. Automatically sends personalized WhatsApp messages, emails, and SMS alerts with dynamic discount coupons to shoppers who abandoned their checkout.",
      highlights: [
        "Automated 3-step WhatsApp & email recovery sequences",
        "Dynamic personalized single-use discount codes",
        "Detailed abandoned funnel & drop-off analytics",
        "One-click cart restoration link for customers",
      ],
    },
    {
      id: "marketing",
      icon: <Tag className="w-5 h-5" />,
      title: "Coupons & Discounts Engine",
      iconColor: "text-teal-600 bg-teal-50",
      description:
        "Create BOGO (Buy One Get One), percentage discounts, minimum order value vouchers, VIP member coupons, and flash sales with countdown timers to skyrocket average order value (AOV).",
      highlights: [
        "Tiered discount rules (e.g., Buy 2 Get 10% Off)",
        "Category, brand, and customer-specific promo codes",
        "Scheduled flash sale timers with automatic price revert",
        "Free gift with purchase threshold rules",
      ],
    },
    {
      id: "customer",
      icon: <UserCheck className="w-5 h-5" />,
      title: "Customer CRM & Loyalty Points",
      iconColor: "text-pink-600 bg-pink-50",
      description:
        "Build a loyal customer base with rewarded shopping points, tiered VIP memberships, personalized birthday discounts, and complete customer lifetime value (LTV) profiling.",
      highlights: [
        "Earn & redeem reward points system",
        "Customer lifetime value & RFM segmentation",
        "Self-service customer return & exchange portal",
        "Personalized wishlist & price drop alerts",
      ],
    },
    {
      id: "seo",
      icon: <Search className="w-5 h-5" />,
      title: "SEO & Google Shopping Feed",
      iconColor: "text-cyan-600 bg-cyan-50",
      description:
        "Built-in structured data schema (Product, AggregateRating, Offer) to get rich snippets on Google Search. Auto-generates XML sitemaps and dynamic Google Merchant Center product feeds.",
      highlights: [
        "Automatic schema markup for Google Rich Snippets",
        "Instant Google Merchant Center product feed sync",
        "Canonical tags & clean customizable URL slugs",
        "Fast server-side rendering for optimal Core Web Vitals",
      ],
    },
    {
      id: "analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Revenue & Sales Analytics",
      iconColor: "text-violet-600 bg-violet-50",
      description:
        "Monitor gross revenue, net profit, top-selling SKUs, average order value, conversion funnel velocity, and customer acquisition cost (CAC) on an interactive live dashboard.",
      highlights: [
        "Live sales velocity & visitor count tracker",
        "Top-performing product & category heatmaps",
        "Cohort retention & repeat purchase rates",
        "Pre-built financial, tax & GST reconciliation reports",
      ],
    },
    {
      id: "marketplace",
      icon: <Building2 className="w-5 h-5" />,
      title: "Multi-Vendor Marketplace",
      iconColor: "text-emerald-600 bg-emerald-50",
      description:
        "Transform your single-seller store into an Amazon-style multi-vendor platform where third-party sellers can register, list products, manage their orders, and receive automated payout splits.",
      highlights: [
        "Individual vendor dashboards & catalog management",
        "Automated commission calculation & payout ledgers",
        "Admin product approval & quality check workflow",
        "Vendor rating & performance review metrics",
      ],
    },
    {
      id: "reviews",
      icon: <Star className="w-5 h-5" />,
      title: "Reviews, Q&A & Social Proof",
      iconColor: "text-amber-600 bg-amber-50",
      description:
        "Collect photo and video reviews with automated post-delivery WhatsApp review requests. Display verified buyer badges, product Q&A widgets, and live purchase popups to build instant trust.",
      highlights: [
        "Verified customer photo & video reviews",
        "Automated post-delivery WhatsApp review incentives",
        "Live visitor count & recent purchase social popups",
        "Searchable product Question & Answer board",
      ],
    },
    {
      id: "mobileapp",
      icon: <Smartphone className="w-5 h-5" />,
      title: "Native Mobile App Integration",
      iconColor: "text-blue-600 bg-blue-50",
      description:
        "Synchronize your website catalog with native iOS and Android e-commerce apps. Send unlimited push notifications for flash sales, cart reminders, and new product drops.",
      highlights: [
        "Real-time synchronized catalog & cart between web & app",
        "Rich media push notifications with direct deep linking",
        "Biometric 1-touch FaceID/Fingerprint checkout",
        "Offline product browsing with local cache",
      ],
    },
    {
      id: "security",
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Enterprise Security & Roles",
      iconColor: "text-slate-600 bg-slate-100",
      description:
        "Bank-grade SSL encryption, PCI-DSS compliant payment storage, DDoS mitigation, and granular staff role management for catalog managers, customer care agents, and accountants.",
      highlights: [
        "Granular role-based admin permissions",
        "Audit log of every price & order modification",
        "Automated daily encrypted cloud database backups",
        "DDoS protection & rate limiting against scraper bots",
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
      {/* Lightbox Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
            >
              <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
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

      {/* ============================================================== */}
      {/* HERO SECTION                                                  */}
      {/* ============================================================== */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-white">
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
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[44px] xl:text-[50px] font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-6">
                Scalable, Fast &amp;{" "}
                <span className="text-blue-600 block mt-1">
                  High-Converting eCommerce Platform
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                A Complete eCommerce Solution that brings online storefronts,
                multi-vendor marketplaces, automated shipping, inventory
                synchronization, and 1-click checkout together on one
                high-performance platform.
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

                <button
                  onClick={scrollToGallery}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 font-semibold px-7 py-3.5 rounded-full shadow-xs transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <span>View Product Demo</span>
                  <Play className="w-4 h-4 fill-blue-600 text-blue-600" />
                </button>
              </div>

              {/* Highlights row */}
              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>99.99% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>0% Extra Commission</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>24/7 Dedicated Support</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual with Real Storefront Showcase, Delivery Person & 3D Parcel Box */}
            <motion.div
              className="lg:col-span-7 relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full max-w-[700px] h-[480px] sm:h-[520px] lg:h-[540px] flex items-center">
                {/* 1. Delivery Specialist holding Parcel Box in Background (Right) */}
                <div className="absolute right-0 top-6 sm:top-2 w-[260px] sm:w-[320px] lg:w-[350px] opacity-90 pointer-events-none select-none z-0">
                  <Image
                    src="/ecommerce/ecommerce-box.png"
                    alt="eCommerce Order Fulfillment & Delivery Partner"
                    width={450}
                    height={480}
                    className="object-contain drop-shadow-xl"
                    priority
                  />
                </div>

                {/* 2. Real Storefront Showcase inside Sleek Mac Browser Window (Center/Left) */}
                <div
                  onClick={() =>
                    setPreviewImage({
                      src: "/ecommerce/showcase.png",
                      title: "FLAZO Live eCommerce Flagship Storefront",
                    })
                  }
                  className="relative z-10 w-[92%] sm:w-[86%] lg:w-[82%] bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden backdrop-blur-sm cursor-pointer group transition-all duration-300 hover:shadow-blue-500/20"
                >
                  {/* Browser Bar */}
                  <div className="bg-slate-100 border-b border-slate-200 px-3.5 py-2.5 flex items-center justify-between select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-md px-3 py-0.5 text-[11px] text-slate-500 flex items-center gap-1.5 max-w-[260px] truncate shadow-2xs">
                      <Lock className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                      <span className="truncate">Ecommerce</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 flex items-center gap-1">
                        <ZoomIn className="w-3 h-3" /> Live Demo
                      </span>
                    </div>
                  </div>

                  {/* Real Screenshot: showcase.png */}
                  <div className="relative w-full h-[290px] sm:h-[340px] bg-white overflow-hidden">
                    <Image
                      src="/ecommerce/showcase.png"
                      alt="FLAZO eCommerce Flagship Storefront Live Demo"
                      fill
                      className="object-cover object-top group-hover:scale-[1.015] transition-transform duration-300"
                      priority
                    />
                  </div>
                </div>

                {/* 3. Mobile Storefront Experience in Foreground on the Right (using public/ecommerce/ecommerce.png) */}
                <div className="absolute -right-2 sm:-right-6 bottom-0 w-[180px] sm:w-[220px] lg:w-[240px] pointer-events-none z-20">
                  <Image
                    src="/ecommerce/ecommerce.png"
                    alt="Smartphone eCommerce Shopping App"
                    width={320}
                    height={420}
                    className="object-contain drop-shadow-2xl"
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
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 shadow-xs mb-3.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-4">
              eCommerce Platform Built to Maximize Sales &amp; Conversions
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Trusted by fast-growing D2C brands, retail giants, and
              multi-vendor marketplaces looking for blistering storefront speed,
              effortless checkout, and frictionless inventory automation.
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
              <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
              <span>Our eCommerce Modules</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-4">
              All-in-One Modules for End-to-End eCommerce Operations
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Comprehensive modules engineered for modern retail—from product
              catalog and automated inventory sync to 1-page checkout, coupons,
              logistics API integration, and real-time revenue analytics.
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
                    Included in SWS Commerce Suite
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
                Store Uptime &amp; Cloud Scaling
              </p>
            </div>

            {/* Stat 2: GMV Handled */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3.5 shadow-sm">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                ₹500Cr+
              </p>
              <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1">
                GMV Processed
              </p>
            </div>

            {/* Stat 3: Stores Powered */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3.5 shadow-sm">
                <Store className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                1,000+
              </p>
              <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1">
                Online Stores Powered
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
                Support &amp; DevOps
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: REAL SOFTWARE DEMOS & STOREFRONT SHOWCASE           */}
      {/* ============================================================== */}
      <section id="gallery" className="py-20 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 shadow-xs mb-3.5">
              <Store className="w-3.5 h-3.5 text-blue-600" />
              <span>Product Showcase &amp; Live Demos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-4">
              See Your eCommerce Ecosystem in Action
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore authentic screenshots of our e-commerce platform in
              operation—from the flagship customer storefront to the live
              merchandising studio and inventory manager.
            </p>
          </div>

          {/* 4 Real Product Demo Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-12">
            {productDemos.map((demo) => (
              <div
                key={demo.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Browser Top Chrome */}
                <div>
                  <div className="bg-slate-100 border-b border-slate-200 px-3.5 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200/70 truncate max-w-[130px]">
                      {demo.tag}
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div
                    onClick={() =>
                      setPreviewImage({
                        src: demo.image,
                        title: demo.title,
                      })
                    }
                    className="relative w-full h-[190px] sm:h-[210px] bg-slate-900 cursor-pointer overflow-hidden"
                  >
                    <Image
                      src={demo.image}
                      alt={demo.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/30 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-blue-700 px-3 py-1.5 rounded-full font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                        <ZoomIn className="w-3.5 h-3.5" /> Zoom
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {demo.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {demo.description}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-100">
                    {demo.badges.slice(0, 2).map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="text-[10px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded"
                      >
                        ✓ {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Feature Focus: Large Tabbed Walkthrough */}
          <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Interactive Platform Preview
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Switch between live customer storefront and merchant control
                  centers
                </p>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2">
                {productDemos.map((demo, idx) => (
                  <button
                    key={demo.id}
                    onClick={() => setActiveDemoTab(idx)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
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

            {/* Active Tab Full Display */}
            <div
              onClick={() =>
                setPreviewImage({
                  src: productDemos[activeDemoTab].image,
                  title: productDemos[activeDemoTab].title,
                })
              }
              className="relative w-full h-[320px] sm:h-[450px] lg:h-[560px] bg-slate-900 rounded-2xl border border-slate-200/80 shadow-md overflow-hidden cursor-pointer group"
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
              Book a Free Live Demo of SWS eCommerce
            </h2>
            <p className="text-base text-slate-600">
              Speak with our e-commerce architects to schedule a personalized
              live walkthrough tailored to your brand, catalog, and scale.
            </p>
          </div>

          <ContactUs
            page="ecommerce"
            title="Book Free Demo"
            subtitle="Get in touch with our team for a personalized walkthrough."
            showTitle={false}
          />
        </div>
      </section>
    </div>
  );
}
