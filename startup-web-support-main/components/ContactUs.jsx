"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import contactService from "@/services/contact.service";

const ContactUs = ({
  title = "Get Started Today",
  subtitle = "Transform your healthcare facility with our comprehensive management system.",
  buttonText = "Send",
  primaryColor = "from-blue-600 to-[#0197DD]",
  accentColor = "from-blue-50 to-purple-50",
  page = "/",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setStatus("");

    try {
      await contactService.createContact(formData);
      setStatus("✅ Message sent successfully!");
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        pageUsed: page,
        subject: "",
      });
    } catch (err) {
      setStatus("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      // className={`py-20 bg-gradient-to-b ${accentColor} relative overflow-hidden`}
    >
      {/* <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-tr from-blue-300/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-bl from-purple-300/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
      </div> */}

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div> */}

        <div className="backdrop-blur-lg bg-white/60 border border-white/30 shadow-2xl rounded-2xl p-8 md:p-10 transition hover:shadow-3xl">
          {/* Full Name */}
          <div className="mb-6">
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
          </div>

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
                placeholder: "+1 234 567 890",
              },
            ].map((field, i) => (
              <div key={i}>
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
              </div>
            ))}
          </div>

          {/* Subject */}
          <div className="mb-6">
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
          </div>

          {/* Button */}
          <button
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
          </button>

          {status && (
            <p className="text-center mt-4 text-sm font-medium text-gray-700">
              {status}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
