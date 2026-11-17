"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  IoCloseOutline,
} from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  PhoneCall,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import contactService from "@/services/contact.service";
import { toast } from "sonner";
import * as fpixel from "@/lib/fpixel";

const WHATSAPP_PHONE = "7479499718";
const DISPLAY_PHONE = "+91 7479499718";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    pageUsed: "/contact-us",
    subject: "",
    message: "",
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setSubmitError("");
    try {
      await contactService.createContact(formData);
      setSubmittedData({ ...formData });
      setShowSuccessModal(true);

      // Meta Pixel Lead tracking
      fpixel.event("Lead", {
        content_name: "Contact Page Form Submission",
        form_name: "Contact Us Page",
        subject: formData.subject || "General Inquiry",
      });
      fpixel.customEvent("FormSubmission", {
        form_name: "Contact Us Page",
      });

      setFormData({
        fullname: "",
        email: "",
        phone: "",
        pageUsed: "/contact-us",
        subject: "",
        message: "",
      });
      toast.success("Message sent successfully!");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again.";
      setSubmitError(message);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppUrl = () => {
    const activeSubject =
      submittedData?.subject || formData.subject || "IT Services";
    const activeName = submittedData?.fullname || formData.fullname || "Client";

    const msg =
      `Hello Startup Web Support! I just submitted an inquiry on your Contact Us page.\n\n` +
      `• Name: ${activeName}\n` +
      `• Requirement: ${activeSubject}\n\n` +
      `I would like a rapid quick solution and quotation. Please assist me!`;

    return `https://wa.me/91${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  const handleWhatsAppClick = () => {
    fpixel.event("Contact", {
      method: "WhatsApp",
      content_name: "Contact Page WhatsApp CTA",
    });
    fpixel.customEvent("WhatsAppClick", {
      phoneNumber: WHATSAPP_PHONE,
      source: "Contact Page Success Modal",
      subject: submittedData?.subject || formData.subject,
    });
  };

  return (
    <section className="bg-slate-50/50 dark:bg-slate-950/50 py-16 lg:py-24 overflow-hidden relative">
      {/* ================= SUCCESS MODAL WITH RAPID QUICK SOLUTION ON WHATSAPP ================= */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden"
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 12, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 rounded-full p-2 text-gray-400 hover:text-gray-700 dark:hover:text-white transition hover:bg-gray-100 dark:hover:bg-slate-800"
                aria-label="Close dialog"
              >
                <IoCloseOutline className="text-2xl" />
              </button>

              {/* Glowing emerald check icon */}
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 ring-8 ring-emerald-50 dark:ring-emerald-950/30">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Message Sent Successfully!
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Thank you,{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {submittedData?.fullname || "there"}
                </span>
                ! We’ve received your message and will review it shortly.
              </p>

              {/* 🔥 RAPID QUICK SOLUTION WHATSAPP CARD 🔥 */}
              <div className="mt-5 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/10 border-2 border-emerald-500/30 text-center relative overflow-hidden shadow-inner">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white uppercase tracking-wider mb-2.5 shadow-sm">
                  <Zap className="w-3.5 h-3.5 fill-current" /> Rapid Quick
                  Solution
                </span>
                <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1.5">
                  Need an Immediate Reply or Urgent Quote?
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 max-w-sm mx-auto mb-4 leading-relaxed">
                  Skip the queue! Connect directly with our lead specialist
                  right now on WhatsApp for instant project estimation & support.
                </p>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base py-3.5 px-5 rounded-xl shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-[1.02] active:scale-[0.98] transition-all group"
                >
                  <BsWhatsapp className="w-5 h-5 animate-bounce" />
                  <span>Contact Us on WhatsApp Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="mt-3.5 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    Call:{" "}
                    <a
                      href={`tel:${WHATSAPP_PHONE}`}
                      className="font-semibold text-gray-800 dark:text-gray-200 hover:underline"
                    >
                      {DISPLAY_PHONE}
                    </a>
                  </span>
                  <span>•</span>
                  <span className="text-emerald-600 font-medium">
                    Replies in ~2 mins
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ================= LEFT COLUMN: HERO ILLUSTRATION & CTA ================= */}
          <motion.div
            className="lg:col-span-5 order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Rapid Business Solutions
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Let&apos;s Build Something Great Together
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Have a new project or looking to upgrade your tech stack? Our
                dedicated engineers and marketers are ready to assist you.
              </p>

              {/* The CTA illustration image */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-sky-400/10 rounded-full blur-3xl transform scale-90" />
                <Image
                  src="/cta.png"
                  alt="Startup Web Support Helpdesk"
                  width={340}
                  height={300}
                  className="relative z-10 w-full max-w-[260px] sm:max-w-[300px] object-contain drop-shadow-md hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Value items */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Free 30-min strategy & feasibility roadmap</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Direct WhatsApp support for rapid solution</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>Transparent milestone-based development</span>
                </div>
              </div>

              {/* Direct Quick WhatsApp Button */}
              <div className="mt-6">
                <a
                  href={`https://wa.me/91${WHATSAPP_PHONE}?text=${encodeURIComponent(
                    "Hello Startup Web Support! I would like to consult with an expert regarding my project."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm py-3.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <BsWhatsapp className="w-5 h-5" />
                  <span>Chat on WhatsApp Directly</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: MODERN FORM ================= */}
          <motion.div
            className="lg:col-span-7 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl">
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Fast Response • Dedicated IT Consultants
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  Get In Touch With Us
                </h2>
                <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Ready to elevate your digital presence? Send us your
                  requirements and get a customized proposal within hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="fullname"
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
                        placeholder="Your Full Name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
                        placeholder="e.g. +91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Subject / Service
                    </label>
                    <div className="relative">
                      <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
                        placeholder="e.g. Web / App Development"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Your Message / Requirements
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white dark:focus:bg-slate-800 transition-all resize-none"
                      placeholder="Brief details about your project or inquiry..."
                    />
                  </div>
                </div>

                {submitError && (
                  <p className="text-xs text-red-500 mt-1">{submitError}</p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl text-white font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 transition-all duration-200 bg-gradient-to-r from-sky-600 via-blue-600 to-[#0197DD] hover:opacity-95 active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 pt-1 text-xs text-gray-500 dark:text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    100% Confidential • Direct Contact & Fast Turnaround
                  </span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
