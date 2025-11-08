"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Shield,
  Cloud,
  Users,
  DollarSign,
  Award,
  LayoutDashboard,
  FileText,
  UserCheck,
  Stethoscope,
  Bed,
  Hospital,
  Droplet,
  Pill,
  FlaskConical,
  Lock,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import ContactUs from "@/components/ContactUs";
import Gallery from "@/components/gallery";

export default function HMSLandingPage() {
  const [activeModule, setActiveModule] = useState("dashboard");

  const images = [
    { src: "/hms/dashboard-web.png", caption: "Dashboard Management" },
    { src: "/hms/bed-dashboard.png", caption: "Bed Management" },
    { src: "/hms/dashboard.png", caption: "Dashboard" },
    { src: "/hms/opd-management.png", caption: "OPD" },
    { src: "/hms/patient.png", caption: "Patient Management" },
    { src: "/hms/bed-management.png", caption: "Bed Management" },
  ];
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: <Activity className="w-7 h-7" />,
      title: "Complete Healthcare Solution",
      description:
        "Built on fully integrated modular architecture, ensuring smooth data flow between departments for efficient patient management.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Secure & Reliable",
      description:
        "Robust security protocols and strict data privacy policies safeguard patient information with complete confidentiality.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: <Cloud className="w-7 h-7" />,
      title: "Stable Cloud Solution",
      description:
        "Over 99.99% uptime with mobile apps for doctors and patients, backed by a decade of reliable service.",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Patient-Centric Design",
      description:
        "24/7 appointment booking, instant notifications, easy feedback, and telemedicine services for better engagement.",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      icon: <DollarSign className="w-7 h-7" />,
      title: "Affordable Pricing",
      description:
        "Transparent, modular pricing that supports scalability while keeping upfront investment low.",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Established Trust",
      description:
        "Trusted by leading clinics, hospitals, and multi-chain facilities across India and overseas.",
      gradient: "from-cyan-500 to-blue-600",
    },
  ];

  const modules = [
    {
      id: "dashboard",
      icon: <LayoutDashboard className="w-6 h-6" />,
      title: "Dashboard",
      description:
        "Real-time view of all operations with patient records, billing, and appointments in one place for faster decision-making.",
      color: "blue",
    },
    {
      id: "billing",
      icon: <FileText className="w-6 h-6" />,
      title: "Billing",
      description:
        "Streamlined finances with accurate invoicing, automated receipts, multiple payment options, and real-time expense tracking.",
      color: "emerald",
    },
    {
      id: "patient",
      icon: <UserCheck className="w-6 h-6" />,
      title: "Patient Management",
      description:
        "Complete digital records including demographics, medical history, treatment details, and billing for personalized care.",
      color: "violet",
    },
    {
      id: "opd",
      icon: <Stethoscope className="w-6 h-6" />,
      title: "OPD Module",
      description:
        "Manages registrations, queues, billing, consultant prescriptions, and follow-ups for organized outpatient care.",
      color: "cyan",
    },
    {
      id: "ipd",
      icon: <Hospital className="w-6 h-6" />,
      title: "IPD Module",
      description:
        "Efficiently manages admissions, transfers, nursing care, discharges, and generates detailed billing and summaries.",
      color: "indigo",
    },
    {
      id: "bed",
      icon: <Bed className="w-6 h-6" />,
      title: "Bed Management",
      description:
        "Real-time updates on bed availability, tracking occupied, reserved, and vacant beds for better planning.",
      color: "pink",
    },
    {
      id: "blood",
      icon: <Droplet className="w-6 h-6" />,
      title: "Blood Bank",
      description:
        "Manages donors, tracks blood stock, handles cross-matching, and monitors transfusions for safe blood supply.",
      color: "rose",
    },
    {
      id: "pharmacy",
      icon: <Pill className="w-6 h-6" />,
      title: "Medicine Management",
      description:
        "Inventory updates, stock alerts, expiry tracking, and automated billing for efficient medicine distribution.",
      color: "amber",
    },
    {
      id: "pathology",
      icon: <FlaskConical className="w-6 h-6" />,
      title: "Pathology",
      description:
        "Manages lab tests from booking to reporting with automated sample tracking and online report delivery.",
      color: "teal",
    },
    {
      id: "users",
      icon: <Lock className="w-6 h-6" />,
      title: "User Management",
      description:
        "Role-based access control for doctors, nurses, staff, and administrators ensuring security and accountability.",
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                variants={fadeUp}
                transition={{ delay: 0.1 }}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Trusted by Healthcare Facilities</span>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                variants={fadeUp}
                transition={{ delay: 0.2 }}
              >
                Smart, Secure &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Paperless Healthcare
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                variants={fadeUp}
                transition={{ delay: 0.3 }}
              >
                Complete Hospital Management System bringing OPD, IPD, Billing,
                Pharmacy, Lab, Beds management and Inventory together on one
                secure platform – accessible anytime, anywhere.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-8"
                variants={fadeUp}
                transition={{ delay: 0.4 }}
              >
                <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold">
                  <span>Book Free Demo</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-semibold">
                  Learn More
                </button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                className="flex flex-wrap items-center gap-6 text-sm text-gray-600"
                variants={fadeUp}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>99.99% Uptime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>10+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>24/7 Support</span>
                </div>
              </motion.div>
            </div>

            {/* Contact Card */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ContactUs />
              {/* <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-gray-100">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Get Started Today
                  </h3>
                  <p className="text-gray-600">
                    Contact us for a personalized demo
                  </p>
                </div>

                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all"
                      placeholder="john@hospital.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hospital/Clinic Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all"
                      placeholder="Healthcare Facility"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300"
                  >
                    Request Demo
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center mb-4">
                    Or contact us directly
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>info@hms.com</span>
                    </div>
                  </div>
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              variants={fadeUp}
            >
              <Award className="w-4 h-4" />
              <span>Why Choose Us</span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Built for Modern Healthcare
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by leading healthcare providers for comprehensive, secure,
              and efficient hospital operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                transition={{ delay: index * 0.1 }}
                whileInView="visible"
                initial="hidden"
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                <div
                  className={`relative bg-gradient-to-br ${feature.gradient} text-white w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Modules Section */}
      {/* <section
        id="modules"
        className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              variants={fadeUp}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Complete Solution</span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              All-in-One Hospital Automation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential modules covering every aspect of hospital
              management—designed to streamline workflows and enhance patient
              care
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
          >
            {modules.map((module) => (
              <motion.div
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeModule === module.id
                    ? `bg-gradient-to-br from-${module.color}-500 to-${module.color}-600 text-white shadow-xl shadow-${module.color}-500/30`
                    : "bg-white text-gray-700 hover:shadow-lg border border-gray-200"
                }`}
              >
                <div className="mb-3">{module.icon}</div>
                <h3 className="font-semibold text-sm leading-tight">
                  {module.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            key={activeModule}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div
                className={`bg-gradient-to-br from-${
                  modules.find((m) => m.id === activeModule)?.color
                }-500 to-${
                  modules.find((m) => m.id === activeModule)?.color
                }-600 text-white p-6 rounded-2xl shadow-lg`}
              >
                {modules.find((m) => m.id === activeModule)?.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {modules.find((m) => m.id === activeModule)?.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {modules.find((m) => m.id === activeModule)?.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Stats Section */}
      <section
        id="modules"
        className="py-20 bg-gradient-to-b from-blue-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              All-in-One Modules for Complete Hospital Automation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential modules covering OPD/IPD management, pathology,
              pharmacy, billing, and more—designed to streamline workflows
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
          >
            {modules.map((module) => (
              <motion.div
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-xl cursor-pointer transition duration-300 ${
                  activeModule === module.id
                    ? "bg-blue-600 text-white shadow-xl transform scale-105"
                    : "bg-white text-gray-900 hover:shadow-lg hover:border-blue-300 border border-gray-200"
                }`}
              >
                <div
                  className={`mb-4 ${
                    activeModule === module.id ? "text-white" : "text-blue-600"
                  }`}
                >
                  {module.icon}
                </div>
                <h3 className="font-semibold mb-2">{module.title}</h3>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 bg-white rounded-2xl shadow-xl p-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-lg">
                {modules.find((m) => m.id === activeModule)?.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {modules.find((m) => m.id === activeModule)?.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {modules.find((m) => m.id === activeModule)?.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <motion.section
        className="bg-gradient-to-r from-blue-600 to-[#0698D8] py-16"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { label: "System Uptime", value: "99.99%" },
              { label: "Years Experience", value: "10+" },
              { label: "Healthcare Facilities", value: "500+" },
              { label: "Support Available", value: "24/7" },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}>
                <p className="text-4xl font-bold mb-2">{item.value}</p>
                <p className="text-blue-100">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <div className="m-auto w-4/5">
        {/* <h3>Gallery</h3> */}
        <Gallery images={images} heading={true} />
      </div>
    </div>
  );
}
