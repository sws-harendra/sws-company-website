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
        "Our hospital management system in Patna is designed in a way where all hospital departments stay connected and work together without confusion. From OPD to billing, this hospital ERP software in Patna keeps information updated in real time, reduces manual work for staff and helps hospitals provide faster, smoother and more accurate patient care every day.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Secure & Reliable",
      description:
        "Data security was one of the top concerns while building our hospital management software in Patna because patient security is must. With advanced security systems and strict control over module access to staff, our HMS software in Patna ensures patient records remain safe, confidential and fully compliant with healthcare data standards set by governing authorities.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: <Cloud className="w-7 h-7" />,
      title: "Stable Cloud Solution",
      description:
        "The one of the best hospital management system in Patna runs on a stable cloud setup that delivers more than 99.99 percent uptime for smooth daily operations. Doctors, staff, and management can safely access the system at any time from anywhere using web and mobile platforms without facing interruptions.",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Patient-Centric Design",
      description:
        "Designed keeping real hospital working style in mind our clinic and hospital management software in Patna supports round the clock appointment booking instant alerts digital records and telemedicine features. This hospital management system in Patna helps hospitals improve patient engagement while reducing pressure on the front desk staff.",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      icon: <DollarSign className="w-7 h-7" />,
      title: "Affordable Pricing",
      description:
        "Our hospital ERP software in Patna comes with a clear and modular pricing structure so hospitals and clinics can begin with what they need and expand later without difficulty. This hospital management software in Patna remains cost effective while still delivering all the essential features required for smooth hospital operations.",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Established Trust",
      description:
        "Trusted by clinics and hospitals across Bihar and all the nearby regions, our software is widely recognized as one of the best hospital management systems in Patna. This reliable HMS software in Patna supports growing healthcare facilities with consistent performance and dependable long-term support.",
      gradient: "from-cyan-500 to-blue-600",
    },
  ];

  const modules = [
    {
      id: "dashboard",
      icon: <LayoutDashboard className="w-6 h-6" />,
      title: "Dashboard",
      description:"The dashboard is the first thing a hospital Owner sees when He logins to One of the fastest growing Hospital management system in patna. Where the owner or the Administrator can monitor the entire functionality in real time . Instead of contacting different departments for their updates they can easily login their HMS designed by Startup Web Support from any device from anywhere.",
      color: "blue",
    },
    {
      id: "billing",
      icon: <FileText className="w-6 h-6" />,
      title: "Billing",
      description:"The Billing module is one of the most sensitive and used modules of any Hospital Management system . It automates and stores all the charges and payments and their ledger of each and every patient,be it OPD, IPD, Pathology or Pharmacy. For Hospitals who are looking for Reliable HMS software in Patna, This removes common human errors (such as calculation mistakes, delayed functionality due to billing errors) from the entire Billing system.Digital Billing software increases patient trust and reduces staff’s work load significantly.",
      color: "emerald",
    },
    {
      id: "patient",
      icon: <UserCheck className="w-6 h-6" />,
      title: "Patient Management",
      description:"Patient Registration Module Creates a single digital identity for every patient who ever visits the Hospital. Instead of reception staff maintaining all the patients data in a hard copy file , all the patient details are stored safely on cloud with a unique ID assigned to their name called UHID. any patient's data can be accessed instantly from anywhere in the entire Hospital Management system software using that unique ID. It ensures seamless patient data coordination between all the modules such as OPD , IPD, Pharmacy and Pathology department.",
      color: "violet",
    },
    {
      id: "opd",
      icon: <Stethoscope className="w-6 h-6" />,
      title: "OPD Module",
      description:"The OPD patient module is mainly designed to handle all the appointments of OPD at a single place, It manages doctors' consultations, patient appointments and service record at one place and can be accessed from anywhere in the Hospital .Hospitals using Hospital management system in Patna have reduced overcrowding ,improved doctor scheduling and ensured patient are attended without any hassle, It has a digital prescription module linked so that patients can easily understand the prescriptions and it also reduces doctors workload.so that doctors can focus only on healing the patients not maintaining their records.",
      color: "cyan",
    },
    {
      id: "ipd",
      icon: <Hospital className="w-6 h-6" />,
      title: "IPD Module",
      description:"The IPD module of Hospital management system by Startup Web Support manages the entire functionality of admitted patients from admission to discharge , It manages from Printing Admission slip to discharge certificate it handles everything, It assigns and track beds , doctor visits and nursing staff visits and notes , investigations ,medicines, charges, payments made to IPD department and also Discharge summaries. It also has a digital prescription module similar to the OPD module linked to reduce manual work of doctors and nursing staff.",
      color: "indigo",
    },
    {
      id: "bed",
      icon: <Bed className="w-6 h-6" />,
      title: "Bed Management",
      description:"Bed management provides real time data of total, available ,occupied and reserved beds across all the wards and rooms .Hospital staff or admin doesn't need to physically check bed availability or depending on phone calls .Hospitals using Hospital ERP software in Patna improves bed addition and reduction , patients admission, avoid overbooking and optimizes bed utilization , which ultimately improves bed management and patient and staff comfort.",
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
      description:"The medicine management module in HMS by Startup Web Support keeps track of medicine stock availability , sales, purchase inside the Hospital , Hospitals using Hospital management system in patna can prevent stock shortage, dump expired medicine stock and also give real time data of medicine sales, losses and profits and everything at one place . In hospitals this module reduces manual errors of medicine ordering and shortage by ending dependency on manual registers and ensures Hospitals have all the important medicines in stock all the time.",
      color: "amber",
    },
    {
      id: "pathology",
      icon: <FlaskConical className="w-6 h-6" />,
      title: "Pathology",
      description:"The pathology module in HMS by Startup Web Support manages all types of pathology tests, sample collection, reports and results history. It links the results of the tests directly to patients' unique ID making it easy for doctors, nurses and billing staff. Hospitals using Hospital management Software in Patna have solved all the problems related to the pathology department such as misplaced reports, delayed reports , and repeated tests due to missing data of previous tests while improving accuracy and saving time of Hospital Staff.",
      color: "teal",
    },
    {
      id: "birth",
      icon: <Lock className="w-6 h-6" />,
      title: "Birth Certificate",
      description:"The birth certificate module in Hospital ERP by SWS simplifies the process of generating and managing birth certificates. It fetches official birth records directly from Hospital data. Hospitals using hospital management software in Patna can generate an accurate birth certificate of a kid with their parents name and details verified by HMS in the format approved by proper authorities. This reduces administrative workload and avoids error which can cause legal or documentation issues later.",
      color: "purple",
    },
    {
      id: "death",
      icon: <Droplet className="w-6 h-6" />,
      title: "Death Certificate",
      description:"The Death Certificate Module ensures proper documentation of death records as per Hospital and administrative requirements Hospitals using Hospital management system in patna can generate Death certificates using patients records which are already present in IPD module , This helps patients' families receive every documentation required while ensuring accuracy and compliancy.",
      color: "purple",
    },
    {
      id: "users",
      icon: <Lock className="w-6 h-6" />,
      title: "User Management",
      description:"User management module controls Account and ID, password management for every Hospital staff such as Doctors, nurses, receptionist, pharmacists, lab technicians etc.every staff only see what they are supposed to see according to their work relevance .Hospitals implementing a hospital management system in Patna solves issues like data misuse,accidental changes, and security risks by ensuring proper access control of every staff within the hospital.",
      color: "purple",
    },
    {
      id: "hospital",
      icon: <UserCheck className="w-6 h-6" />,
      title: "Hospital Charge",
      description:"The Hospital Charge module maintains all the service charges including bed charge, OPD doctor charge , procedures, surgeries, nursing facilities and each and every charge in the hospital.Hospitals using hospital management software in Patna remove confusion caused by inconsistent pricing and manual charge calculation.charges are categorised by Types and added to a unique code to standardise the system.clear pricing system improves patients clarity and transparent billing.",
      color: "purple",
    },
    {
      id: "role",
      icon: <Lock className="w-6 h-6" />,
      title: "Role Management",
      description:"Role management modules give Hospital owner or administrator power to define responsibilities and permissions for different staff inside the hospital system . Hospitals using hospital ERP systems in Patna ensure smooth workflow by assigning clear system-level authority to each staff.This reduces operational confusion, improves accountability, and increases data security by preventing unauthorized access  and logins.",
      color: "purple",
    },
    {
      id: "operation",
      icon: <Bed className="w-6 h-6" />,
      title: "Integrated Operational Modules",
      description:"All modules inside the Hospital Management System in Patna are tightly integrated to ensure smooth data flow between departments. Hospitals using a cloud-based hospital management software in Patna benefit because information entered once is available wherever required, reducing repetitive work and human errors. This integration solves one of the biggest real-world hospital problems — disconnected departments working in silos — and helps hospitals operate faster, smarter, and more efficiently.",
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
                  Paperless Hospital management system in Patna
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                variants={fadeUp}
                transition={{ delay: 0.3 }}
              >
                A Complete Hospital Management System that brings OPD IPD
                Billing Pharmacy Lab Beds management and Inventory together on
                one secure platform which can be accessed anytime and from
                anywhere without difficulty.
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
              <ContactUs page="hms" />
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
              Hospital ERP software Built for Modern Healthcare
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This solution is trusted by leading healthcare providers who want
              smooth secure and efficient hospital operations that work well
              every day without complications.
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
              Essential modules covering OPD management, IPD management,
              pathology, pharmacy, billing, and other key hospital operations
              are designed to simplify daily workflows and help staff work
              faster with better accuracy.
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
                {/* <p className="mb-2">{module.description}</p> */}
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
