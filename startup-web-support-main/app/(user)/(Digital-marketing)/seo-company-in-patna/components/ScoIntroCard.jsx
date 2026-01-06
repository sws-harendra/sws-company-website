"use client";
import { useState } from "react";
import { motion } from "framer-motion";


const introCard = [
  {
    title: "SEO Audits, Reporting, and Continuous Optimization",
    short:
      "To keep everything clear and transparent, we start by checking your website properly. Our SEO audit services help us find out what is working, what is not, and what needs improvement. After that, our regular SEO reporting services show you simple updates about your rankings, website traffic, and how the work is moving forward—so you always know what is happening.",
    full:
      "SEO is not a one-time job that finishes in a month. That is why we also provide SEO maintenance services to keep your website in good shape over time. As search rules and market trends keep changing, we make sure your website stays updated and continues to perform well."
  },
  {
    title: "Affordable SEO Services with Flexible Packages",
    short:
      "We honestly feel that professional SEO should not feel expensive or complicated. It should be something every business can afford. That is why our affordable SEO services are planned in a simple way—so you get proper results without unnecessary costs. We also offer flexible SEO packages, so whether you are running a small business, just starting out, or slowly growing, there is an option that fits your budget.",
    full:
      "If you are not sure where to begin, don’t worry. Our SEO consultation services are meant to give you clear guidance. We sit with you, understand your website, and explain in plain words what needs to be done and how SEO can actually help your business move forward."
  },
  {
    title: "Trusted SEO Specialists in Patna for Complete Digital Growth",
    short:
      "Our team of SEO specialists in Patna works with you like your own team. We talk with you regularly and try to understand your business properly. We do not use difficult words. We explain everything in a simple way and focus on steady results that help your business slowly grow. Along with SEO, we also provide digital marketing services, so your business looks good and strong everywhere online.",
    full:
      "When you choose Startup Web Support as your SEO company Patna, you are choosing a team that stays with you. We work step by step to improve your website visibility, bring the right people to your site, and support your business for a long time through honest SEO optimization services."
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
