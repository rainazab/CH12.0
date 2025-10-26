import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Menu, X, Sparkles } from 'lucide-react';

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
    { name: 'Compare', href: '/compare', type: 'link' },
    { name: 'Sign In', href: '/signin', type: 'button' },
    { name: 'Get Started', href: '/get-started', type: 'link' }
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
              color: isScrolled ? 'black' : 'black',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#3b82f6'}
            onMouseOut={(e) => e.target.style.color = isScrolled ? 'black' : 'black'}
          >
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                animation: 'shimmer 2s infinite'
              }}></div>
              <Sparkles style={{ width: '1.5rem', height: '1.5rem', color: 'white', position: 'relative', zIndex: 1 }} />
            </div>
            <span style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '700',
              fontSize: '1.5rem',
              letterSpacing: '-0.025em'
            }}>
              Rho
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;

              if (item.type === 'button') {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: 'white',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                      border: 'none'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                    }}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              }

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
                      ? '#667eea'
                      : (isScrolled ? '#374151' : '#6b7280'),
                    background: isActive ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.target.style.color = '#667eea';
                      e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.target.style.color = isScrolled ? '#374151' : '#6b7280';
                      e.target.style.background = 'transparent';
                    }
                  }}
                >
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
                color: isScrolled ? 'black' : 'black',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.color = isScrolled ? '#374151' : 'black';
                e.target.style.background = isScrolled ? '#f9fafb' : 'rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.color = isScrolled ? 'black' : 'black';
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
                const isActive = location.pathname === item.href;

                if (item.type === 'button') {
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
                        borderRadius: '0.75rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'white',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <span>{item.name}</span>
                    </Link>
                  );
                }

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
                      color: isActive ? '#667eea' : 'black',
                      background: isActive ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      if (!isActive) {
                        e.target.style.color = '#667eea';
                        e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isActive) {
                        e.target.style.color = 'black';
                        e.target.style.background = 'transparent';
                      }
                    }}
                  >
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

// Add shimmer animation keyframes
const shimmerKeyframes = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

// Inject keyframes into document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shimmerKeyframes;
  document.head.appendChild(style);
}

export default Header;
