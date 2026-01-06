"use client";

import { motion } from "framer-motion";

const industrySeoData = [
  {
    title: "SEO for E-Commerce Websites",
    desc: "We help online sellers rank their products on Google so customers find them easily and place real orders, not just visit the website."
  },
  {
    title: "SEO for Healthcare Providers",
    desc: "Clinics, hospitals, and diagnostic centers benefit from local SEO when people search for nearby doctors, tests, or treatments."
  },
  {
    title: "SEO for Real Estate Companies",
    desc: "Buyers usually search area-wise before calling. Our SEO helps real estate businesses appear in local property searches."
  },
  {
    title: "SEO for Educational Institutions",
    desc: "Schools, colleges, and coaching centers rank better when parents and students search for trusted education options nearby."
  },
  {
    title: "SEO for Restaurants & Hotels",
    desc: "We optimize your business for “near me” searches so hungry customers and travelers can easily find you."
  },
  {
    title: "SEO for Automotive Businesses",
    desc: "Vehicle dealers and service centers get more calls when people search for quick and nearby automotive help."
  },
  {
    title: "SEO for Legal & Financial Services",
    desc: "Clients prefer reliable professionals close to their location. Our SEO builds trust and visibility for lawyers and financial advisors."
  }
];

const IndustrySeoCard = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Industry-Specific SEO Solutions
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Every business is different, and one SEO strategy does not fit all.
            We design customized SEO plans based on how your business actually works on the ground.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {industrySeoData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
          <p className="text-center mt-8">With these customized strategies, local businesses start appearing in the right searches, get genuine calls and visits, and slowly build trust in their area.</p>
      </div>
    </section>
  );
};

export default IndustrySeoCard;
