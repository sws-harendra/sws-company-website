"use client";
import { motion } from "framer-motion";
import DomainHostingPackageSection from "./DomainHostingPackageSection";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function DomainHostingSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-24 text-center">

        {/* HERO */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Reliable Domain & Hosting Services in Patna for All Businesses
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            At Startup Web Support, we know one simple thing — a good website starts with the right domain hosting Patna service. 
            If your domain or hosting is weak, your website will also face problems. Whether you are starting a new website or shifting 
            an old website, having strong and safe hosting is very important for speed, security, and trust.
            As a trusted service provider for domain hosting and domain registration Patna, we help individuals, startups, shop owners, offices, 
            nd companies across Bihar to create and manage their online identity easily. We explain everything in simple words, handle the technical 
            work for you, and make sure your website stays live, fast, and secure without stress.
          </p>
        </motion.div>

        {/* WHY DOMAIN & HOSTING */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">
            Why Domain & Hosting Matters for Your Website
          </h3>
          <p className="text-gray-600 leading-relaxed">
            What is a Domain name? It is just like your address but for your website. It tells visitors where to find you online. 
            Pairing your Domain with right Hosting makes sure that your website loads fast , stays safe , and delivers a fast experience 
            on every device.
            It is Important to choose the best domain hosting company India so that you can trust them to handle both technical parts of 
            the site and also for long term trustability.
          </p>
        </motion.div>

        {/* DOMAIN REGISTRATION */}
        <div className="space-y-10">
          <h3 className="text-3xl font-semibold text-gray-900">
            Complete Domain Registration Services in Patna
          </h3>
            <p className="text-gray-600 leading-relaxed">We provide easy and complete domain registration Patna services so you can get your domain name without any tension. 
                If you want a local domain like .in or an international domain like .com, our team will guide you properly. We help you 
                choose a domain name that matches your business name and helps your brand grow online.</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Fast Setup",
                desc: "Fast and secure domain setup, so your website starts without delay and stays safe",
              },
              {
                title: "Right Extension Advice",
                desc: "Advice on domain extensions that fit your business, we explain clearly which one is better for your work",
              },
              {
                title: "Renewal Management",
                desc: "Renewal management and renewal reminders, so you don’t forget renewal and your domain stays active",
              },
              {
                title: "DNS & Transfers",
                desc: "Domain transfers and DNS management, we handle everything, you don’t need to worry. With our domain and hosting services, you don’t just register a name. You create your business identity online, properly and in the correct way, with full support.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* HOSTING SERVICES */}
        <div className="space-y-10">
          <h3 className="text-3xl font-semibold text-gray-900">
            Professional Domain Hosting Services for All Website Sizes
          </h3>
            <p className="text-gray-600 leading-relaxed">We give simple and reliable domain hosting services for all kinds of websites.
                If you have a small website or a big website with more visitors, our hosting will work properly. You don’t need to worry 
                about technical things, we take care of that.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-left">
            {[
              "Lightning-fast page load speeds, so your website opens fast",
              "Minimal downtime and strong uptime guarantees, your site stays online most of the time",
              "Enhanced security against cyber threats, your website stays safe",
              "Scalable resources as your site grows, you can upgrade easily when business grows",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-500 transition"
              >
                <p className="text-gray-700 font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* LOCAL BUSINESS FOCUS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-blue-50 border border-blue-100 rounded-3xl p-12 max-w-5xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Hosting Solutions Built for Small & Local Businesses
          </h3>
          <p className="text-gray-700 leading-relaxed">
            We specialize in domain hosting for small businesses in Patna and
            across Bihar. Our services are simple, affordable, and designed to
            help local businesses come online and compete confidently—without
            unnecessary technical complexity.
          </p>
        </motion.div>

      </div>
      <DomainHostingPackageSection/>
    </section>
  );
}
