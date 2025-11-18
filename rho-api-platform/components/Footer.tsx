import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="grid md:grid-cols-4 gap-12 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/loading.png" 
                alt="Rho" 
                className="w-6 h-6 object-contain"
              />
              <h3 className="font-bold text-white text-lg">Rho</h3>
            </div>
            <p className="text-sm text-gray-400">
              Visually compare APIs side-by-side and find your perfect match.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/compare" className="text-gray-400 hover:text-cyan-400 transition">
                  Compare APIs
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-cyan-400 transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Spacer to push copyright to bottom */}
      <div className="flex-grow"></div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-gray-800 py-2">
        <p className="text-center text-xs text-gray-600">
          © 2025 Rho. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

