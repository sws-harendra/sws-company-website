"use client";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function DomainHostingPackageSection() {
  return (
    <section className="bg-sky-500 py-24 mt-8">
      <div className="max-w-7xl mx-auto px-6 space-y-24 text-center">

        {/* HERO */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Affordable Web Hosting & Domain Packages
          </h2>
          <p className="mt-6 text-lg text-white leading-relaxed">
           We provide simple and useful domain registration & hosting packages where everything comes together in one place. 
           You don’t have to handle many things separately. This makes website work easy and removes technical tension, especially 
           for business owners who want to focus more on business and less on technical setup.
            We also give cheap domain hosting India options that work properly and are reliable. Even though pricing is affordable, 
            quality is not compromised. Our packages include:

          </p>
        </motion.div>

        {/* PACKAGE CARDS */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              title: "Domain Registration",
              desc: "Smooth and secure domain registration without confusion.",
            },
            {
              title: "Optimized Web Hosting",
              desc: "Fast and reliable hosting for smooth website performance.",
            },
            {
              title: "SSL & Security",
              desc: "SSL certificates and protection to keep your website safe.",
            },
            {
              title: "Business Email (Optional)",
              desc: "Professional email hosting with your own domain name.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h4>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* EMAIL HOSTING */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-3xl font-semibold text-white mb-4">
            Domain Hosting with Email — Professional Communication for Your Business
          </h3>
          <p className="text-white leading-relaxed mb-8">
            Using a professional email makes a good impression on customers. With our domain hosting with email services, you can 
            create business email IDs using your own domain name, like yourname@yourbusiness.com. This looks more serious and trustworthy 
            than normal free emails.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              "Better brand recognition",
              "Reliable email delivery & storage",
              "Easy setup with popular email clients",
              "Support for multiple email accounts",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <p className="text-gray-700 font-medium">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SMALL BUSINESS HOSTING */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-3xl font-semibold text-white mb-4">
            Tailored Hosting for Small & Growing Businesses
          </h3>
          <p className="text-white leading-relaxed mb-8">
           For many businesses in Patna and Bihar, price and performance both matter. Our domain hosting for small business plans are 
           made keeping this in mind. They are simple to use and work smoothly for daily business needs.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Easy-to-manage dashboards, so you can handle basic things without confusion",
              "Flexible storage and bandwidth, according to your website size",
              "Security features like backups and malware protection, to keep your data safe",
              "One-click installs for popular platforms (like WordPress), so website setup becomes easy",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          
          </div>
            <p className="text-center text-white mt-8">We support small business owners from the beginning. You can focus on growing your business, while we take care of the
                domain and hosting part without giving you technical stress.</p>
        </motion.div>

        {/* WHY CHOOSE */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-blue-50 border border-blue-100 rounded-3xl p-12 max-w-6xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Why Choose Startup Web Support for Domain & Hosting?
          </h3>
            <p>When you choose the right web hosting & domain service, many problems get solved on their own. It saves money, time, 
                and daily headache. That is why many business people choose Startup Web Support.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                title: "Stability & Performance",
                desc: "We use good hosting systems. Because of that, your website opens fast and usually stays live. Customers don’t face loading problem again and again.",
              },
              {
                title: "Expert Technical Assistance",
                desc: "Our team knows this work well. As a domain hosting company India, we help you from the first day — domain setup, hosting setup, and even small issues later. We explain things in simple words.",
              },
              {
                title: "Affordable yet High-Quality Solutions",
                desc: "We keep pricing reasonable. Not too costly, not confusing. Whether you are just starting or already doing business, our plans are practical.",
              },
              {
                title: "All-in-One Service",
                desc: "With domain registration Patna, email hosting, and web hosting together, you don’t need to run to different people. Everything is managed in one place.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-semibold text-white mb-4">
            Get Started with Domain Hosting Services in Patna Today
          </h3>
          <p className="text-white leading-relaxed">
            If you are planning to register a domain or start your website with proper hosting, you can contact Startup Web Support. 
            We are your local support for domain hosting Patna, domain registration Patna, and complete web infrastructure services. 
            You don’t need to manage everything alone, we are here to help.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
