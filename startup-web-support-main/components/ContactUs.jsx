"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  X,
  User,
  Mail,
  Phone,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Loader2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import contactService from "@/services/contact.service";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion, AnimatePresence } from "framer-motion";
import * as fpixel from "@/lib/fpixel";

const WHATSAPP_PHONE = "7479499718";
const DISPLAY_PHONE = "+91 7479499718";

const ContactUs = ({
  title = "Get in Touch With Us",
  subtitle = "Have a project in mind or need expert IT solutions? Let's talk.",
  buttonText = "Get Free Consultation",
  primaryColor = "from-blue-600 via-sky-600 to-[#0197DD]",
  page = "/",
  showTitle = false,
  showClose = false,
  onClose,
  showCtaSide = true,
  ctaImage = "/cta.png",
  className = "",
  style = {},
}) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    pageUsed: page,
    subject: "Website development",
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullname.trim() || formData.fullname.trim().length < 2) {
      newErrors.fullname = "Please enter your full name";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    const phoneClean = formData.phone.replace(/[^0-9]/g, "");
    if (!formData.phone.trim() || phoneClean.length < 7) {
      newErrors.phone = "Please enter a valid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitError("");
    setShowConfetti(false);

    try {
      await contactService.createContact(formData);
      setSubmittedData({ ...formData });
      setIsSubmitted(true);
      setShowConfetti(true);

      // Meta Pixel Lead tracking
      fpixel.event("Lead", {
        content_name: "Contact Form Submission",
        form_name: "ContactUs",
        page: page,
        subject: formData.subject || "General Inquiry",
      });
      fpixel.customEvent("FormSubmission", {
        form_name: "ContactUs",
        page: page,
      });

      // Stop confetti after 5 seconds but keep the success state visible for WhatsApp CTA
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again or chat with us on WhatsApp.";
      setSubmitError(msg);
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppUrl = (customMessage) => {
    const activeSubject =
      submittedData?.subject || formData.subject || "IT Services";
    const activeName = submittedData?.fullname || formData.fullname || "Client";

    const defaultMsg =
      customMessage ||
      `Hello Startup Web Support! I just submitted an inquiry on your website.\n\n` +
        `• Name: ${activeName}\n` +
        `• Requirement: ${activeSubject}\n` +
        `• Page: ${page}\n\n` +
        `I am looking for a rapid quick solution and quotation. Please assist me!`;

    return `https://wa.me/91${WHATSAPP_PHONE}?text=${encodeURIComponent(
      defaultMsg,
    )}`;
  };

  const handleWhatsAppClick = (source = "Post-Submit Rapid Solution") => {
    fpixel.event("Contact", {
      method: "WhatsApp",
      content_name: `Contact Form - ${source}`,
    });
    fpixel.customEvent("WhatsAppClick", {
      phoneNumber: WHATSAPP_PHONE,
      source: source,
      subject: submittedData?.subject || formData.subject,
    });
  };

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
      phone: "",
      pageUsed: page,
      subject: "Website development",
    });
    setSubmittedData(null);
    setIsSubmitted(false);
    setSubmitError("");
    setErrors({});
  };

  return (
    <section id="contact" className={`relative ${className}`} style={style}>
      {/* 🎊 Confetti layer */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[10000]">
          <Confetti
            width={width || 1200}
            height={height || 800}
            numberOfPieces={250}
            recycle={false}
          />
        </div>
      )}

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {showTitle && (
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/70 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 mb-3">
              <Zap className="w-3.5 h-3.5" /> Fast Response Guaranteed
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        >
          {/* Close button for modals */}
          {showClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all shadow-sm"
              aria-label="Close contact dialog"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div
            className={
              showCtaSide
                ? "grid grid-cols-1 lg:grid-cols-12 items-stretch"
                : "max-w-xl mx-auto"
            }
          >
            {/* ================= LEFT SIDE: FORM OR SUCCESS STATE ================= */}
            <div
              className={`${
                showCtaSide ? "lg:col-span-7" : "w-full"
              } p-6 sm:p-8 lg:p-10 flex flex-col justify-center relative`}
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  /* Form View */
                  <motion.div
                    key="form-view"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        {title || "Send us a Message"}
                      </h3>
                      <p className="mt-1.5 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        {subtitle ||
                          "Fill in your details below and our tech specialists will reach out promptly."}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleInputChange}
                            placeholder=""
                            className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/70 border ${
                              errors.fullname
                                ? "border-red-400 focus:ring-red-200"
                                : "border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500"
                            } text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-800 transition-all`}
                          />
                        </div>
                        {errors.fullname && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.fullname}
                          </p>
                        )}
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder=""
                              className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/70 border ${
                                errors.email
                                  ? "border-red-400 focus:ring-red-200"
                                  : "border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500"
                              } text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-800 transition-all`}
                            />
                          </div>
                          {errors.email && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder=""
                              className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/70 border ${
                                errors.phone
                                  ? "border-red-400 focus:ring-red-200"
                                  : "border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500"
                              } text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-800 transition-all`}
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Subject / Service Selection */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                          Service Needed
                        </label>
                        <div className="relative">
                          <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-10 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all appearance-none cursor-pointer"
                          >
                            <option value="Website development">
                              Website Development
                            </option>
                            <option value="app development">
                              Mobile App Development (iOS & Android)
                            </option>
                            <option value="software development">
                              Custom Software & ERP Development
                            </option>
                            <option value="google ads">
                              Google Ads & PPC Campaigns
                            </option>
                            <option value="facebook ads">
                              Facebook & Meta Ads
                            </option>
                            <option value="seo">
                              SEO (Search Engine Optimization)
                            </option>
                            <option value="social media management">
                              Social Media Management
                            </option>
                            <option value="company registration">
                              Company Registration & Legal Compliance
                            </option>
                            <option value="General Inquiry">
                              Other / General Consultation
                            </option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      {submitError && (
                        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 dark:text-red-400">
                          {submitError}
                        </div>
                      )}

                      {/* Submit CTA */}
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-2 py-3.5 px-6 rounded-xl text-white font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-200 bg-gradient-to-r ${primaryColor} hover:opacity-95 active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer`}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            <span>Submitting Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>{buttonText}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      {/* Trust guarantee */}
                      <div className="flex items-center justify-center gap-2 pt-1 text-xs text-gray-500 dark:text-gray-400">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Fast Direct Call / WhatsApp Follow-up</span>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  /* ================= SUCCESS STATE WITH RAPID WHATSAPP CTA ================= */
                  <motion.div
                    key="success-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="py-2 text-center"
                  >
                    {/* Checkmark icon with glow */}
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 ring-8 ring-emerald-50 dark:ring-emerald-950/30">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                      Inquiry Received!
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                      Thank you,{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {submittedData?.fullname || "valued client"}
                      </span>
                      ! We have received your inquiry for{" "}
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {submittedData?.subject || "our services"}
                      </span>
                      .
                    </p>

                    {/* 🔥 HIGHLIGHTED RAPID QUICK SOLUTION WHATSAPP CARD 🔥 */}
                    <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/10 border-2 border-emerald-500/30 text-center relative overflow-hidden shadow-inner">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white uppercase tracking-wider mb-2.5 shadow-sm">
                        <Zap className="w-3.5 h-3.5 fill-current" /> Rapid Quick
                        Solution
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Need an Immediate Reply or Urgent Quote?
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-5 leading-relaxed">
                        Don’t wait for an email callback! Connect directly with
                        our lead technical consultant right now on WhatsApp for
                        instant project estimation and instant onboarding.
                      </p>

                      {/* Giant glowing WhatsApp button */}
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          handleWhatsAppClick("Post-Submit Rapid Solution")
                        }
                        className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-base sm:text-lg py-4 px-6 rounded-xl shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
                      >
                        <BsWhatsapp className="w-6 h-6 animate-bounce" />
                        <span>Chat on WhatsApp for Rapid Solution</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </a>

                      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-4 h-4 text-emerald-600" />
                          Or Call:{" "}
                          <a
                            href={`tel:${WHATSAPP_PHONE}`}
                            className="font-semibold text-gray-800 dark:text-gray-200 hover:underline"
                          >
                            {DISPLAY_PHONE}
                          </a>
                        </span>
                        <span>•</span>
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          Average reply in 2 mins
                        </span>
                      </div>
                    </div>

                    {/* Reset button & close */}
                    <div className="mt-5 flex items-center justify-center gap-4">
                      <button
                        onClick={resetForm}
                        className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
                      >
                        Submit another inquiry
                      </button>
                      {showClose && onClose && (
                        <>
                          <span className="text-gray-300 dark:text-gray-700">
                            •
                          </span>
                          <button
                            onClick={onClose}
                            className="text-xs sm:text-sm text-gray-500 hover:text-gray-800 dark:hover:text-white font-medium cursor-pointer"
                          >
                            Close dialog
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ================= RIGHT SIDE: CTA HERO ILLUSTRATION ================= */}
            {showCtaSide && (
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-50/50 dark:from-slate-800/90 dark:via-slate-850 dark:to-slate-900 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute -top-20 -right-20 w-52 h-52 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top header */}
                <div className="relative z-10">
                  <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    Get transparent consultation and fast project kickoff.
                  </p>
                </div>

                {/* Illustration with shadow */}
                <div className="relative my-4 sm:my-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/15 via-sky-300/10 to-indigo-400/15 rounded-full blur-2xl transform scale-90" />
                  <div className="relative z-10 w-full max-w-[220px] sm:max-w-[260px] aspect-square flex items-center justify-center">
                    <Image
                      src={ctaImage}
                      alt="Startup Web Support Helpdesk"
                      width={340}
                      height={300}
                      className="w-full h-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                </div>

                {/* Bullet points & quick WhatsApp */}
                <div className="relative z-10 space-y-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  {/* Fast WhatsApp direct action pill */}
                  <a
                    href={getWhatsAppUrl(
                      "Hi! I’d like to speak with a specialist directly about my project.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleWhatsAppClick("Right CTA Sidebar")}
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all"
                  >
                    <BsWhatsapp className="w-4 h-4 text-emerald-600" />
                    <span>Quick Chat on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
