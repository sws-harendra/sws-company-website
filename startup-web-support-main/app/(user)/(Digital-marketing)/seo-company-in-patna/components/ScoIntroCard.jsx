"use client";
import { useState } from "react";
import { motion } from "framer-motion";


const introCard = [
  {
    title: "SEO Audits, Reporting, and Continuous Optimization",
    short:
      " SEO is not a one time task it needs regular attention and improvement. Through proper audits and ongoing optimization we work with the mindset of a dependable best search engine optimization company that focuses on long term and stable results for your business.",
    //full:
      //"SEO is not a one-time job that finishes in a month. That is why we also provide SEO maintenance services to keep your website in good shape over time. As search rules and market trends keep changing, we make sure your website stays updated and continues to perform well."
  },
  {
    title: "Affordable SEO Services with Flexible Packages",
    short:
      " We keep SEO simple transparent and cost effective so you know exactly what work is being done. There is no unnecessary complexity only clear efforts that support steady online growth.",
   // full:
     // "If you are not sure where to begin, don’t worry. Our SEO consultation services are meant to give you clear guidance. We sit with you, understand your website, and explain in plain words what needs to be done and how SEO can actually help your business move forward."
  },
  {
    title: "Trusted SEO Specialists in Patna for Complete Digital Growth",
    short:
      " We work like a part of your own team and explain everything in clear language. Our focus is always on slow and steady growth which is what businesses expect from a best search engine optimization company in india.",
    //full:
      //"When you choose Startup Web Support as your SEO company Patna, you are choosing a team that stays with you. We work step by step to improve your website visibility, bring the right people to your site, and support your business for a long time through honest SEO optimization services."
  },
];



const SeoIntroCard = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 mt-8">
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

export default SeoIntroCard;
