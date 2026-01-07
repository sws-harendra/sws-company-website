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
            At Startup Web Support, we provide software development in Patna that actually helps businesses in their daily work. 
            We build software in a simple and practical way so that it is easy to use and useful for real business needs. As a trusted 
            software development company in Patna Bihar, we do not believe in ready-made or one-for-all solutions. We create software that 
            is safe, reliable, and made according to how your business works.</p>
            <p className="text-lg text-gray-600 leading-relaxed">We work closely with startups, local businesses, educational institutions, and enterprises across Bihar. 
              Our goal is to deliver customized software that helps reduce manual work, improve automation, and support 
              steady business growth.
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
            Patna is slowly growing as a digital city, and many businesses now need good IT support. As one of the providers of Best 
            IT Software Development Services in Patna Bihar, we focus on understanding how a business works and then building the right 
            technical solution for it. Our team includes experienced software developers in Patna who follow a clear and step-by-step process, 
            starting from understanding your requirement to final delivery and long-term support.</p>
            <p className="mt-2 text-gray-600 leading-relaxed">As a full-service software development agency, we take care of everything—from checking your idea, planning simple and user-friendly 
            designs, to coding, testing, and regular maintenance—so you don’t have to manage multiple vendors.

          </p>
        </motion.div>

        {/* CUSTOM SOFTWARE */}
        <div className="space-y-10">
          <h2 className="text-3xl font-semibold text-gray-900">
            Custom Software Development Services
          </h2>
            <p className="text-lg text-gray-600 leading-relaxed">Every business works in its own way, so ready-made software does not always fit. That is why our custom software 
              development services are kept flexible and easy to scale as your business grows. Our bespoke software developers build 
              software according to your daily work process and future plans, so everything feels natural and useful.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Enterprise Software",
                desc: "Manage processes, data, and operations in an organized way.",
              },
              {
                title: "Business Automation",
                desc: "Reduce manual work and improve team productivity.",
              },
              {
                title: "SaaS Development",
                desc: "Cloud-based platforms that are scalable and easy to manage.",
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
          <p className="text-lg text-gray-600 leading-relaxed">Today, mobile phones are a big part of how businesses work. That is why we 
            provide Native Android & iOS Development for apps that need strong performance, along with Cross Platform Development for businesses 
            that want quicker launch and lower cost. We help you choose the right option based on your actual business need.</p>

          <ul className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto text-left">
            {[
              "Customized Android & iOS mobile applications",
              "Local business apps for booking, delivery & CRM",
              "Scalable apps integrated with existing systems",
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
            <p className="text-lg text-gray-600 leading-relaxed">We are a reliable school management software company that provides complete education software solutions from 
              start to finish. Our team has hands-on experience as school software developers in Bihar, building systems that make 
              school work easier, both in the office and in classrooms. </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              "School ERP for attendance, exams, fees & communication",
              "Coaching center ERP for students & batches",
              "Affordable education software for Bihar institutions",
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
          <p className="text-lg text-gray-600 leading-relaxed">We are an experienced software development company in Patna that understands local business needs. We have a skilled and dedicated 
            development team that works with care and responsibility. We also have industry-specific software expertise, so we know that every 
            business works differently.<br></br>
            We provide affordable and scalable solutions that grow with your business. We also offer long-term technical support, 
            so you are never left alone after the software is delivered.<br></br>
            When you choose Startup Web Support, you choose a team that builds software to support your business growth—not only today, 
            but also for the future.
          </p>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-700 text-left mt-8">
            <li>✔ Affordable & scalable solutions</li>
            <li>✔ Clean & secure codebase</li>
            <li>✔ Industry-specific experience</li>
            <li>✔ Long-term maintenance & support</li>
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
