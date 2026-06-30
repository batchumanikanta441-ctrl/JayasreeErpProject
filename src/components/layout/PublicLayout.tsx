import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

export default function PublicLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();
  const itemCount = useCartStore((s) => s.items.length);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        transition: 'all var(--transition-base)',
        background: isScrolled ? 'rgba(10, 14, 26, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-primary)' : '1px solid transparent',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem',
              color: 'var(--text-inverse)',
            }}>J</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                Jayasree
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Enterprises
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: location.pathname === link.path ? 'var(--color-accent-400)' : 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)',
                  borderRadius: 'var(--radius-md)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => {
                  if (location.pathname !== link.path) e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/request-quote" className="desktop-nav btn btn-primary btn-sm">
              Get Quote
            </Link>

            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {user?.role === 'customer' && (
                  <Link to="/customer/cart" style={{ position: 'relative', padding: '0.5rem' }}>
                    <ShoppingCart size={20} color="var(--text-secondary)" />
                    {itemCount > 0 && (
                      <span style={{
                        position: 'absolute', top: 0, right: 0,
                        background: 'var(--color-accent-500)', color: 'var(--text-inverse)',
                        fontSize: '0.65rem', fontWeight: 700, width: 18, height: 18,
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{itemCount}</span>
                    )}
                  </Link>
                )}
                <Link
                  to={user?.role === 'customer' ? '/customer' : '/erp'}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <User size={16} />
                  <span className="desktop-nav">{user?.role === 'customer' ? 'My Account' : 'Dashboard'}</span>
                  <ChevronDown size={14} />
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm desktop-nav">Sign Up</Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ padding: '0.5rem', display: 'none' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: 'var(--header-height)', left: 0, right: 0, bottom: 0,
              background: 'rgba(10, 14, 26, 0.98)', backdropFilter: 'blur(20px)',
              zIndex: 45, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '1rem', fontSize: '1.1rem', fontWeight: 500,
                  color: location.pathname === link.path ? 'var(--color-accent-400)' : 'var(--text-secondary)',
                  borderBottom: '1px solid var(--border-primary)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/request-quote" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Get Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-primary)',
        padding: '4rem 0 2rem',
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            {/* Company */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-md)',
                  background: 'var(--gradient-accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem',
                  color: 'var(--text-inverse)',
                }}>J</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>Jayasree Enterprises</div>
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.8 }}>
                Your trusted partner for premium steel, cement, and construction materials. 
                Building stronger foundations since 2010.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {navLinks.map(link => (
                  <Link key={link.path} to={link.path} style={{ color: 'var(--text-muted)', fontSize: '0.875rem', transition: 'color var(--transition-fast)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-400)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                  >{link.label}</Link>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Products</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['TMT Steel Bars', 'Cement', 'GI Pipes', 'MS Angles', 'Channels', 'Construction Materials'].map(item => (
                  <Link key={item} to="/products" style={{ color: 'var(--text-muted)', fontSize: '0.875rem', transition: 'color var(--transition-fast)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-400)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                  >{item}</Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Contact Us</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <p>📍 45 Industrial Area, Nacharam,<br />Hyderabad, Telangana - 500076</p>
                <p>📞 +91 91002 77157</p>
                <p>✉️ info@jayasree-enterprises.in</p>
                <p>⏰ Mon - Sat: 9:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div style={{
            borderTop: '1px solid var(--border-primary)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              © {new Date().getFullYear()} Jayasree Enterprises. All rights reserved.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Powered by <span className="gradient-text" style={{ fontWeight: 600 }}>Jayasree ERP AI</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile responsive styles */}
      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
