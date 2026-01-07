export default function WebdevelopmentSection() {
  const serviceCards = [
    {
      title: "Website & CMS Development",
      points: [
        "Business & corporate websites",
        "CMS development for easy updates",
        "Responsive website design",
        "SEO-friendly website structure",
      ],
    },
    {
      title: "Custom Web Applications",
      points: [
        "Full-stack web development",
        "Responsive web apps",
        "Enterprise web applications",
        "Cloud-based web solutions",
      ],
    },
    {
      title: "E-Commerce & Marketplaces",
      points: [
        "Custom ecommerce websites",
        "Multi-vendor marketplace",
        "Secure payment gateway",
        "Service + product booking portals",
      ],
    },
    {
      title: "Booking & On-Demand Platforms",
      points: [
        "Online appointment booking",
        "Doctor & service booking portals",
        "Event & scheduling systems",
        "On-demand service platforms",
      ],
    },
    {
      title: "Transport & Cab Booking",
      points: [
        "Cab booking web applications",
        "Driver & trip management",
        "Vehicle rental platforms",
        "Logistics & transport systems",
      ],
    },
    {
      title: "ERP & Enterprise Systems",
      points: [
        "ERP & vendor management",
        "Hotel booking engines",
        "School bus tracking systems",
        "Utility & admin dashboards",
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
            At <strong>Startup Web Support</strong>, , we build web development in Patna for businesses that want real results, 
            not just a website just for name’s sake. As a trusted web development company in Patna, we make websites and web applications 
            that are fast, safe, and easy to use, and that actually help in daily business work.<br></br>
            <p>Whether you need a simple business website, a custom web application, or a full booking website, our team builds everything 
            in a clear and practical way. We focus on websites that work properly, load fast, and support your business goals from day one.</p>
          </p>
        </div>

        {/* Intro Text */}
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            A Trusted Website Development Company in Patna, Bihar
          </h3>
          <p className="text-gray-600 leading-relaxed">
           As an experienced website development company in Patna Bihar, we focus on making websites that look good and work properly. 
           Our team has friendly designers and developers who understand how people use a website and also how things work in the backend.
          </p>
          <p>Many businesses know us as one of the best web development company in Patna because we follow a clear and step-by-step process. 
            First, we understand what you need. Then we plan simple design (UI/UX), start development, do proper testing, and after the website 
            goes live, we stay with you for post-launch support. This way, your website stays stable, fast, and reliable for a long time.</p>
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
      As a growing web development company in Patna, our goal is simple —
      build useful, secure, and scalable digital solutions that help businesses
      grow without confusion or heavy technical words.
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
          "Trusted web development company in Patna with strong local business understanding",
          "Skilled, experienced, and friendly development team",
          "End-to-end project handling from planning to long-term support",
          "Custom, secure, and scalable solutions built for growth",
          "Affordable pricing with reliable post-launch support",
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
