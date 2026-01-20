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
            At Startup Web Support, we strongly believe that a successful
            website always starts with strong domain hosting Patna support. This
            is something we have seen with many Patna based shops, startups and
            professionals. If your hosting or domain setup is weak, it directly
            affects website performance, security, and reliability. Whether you
            are planning a new website or shifting an existing one, choosing the
            right domain registration Patna and hosting solution plays a very
            important role in long term success.<br></br> As a trusted domain
            hosting company India, we work closely with startups, shop owners,
            professionals, and growing businesses across Patna and Bihar
            including areas like Danapur and Phulwari Sharif. We prefer keeping
            things simple and transparent. We explain everything in easy
            language, handle the technical work on our side, and make sure your
            website stays fast, secure, and properly online without giving you
            unnecessary stress.
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
            A domain name is simply your online address and it also represents
            your brand identity on the internet. Many local Patna businesses
            realized this when customers started searching for them online. When
            your domain is supported with reliable web hosting & domain support,
            your website opens faster stays secure and runs smoothly on mobile
            laptop and desktop without any trouble.<br></br> Selecting the right
            company for domain registration & hosting saves you from future
            problems like website downtime, slow loading speed and security
            issues. It also helps in building trust with your customers and even
            with search engines which is very important for long term growth
            especially for local service based businesses.
          </p>
        </motion.div>

        {/* DOMAIN REGISTRATION */}
        <div className="space-y-10">
          <h3 className="text-3xl font-semibold text-gray-900">
            Complete Domain Registration Services in Patna
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We provide easy, clear and completely hassle-free domain
            registration Patna services for small businesses, startups and
            growing companies. Many Patna based shop owners and consultants
            choose this service when they want to establish their brand online.
            Whether you are looking for an Indian domain or an international one
            our team personally guides you so you choose the right domain that
            matches your brand name and business plans.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Fast Setup",
                desc: " Your domain is activated quickly and securely so you can start your online work without delay just like many first time website owners in Patna.",
              },
              {
                title: "Right Extension Advice",
                desc: "We help you select the most suitable domain extension based on your business type and future growth.",
              },
              {
                title: "Renewal Management",
                desc: "We remind you on time so your domain never expires or causes website interruption which is a common issue for busy local businesses.",
              },
              {
                title: "DNS & Transfers",
                desc: " We handle domain transfers smoothly so you do not have to deal with technical confusion or stress.With our domain and hosting services, you’re not just buying a domain name. You’re building a professional online identity backed by reliable support.",
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
          <p className="text-gray-600 leading-relaxed">
            We provide reliable hosting services for small, medium and growing
            websites. This works well for Patna based startups as well as
            established local businesses. Whether your website gets very little
            traffic or thousands of visitors every day our hosting stays stable,
            smooth and efficient without creating problems. Fast loading pages
            that give visitors a better browsing experience Strong uptime
            assurance so your website remains live and accessible at all times
            Advanced security protection to keep your website safe from cyber
            threats Easy upgrade options so your hosting can grow along with
            your business without hassle
          </p>
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
            We work closely with small business owners in Patna and nearby areas
            and focus mainly on simple and dependable domain hosting services.
            This includes local shops, clinics, coaching centres and service
            providers. Our plans are affordable, easy to handle and made
            specially for local businesses who want to come online without
            getting stuck in technical confusion.
          </p>
        </motion.div>
      </div>
      
    </section>
  );
}
