"use client";
import { useState } from "react";
import { motion } from "framer-motion";


const introCard = [
  {
    title: "A Strategic SEO Company in Patna Focused on Real Business Growth",
    short:
      "Every successful SEO campaign starts with a proper plan. As an experienced SEO services company in Bihar, we first try to understand what your business wants to achieve, who your customers are, and how your competitors are performing online. Our team of SEO experts in Patna carefully studies your competitors and the local market through detailed competitive SEO analysis and market research to find real growth opportunities that suit your industry.",
    full:
      "Whether you are a startup, a growing local business, or an established enterprise, our SEO strategy development process focuses on improving your website in a way that brings in the right kind of visitors—people who are genuinely interested in your services and more likely to convert."
  },
  {
    title: "Advanced Keyword Research and Content Optimization",
    short:
      "Strong SEO results depend on choosing the right audience and the right words. Our keyword research services are focused on finding the search terms that your customers are already using when they look for services online. Instead of picking random keywords, we carefully study search trends, competition, and user intent to understand what actually brings enquiries and leads.",
    full:
      "After finalizing the keywords, our team works on content optimization in a way that improves clarity and usefulness while keeping the writing natural and easy to read. This approach helps your website perform better for search engine optimization in Patna, without making the content sound forced or sales-heavy."
  },
  {
    title: "On-Page and Technical SEO Services That Strengthen Your Website",
    short:
      "Our on page SEO services focus on improving all the important parts of your website, such as headings, internal links, meta tags, and overall content structure. We make sure everything is arranged properly so search engines can easily understand your pages. At the same time, we work on better user experience by improving page clarity and keeping the content well-organized and easy to read.",
    full:
      "Along with this, our technical SEO services take care of backend issues like website speed, mobile responsiveness, crawlability, indexing, and site architecture. Fixing these technical areas plays an important role in website optimization and helps your site maintain long-term ranking stability on search engines."
  },
  {
    title: "Reliable Off-Page SEO and Link Building Services",
    short:
      "Authority plays a big role in SEO success. As a professional SEO agency in Bihar, we provide ethical and long-term off page SEO services that help build a strong and trustworthy online presence for your business. Our link building services focus on getting quality backlinks from relevant and reliable websites, which helps improve domain authority and overall search visibility.",
    full:
      "This well-planned off-page approach supports better Google ranking services and keeps your website safe from sudden drops caused by search engine algorithm changes."
  },
  {
    title: "Local SEO Services for Businesses in Patna and Nearby Areas",
    short:
      "If your business works within a specific area, local SEO services become very important. We improve your Google Business Profile, manage local citations, and work on location-based keywords so your business shows up in local searches and map listings when nearby customers are looking online.",
    full:
      "Our SEO for local business solutions are best suited for service providers, shops, clinics, and offices that want to attract customers from nearby locations and turn local searches into real visits and enquiries."
  }
];



const SeoInfoCard = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-6">

        {introCard.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {card.title}
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              {card.short}

              {expandedIndex === index && (
                <>
                  <br />
                  <br />
                  {card.full}
                </>
              )}
            </p>

            <button
              onClick={() => toggleReadMore(index)}
              className="text-blue-600 font-semibold hover:underline"
            >
              {expandedIndex === index ? "Read Less ←" : "Read More →"}
            </button>
          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default SeoInfoCard;
