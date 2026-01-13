"use client";
import { motion } from "framer-motion";
import {
  bellShakeAnimation,
  cardContentVariants,
  cardVariants,
  gridContainerVariants,
  headerTextVariants,
  imageVariants,
} from "./GlobalCss";
import { useState } from "react";

const servicesData = [
  {
    image: "website-development.png",
    title: "Website Development",
    description:
      `Startup Web Support is a trusted web development company Bihar that works specially for local businesses. We provide custom web development services in a simple and practical way. Our main focus is clean design, fast loading websites, and layouts that work properly on mobile phones, so your business can grow online without confusion or stress.
      Our website development Patna services are easy to understand and easy to manage, even for people with very basic English knowledge. These websites are made for real customers, not just for show, so they actually help in getting more enquiries and business.`,
  },
  {
    image: "app-development.png",
    title: "App Development",
    description:
      `As a growing mobile app development company India, we make simple, reliable, and easy-to-use apps for small, medium, and big businesses. We work like a professional app development agency, where every app is built with proper security, smooth performance, and future growth in mind.
      We are also known as a dependable mobile app development company because we don’t stop after app delivery. We stay with our clients for long-term support, updates, and help, so the app keeps working properly as the business grows.`,
  },
  {
    image: "ecommerce-website.png",
    title: "E-Commerce Website",
    description:
      `We provide complete e-commerce website development solutions for businesses that want to sell online in a simple and tension-free way. If you are planning to sell your products online, we handle everything properly — from product listing to payment gateway and smooth order management.
      Our e-commerce website development websites are fast, secure, and very easy for customers to use. Because of this, customers feel comfortable while shopping, and business owners find it easy to manage orders without any confusion.`,
  },
  {
    image: "marketing.png",
    title: "Marketing Solutions",
    description:
      `Being a local digital marketing agency Patna, we work closely with businesses to help them get more leads and better online visibility. We understand the local market, so our approach is simple, practical, and focused on what actually works.
        Our services include SEO services in Patna, digital marketing in Patna, and performance-based promotion that brings genuine enquiries. We believe in honest work and clear results, that’s why we focus on real growth and not fake promises.`,
  },
  {
    image: "ads.png",
    title: "Premium Advertising",
    description:
      `Our experts take care of paid social media marketing in Patna in a simple and planned way, so your business reaches the right people at the right time. We do proper planning and regular checking, so your money is spent wisely and results are clear.
      With this approach, we provide best internet marketing services in Patna that help in increasing brand awareness and bringing more enquiries and sales, without unnecessary confusion or false commitments.`,
  },
  {
    image: "design.png",
    title: "Designing Solutions",
    description:
      `We offer best graphic designing services to create simple and attractive visuals for websites, social media, and complete branding needs. Our designs are made in a way that people can easily understand and connect with your brand.
      Good design always helps in building trust. That’s why our creative team focuses on clean and professional work, so your brand looks proper and reliable everywhere, whether online or offline.`,
  },
   {
    image: "marketing.png",
    title: "Accounting & Financial Software",
    description:
      `As a reliable software development company, we develop accounting and financial software that is simple to use and fully secure. These systems are made keeping real business needs in mind, so daily work like billing, entries, and reports becomes easy and clear.
      Our software helps businesses manage records properly without confusion and also follows all required government rules and compliance standards, so you can work peacefully without worrying about mistakes or issues later.`,
  },
  {
    image: "website-development.png",
    title: "Web & Software Solutions",
    description:
      `Startup Web Support is a professional web application development company that delivers strong and practical digital solutions for real business needs. We focus on building applications that are easy to use and actually helpful in daily business work.
      Recognized as a trusted software company in Patna, we create business-focused applications that help improve productivity and build a better online presence. Because of our honest work and reliable support, many clients see us as one of the top software development in Patna service providers.
`,
  },
];

const FeaturedServices = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Background Circles */}
      <div className="absolute right-[-20%] top-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-100 to-indigo-200 opacity-40" />
      <div className="absolute left-[-20%] bottom-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-100 to-indigo-200 opacity-40" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            variants={headerTextVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Our Featured Services
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            variants={headerTextVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We are an IT company in Patna that delivers powerful digital solutions
            to help businesses grow globally with scalable and innovative
            technology.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              layout
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              variants={cardVariants}
            >
              {/* Icon */}
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                variants={imageVariants}
              >
                <motion.img  loading="lazy"

                  src={service.image}
                  alt={service.title}
                  className="w-14 h-14 object-contain"
                  whileHover={bellShakeAnimation}
                />
              </motion.div>

              {/* Content */}
              <motion.div
                layout
                className="flex flex-col flex-grow text-left"
                variants={cardContentVariants}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>

                <p
                  className={`text-gray-600 text-sm leading-relaxed transition-all duration-300
                    ${expandedIndex === index ? "" : "line-clamp-4"}
                  `}
                >
                  {service.description}
                </p>

                {service.description.length > 120 && (
                  <button
                    onClick={() =>
                      setExpandedIndex(
                        expandedIndex === index ? null : index
                      )
                    }
                    className="mt-3 text-blue-600 font-medium hover:underline self-start"
                  >
                    {expandedIndex === index ? "Read Less" : "Read More"}
                  </button>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;
