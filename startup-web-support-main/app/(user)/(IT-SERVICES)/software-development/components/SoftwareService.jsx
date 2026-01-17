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

export default function SoftwareService() {
  return (
    <section className="bg-sky-50 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-24">

        {/* HERO */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            End-to-End Software Development Services in Patna for Growing Businesses
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            At Startup Web Support, we offer software solutions in Patna for startups, shops, institutions, and growing companies. We don’t sell ready-made systems that force you to adjust. As a best software company in Patna, we shape the software according to your business flow.</p>
            <p className="text-lg text-gray-600 leading-relaxed">We work closely with startups, local businesses, educational institutions, and enterprises across Bihar. 
              Through reliable software development in Patna, we help businesses reduce manual work, bring clarity in operations, and grow step by step without confusion.
          </p>
        </motion.div>

        {/* TRUST SECTION */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-semibold text-gray-900">
            A Trusted Software Development Company in Patna, Bihar
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Patna’s business environment is changing fast, and companies now need technology partners they can trust. As one of the Top Software Companies in Patna, we spend more time understanding your process than selling features. Our developers work in a clear order — requirement, planning, development, testing, and support.</p>
            <p className="mt-2 text-gray-600 leading-relaxed">Being a complete software development company, we manage everything in-house so you don’t have to chase multiple vendors for one project.

          </p>
        </motion.div>

        {/* CUSTOM SOFTWARE */}
        <div className="space-y-10">
          <h2 className="text-3xl font-semibold text-gray-900">
            Custom Software Development Services
          </h2>
            <p className="text-lg text-gray-600 leading-relaxed">Every business runs differently, so off-the-shelf software often creates more problems than it solves. Our bespoke software developers build flexible systems that grow with you. Whether it’s enterprise software solutions or business automation software, our focus stays on ease of use and long-term value.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Enterprise Software",
                desc: "Keep operations, data, and teams organised without chaos.",
              },
              {
                title: "Business Automation",
                desc: "Reduce manual entries and speed up daily work.",
              },
              {
                title: "SaaS Development",
                desc: "As a SaaS software development company, we build cloud-based platforms that are secure, scalable, and simple to manage.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white border rounded-2xl p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MOBILE APPS */}
        <div className="space-y-10">
          <h2 className="text-3xl font-semibold text-gray-900">
            Mobile App Development
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">We develop Local Business Apps that help you stay connected with customers. Depending on your need, we offer native Android & iOS apps or Cross Platform Development for faster rollout and cost control.</p>

          <ul className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto text-left">
            {[
              "Custom Android & iOS applications",
              "Booking, delivery & CRM apps for local use",
              "Scalable apps linked with existing systems",
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <span className="mt-2 h-2 w-2 bg-blue-600 rounded-full"></span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* EDUCATION ERP */}
        <div className="space-y-10">
          <h2 className="text-3xl font-semibold text-gray-900">
           Specialized School ERP & Education Software Development
          </h2>
            <p className="text-lg text-gray-600 leading-relaxed">We work closely with schools and coaching centres as a reliable school management software company. Our systems reduce paperwork and make administration smoother for teachers and staff. </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              "School ERP for attendance, exams & communication",
              "Coaching institute management software",
              "Budget-friendly education software for Bihar",
              "Simple dashboards for teachers, admins & parents",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-white border rounded-xl p-6 text-gray-700"
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* WHY CHOOSE */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-blue-50 border border-blue-100 rounded-3xl p-12 max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Choose Startup Web Support?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">We are known as a best Software Company in Patna because we don’t make false promises. We first listen to your requirement, then build the software carefully, and most importantly, we stay connected even after the project is delivered. For us, software is not just code, it becomes part of your everyday business routine.<br></br>
            With us, you get dependable software development services that are affordable, scalable, and supported for the long term.
          </p>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-700 text-left mt-8">
            <li>✔ Practical & scalable solutions</li>
            <li>✔ Clean, secure development approach</li>
            <li>✔ Industry-focused experience</li>
            <li>✔ Ongoing maintenance & support</li>
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
