'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Menu, X, LogOut } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 bg-black/80 backdrop-blur-xl transition-all ${isScrolled ? 'border-b border-white/10' : 'border-b border-transparent'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img 
              src="/loading.png" 
              alt="Rho" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-2xl font-bold text-white">
              Rho
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/compare" className="text-gray-300 hover:text-cyan-400 transition">
              Compare APIs
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-cyan-400 transition">
              Pricing
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-300 text-sm">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10 py-4 space-y-3">
            <Link href="/compare" className="block px-4 py-2 text-gray-300 hover:text-cyan-400">
              Compare APIs
            </Link>
            <Link href="/pricing" className="block px-4 py-2 text-gray-300 hover:text-cyan-400">
              Pricing
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-600/20"
              >
                Sign Out
              </button>
            ) : (
              <Link href="/auth/signin" className="block px-4 py-2 text-cyan-400">
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

