"use client";

import { motion } from "framer-motion";

const industrySeoData = [
  {
    title: "SEO for E-Commerce Websites",
    desc: " We improve product visibility so online stores do not just get visitors but real orders as well. This is the kind of practical result businesses expect from a best seo company in India that understands how online selling actually works."
  },
  {
    title: "SEO for Healthcare Providers",
    desc: "Clinics and hospitals benefit a lot from strong local SEO. We help patients easily find nearby doctors clinics and hospitals when they search for medical services in their area."
  },
  {
    title: "SEO for Real Estate Companies",
    desc: "Property searches are mostly location based. Our SEO work helps real estate businesses appear in the right local searches at the right time so genuine buyers and renters can reach out easily."
  },
  {
    title: "SEO for Educational Institutions",
    desc: " Schools colleges and coaching centers get better visibility when parents and students search for trusted local options. We help educational institutions stand out in local search results."
  },
  {
    title: "SEO for Restaurants & Hotels",
    desc: "We optimize restaurant and hotel listings for local searches so more nearby people discover your business leading to higher footfall and more bookings."
  },
  {
    title: "SEO for Automotive Businesses",
    desc: "Car dealers workshops and service centers receive more calls and enquiries when local automotive searches are properly optimized for their area."
  },
  {
    title: "SEO for Legal & Financial Services",
    desc: "In legal and financial services trust and location both matter a lot. Our SEO strategies improve visibility for professionals so nearby clients can easily find reliable services."
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
            Every industry works differently and needs a different SEO approach. We create customized SEO plans based on real business requirements in Patna and Bihar so the strategy actually supports growth instead of following a one size fits all method.
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
