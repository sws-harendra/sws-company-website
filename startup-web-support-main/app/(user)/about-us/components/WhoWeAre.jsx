"use client";
import { motion } from "framer-motion";
import { use } from "react";

const journeyData = [
  {
    title: "Our Journey as a Growing IT Company in Patna",
    content:
      "Startup Web Support started with one simple aim to give honest and professional digital solutions to businesses in Patna and nearby areas. We started by handling small website development work and slowly moved into full IT and digital marketing services as more local businesses trusted us with their work. Our journey has been about regular learning staying consistent and building long term trust with clients who want real results not false promises. Today we are growing step by step as an IT company in Patna by focusing on practical solutions that actually help businesses grow on ground level not just on paper.",
  },
  {
    title: "Understanding Local Business Needs in Patna",
    content:
      "Working from Patna gives us a clear advantage because we understand the local business environment much better than agencies sitting outside and working remotely. We know how local customers think how competition works and what market expectations look like across different industries in the city. Because of this ground level understanding we are able to plan website development app development and digital marketing services in a way that actually fits the real needs of businesses operating in Patna.",
  },
  {
    title: "Why Businesses Trust Startup Web Support",
    content:
      "Businesses trust Startup Web Support because we keep things clear and focus on long term value instead of short term talk. We explain every process in a simple way maintain transparent communication and never confuse clients with unnecessary technical complexity. Our working style ensures that every client gets solutions that match their actual business goals whether it is a new website mobile app or a digital marketing campaign. We believe when you understand the work you automatically trust the results and that is how long term partnerships are built.",
  },
  {
    title: "Customized Website Development Approach",
    content:
      "Our website development process is planned properly but still flexible enough to adjust as per your business needs. Before starting any design or development work we first take time to understand your brand identity services and target audience clearly. believe in using ready made or generic layouts instead we build websites that truly represent your business and work smoothly across all devices. This approach helps brands create a strong online presence that looks professional works fast and supports real business growth"
  },
  {
    title: "Result-Focused Digital Marketing Services",
    content:
      "Our digital marketing services are planned keeping performance and consistency in focus from day one. We work on improving online visibility through SEO content strategy and social media engagement that brings the right kind of users not just random traffic. Patna based IT company we design digital marketing strategies that connect well with local audiences and at the same time support long term business growth in a practical way. Our goal is simple to help your business stay visible relevant and trusted online without unnecessary complications.",
  },
  {
    title: "Mobile App Development with Practical Use Cases",
    content:
      "Our app development services are built around functionality usability and scalability. We develop mobile applications that support your daily business operations and help improve customer engagement. Every app we build is designed to run smoothly and still stay flexible enough to adapt to future business needs.So whether you need an app for customers or for your internal work we make sure it performs well and grows with your business.",
  },
  {
    title: "Support for Startups and Small Businesses",
    content:
      "Startup Web Support actively supports startups and small businesses by guiding them through the whole digital journey From planning a website to launching digital marketing services we help businesses make informed decisions at every step. Our goal is to make the digital process simple so startups can focus on growth without getting stuck in technical confusion. You can rely on us as your local partner who understands the challenges and helps you move forward in a clear and practical way."
  },
  {
    title: "Long-Term Support and Maintenance",
    content:
      "We believe in building lasting client relationships After the project is delivered we continue to provide technical support updates and maintenance services This ensures that your websites and mobile applications stay secure functional and updated as your business needs change. So even after the launch we stay connected and help you keep everything running smoothly without any hassle.",
  },
  {
    title: "Skilled Team with Real Project Experience",
    content:
      "Our team includes experienced developers, designers and digital marketers who have worked on different types of projects for various businesses. Each team member understands how important timelines, quality standards and clear communication are when working with clients. Because of this shared experience we are able to deliver consistent and reliable results across website development app development and digital marketing services."
  },
  {
    title: "Commitment to Quality and Ethical Work",
    content:
      "Quality and transparency guide every project at Startup Web Support. We suggest solutions that genuinely help the business grow and we always follow ethical practices in pricing and execution. Our aim is to work as a dependable digital partner for businesses in Patna and across India not just as a service provider."
  }
];

export default function AboutJourney() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Who We Are & How We Work
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            A trusted IT company in Patna focused on practical digital solutions,
            long-term value, and ethical work culture.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {journeyData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
