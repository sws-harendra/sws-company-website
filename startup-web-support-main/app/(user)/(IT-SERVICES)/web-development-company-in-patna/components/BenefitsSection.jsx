
"use client"
import { gridContainerVariants, textChildVariants } from '@/components/GlobalCss';
import { motion } from 'framer-motion';
import { 
  IoRocketOutline, 
  IoGiftOutline, 
  IoHeadsetOutline, 
  IoFlashOutline, 
  IoImagesOutline, 
  IoServerOutline, 
  IoTvOutline, 
  IoColorPaletteOutline, 
  IoLockClosedOutline, 
  IoChatbubblesOutline, 
  IoKeypadOutline, 
  IoDocumentTextOutline 
} from 'react-icons/io5';

const benefitsData = [
  { icon: IoRocketOutline, text: 'SEO-Friendly Design' },
  { icon: IoTvOutline, text: 'Responsive across all devices' },
  { icon: IoGiftOutline, text: 'FREE Support' },
  { icon: IoColorPaletteOutline, text: 'Custom graphics and visuals' },
  { icon: IoHeadsetOutline, text: 'Complete technical assistance' },
  { icon: IoLockClosedOutline, text: 'SSL Installation' },
  { icon: IoFlashOutline, text: 'Fast-Loading Pages' },
  { icon: IoChatbubblesOutline, text: 'Contact Forms, WhatsApp & chatbot integration' },
  { icon: IoImagesOutline, text: 'Licensed images' },
  { icon: IoKeypadOutline, text: ' Admin access with training' },
  { icon: IoServerOutline, text: 'Hosting, Domain and Logo' },
  { icon: IoDocumentTextOutline, text: ' SEO-friendly content structure' },
];

const BenefitsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 120 },
    },
  };

  return (
    <section className="bg-[#1e88e5] text-white py-24 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: false, amount: 0.2 }} 
          transition={{ duration: 0.6 }}
          variants={gridContainerVariants}
        >
          <motion.h2 variants={textChildVariants} className="text-4xl md:text-5xl font-bold mb-4">
            What are the benefits of using Startup Web Support
          </motion.h2>
          <motion.p variants={textChildVariants} className="text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
          At Startup Web Support, we don’t just make websites and hand them over. We focus on giving complete web development services that actually help your business move forward. Every project is handled differently, based on what your business needs, so the website works properly, stays secure, and is easy for you and your customers to use.          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: false, amount: 0.1 }} 
        >
          {benefitsData.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="bg-sky-700 p-8 rounded-xl border border-sky-700 transition-all duration-300"
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  borderColor: '#22d3ee',
                  boxShadow: '0 10px 20px rgba(34, 211, 238, 0.1)',
                }}
              >
                <div className="flex items-center gap-5">
                  <Icon className="text-4xl text-cyan-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-slate-200">
                    {benefit.text}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;