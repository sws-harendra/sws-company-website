import React from "react";

export default function TechStack() {
  const technologies = [
    {
      name: "Php",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      color: "from-purple-400 to-purple-500",
    },
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "from-cyan-400 to-blue-500",
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "MongoDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "from-green-600 to-teal-600",
    },

    {
      name: "Next.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: "from-gray-700 to-gray-900",
    },
    {
      name: "Tailwind",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      color: "from-cyan-400 to-blue-600",
    },
    {
      name: "PostgreSQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      color: "from-blue-700 to-indigo-700",
    },

    {
      name: "Laravel",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Mysql",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      color: "from-blue-500 to-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Text Content */}
        <div className="space-y-6 text-gray-900">
          <div className="inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-brand-color to-secondary-brand-color sm:text-xl  text-sm font-semibold tracking-widest uppercase">
              Technology Stack
            </span>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 mt-2 rounded-full"></div>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            Powered by
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600">
              Modern Tech
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We leverage cutting-edge technologies to build scalable, performant,
            and maintainable applications. Our tech stack is carefully curated
            to deliver exceptional user experiences and robust backend
            solutions.
          </p>

          <div className="flex gap-4 pt-4">
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
              Get Started
            </button>
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-cyan-500 hover:text-cyan-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side - Geometric Tech Grid */}
        <div className="relative">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 blur-3xl"></div>

          {/* Hexagonal Grid Pattern */}
          <div className="relative grid grid-cols-3 gap-6">
            {technologies.map((tech, idx) => (
              <div
                key={tech.name}
                className="group relative"
                style={{
                  animation: `float ${3 + (idx % 3)}s ease-in-out infinite`,
                  animationDelay: `${idx * 0.2}s`,
                }}
              >
                {/* Hexagon Shape */}
                <div className="relative aspect-square">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                    style={{
                      clipPath:
                        "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                    }}
                  ></div>

                  {/* Border */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-30 group-hover:opacity-60 transition-all duration-300 group-hover:scale-105`}
                    style={{
                      clipPath:
                        "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                      padding: "2px",
                    }}
                  ></div>

                  {/* Inner Content */}
                  <div
                    className="absolute inset-0 bg-white flex items-center justify-center group-hover:bg-gray-50 transition-colors duration-300"
                    style={{
                      clipPath:
                        "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                      margin: "2px",
                    }}
                  >
                    <div className="text-center p-4">
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className="w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
                      />
                      <div
                        className={`text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-br ${tech.color}`}
                      >
                        {tech.name}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`}
                  style={{
                    clipPath:
                      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
