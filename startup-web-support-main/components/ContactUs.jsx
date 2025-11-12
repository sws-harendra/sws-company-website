"use client";
import React, { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import contactService from "@/services/contact.service";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";

const ContactUs = ({
  title = "Get Started Today",
  subtitle = "Transform your healthcare facility with our comprehensive management system.",
  buttonText = "Send",
  primaryColor = "from-blue-600 to-[#0197DD]",
  accentColor = "from-blue-50 to-purple-50",
  page = "/",
  showTitle = false,
  background = "bg-white/60",
  showClose = false, // 🔹 Show close button when true
  onClose, // 🔹 Close handler
}) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    pageUsed: page,
    subject: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [showConfetti, setShowConfetti] = useState(false); // 🎉 control confetti
  const { width, height } = useWindowSize();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setStatus("");
    setShowConfetti(false);
    try {
      await contactService.createContact(formData);
      setStatus("✅ Message sent successfully!");
      setShowConfetti(true); // 🎉 trigger confetti
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        pageUsed: page,
        subject: "",
      });
      // 🎉 Stop confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 5000);
      onClose();
    } catch (err) {
      setStatus("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative">
      {/* 🎊 Confetti layer */}
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
        {showTitle && (
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`backdrop-blur-lg ${background} border border-white/30 shadow-2xl rounded-2xl p-8 md:p-10 transition hover:shadow-3xl relative`}
        >
          {/* 🔹 Close button only shows when showClose = true */}
          {showClose && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
              aria-label="Close contact form"
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}

          {/* Full Name */}
          <motion.div variants={itemVariants} className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="John Doe"
            />
          </motion.div>

          {/* Email & Phone */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {[
              {
                name: "email",
                label: "Email *",
                type: "email",
                placeholder: "you@example.com",
              },
              {
                name: "phone",
                label: "Phone *",
                type: "tel",
                placeholder: "+91 234 567 890",
              },
            ].map((field, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                transition={{ delay: i * 0.1 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={field.placeholder}
                />
              </motion.div>
            ))}
          </div>

          {/* Subject */}
          <motion.div variants={itemVariants} className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="How can we help?"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={buttonVariants}
            disabled={loading}
            onClick={handleSubmit}
            className={`w-full py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-2xl transition-all bg-gradient-to-r ${primaryColor}`}
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                <span>{buttonText}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>

          {status && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-4 text-sm font-medium text-gray-700"
            >
              {status}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
