'use client';

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Get in <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Have questions, feedback, or want to collaborate? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Email</h3>
              <p className="text-lg text-gray-400">
                <a href="mailto:hello@rho.dev" className="hover:text-cyan-400 transition">
                  hello@rho.dev
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Social</h3>
              <p className="text-gray-400 text-lg">
                Follow us on X for updates and announcements
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Location</h3>
              <p className="text-gray-400 text-lg">
                Built at CalHacks 12.0<br />
                UC Berkeley, California
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-600/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Why Connect?</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                <span>Share feature requests</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                <span>Report bugs or issues</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                <span>Discuss partnerships</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                <span>General inquiries</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-8 text-center">
          <p className="text-gray-300 text-lg">
            We're responsive and typically reply within 24 hours. Thanks for reaching out!
          </p>
        </div>
      </div>
    </div>
  );
}

