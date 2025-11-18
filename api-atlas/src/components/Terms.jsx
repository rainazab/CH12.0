export default function Terms() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12">Terms of Service</h1>
        
        <div className="space-y-8 text-gray-300">
          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using Rho's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">2. Use License</h2>
            <p className="mb-4">Permission is granted to temporarily download one copy of the materials (information or software) on Rho's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software</li>
              <li>Removing any copyright or other proprietary notations</li>
              <li>Transferring the materials to another person or "mirroring" the materials</li>
              <li>Using the materials for any illegal purpose or in violation of any laws</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">3. Disclaimer</h2>
            <p>
              The materials on Rho's website are provided "as is". Rho makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">4. Limitations</h2>
            <p>
              In no event shall Rho or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Rho's website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Rho's website could include technical, typographical, or photographic errors. Rho does not warrant that any of the materials on our website are accurate, complete, or current. Rho may make changes to the materials contained on our website at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">6. Links</h2>
            <p>
              Rho has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Rho of the site. Use of any such linked website is at the user's own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">7. Modifications</h2>
            <p>
              Rho may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Rho operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">9. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:legal@rho.dev" className="text-cyan-400 hover:underline">
                legal@rho.dev
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

