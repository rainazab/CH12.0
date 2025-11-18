'use client';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Rho</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Rho is a modern API comparison platform built to solve a real problem: choosing the right AI API is overwhelming.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We believe developers deserve better tools for making API decisions. Instead of scattered documentation, conflicting reviews, and endless spreadsheets, Rho brings everything together in one visual interface.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our mission is to save developers time and help them make data-driven decisions about which APIs to use.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white mb-4">Why We Built Rho</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              The AI API ecosystem is crowded and constantly changing. Prices shift, features get deprecated, and performance varies. We realized there was no reliable way to compare APIs side-by-side and make informed decisions.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Built at CalHacks 12.0, Rho was created by developers, for developers who want clarity and speed when evaluating APIs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white mb-4">What We Offer</h2>
            <ul className="space-y-3 text-lg text-gray-300">
              <li className="flex gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Real-time API comparison with visual outputs</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Accurate cost tracking and pricing comparisons</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Performance metrics including latency and uptime</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Smart recommendations based on your needs</span>
              </li>
            </ul>
          </section>

          <section className="space-y-8 pt-8 border-t border-gray-800">
            <h2 className="text-3xl font-bold text-white">Built at CalHacks 12.0</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  name: 'Raina Zab',
                  image: '/rz.jpg',
                  website: 'www.rainazab.com',
                  linkedin: 'https://www.linkedin.com/in/rainazab/',
                },
                {
                  name: 'Matilda Verdejo',
                  image: '/mv.jpg',
                  website: null,
                  linkedin: 'https://www.linkedin.com/in/matildaverdejo/',
                },
                {
                  name: 'Fernanda Palacios',
                  image: '/fp.jpg',
                  website: null,
                  linkedin: 'https://www.linkedin.com/in/maria-fernanda-palacios/',
                },
                {
                  name: 'Sarah Hoang',
                  image: null,
                  website: null,
                  linkedin: 'https://www.linkedin.com/in/sarah-hoang-compsci/',
                },
              ].map((member, idx) => (
                <div key={idx} className="text-center">
                  {member.image ? (
                    <div className="mb-4 flex justify-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover border-2 border-cyan-400/30"
                      />
                    </div>
                  ) : (
                    <div className="mb-4 flex justify-center">
                      <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700">
                        <span className="text-2xl font-bold text-cyan-400">{member.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                    </div>
                  )}
                  <h3 className="font-semibold text-white mb-2 text-lg">{member.name}</h3>
                  <div className="flex justify-center gap-3 flex-wrap items-center">
                    {member.website && (
                      <>
                        <a
                          href={`https://${member.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-cyan-400 hover:text-cyan-300 transition"
                        >
                          Website
                        </a>
                        <span className="text-cyan-400">|</span>
                      </>
                    )}
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-cyan-400 hover:text-cyan-300 transition"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

