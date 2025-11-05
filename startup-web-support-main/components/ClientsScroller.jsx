"use client"
import { motion } from 'framer-motion';
import { headerTextVariants } from './GlobalCss';
import Image from 'next/image';

const clientsData = [
  { id: 1, name: 'Deepak Baisoya', logo: 'balajee.png' },
  { id: 2, name: 'Realestate Bihar', logo: 'balajee.png' },
  { id: 3, name: 'Saffronagro', logo: 'balajee.png' },
  { id: 4, name: 'Agarwal Agency', logo: 'balajee.png' },
  { id: 5, name: 'Socialo', logo: 'balajee.png' },
  { id: 6, name: 'Client Six', logo: 'balajee.png' },
  { id: 7, name: 'Client Seven', logo: 'balajee.png' },
];

const ClientsScroller = () => {
  const duplicatedClients = [...clientsData, ...clientsData];

  const scrollerVariants = {
    animate: {
      x: [0, -1 * (224 * clientsData.length)],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: clientsData.length * 4,
          ease: 'linear',
        },
      },
    },
  };


  return (
    <section className="py-24 bg-white font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={headerTextVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Few of our clients who trust us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            This team not only took the time to explain key concepts to us but acted as true partners through the entire process.
          </p>
        </motion.div>

        <div className="w-full overflow-hidden relative">
          <div className="absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-slate-50 to-transparent" />
          <div className="absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-slate-50 to-transparent" />

          <motion.div
            className="flex gap-16"
            variants={scrollerVariants}
            animate="animate"
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-24 flex items-center justify-center" // हर लोगो का साइज
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain  transition-all duration-300 cursor-pointer"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientsScroller;