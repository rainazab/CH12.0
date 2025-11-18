import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'bg-gradient-to-b from-black/80 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 hover:opacity-80 transition">
            <img 
              src="/loading.png" 
              alt="Rho" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold text-white">Rho</span>
          </a>

          {/* Right Side: Navigation + Get Started Button */}
          <div className="hidden md:flex items-center gap-8">
            {/* Desktop Navigation */}
            <nav className="flex items-center gap-8">
              <a href="#discover" className="text-gray-300 hover:text-cyan-400 font-medium text-sm transition">
                Discover
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-cyan-400 font-medium text-sm transition">
                Pricing
              </a>
              <a href="#signin" className="text-gray-300 hover:text-cyan-400 font-medium text-sm transition">
                Sign In
              </a>
            </nav>

            {/* Get Started Button */}
            <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition transform hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden border-t border-white/10 py-4 space-y-3 bg-black/50 backdrop-blur">
            <a href="#discover" className="block px-4 py-2 text-gray-300 hover:text-cyan-400 font-medium transition">
              Discover
            </a>
            <a href="#pricing" className="block px-4 py-2 text-gray-300 hover:text-cyan-400 font-medium transition">
              Pricing
            </a>
            <a href="#signin" className="block px-4 py-2 text-gray-300 hover:text-cyan-400 font-medium transition">
              Sign In
            </a>
            <button className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full">
              Get Started
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
