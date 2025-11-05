"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoSendOutline } from 'react-icons/io5';

const contactVideoUrl = "/hero-bg.mp4"; // Example: public/videos/contact-video.mp4

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  // Renamed imageVariants to mediaVariants for clarity
  const mediaVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        duration: 1,
      },
    },
  };

  const formVariants = {
     hidden: { opacity: 0, x: 50 },
     visible: {
       opacity: 1,
       x: 0,
       transition: {
         type: 'spring',
         stiffness: 80,
         duration: 1,
         delay: 0.2
       }
     }
  }

  return (
    <section className="bg-white py-16  overflow-hidden"> {/* Added overflow-hidden */}
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Video */}
          <motion.div
            className="flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={mediaVariants} // Use the renamed variant
          >
             {/* Replaced img with video */}
             <video
                src={contactVideoUrl} // Use your video path
                alt="Contact Us Video"
                className="w-full h-auto rounded-lg shadow-lg" // Added shadow
                autoPlay
                loop
                muted
                playsInline // Important for mobile autoplay
             >
                Your browser does not support the video tag.
             </video>
          </motion.div>

          {/* Right Column - Content & Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={formVariants} 
          >
             <motion.p 
                className="text-sm font-semibold uppercase tracking-wider text-sky-600 mb-2"
                variants={itemVariants}
             >
                CONTACT
             </motion.p>

            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4"
              variants={itemVariants}
            >
              Get In Touch With Us
            </motion.h2>

            <motion.p 
              className="text-gray-700 text-lg leading-relaxed mb-8"
              variants={itemVariants}
            >
              Ready to elevate your digital presence? Contact us at Startup Web Support for tailored IT solutions that drive growth.
            </motion.p>
            
            {/* Contact Form */}
            <motion.form 
              className="space-y-6" 
              variants={containerVariants} // Stagger children within the form
            >
              {/* Form fields remain the same */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" id="name" name="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150" placeholder="Your Name" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-600">*</span></label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150" placeholder="your.email@example.com" />
                </motion.div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150" placeholder="Your Phone Number" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input type="text" id="subject" name="subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150" placeholder="Reason for contacting" />
                </motion.div>
              </div>
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" name="message" rows="2" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150" placeholder="Your message..."></textarea>
              </motion.div>
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit" 
                  className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message <IoSendOutline className="text-xl" />
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;