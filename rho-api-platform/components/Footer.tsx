import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="grid md:grid-cols-4 gap-20 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg backdrop-blur">
                <img 
                  src="/loading.png" 
                  alt="Rho" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <h3 className="font-bold text-white text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Rho</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Visually compare APIs side-by-side and find your perfect match.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4 pl-16">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/compare" className="text-gray-400 hover:text-cyan-400 transition duration-300 text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition">→</span>
                  Compare APIs
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-cyan-400 transition duration-300 text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition">→</span>
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4 pl-16">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition duration-300 text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition">→</span>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition duration-300 text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition">→</span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4 pl-16">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition duration-300 text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition">→</span>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition duration-300 text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition">→</span>
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-2 mt-2">
          <p className="text-center text-xs text-gray-600">
            © 2025 Rho. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

