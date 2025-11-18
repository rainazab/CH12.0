'use client';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Privacy <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Policy</span>
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-12 text-gray-300">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
            <p>
              At Rho, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Information We Collect</h2>
            <p>We collect information you provide directly, such as:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Account information (email, username)</li>
              <li>Search queries and API preferences</li>
              <li>Comparison history</li>
              <li>Usage analytics and logs</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Analyze usage patterns</li>
              <li>Communicate with you about updates</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Third-Party Services</h2>
            <p>
              We may use third-party services for analytics, authentication, and infrastructure. These services have their own privacy policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. Contact us at hello@rho.dev to exercise these rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at <a href="mailto:support@rhoapi.com" className="text-cyan-400 hover:text-cyan-300">support@rhoapi.com</a>
            </p>
          </section>
        </div>
        {/* Last Updated */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">Last updated: November 2025</p>
        </div>
      </div>
    </div>
  );
}

