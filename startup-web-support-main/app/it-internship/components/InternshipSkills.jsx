"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoCodeSlashOutline,       // Technical Skills
  IoConstructOutline,       // Problem-Solving
  IoChatbubblesOutline,   // Communication
  IoPeopleOutline,        // Teamwork
  IoTimerOutline          // Project Management
} from 'react-icons/io5';

const skillsData = [
  {
    icon: IoCodeSlashOutline,
    title: 'Technical Skills',
    description: 'Depending on your area of focus, you will gain proficiency in various programming languages, frameworks, and tools like HTML, CSS, JavaScript, WordPress, Java, Swift, or Flutter.',
  },
  {
    icon: IoConstructOutline,
    title: 'Problem-Solving Skills',
    description: 'Working on real-world projects will challenge you to think critically and solve problems creatively. You will learn to troubleshoot issues, debug code, and develop effective solutions.',
  },
  {
    icon: IoChatbubblesOutline,
    title: 'Communication Skills',
    description: 'Effective communication is key. During your internship, you will learn how to communicate clearly and professionally with team members, clients, and stakeholders.',
  },
  {
    icon: IoPeopleOutline,
    title: 'Teamwork and Collaboration',
    description: 'At Startup Web Support, we value collaboration. You will learn how to work effectively as part of a team, contributing to group projects and supporting colleagues.',
  },
  {
    icon: IoTimerOutline,
    title: 'Project Management',
    description: 'Managing your time and tasks is crucial. You will develop project management skills, learning how to prioritize tasks, meet deadlines, and manage responsibilities.',
  },
  {
    icon: IoConstructOutline,
    title: 'Problem-Solving Skills',
    description: 'Working on real-world projects will challenge you to think critically and solve problems creatively. You will learn to troubleshoot issues, debug code, and develop effective solutions.',
  },
];

const InternshipSkills = () => {
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
    // Section with #1e88e5 background
    <section className="bg-[#1e88e5] text-white py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6" // White text
            variants={itemVariants}
          >
            Skills You Will Gain During the Internship
          </motion.h2>
          <motion.p 
            className="text-lg text-blue-100 max-w-4xl mx-auto leading-relaxed" // Light blue text
            variants={itemVariants}
          >
            By the end of the 6-month IT internship at Startup Web Support, you will have developed a range of technical and professional skills that will be invaluable as you embark on your career in IT. Here are some of the key skills you will gain:
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {skillsData.map((skill, index) => {
            const Icon = skill.icon;
            // Adjust grid classes for 5 items to look balanced
            let gridClasses = '';
             if (skillsData.length === 5) {
                 if (index === 3) gridClasses = 'lg:col-start-1 lg:row-start-2'; 
                 if (index === 4) gridClasses = 'lg:col-start-2 lg:row-start-2'; 
             }

            return (
              <motion.div
                key={index}
                // Glassmorphism style card
                className={`bg-sky-700/40 backdrop-blur-sm p-8 rounded-xl border border-sky-500/50 flex flex-col h-full transition-all duration-300 transform hover:bg-sky-700/60 hover:-translate-y-2 ${gridClasses}`}
                variants={itemVariants}
              >
                <div className="flex justify-center mb-5">
                  <div className="bg-white text-sky-600 rounded-full p-4"> {/* White icon background */}
                    <Icon className="text-4xl" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-3"> {/* White title */}
                  {skill.title}
                </h3>
                <p className="text-sky-100 text-sm leading-relaxed text-center flex-grow"> {/* Light blue description */}
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default InternshipSkills;