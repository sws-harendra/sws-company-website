"use client"
import React from 'react';
import { motion } from 'framer-motion';
import {
  IoInformationCircleOutline, // 1. Collect
  IoSettingsOutline,         // 2. Use
  IoShieldCheckmarkOutline, // 3. Protect
  IoShareSocialOutline,     // 4. Sharing
  IoDiscOutline,            // 5. Cookies
  IoKeyOutline,             // 6. Rights
  IoLinkOutline,            // 7. Links
  IoSyncOutline,            // 8. Changes
  IoMailOutline             // 9. Contact
} from 'react-icons/io5';
import { gridContainerVariants, textChildVariants } from '@/components/GlobalCss';

// Define sections with icons
const policySections = [
    {
        icon: IoInformationCircleOutline,
        title: '1. Information We Collect',
        content: (
            <>
                <p>We might compile the following kinds of material:</p>
                <div className="ml-4 mt-4 space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-800">Personal Information</h4>
                        <ul className="list-disc list-outside ml-6 space-y-1 text-gray-600">
                        <li>Full name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Company name</li>
                        <li>Billing information</li>
                        <li>Project details</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">Non-Personal Information</h4>
                        <ul className="list-disc list-outside ml-6 space-y-1 text-gray-600">
                        <li>Browser type</li>
                        <li>IP address</li>
                        <li>Pages visited on our website</li>
                        <li>Time and date of visit</li>
                        <li>Referral sources</li>
                        </ul>
                    </div>
                </div>
            </>
        )
    },
    {
        icon: IoSettingsOutline,
        title: '2. How We Use Your Information',
        content: (
             <>
                <p>We use the information we collect for purposes such as:</p>
                <ul className="list-disc list-outside ml-6 space-y-1 mt-4 text-gray-600">
                    <li>Providing and managing our services</li>
                    <li>Communicating with you about your project or inquiries</li>
                    <li>Sending important updates, invoices, or marketing (if opted in)</li>
                    <li>Improving website performance and user experience</li>
                    <li>Complying with legal obligations</li>
                </ul>
            </>
        )
    },
        {
        icon: IoShieldCheckmarkOutline,
        title: '3. How We Protect Your Information',
        content: (
             <>
                <p>We use a variety of industry-standard security measures to protect your information, including:</p>
                <ul className="list-disc list-outside ml-6 space-y-1 mt-4 text-gray-600">
                    <li>SSL (Secure Socket Layer) encryption</li>
                    <li>Secure servers with limited access</li>
                    <li>Staff training on data privacy and protection</li>
                    <li>Regular software and security updates</li>
                </ul>
            </>
        )
    },
    {
        icon: IoShareSocialOutline,
        title: '4. Sharing of Information',
        content: <p>We do not sell, trade, or rent your personal information. We may share your information with trusted third-party service providers (e.g., hosting, payment processors) only when necessary to deliver our services. These vendors are required to keep your information confidential and use it only for the requested services.</p>
    },
     {
        icon: IoDiscOutline,
        title: '5. Cookies and Tracking Technologies',
        content: <p>We use cookies to enhance your browsing experience, analyse site usage, and personalise content. You can disable cookies in your browser settings, but some website areas may lose functionality.</p>
    },
     {
        icon: IoKeyOutline,
        title: '6. Your Rights and Choices',
        content: (
            <>
                <p>You have the right to:</p>
                <ul className="list-disc list-outside ml-6 space-y-1 mt-4 text-gray-600">
                    <li>Access the personal data we hold about you</li>
                    <li>Request corrections to inaccurate information</li>
                    <li>Request deletion of your data</li>
                    <li>Withdraw consent for marketing communications</li>
                </ul>
                <p className="mt-2">To exercise these rights, contact us at: info@startupwebsupport.com</p>
            </>
        )
    },
    {
        icon: IoLinkOutline,
        title: '7. Third-Party Links',
        content: <p>Our website may contain links to third-party sites. We are not responsible for their content or privacy practices. We advise reviewing their privacy policies independently.</p>
    },
    {
        icon: IoSyncOutline,
        title: '8. Changes to This Privacy Policy',
        content: <p>We may update this policy periodically. When we do, we will revise the "Effective Date". We encourage you to review this page regularly for any changes.</p>
    },
    {
        icon: IoMailOutline,
        title: '9. Contact Us',
        content: <p>If you have questions about this Privacy Policy or how we handle your data, please contact us at StartupWebSupport. [Add specific contact link/email here].</p>
    },
];

const PrivacyPolicyContent = () => {

  return (
    <section className="bg-white py-5"> {/* Light background */}
      <div className="container mx-auto px-6 max-w-4xl">

        <motion.div
          className="space-y-8" // Space between sections
          initial="hidden"
          whileInView="visible"
          variants={gridContainerVariants}
        >
          {policySections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md border border-gray-100" // Card styling
                variants={textChildVariants}
              >
                <div className="flex items-start gap-5 mb-5">
                    <div className="bg-sky-100 text-sky-600 rounded-lg p-3 mt-1 flex-shrink-0">
                        <Icon className="text-3xl" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                        {section.title}
                    </h2>
                </div>
                <div className="prose prose-md max-w-none text-gray-700"> {/* Prose for content styling */}
                    {section.content}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicyContent;