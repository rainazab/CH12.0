export default function Privacy() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-300">
          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Introduction</h2>
            <p>
              At Rho, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and otherwise handle your personal information when you use our website and services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Information We Collect</h2>
            <p className="mb-4">We collect information in various ways, including:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Information you directly provide (account registration, contact forms)</li>
              <li>Automatically collected data (usage patterns, IP addresses, cookies)</li>
              <li>Third-party information to enhance our services</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use collected information for:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Providing and improving our services</li>
              <li>Personalizing your experience</li>
              <li>Communicating with you about updates and changes</li>
              <li>Analyzing usage patterns to enhance functionality</li>
              <li>Complying with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience, remember your preferences, and understand how you use Rho. You can control cookie settings through your browser.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Third-Party Services</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for their privacy practices. Please review their privacy policies before providing personal information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of certain communications</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at{' '}
              <a href="mailto:privacy@rho.dev" className="text-cyan-400 hover:underline">
                privacy@rho.dev
              </a>
            </p>
          </div>

          <p className="text-sm text-gray-500 pt-8 border-t border-gray-700">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

