"use client";
import { useState } from "react";
import { motion } from "framer-motion";


const introCard = [
  {
    title: "A Strategic SEO Company in Patna Focused on Real Business Growth",
    short:
      "Every SEO campaign starts with understanding what you actually want to achieve from your business. As a trusted provider of seo services in bihar, we first study your competition and understand what your customers are really searching for before planning anything further.",
    full:
      "Whether you are running a startup or an established business our main focus is to bring the right kind of visitors to your website people who are genuinely interested in your services and have a higher chance of becoming real customers."
  },
  {
    title: "Advanced Keyword Research and Content Optimization",
    short:
      "Effective SEO works only when the right keywords are used in the right way. Our keyword research is based on how real people actually search online not on guesswork or assumptions. Because of this practical approach our SEO Service in Patna is known for bringing genuine enquiries and quality leads for local businesses.",
    //full:
     // "After finalizing the keywords, our team works on content optimization in a way that improves clarity and usefulness while keeping the writing natural and easy to read. This approach helps your website perform better for search engine optimization in Patna, without making the content sound forced or sales-heavy."
  },
  {
    title: "On-Page and Technical SEO Services That Strengthen Your Website",
    short:
      " We work on headings internal linking and content structure so search engines can clearly understand what each page is about. At the same time we improve backend performance so your website stays stable and delivers consistent search engine optimization in patna results over the long run.",
    //full:
      //"Along with this, our technical SEO services take care of backend issues like website speed, mobile responsiveness, crawlability, indexing, and site architecture. Fixing these technical areas plays an important role in website optimization and helps your site maintain long-term ranking stability on search engines."
  },
  {
    title: "Reliable Off-Page SEO and Link Building Services",
    short:
      "Authority and trust matter a lot for long term success on Google. As a dependable best seo company in bihar, we follow ethical off page SEO practices that keep your rankings safe even when search engine algorithms change.",
    //full:
      //"This well-planned off-page approach supports better Google ranking services and keeps your website safe from sudden drops caused by search engine algorithm changes."
  },
  {
    title: "Local SEO Services for Businesses in Patna and Nearby Areas",
    short:
      "Authority and trust matter a lot for long term success on Google. As a dependable best seo company in bihar, we follow ethical off page SEO practices that keep your rankings safe even when search engine algorithms change.",
    //full:
     // "Our SEO for local business solutions are best suited for service providers, shops, clinics, and offices that want to attract customers from nearby locations and turn local searches into real visits and enquiries."
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
