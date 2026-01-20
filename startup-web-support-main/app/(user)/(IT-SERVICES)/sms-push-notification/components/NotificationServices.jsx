"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoChatbubblesOutline,
  IoRocketOutline,
  IoAnalyticsOutline,
  IoPersonAddOutline
} from 'react-icons/io5';
import { gridContainerVariants, headerTextVariants, textChildVariants } from '@/components/GlobalCss';

const serviceBenefits = [
  {
    icon: IoChatbubblesOutline,
    title: 'Increase App Engagement',
    description: 'Keeping users active and engaged is very important especially for businesses serving Patna fast growing digital audience. When you send personalized alerts, order updates and promotional notifications directly to mobile phones your business stays visible and connected with users.As reliable Push Notification service providers in Patna we work closely with local food delivery apps, salon booking platforms and education apps to help them increase user engagement in areas like Patliputra Colony Anisabad and Saguna More.',
  },
  {
    icon: IoRocketOutline,
    title: 'Drive More Sales',
    description: 'As reliable Push Notification service providers in Patna we work closely with local food delivery apps, salon booking platforms and education apps to help them increase user engagement in areas like Patliputra Colony Anisabad and Saguna More.For example a clothing store in Maurya Lok can send festival discount messages to nearby customers at the right time. In the same way an electronics shop in Kankarbagh can promote flash sales to people living in the same area. By using location based messaging businesses see higher open rates, faster replies and much better conversions because the message feels useful and timely.',
  },
  {
    icon: IoAnalyticsOutline,
    title: 'Monitor Real-time Performance',
    description: 'Understanding how campaigns perform across different parts of the city is extremely valuable. Our systems let businesses track delivery status engagement and responses in real time. These insights help you understand what works best for customers in areas like Gulzarbagh Phulwari Sharif or Kurji.As experienced SMS providers in Patna we offer simple dashboards that make campaign analysis easy without any technical confusion. Coaching institutes, clinics and real estate firms across Patna can use these insights to improve their communication and send messages that actually work based on real customer behavior.',
  },
  {
    icon: IoPersonAddOutline,
    title: 'Improve Customer Retention',
    description: 'Customer retention grows when there is trust and regular communication with customers. As experienced SMS and Push Notification service providers in Patna we help local businesses stay connected with their customers in a simple and reliable way. This includes appointment reminders payment alerts service follow ups and festival greetings so your customers always feel informed and valued.For example, a diagnostic center in Rajendra Nagar can easily send test report notifications to patients. In the same way a coaching institute near Boring Canal Road can share class updates and exam reminders without any confusion. These small but meaningful messages help build customer loyalty and create long term relationships that support steady business growth',
  },
];

const NotificationServices = () => {
 

  return (
    <section className="bg-white py-16 ">
      <div className="container mx-auto px-6 md:px-24 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
        >
          <motion.h2 variants={headerTextVariants} className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Engage Your Audience with Effective SMS and Push Notification Services
          </motion.h2>
          <motion.p variants={textChildVariants} className="text-lg text-gray-600 max-w-7xl mx-auto mt-4">
            As trusted SMS and Push Notification service providers in Patna, we work closely with local businesses to help them connect with their customers in a quick and personal way that actually works. In a city like Patna, people expect timely updates and clear information, and instant messaging has become an important part of everyday business communication. Since we are a locally based digital marketing and communication company in Bihar, we understand how people in areas like Boring Road, Kankarbagh, Rajendra Nagar, Bailey Road, and Danapur respond to messages that are sent at the right time and with the right purpose.<br></br>
            From retail shops in Patna City to coaching centres in Ashok Rajpath and service based businesses around Fraser Road, our SMS and push notification solutions are built around real local business needs. Whether you want to share offers, send service updates, or make important announcements, we make sure your message reaches your customers when it truly matters and gets noticed.

          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={gridContainerVariants}
        >
          {serviceBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="bg-slate-50 p-8 rounded-xl border border-slate-100 transition-all duration-300 transform hover:shadow-xl hover:border-slate-200 hover:-translate-y-2"
                variants={textChildVariants}
              >
                <div className="flex items-start gap-6">
                  <div className="bg-sky-100 text-sky-600 rounded-lg p-4">
                    <Icon className="text-4xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default NotificationServices;