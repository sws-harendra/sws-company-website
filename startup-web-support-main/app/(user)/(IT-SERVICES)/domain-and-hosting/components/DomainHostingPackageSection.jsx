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
            Our combined domain registration & hosting packages keep everything
            in one place which saves your time, effort and unnecessary costs.
            Many Patna entrepreneurs prefer this all in one approach. We also
            provide cheap domain hosting India plans that are budget friendly
            and still reliable enough for business use.
          </p>
        </motion.div>

        {/* PACKAGE CARDS */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              title: "Domain Registration",
              desc: " We handle the complete process with a smooth and stress free domain registration Patna experience.",
            },
            {
              title: "Optimized Web Hosting",
              desc: "Stable and performance focused hosting with trusted web hosting in patna.",
            },
            {
              title: "SSL & Security",
              desc: "Proper protection to keep your website safe secure and trustworthy for visitors.",
            },
            {
              title: "Business Email (Optional)",
              desc: " Professional email setup linked directly with your domain if you need it for business communication.",
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
            Domain Hosting with Email — Professional Communication for Your
            Business
          </h3>
          <p className="text-white leading-relaxed mb-8">
            With our domain hosting with email services, you can create
            professional email addresses that use your own domain name. Many
            Patna based professionals use this to look more credible while
            dealing with clients. This makes your business look more genuine and
            helps build trust when you communicate with customers, partners or
            vendors.
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
            Our hosting plans are specially made keeping local and growing
            businesses in mind so you get the right mix of affordability and
            performance without paying extra for things you do not need. This
            suits Patna based startups and family run businesses equally well.
            Easy dashboards that make website management simple even if you are
            not from a technical background.<br></br>
            Flexible storage and bandwidth that can adjust as your website
            traffic increases Backup and malware protection to keep your website
            data safe and secure One click installation support for popular
            platforms so your website can go live quickly You focus on growing
            your business and handling customers. We manage the hosting and
            domain setup smoothly so you do not have to deal with technical
            headaches at all.
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
          <p className="text-center text-white mt-8">
            We support small business owners from the beginning. You can focus
            on growing your business, while we take care of the domain and
            hosting part without giving you technical stress.
          </p>
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
          <p>
            Choosing the right web hosting partner provider helps you save time,
            money and daily stress that usually comes with website issues. Many
            local Patna business owners say this is the main reason they work
            with us. That is why many local businesses prefer working with
            Startup Web Support where they get reliable service and clear
            support without confusion.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                title: "Stability & Performance",
                desc: "Your website loads fast and stays online consistently so your customers can access it anytime without interruption.",
              },
              {
                title: "Expert Technical Assistance",
                desc: "You get proper guidance and support backed by a trusted domain hosting company India so you are never left alone with technical problems.",
              },
              {
                title: "Affordable yet High-Quality Solutions",
                desc: "Our pricing is practical transparent and suitable for local businesses without compromising on quality.",
              },
              {
                title: "All-in-One Service",
                desc: "Domain hosting email and ongoing support are all managed in one place so you do not have to coordinate with multiple vendors.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
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
            If you are planning to launch a new website or thinking about upgrading your current hosting setup you can connect with Startup Web Support today. Many Patna based startups and small businesses have already taken this step. We offer reliable domain hosting Patna, professional domain registration Patna, and complete domain and hosting solutions that are designed to support your business and help in long term online growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
