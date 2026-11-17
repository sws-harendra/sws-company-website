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
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import * as fpixel from "@/lib/fpixel";

const servicesData = [
  {
    image: "/website-development.png",
    title: "Website Development",
    description:
      `Startup Web Support is a reliable web development company Bihar that works hand in hand with local and regional businesses. We provide custom web development services in a simple and practical way, without overcomplicating things. Our main focus is on clean website layouts, fast loading speed, and smooth mobile performance, so your business can grow online without technical stress or confusion.`,
  },
  {
    image: "/app-development.png",
    title: "App Development",
    description:
      `As a reliable mobile app development company, we build easy-to-use and secure applications for startups, small businesses, and enterprises. We work like a professional app development agency, ensuring every app performs smoothly and supports future business growth.`,
  },
  {
    image: "/ecommerce-website.png",
    title: "E-Commerce Website",
    description:
      `We offer complete E-commerce Website Development solutions for businesses planning to sell products or services online. From product listing to payment setup and order handling, everything is managed properly to keep the process simple for business owners.
        Our e-commerce platforms are fast, secure, and customer-friendly, helping users shop comfortably while making it easy for owners to manage sales and inventory without stress.`,
  },
  {
    image: "/marketing.png",
    title: "Marketing Solutions",
    description:
      `As a local digital marketing agency Patna, we understand how businesses operate in this region. Our marketing approach is practical, transparent, and focused on results that matter.
        We provide SEO Services in Patna and Digital Marketing in Patna that help businesses gain visibility, attract the right audience, and generate real enquiries instead of empty traffic.
`,
  },
  {
    image: "/ads.png",
    title: "Premium Advertising",
    description:
      `Our team handles Paid Social Media Marketing in Patna with proper planning and regular monitoring, so your advertising budget is used carefully and effectively. We design campaigns that reach the right people at the right time, based on how local customers actually behave online.`,
  },
  {
    image: "/design.png",
    title: "Designing Solutions",
    description:
      `We provide Best Graphic Designing Services for websites, social media creatives, and branding needs. Our designs are clean, clear, and made to connect easily with your audience.
        Strong visuals help build trust, which is why our design work focuses on clarity and professionalism so your brand looks reliable across all platforms.
`,
  },
   {
    image: "/marketing.png",
    title: "Accounting & Financial Software",
    description:
      `As a professional software development company, we build accounting and financial systems that are made for everyday business use, not just for namesake. We understand how billing, entries, and reports are handled on a daily basis, so our software keeps these tasks simple, clear, and stress-free.
      All our solutions follow the required compliance rules, so business owners can work with peace of mind, knowing everything is accurate and properly maintained.
`,
  },
  {
    image: "/website-development.png",
    title: "Web & Software Solutions",
    description:
      ` Startup Web Support is a trusted web application development company delivering practical digital systems that support daily business operations. We focus on applications that are easy to use and genuinely helpful.
        Recognized among Top Software Development in Patna, we build business-focused solutions that improve efficiency and strengthen online presence through reliable support and honest work.
`,
  },
];

const getWhatsAppUrl = (serviceTitle) => {
  const phoneNumber = "917479499718";
  const message = serviceTitle
    ? `Hello Startup Web Support! I would like to get a free quotation for ${serviceTitle}.`
    : `Hello Startup Web Support! I would like to get a free quotation for your services.`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

const FeaturedServices = () => {
  const handleServiceClick = (serviceTitle) => {
    fpixel.event("Contact", {
      method: "WhatsApp",
      content_name: `Featured Service - ${serviceTitle || "General"}`,
    });
    fpixel.customEvent("WhatsAppClick", {
      phoneNumber: "917479499718",
      service: serviceTitle || "General",
    });
  };

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
          {servicesData.map((service, index) => {
            const whatsappUrl = getWhatsAppUrl(service?.title);

            return (
              <motion.div
                key={index}
                layout
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  handleServiceClick(service?.title);
                  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full cursor-pointer group/card"
                variants={cardVariants}
              >
                <div>
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    variants={imageVariants}
                  >
                    <Image 
                      fetchPriority="high"
                      src={service.image}
                      alt={service.title}
                      width={56}  
                      height={56}
                      className="object-contain"
                      whileHover={bellShakeAnimation}
                    />
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    layout
                    className="flex flex-col text-left"
                    variants={cardContentVariants}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 min-h-[56px] flex items-center group-hover/card:text-[#009CDE] transition-colors duration-200">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                      {service.description}
                    </p>
                  </motion.div>
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(service?.title);
                    }}
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#009CDE] hover:bg-[#0086bf] text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group"
                  >
                    <BsWhatsapp className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>Get Free Quotation</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;
