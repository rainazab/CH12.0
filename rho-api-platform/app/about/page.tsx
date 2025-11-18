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
        </div>
      </div>
    </div>
  );
}

