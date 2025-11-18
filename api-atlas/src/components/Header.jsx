import { useState } from 'react';
import { Menu, X, Sparkles, Github, Twitter } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                rho
              </span>
              <span className="text-xs text-gray-500 font-medium">API Discovery</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium text-sm transition">
              Discover
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium text-sm transition">
              Compare
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium text-sm transition">
              Pricing
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium text-sm transition">
              Docs
            </a>
          </nav>

          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <a href="#" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Github className="w-5 h-5 text-gray-700" />
              </a>
              <a href="#" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Twitter className="w-5 h-5 text-gray-700" />
              </a>
            </div>

            <button className="hidden md:inline-flex px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/40 transition transform hover:scale-105">
              Get Started
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden border-t border-gray-100 py-4 space-y-3">
            <a href="#" className="block px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition">
              Discover
            </a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition">
              Compare
            </a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition">
              Pricing
            </a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition">
              Docs
            </a>
            <button className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg">
              Get Started
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
