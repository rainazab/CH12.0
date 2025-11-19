import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800/50 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 flex-grow">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 lg:gap-20 mb-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1 space-y-4">
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
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Visually compare APIs side-by-side and find your perfect match.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/compare" className="text-gray-400 hover:text-cyan-400 transition duration-300 text-xs sm:text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition">→</span>
                  Compare APIs
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="text-gray-400 hover:text-cyan-400 transition duration-300 text-xs sm:text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition">→</span>
                  Use Cases
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition duration-300 text-xs sm:text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition">→</span>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition duration-300 text-xs sm:text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition">→</span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition duration-300 text-xs sm:text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition">→</span>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition duration-300 text-xs sm:text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition">→</span>
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Copyright - At Very Bottom */}
      <div className="border-t border-gray-800 py-4 mt-auto bg-black/50 w-full">
        <p className="text-center text-xs text-gray-600 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          © 2025 Rho. All rights reserved.
          </p>
      </div>
    </footer>
  );
}

