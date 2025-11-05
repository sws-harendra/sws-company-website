"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoArrowForward, 
  IoAnalyticsOutline, 
  IoFunnelOutline, 
  IoCashOutline 
} from 'react-icons/io5';
import { gridContainerVariants, headerTextVariants, textChildVariants } from '@/components/GlobalCss';

const keyMetrics = [
  {
    icon: IoFunnelOutline,
    label: 'Targeted Lead Generation',
  },
  {
    icon: IoCashOutline,
    label: 'Maximized ROI',
  },
  {
    icon: IoAnalyticsOutline,
    label: 'Cost-Effective Campaigns',
  },
];

const SemPpcHero = () => {
  return (
    <section className="bg-white min-h-[85vh] flex items-center justify-center lg:py-0 ">
      <div className="container mx-auto px-6 max-w-4xl text-center py-10"> {/* Centered content */}
        
        <motion.div
          variants={gridContainerVariants}
        >
          <motion.p 
            className="text-sm font-semibold uppercase tracking-wider text-sky-600 mb-3"
            variants={textChildVariants}
          >
            Search Engine Marketing & PPC
          </motion.p>

          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
            variants={headerTextVariants}
          >
            Drive Instant Traffic, <span className="text-sky-600">Boost Sales & Revenue</span>
          </motion.h1>

          <motion.p 
            className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10"
            variants={textChildVariants}
          >
            Looking for effective <span className="font-semibold">SEM & PPC services in Patna</span>? Startup Web Support delivers tailored, cost-effective campaigns focused on achieving results and maximizing your online visibility. Partner with the <span className="font-semibold">best SEM company in Bihar</span>.
          </motion.p>
            
          <motion.div variants={textChildVariants} className="mb-12">
            <motion.button
              className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 gap-2 text-lg"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your PPC Campaign <IoArrowForward className="text-xl" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Key Metrics Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10" 
          initial="hidden"
          whileInView="visible"
          variants={gridContainerVariants}
        >
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div 
                key={index} 
                className="flex items-center justify-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100" // Light background for metrics
                variants={textChildVariants}
              >
                <Icon className="text-3xl text-sky-500 flex-shrink-0" />
                <span className="text-lg font-semibold text-gray-800">{metric.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default SemPpcHero;