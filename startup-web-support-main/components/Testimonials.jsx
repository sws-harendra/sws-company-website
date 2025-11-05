"use client"
import { motion } from 'framer-motion';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { FaQuoteLeft } from 'react-icons/fa';

const testimonialsData = [
  {
    quote: "Startup Web Support has been a game-changer for our business! Their team delivered a stunning website and provided excellent support throughout the process. They truly understand what a startup needs to succeed online.",
    name: "Satyam kumar",
    title: "Client",
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    quote: "Working with Startup Web Support was a seamless experience. Their app development team was incredibly responsive and innovative, helping us bring our idea to life with a user-friendly and visually appealing design.",
    name: "Pooja Singh",
    title: "Client",
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    quote: "The experts at Startup Web Support are professional and knowledgeable. They revamped our financial systems with their accounting and financial solutions, making everything more efficient and easier to manage. Highly recommended!",
    name: "Neha kumari",
    title: "Client",
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    quote: "Their digital marketing strategy doubled our leads in just three months. An essential partner for any business looking to grow in the digital space.",
    name: "Amit Sharma",
    title: "Client",
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
  },
];

const Testimonials = () => {
  const headerVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section className="bg-[#1e88e5] md:py-24 py-10 font-sans">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
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
            Our first priority is to satisfy our clients. Here is what some of them have to say about our work.
          </p>
        </motion.div>
        
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
            {testimonialsData.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-xl shadow-md p-8 h-[350px] flex flex-col justify-between">
                  <FaQuoteLeft className="text-3xl text-blue-200 mb-4" />
                  <p className="text-gray-600 italic leading-relaxed mb-6 flex-grow">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center mt-auto border-t border-gray-100 pt-5">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                      <h4 className="font-bold text-gray-800 text-md">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;