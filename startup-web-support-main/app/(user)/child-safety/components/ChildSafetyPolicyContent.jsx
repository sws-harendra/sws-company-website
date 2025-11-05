"use client"
import React from 'react';
import { motion } from 'framer-motion';
import {
  IoCalendarOutline,        // Age Restriction
  IoCheckmarkDoneCircleOutline, // Account Verification
  IoFlagOutline,            // Reporting & Moderation
  IoBanOutline,             // Prohibited Content
  IoBandageOutline,       // Cooperation with Law Enforcement
  IoBulbOutline,            // Education & Awareness
  IoSyncCircleOutline,      // Continuous Improvement
  IoWarningOutline,         // Reporting Violations
  IoMailOutline,            // Contact for reporting
  IoShieldCheckmarkOutline, // General Intro Icon
} from 'react-icons/io5';

const policySections = [
  {
    icon: IoCalendarOutline,
    title: '1. Age Restriction',
    description: (
      <>
        Users must be at least 18 years of age to create an account or use our platform.
        Any attempt to create an account with false information will result in immediate suspension and reporting.
      </>
    ),
  },
  {
    icon: IoCheckmarkDoneCircleOutline,
    title: '2. Account Verification',
    description: (
      <>
        All users must verify their identity through email and mobile authentication.
        We utilize AI-driven age detection and profile moderation tools to flag potential underage accounts.
      </>
    ),
  },
  {
    icon: IoFlagOutline,
    title: '3. Reporting & Moderation',
    description: (
      <>
        Users can report suspicious profiles, messages, or behavior directly through the app.
        Our moderation team reviews all reports and takes swift action, including banning accounts and contacting relevant authorities.
      </>
    ),
  },
  {
    icon: IoBanOutline,
    title: '4. Prohibited Content',
    description: (
      <>
        Sharing, requesting, or possessing any content involving minors is strictly prohibited and will result in immediate legal action.
        Conversations involving minors or inappropriate content will be flagged, investigated, and escalated.
      </>
    ),
  },
  {
    icon: IoBandageOutline,
    title: '5. Cooperation with Law Enforcement',
    description: (
      <>
        We fully cooperate with law enforcement authorities in investigating any incidents involving child safety.
        All valid legal requests for information will be responded to promptly and comprehensively.
      </>
    ),
  },
  {
    icon: IoBulbOutline,
    title: '6. Education and Awareness',
    description: (
      <>
        We provide educational material and regular prompts to users about recognizing and reporting harmful behavior.
        Users are encouraged to help maintain a safe and respectful community for everyone.
      </>
    ),
  },
  {
    icon: IoSyncCircleOutline,
    title: '7. Continuous Improvement',
    description: (
      <>
        Our child safety policies are continuously reviewed and updated in consultation with safety experts and community feedback.
        We are committed to adapting our policies and technologies to address evolving safety challenges.
      </>
    ),
  },
  {
    icon: IoWarningOutline,
    title: 'Reporting Violations',
    description: (
      <>
        If you suspect any violation of this policy, please report it immediately through the in-app reporting feature or email us at <a href="mailto:safety@shaadinger.com" className="text-sky-600 hover:underline">safety@shaadinger.com</a>.
        Your vigilance helps us maintain a safe platform.
      </>
    ),
  },
];

const ChildSafetyPolicyContent = () => {
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
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-6 max-w-6xl"> {/* Slightly wider for content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Intro Paragraph */}
          <motion.div 
            className="bg-sky-50 p-6 rounded-xl border border-sky-100 mb-12 text-center"
            variants={itemVariants}
          >
            <IoShieldCheckmarkOutline className="text-5xl text-sky-600 mx-auto mb-4" />
            <p className="text-lg text-gray-700 leading-relaxed">
              At Startup Web Support (or "Shaadinger App" as per original content), the safety and well-being of children is a top priority. Although our platform is intended strictly for adults, we have implemented robust standards to prevent any misuse of our platform involving minors.
            </p>
          </motion.div>

          {/* Policy Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Two columns for better layout */}
            {policySections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-slate-50 p-8 rounded-xl shadow-md border border-gray-100 flex flex-col h-full"
                  variants={itemVariants}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-sky-100 text-sky-600 rounded-lg p-2 flex-shrink-0">
                      <Icon className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 leading-tight">
                      {section.title}
                    </h3>
                  </div>
                  <div className="text-gray-600 text-base leading-relaxed flex-grow">
                    {section.description}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Final Statement */}
          <motion.div 
            className="mt-16 text-center bg-sky-50 p-8 rounded-xl border border-sky-100"
            variants={itemVariants}
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Together, we can create a safe and respectful platform for everyone.
            </p>
            <p className="text-sm text-gray-500">
              Effective Date: May 20, 2025
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChildSafetyPolicyContent;