export default function WebdevelopmentSection() {
  const serviceCards = [
    {
      title: "Website & CMS Development",
      points: [
        "Business & corporate websites",
        "CMS for easy updates",
        "Responsive design",
        "SEO-friendly structure",
      ],
    },
    {
      title: "Custom Web Applications",
      points: [
        "Full-stack web development",
        "Responsive web apps",
        "Enterprise solutions",
        " Cloud-based systems",
      ],
    },
    {
      title: "E-Commerce & Marketplaces",
      points: [
        "Custom ecommerce platforms",
        "Multi-vendor systems",
        "Secure payment integration",
        "Booking portals",
      ],
    },
    {
      title: "Booking & On-Demand Platforms",
      points: [
        "appointment booking",
        "Service portals",
        "EScheduling systems",
      ],
    },
    {
      title: "Transport & Cab Booking",
      points: [
        "Cab booking applications",
        "Driver & trip management",
        "Vehicle rental platforms",
      ],
    },
    {
      title: "ERP & Enterprise Systems",
      points: [
        "ERP Development",
        "Hotel booking engines",
        "School tracking systems",
        "Admin dashboards",
      ],
    },
  ];

  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Professional Web Development Services in Patna for Scalable Digital Growth
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
             At Startup Web Support, our work is simple — We provide web development solutions in Patna that make daily business work easier, not complicated. As a trusted website development company, we create websites that are fast, secure, and easy to handle, even if you are not from a technical background.</p>
            <p>Whether you need a basic business website, a custom application, or a booking platform, we take a clear and practical approach. We focus on what your business actually needs today and make sure the website supports your work as you grow.</p>
          
          
        </div>

        {/* Intro Text */}
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
           A Trusted Website Development Company in Patna, Bihar
          </h3>
          <p className="text-gray-600 leading-relaxed">
           As an experienced website development company in bihar, we focus on building websites that look professional and work properly in real use. Our designers and developers pay attention to how people use the website and also make sure everything works smoothly in the backend.
          </p>
          <p>Many businesses know us as one of the best website development company in patna because we follow a clear process, communicate honestly, and stay available even after the website is live for updates and support.</p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition duration-300"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                {card.title}
              </h4>

              <ul className="space-y-3 text-gray-600">
                {card.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 bg-blue-600 rounded-full"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Why Choose Startup Web Support */}
<div className="max-w-6xl mx-auto mt-28">

  {/* Heading */}
  <div className="text-center mb-14">
    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      Why Choose Startup Web Support?
    </h3>
    <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
       As a growing web development company in patna, our aim is straightforward — create digital solutions that are actually useful in day-to-day business. We avoid overcomplicating things and focus on work that helps your business run better and grow steadily.
    </p>
  </div>

  {/* Content Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

    {/* Left: List */}
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h4 className="text-xl font-semibold text-gray-900 mb-6">
        What Makes Us Different
      </h4>

      <ul className="space-y-4 text-gray-600">
        {[
          " Trusted Patna web design agency that understands local markets and how businesses operate here",
          " A skilled and friendly development team that is easy to talk to and quick to respond.",
          " We handle everything from the first discussion to final delivery, so you don’t have to manage multiple people.",
          "Custom and scalable solutions built around your business needs, not ready-made ideas.",
          "Affordable pricing with support that doesn’t disappear after the website is live.",
        ].map((item, index) => (
          <li key={index} className="flex gap-3">
            <span className="mt-2 h-2 w-2 bg-blue-600 rounded-full flex-shrink-0"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Right: Cards */}
    <div className="grid sm:grid-cols-2 gap-6">
      {[
        {
          title: "Local Business Focus",
          text: "We understand how businesses work in Patna and Bihar, so our solutions are practical and effective.",
        },
        {
          title: "Scalable Solutions",
          text: "Our systems grow with your business and handle more users and data easily.",
        },
        {
          title: "Secure Development",
          text: "We follow clean coding and security best practices to keep your data safe.",
        },
        {
          title: "Long-Term Support",
          text: "We stay with you even after delivery to ensure smooth performance and updates.",
        },
      ].map((card, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition"
        >
          <h5 className="text-lg font-semibold text-gray-900 mb-2">
            {card.title}
          </h5>
          <p className="text-gray-600 text-sm leading-relaxed">
            {card.text}
          </p>
        </div>
      ))}
    </div>

  </div>
</div>


      </div>
    </section>
  );
}
