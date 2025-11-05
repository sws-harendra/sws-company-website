"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  FaLaptopCode,
  FaPaintBrush,
  FaPenNib,
  FaSearchDollar
} from 'react-icons/fa';

const teamRoles = [
  {
    icon: FaLaptopCode,
    role: 'Great Developers',
    description: 'Building a fast, responsive, and robust foundation for your website.',
  },
  {
    icon: FaPaintBrush,
    role: 'Graphic Designers',
    description: 'Creating stunning visuals and a user-friendly interface that captivates your audience.',
  },
  {
    icon: FaPenNib,
    role: 'Content Writers',
    description: 'Crafting compelling copy that communicates your message and engages visitors.',
  },
  {
    icon: FaSearchDollar,
    role: 'SEO Experts',
    description: 'Ensuring your website is optimized to rank high on search engines and attract organic traffic.',
  },
];

const ReliableTeam = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        duration: 0.8
      }
    }
  };

  return (
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4"
              variants={itemVariants}
            >
              Why You Need A Reliable Web Development Company in Patna
            </motion.h2>
            <motion.h3
              className="text-2xl font-semibold text-sky-600 mb-6"
              variants={itemVariants}
            >
              Your Website Should Work Harder
            </motion.h3>
            <motion.p
              className="text-gray-600 leading-relaxed"
              variants={itemVariants}
            >
              SWS creates a user-friendly Website for your business. Our team of great developers, graphic designers, content writers, and SEO experts work together to make your Website user and search-engine-friendly.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={imageVariants}
          >
            <Image
              width={100}
              height={100}
              src="/hero.jpg"
              alt="Team working on web development"
              className="w-full h-auto rounded-2xl"
            />
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3
            className="text-3xl font-bold text-gray-900 text-center mb-4"
            variants={itemVariants}
          >
            A Synergy of Experts
          </motion.h3>
          <motion.p
            className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12"
            variants={itemVariants}
          >
            Creating a good Website is not a one-man task, it takes an entire team. With a professional agency, you get all the skills you need for your project for better and faster results.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamRoles.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md text-center"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-sky-100 text-sky-600 rounded-full p-4">
                      <Icon className="text-3xl" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{role.role}</h4>
                  <p className="text-gray-500 text-sm">{role.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReliableTeam;