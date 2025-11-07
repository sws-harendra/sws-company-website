"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  CreditCard,
  Truck,
  BarChart,
  Smartphone,
  Settings,
  ArrowRight,
} from "lucide-react";
import Contact from "../../contact/components/Contact";
import ContactUs from "@/components/ContactUs";

const EcommerceProductPage = ({
  name = "ShopMaster",
  tagline = "Launch your online store with zero hassle — from setup to sales.",
  heroImage = "/images/ecommerce-hero.png",
  ctaText = "Get a Free Demo",
  about = {
    title: "Your Complete E-Commerce Platform",
    description:
      "ShopMaster helps you launch your online business in days, not months — with modern storefronts, easy product management, secure payments, and built-in analytics.",
    points: [
      "No coding needed — just drag, drop, and sell",
      "Multiple payment gateway integrations",
      "Mobile-friendly & SEO optimized",
      "Real-time order tracking and reporting",
    ],
  },
  features = [
    {
      icon: <ShoppingBag className="w-8 h-8 text-indigo-600" />,
      title: "Beautiful Storefronts",
      desc: "Choose from stunning, responsive templates designed to convert visitors into buyers.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-purple-600" />,
      title: "Secure Payments",
      desc: "Accept payments globally via Stripe, Razorpay, PayPal, and more.",
    },
    {
      icon: <Truck className="w-8 h-8 text-pink-600" />,
      title: "Smart Order Management",
      desc: "Automate shipping, notifications, and fulfillment effortlessly.",
    },
    {
      icon: <BarChart className="w-8 h-8 text-green-600" />,
      title: "Powerful Analytics",
      desc: "Understand your customers with live sales reports and insights.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      title: "Mobile Ready",
      desc: "Optimized for every screen — give your customers a seamless mobile experience.",
    },
    {
      icon: <Settings className="w-8 h-8 text-orange-600" />,
      title: "Customizable Admin Panel",
      desc: "Manage products, inventory, customers, and coupons — all in one place.",
    },
  ],
  benefits = {
    title: "How ShopMaster Empowers Your Business",
    description:
      "Our goal is to simplify e-commerce for entrepreneurs and enterprises alike. Focus on your brand — we handle everything else.",
    image: "/images/ecommerce-dashboard.png",
    highlights: [
      "Launch your store in less than 48 hours",
      "Boost conversion with built-in marketing tools",
      "Scale easily with cloud infrastructure",
      "24/7 support & maintenance",
    ],
  },
  galleryImages = [
    "/images/shop1.png",
    "/images/shop2.png",
    "/images/shop3.png",
    "/images/shop4.png",
  ],
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50 via-indigo-50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #6366f1 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
          className="w-full h-full"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-10 items-center py-24"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              {name}
            </h1>
            <p className="text-lg text-gray-600 mb-8">{tagline}</p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block"
          >
            <Image
              src={heroImage}
              alt="Ecommerce hero"
              width={600}
              height={500}
              className="rounded-3xl shadow-xl"
            />
          </motion.div>
        </motion.div>

        {/* ABOUT */}
        <div className="py-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
            {about.title}
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            {about.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {about.points.map((point, i) => (
              <div
                key={i}
                className="bg-white/80 px-5 py-3 rounded-xl shadow border border-gray-100 text-gray-700 text-sm"
              >
                🛒 {point}
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <div className="py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* BENEFITS */}
        <div className="py-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={benefits.image}
              alt="Ecommerce dashboard"
              width={600}
              height={450}
              className="rounded-3xl shadow-xl"
            />
          </motion.div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {benefits.title}
            </h2>
            <p className="text-gray-600 mb-6">{benefits.description}</p>
            <ul className="space-y-3 text-gray-700">
              {benefits.highlights.map((h, i) => (
                <li key={i}>💡 {h}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* GALLERY */}
        <div className="py-20 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Showcase Your Store
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Take a look at some of the beautiful stores powered by our platform.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl group shadow-md hover:shadow-xl transition"
              >
                <Image
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  width={400}
                  height={400}
                  className="object-cover w-full h-64 transform group-hover:scale-105 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
      </div>{" "}
      <ContactUs page="ecommerce" />
    </section>
  );
};

export default EcommerceProductPage;
