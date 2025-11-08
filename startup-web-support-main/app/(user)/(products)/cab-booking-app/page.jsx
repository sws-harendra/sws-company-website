"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Smartphone,
  Clock,
  Car,
  Users,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const CabAppFullProductPage = ({
  appName = "SmartCab",
  tagline = "A complete cab booking & fleet management solution.",
  ctaText = "Request a Demo",
  heroImage = "/images/hero-cab.png",
  about = {
    title: "Your Own Branded Cab Booking App",
    description:
      "We help businesses launch scalable, cab booking apps with passenger & driver interfaces, real-time tracking, analytics, and powerful admin control — all designed for a seamless experience.",
    points: [
      "Custom branding and theme support",
      "Driver & passenger mobile apps",
      "Powerful admin dashboard",
      "Fully managed backend APIs",
    ],
  },
  features = [
    {
      icon: <Smartphone className="w-7 h-7 text-blue-600" />,
      title: "Easy Mobile Experience",
      desc: "Book, track, and manage rides with an intuitive app interface for users and drivers.",
    },
    {
      icon: <Clock className="w-7 h-7 text-purple-600" />,
      title: "Real-Time Tracking",
      desc: "Advanced GPS tracking with live driver and ETA updates for passengers.",
    },
    {
      icon: <Car className="w-7 h-7 text-indigo-600" />,
      title: "Fleet Management",
      desc: "Easily manage vehicles, drivers, and ride history with smart analytics.",
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-green-600" />,
      title: "Secure & Scalable",
      desc: "Enterprise-grade security with 99.9% uptime and cloud-based scaling.",
    },
    {
      icon: <Users className="w-7 h-7 text-pink-600" />,
      title: "User Management",
      desc: "Manage customers, drivers, payments, and support — all from one panel.",
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-orange-600" />,
      title: "Analytics Dashboard",
      desc: "View reports, trends, and insights for better decision-making.",
    },
  ],
  benefits = {
    title: "Why Choose Our Cab Booking Solution?",
    description:
      "Built to empower your transportation business, our platform simplifies everything — from bookings and payments to real-time fleet management and customer engagement.",
    image: "/images/cab-dashboard.png",
    highlights: [
      "Reduce operational costs by up to 40%",
      "Boost driver productivity and retention",
      "Enhance customer satisfaction with automation",
      "Go live in less than 2 weeks",
    ],
  },
  galleryImages = [
    "/images/app1.jpg",
    "/images/app2.jpg",
    "/images/app3.jpg",
    "/images/app4.jpg",
  ],
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-purple-50 to-white">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-200/40 to-purple-300/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-pink-200/40 to-indigo-300/40 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20px 20px, #4f46e5 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-10 items-center py-24"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              {appName}
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
              alt="Cab app hero"
              width={600}
              height={500}
              className="rounded-3xl shadow-xl"
            />
          </motion.div>
        </motion.div>

        {/* ABOUT SECTION */}
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
                className="bg-white/70 px-5 py-3 rounded-xl shadow border border-gray-100 text-gray-700 text-sm"
              >
                ✅ {point}
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES SECTION */}
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

        {/* BENEFITS SECTION */}
        <div className="py-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={benefits.image}
              alt="Dashboard"
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
                <li key={i}>🚀 {h}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* GALLERY SECTION */}
        <div className="py-20 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            App Screens & Experience
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            See how intuitive, clean, and beautiful our cab booking app looks
            across devices.
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
        <div className="py-20 text-center">
          <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold mb-3">
              Launch Your Own Ride App Today 🚗
            </h3>
            <p className="text-white/80 mb-5">
              Schedule a demo to see how we can help you scale your
              transportation business with ease.
            </p>
            <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition">
              {ctaText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CabAppFullProductPage;
