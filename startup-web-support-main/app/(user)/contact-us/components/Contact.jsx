"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoSendOutline, IoCloseOutline } from "react-icons/io5";
import contactService from "@/services/contact.service";
import { toast } from "sonner";

const contactVideoUrl = "/hero-bg.mp4"; // Example: public/videos/contact-video.mp4

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    pageUsed: "/contact-us",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  // Renamed imageVariants to mediaVariants for clarity
  const mediaVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        duration: 1,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        duration: 1,
        delay: 0.2,
      },
    },
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError("");
    try {
      await contactService.createContact(formData);
      setShowSuccessModal(true);
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

  return (
    <section className="bg-white py-16 overflow-hidden">
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 12, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                    Success
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">
                    Message sent
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                  aria-label="Close success dialog"
                >
                  <IoCloseOutline className="text-2xl" />
                </button>
              </div>

              <p className="mt-4 text-gray-600">
                Thanks for reaching out. We’ve received your message and will
                get back to you soon.
              </p>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
              >
                Great, thanks
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Video */}
          <motion.div
            className="flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={mediaVariants} // Use the renamed variant
          >
            {/* Replaced img with video */}
            <video
              src={contactVideoUrl} // Use your video path
              alt="Contact Us Video"
              className="w-full h-auto rounded-lg shadow-lg" // Added shadow
              autoPlay
              loop
              muted
              playsInline // Important for mobile autoplay
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>

          {/* Right Column - Content & Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={formVariants}
          >
            <motion.p
              className="text-sm font-semibold uppercase tracking-wider text-sky-600 mb-2"
              variants={itemVariants}
            >
              CONTACT
            </motion.p>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4"
              variants={itemVariants}
            >
              Get In Touch With Us
            </motion.h2>

            <motion.p
              className="text-gray-700 text-lg leading-relaxed mb-8"
              variants={itemVariants}
            >
              Ready to elevate your digital presence? Contact us at Startup Web
              Support for tailored IT solutions that drive growth.
            </motion.p>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={containerVariants} // Stagger children within the form
            >
              {/* Form fields remain the same */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                    placeholder="Your Name"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                    placeholder="your.email@example.com"
                  />
                </motion.div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                    placeholder="Your Phone Number"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                    placeholder="Reason for contacting"
                  />
                </motion.div>
              </div>
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="2"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                  placeholder="Your message..."
                ></textarea>
              </motion.div>
              {submitError && (
                <motion.p
                  variants={itemVariants}
                  className="text-sm font-medium text-red-600"
                >
                  {submitError}
                </motion.p>
              )}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-sky-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <IoSendOutline className="text-xl" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
