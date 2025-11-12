import React from "react";
import {
  Smartphone,
  Apple,
  Monitor,
  Rocket,
  Gamepad2,
  FileText,
} from "lucide-react";

export default function AppDevelopmentServices() {
  const services = [
    {
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      title: "Custom Mobile App Development",
      description:
        "Tailored solutions that meet your specific requirements across various platforms including iOS, Android, and Windows.",
      features: [
        "Custom UI/UX design",
        "Native and cross-platform",
        "Integration with existing systems",
        "Performance optimization",
        "Scalability and security",
      ],
    },
    {
      icon: <Apple className="w-8 h-8 text-blue-500" />,
      title: "iOS App Development",
      description:
        "Robust and user-friendly iOS applications for iPhone, iPad, and Apple Watch, following best practices.",
      features: [
        "Swift and Objective-C development",
        "iPhone and iPad app development",
        "Apple Watch app development",
        "App Store submission & approval",
        "Ongoing maintenance & support",
      ],
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-500" />,
      title: "Android App Development",
      description:
        "High-performance apps providing a seamless experience across all Android devices and OS versions.",
      features: [
        "Dart and Flutter development",
        "Smartphone and tablet apps",
        "Wearable app development",
        "Google Play Store submission",
        "Ongoing maintenance & support",
      ],
    },
    {
      icon: <Rocket className="w-8 h-8 text-purple-500" />,
      title: "Cross-Platform App Development",
      description:
        "Reach a wider audience with apps built using React Native and Flutter, running smoothly on both iOS and Android.",
      features: [
        "Single codebase for multiple platforms",
        "Consistent user experience",
        "Faster development and deployment",
        "Cost-effective solution",
        "Ongoing maintenance & support",
      ],
    },
    {
      icon: <Monitor className="w-8 h-8 text-indigo-500" />,
      title: "Progressive Web App (PWA) Development",
      description:
        "Combines the best of web and mobile app experiences with PWAs - fast, reliable, and native-like.",
      features: [
        "Responsive design",
        "Offline functionality",
        "Push notifications",
        "App-like performance",
        "SEO-updatable and maintenance",
      ],
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-pink-500" />,
      title: "Game Development",
      description:
        "Bring your game ideas to life with our expert game development services.",
      features: [
        "Engaging gameplay design",
        "Cross-platform game development",
        "Stunning graphics & animation",
        "Monetization strategies",
        "Post-launch support",
      ],
    },
  ];

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Our Comprehensive App Development Services
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a full spectrum of mobile development, from concept to
            launch, ensuring your app stands out in a crowded marketplace.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200 group"
            >
              {/* Icon */}
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-sm text-gray-700"
                  >
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
