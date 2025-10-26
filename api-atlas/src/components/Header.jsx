import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, BarChart3, Zap, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Debug logging
  console.log('Header component rendered, location:', location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Discover', href: '/', icon: Search },
    { name: 'Performance', href: '/performance', icon: BarChart3 },
    { name: 'Compare', href: '/compare', icon: Zap }
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'
    }}>
      <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: isScrolled ? '#1f2937' : 'white',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#3b82f6'}
            onMouseOut={(e) => e.target.style.color = isScrolled ? '#1f2937' : 'white'}
          >
            <div style={{
              width: '2rem',
              height: '2rem',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
            </div>
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Rho
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: isActive
                      ? (isScrolled ? '#1d4ed8' : '#3b82f6')
                      : (isScrolled ? '#6b7280' : 'rgba(255, 255, 255, 0.9)'),
                    background: isActive
                      ? (isScrolled ? '#dbeafe' : 'rgba(255, 255, 255, 0.1)')
                      : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.target.style.color = isScrolled ? '#374151' : 'white';
                      e.target.style.background = isScrolled ? '#f9fafb' : 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.target.style.color = isScrolled ? '#6b7280' : 'rgba(255, 255, 255, 0.9)';
                      e.target.style.background = 'transparent';
                    }
                  }}
                >
                  <Icon style={{ width: '1rem', height: '1rem' }} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div style={{ display: 'none' }}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                color: isScrolled ? '#6b7280' : 'rgba(255, 255, 255, 0.9)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.color = isScrolled ? '#374151' : 'white';
                e.target.style.background = isScrolled ? '#f9fafb' : 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.color = isScrolled ? '#6b7280' : 'rgba(255, 255, 255, 0.9)';
                e.target.style.background = 'transparent';
              }}
            >
              {isMobileMenuOpen ? (
                <X style={{ width: '1.5rem', height: '1.5rem' }} />
              ) : (
                <Menu style={{ width: '1.5rem', height: '1.5rem' }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div style={{
            display: 'none',
            borderTop: '1px solid #e5e7eb',
            background: 'white'
          }}>
            <div style={{ padding: '0.5rem 0 0.75rem 0' }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: isActive ? '#1d4ed8' : '#6b7280',
                      background: isActive ? '#dbeafe' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      if (!isActive) {
                        e.target.style.color = '#374151';
                        e.target.style.background = '#f9fafb';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isActive) {
                        e.target.style.color = '#6b7280';
                        e.target.style.background = 'transparent';
                      }
                    }}
                  >
                    <Icon style={{ width: '1.25rem', height: '1.25rem' }} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
