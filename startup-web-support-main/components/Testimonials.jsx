"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import testimonialService from "@/services/testimonial.service";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialService.getAll();
        setTestimonials(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // If loading is done and there are no testimonials in the database, don't show an empty section
  if (!loading && testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-white py-16 sm:py-24 overflow-hidden font-sans text-slate-900">
      {/* Background Soft Glows (matching TechStack aesthetic) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] max-w-4xl h-[400px] bg-gradient-to-b from-[#38bdf8]/10 via-[#009CDE]/05 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-[-10%] top-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-sky-200/20 to-blue-300/10 blur-3xl" />
        <div className="absolute left-[-10%] bottom-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-sky-200/20 to-indigo-200/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* =======================================================================
            SECTION HEADER
           ======================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 text-xs sm:text-sm font-semibold mb-3 tracking-wider uppercase">
              <Quote className="w-3.5 h-3.5 text-[#009CDE] fill-[#009CDE]/10" />
              Client Testimonials
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              What Our{" "}
              <span className="font-serif italic font-medium bg-gradient-to-r from-[#009CDE] via-[#0086bf] to-[#0668E1] bg-clip-text text-transparent">
                Clients Say
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Real feedback from clients who have built and scaled their digital
              products with Startup Web Support.
            </p>
          </motion.div>

          {/* Slider Navigation Buttons */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center md:justify-end gap-2.5">
              <button
                onClick={() => swiperInstance?.slidePrev()}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full bg-white hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 hover:border-slate-900 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => swiperInstance?.slideNext()}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full bg-white hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 hover:border-slate-900 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* =======================================================================
            TESTIMONIALS SLIDER
           ======================================================================= */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[280px] rounded-[28px] bg-slate-100 border border-slate-200"
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Swiper
              onSwiper={setSwiperInstance}
              modules={[Pagination, Autoplay]}
              loop={testimonials.length > 3}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                bulletClass:
                  "inline-block w-2.5 h-2.5 rounded-full bg-slate-300 mx-1 transition-all duration-300 cursor-pointer",
                bulletActiveClass: "!w-8 !bg-[#009CDE] !rounded-full shadow-sm",
              }}
              breakpoints={{
                640: {
                  slidesPerView: Math.min(testimonials.length, 1.5),
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: Math.min(testimonials.length, 2),
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: Math.min(testimonials.length, 3),
                  spaceBetween: 28,
                },
              }}
              slidesPerView={1}
              spaceBetween={20}
              className="w-full pb-12 overflow-visible"
            >
              {testimonials.map((item, index) => {
                const name = item.client_name || item.name || "Client";
                const position =
                  item.client_position || item.title || "";
                const quoteText = item.text || item.quote || "";

                // Dynamic initials from client name
                const initials = name
                  .split(" ")
                  .filter(Boolean)
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();

                return (
                  <SwiperSlide key={item.id || index} className="h-auto">
                    <div className="group h-full bg-white rounded-[28px] p-7 sm:p-8 flex flex-col justify-between text-slate-900 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,156,222,0.14)] border border-slate-200/90 hover:border-[#009CDE]/50 hover:-translate-y-1.5 transition-all duration-300">
                      {/* Top Row: Rating Stars */}
                      <div>
                        <div className="flex items-center gap-1 text-amber-400 mb-5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>

                        {/* Quote Text */}
                        <div className="relative mb-6">
                          <Quote className="w-8 h-8 text-sky-100 absolute -top-3 -left-2 select-none pointer-events-none" />
                          <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed font-normal relative z-10 italic">
                            &ldquo;{quoteText}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Client Profile Footer */}
                      <div className="pt-5 border-t border-slate-100 flex items-center gap-3 mt-auto">
                        {/* Dynamic Avatar Initials */}
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#009CDE] to-[#0668E1] text-white flex items-center justify-center font-bold text-sm shadow-[0_4px_12px_rgba(0,156,222,0.25)] flex-shrink-0">
                          {initials}
                        </div>

                        {/* Name & Role */}
                        <div className="min-w-0">
                          <h3 className="font-black text-slate-900 text-sm sm:text-base tracking-tight truncate">
                            {name}
                          </h3>
                          {position && (
                            <p className="text-slate-500 text-xs font-medium truncate">
                              {position}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
