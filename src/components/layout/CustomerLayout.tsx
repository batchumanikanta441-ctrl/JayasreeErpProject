import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import {
  LayoutDashboard, ShoppingBag, Package, FileText, Receipt,
  User, LogOut, ShoppingCart, Menu, X, Bell, Search, ChevronRight, Home
} from 'lucide-react';

const customerNav = [
  { label: 'Dashboard', path: '/customer', icon: LayoutDashboard },
  { label: 'Product Catalog', path: '/customer/catalog', icon: ShoppingBag },
  { label: 'My Cart', path: '/customer/cart', icon: ShoppingCart },
  { label: 'My Orders', path: '/customer/orders', icon: Package },
  { label: 'My Invoices', path: '/customer/invoices', icon: FileText },
  { label: 'My Profile', path: '/customer/profile', icon: User },
];

export default function CustomerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const itemCount = useCartStore((s) => s.items.length);

  const isActive = (path: string) => {
    if (path === '/customer') return location.pathname === '/customer';
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} style={{ width: 260 }}>
        <div className="sidebar-logo">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem',
              color: 'var(--text-inverse)',
            }}>J</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>Customer Portal</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Jayasree Enterprises</div>
            </div>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-title">Navigation</div>
          {customerNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sidebar-icon"><Icon size={18} /></span>
                <span>{item.label}</span>
                {item.label === 'My Cart' && itemCount > 0 && (
                  <span style={{
                    marginLeft: 'auto', background: 'var(--color-accent-500)', color: 'var(--text-inverse)',
                    fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-full)',
                  }}>{itemCount}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-tertiary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-accent-400)',
            }}>{user?.name?.charAt(0) || 'U'}</div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user?.name || 'Customer'}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user?.email}</div>
            </div>
          </div>
          <button onClick={logout} className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--color-danger-400)' }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 35 }}
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Area */}
      <div style={{ flex: 1, marginLeft: 260, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <header style={{
          height: 'var(--header-height)', display: 'flex', alignItems: 'center',
          padding: '0 1.5rem', background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-primary)', gap: '1rem',
        }}>
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)} style={{ display: 'none' }}>
            <Menu size={24} />
          </button>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}><Home size={14} /></Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--text-primary)' }}>
              {customerNav.find(n => isActive(n.path))?.label || 'Customer Portal'}
            </span>
          </div>

          <div style={{ flex: 1 }} />

          {/* Search */}
          <div style={{ position: 'relative', width: 240 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="input-field" placeholder="Search products..." style={{ paddingLeft: 36, height: 38, fontSize: '0.8rem', width: '100%' }} />
          </div>

          {/* Notifications */}
          <button style={{ position: 'relative', padding: '0.5rem' }}>
            <Bell size={20} color="var(--text-secondary)" />
            <span className="notification-dot" />
          </button>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); }
          .mobile-menu-btn { display: flex !important; }
          div[style*="marginLeft: 260"] { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}
