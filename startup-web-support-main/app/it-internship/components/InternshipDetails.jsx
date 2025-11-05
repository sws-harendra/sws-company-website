"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoCodeSlashOutline,     // Web Dev
  IoPhonePortraitOutline, // App Dev
  IoColorPaletteOutline,  // UI/UX
  IoMegaphoneOutline,     // Digital Marketing
  IoBuildOutline          // Software Engg
} from 'react-icons/io5';

// Key areas covered in the internship
const internshipAreas = [
  { icon: IoCodeSlashOutline, text: 'Web Development' },
  { icon: IoPhonePortraitOutline, text: 'App Development' },
  { icon: IoColorPaletteOutline, text: 'UI/UX Design' },
  { icon: IoMegaphoneOutline, text: 'Digital Marketing' },
  { icon: IoBuildOutline, text: 'Software Engineering' },
];

const InternshipDetails = () => {
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
        damping: 12,
      },
    },
  };

  return (
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Left Column - Content */}
          <motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
              variants={itemVariants}
            >
              Join the Best IT Internship Program in Patna for <span className="text-sky-600">Hands-On Training</span>
            </motion.h2>

            <motion.p 
              className="text-gray-700 text-lg leading-relaxed mb-6"
              variants={itemVariants}
            >
              In today's fast-paced digital world, gaining practical experience is crucial for building a successful career in IT. For aspiring tech professionals, internships offer invaluable opportunities to learn, grow, and establish a strong foundation. 
            </motion.p>
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed"
              variants={itemVariants}
            >
              **Startup Web Support**, a leading IT company in Patna, is offering a comprehensive **6-month IT internship** designed to equip you with the skills and knowledge needed to excel. Our program provides hands-on experience and mentorship to help you thrive.
            </motion.p>
          </motion.div>

          {/* Right Column - Key Areas */}
          <motion.div
            className="bg-slate-50 p-8 rounded-xl border border-slate-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3, delay: 0.2 }} // Delay slightly
            variants={containerVariants}
          >
            <motion.h3 
              className="text-2xl font-semibold text-gray-800 mb-6 text-center lg:text-left"
              variants={itemVariants}
            >
              Gain Experience In:
            </motion.h3>
            <ul className="space-y-5">
              {internshipAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <motion.li key={index} className="flex items-center gap-4" variants={itemVariants}>
                    <div className="bg-sky-100 text-sky-600 p-3 rounded-full flex-shrink-0">
                      <Icon className="text-2xl" />
                    </div>
                    <span className="text-lg font-medium text-gray-700">{area.text}</span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InternshipDetails;