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
} from "lucide-react";
import ContactUs from "@/components/ContactUs";

export default function HMSLandingPage() {
  const [activeModule, setActiveModule] = useState("dashboard");

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Complete Healthcare Solution",
      description:
        "Built on fully integrated modular architecture, ensuring smooth data flow between departments for efficient patient management.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description:
        "Robust security protocols and strict data privacy policies safeguard patient information with complete confidentiality.",
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Stable Cloud Solution",
      description:
        "Over 99.99% uptime with mobile apps for doctors and patients, backed by a decade of reliable service.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Patient-Centric Design",
      description:
        "24/7 appointment booking, instant notifications, easy feedback, and telemedicine services for better engagement.",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Affordable Pricing",
      description:
        "Transparent, modular pricing that supports scalability while keeping upfront investment low.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Established Trust",
      description:
        "Trusted by leading clinics, hospitals, and multi-chain facilities across India and overseas.",
    },
  ];

  const modules = [
    {
      id: "dashboard",
      icon: <LayoutDashboard className="w-6 h-6" />,
      title: "Dashboard",
      description:
        "Real-time view of all operations with patient records, billing, and appointments in one place for faster decision-making.",
    },
    {
      id: "billing",
      icon: <FileText className="w-6 h-6" />,
      title: "Billing",
      description:
        "Streamlined finances with accurate invoicing, automated receipts, multiple payment options, and real-time expense tracking.",
    },
    {
      id: "patient",
      icon: <UserCheck className="w-6 h-6" />,
      title: "Patient Management",
      description:
        "Complete digital records including demographics, medical history, treatment details, and billing for personalized care.",
    },
    {
      id: "opd",
      icon: <Stethoscope className="w-6 h-6" />,
      title: "OPD Module",
      description:
        "Manages registrations, queues, billing, consultant prescriptions, and follow-ups for organized outpatient care.",
    },
    {
      id: "ipd",
      icon: <Hospital className="w-6 h-6" />,
      title: "IPD Module",
      description:
        "Efficiently manages admissions, transfers, nursing care, discharges, and generates detailed billing and summaries.",
    },
    {
      id: "bed",
      icon: <Bed className="w-6 h-6" />,
      title: "Bed Management",
      description:
        "Real-time updates on bed availability, tracking occupied, reserved, and vacant beds for better planning.",
    },
    {
      id: "blood",
      icon: <Droplet className="w-6 h-6" />,
      title: "Blood Bank",
      description:
        "Manages donors, tracks blood stock, handles cross-matching, and monitors transfusions for safe blood supply.",
    },
    {
      id: "pharmacy",
      icon: <Pill className="w-6 h-6" />,
      title: "Medicine Management",
      description:
        "Inventory updates, stock alerts, expiry tracking, and automated billing for efficient medicine distribution.",
    },
    {
      id: "pathology",
      icon: <FlaskConical className="w-6 h-6" />,
      title: "Pathology",
      description:
        "Manages lab tests from booking to reporting with automated sample tracking and online report delivery.",
    },
    {
      id: "users",
      icon: <Lock className="w-6 h-6" />,
      title: "User Management",
      description:
        "Role-based access control for doctors, nurses, staff, and administrators ensuring security and accountability.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        transition={{ duration: 0.6 }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              className="text-5xl font-bold text-gray-900 mb-6"
              variants={fadeUp}
              transition={{ delay: 0.2 }}
            >
              Smart, Secure & Paperless Healthcare
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8"
              variants={fadeUp}
              transition={{ delay: 0.2 }}
            >
              Complete Hospital Management System bringing OPD, IPD, Billing,
              Pharmacy, Lab, and HR together on one secure platform – accessible
              anytime.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeUp}
              transition={{ delay: 0.3 }}
            >
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2">
                <span>Book Free Demo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition">
                Learn More
              </button>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition duration-300">
              <div className="bg-white rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">
                    Today's Overview
                  </span>
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "OPD Patients", value: "142", color: "blue" },
                    { label: "IPD Patients", value: "38", color: "green" },
                    { label: "Appointments", value: "24", color: "purple" },
                    { label: "Uptime", value: "99.9%", color: "orange" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className={`bg-${item.color}-50 p-4 rounded-lg`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <p
                        className={`text-2xl font-bold text-${item.color}-600`}
                      >
                        {item.value}
                      </p>
                      <p className="text-sm text-gray-600">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Hospital Management System?
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
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-blue-600 text-white w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Modules Section */}
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

      {/* Contact Section */}
      <ContactUs page="hms" />
    </div>
  );
}
