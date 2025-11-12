"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";
import testimonialService from "@/services/testimonial.service";

const fallbackTestimonials = [
  {
    quote:
      "Startup Web Support has been a game-changer for our business! Their team delivered a stunning website and provided excellent support throughout the process.",
    name: "Satyam Kumar",
    title: "Client",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "Working with Startup Web Support was a seamless experience. Their app development team was incredibly responsive and innovative!",
    name: "Pooja Singh",
    title: "Client",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const headerVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialService.getAll();
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        // fallback if API fails
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="bg-[#1e88e5] md:py-24 py-10 font-sans">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={headerVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-50 mb-4">
            What do clients say?
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Our first priority is to satisfy our clients. Here is what some of
            them have to say about our work.
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        {loading ? (
          <div className="text-center text-white py-10">Loading...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-white py-10">
            No testimonials available yet.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              slidesPerView={1}
              spaceBetween={30}
              className="w-full pb-12"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-xl shadow-md p-8 min-h-[250px] flex flex-col justify-between">
                    <FaQuoteLeft className="text-3xl text-blue-200 mb-4" />
                    <p className="text-gray-600 italic leading-relaxed mb-3">
                      "{testimonial.text || testimonial.quote}"
                    </p>

                    <div className="flex items-center mt-auto border-t border-gray-100 pt-5">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mr-4"
                        style={{
                          backgroundColor: testimonial.bgColor || "#3b82f6", // fallback to blue
                        }}
                      >
                        {(testimonial.client_name || testimonial.name || "")
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-800 text-md">
                          {testimonial.client_name || testimonial.name}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {testimonial.client_position || testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
