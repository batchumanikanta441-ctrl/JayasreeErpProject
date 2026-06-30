import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import {
  LayoutDashboard, Package, Users, ShoppingCart, Truck, Receipt, FileBarChart,
  BarChart3, Bot, LogOut, Menu, X, Bell, Search, Settings, ChevronRight,
  Home, ChevronDown, Sun, Moon
} from 'lucide-react';

const erpNav = [
  { section: 'Overview', items: [
    { label: 'Dashboard', path: '/erp', icon: LayoutDashboard },
  ]},
  { section: 'Operations', items: [
  { label: 'Inventory', path: '/erp/inventory', icon: Package },
  { label: 'Sales & Orders', path: '/erp/sales', icon: ShoppingCart },
  { label: 'Customers', path: '/erp/customers', icon: Users },
  { label: 'Suppliers', path: '/erp/suppliers', icon: Truck },
  { label: 'Purchases', path: '/erp/purchases', icon: Package },
]},
  { section: 'Finance', items: [
    { label: 'Billing & Invoices', path: '/erp/billing', icon: Receipt },
    { label: 'Reports', path: '/erp/reports', icon: FileBarChart },
  ]},
  { section: 'Intelligence', items: [
    { label: 'Analytics', path: '/erp/analytics', icon: BarChart3 },
    { label: 'AI Assistant', path: '/erp/ai-assistant', icon: Bot },
  ]},
];

export default function ERPLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const sidebarWidth = collapsed ? 72 : 280;

  const isActive = (path: string) => {
    if (path === '/erp') return location.pathname === '/erp';
    return location.pathname.startsWith(path);
  };

  const getCurrentPageLabel = () => {
    for (const section of erpNav) {
      for (const item of section.items) {
        if (isActive(item.path)) return item.label;
      }
    }
    return 'Dashboard';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside
  className={`sidebar ${sidebarOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}
  style={{
    width: sidebarWidth,
    transition: 'width var(--transition-base)',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  }}
>
        {/* Logo */}
        <div className="sidebar-logo" style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <Link to="/erp" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem',
              color: 'var(--text-inverse)', flexShrink: 0,
            }}>J</div>
            {!collapsed && (
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>Jayasree ERP</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--color-accent-400)', letterSpacing: '0.1em', fontWeight: 600 }}>AI POWERED</div>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav
  className="sidebar-nav"
  style={{
    flex: 1,
    overflowY: "auto",
  }}
>
          {erpNav.map((section) => (
            <div key={section.section}>
              {!collapsed && <div className="sidebar-section-title">{section.section}</div>}
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                    style={{ justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? '0.75rem' : '0.625rem 1.5rem' }}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className="sidebar-icon"><Icon size={18} /></span>
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        {!collapsed && (
          <div
  style={{
    marginTop: "auto",
    padding: "1rem 1.5rem",
    borderTop: "1px solid var(--border-primary)",
    background: "var(--bg-secondary)",
  }}
>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-accent-500), var(--color-secondary-500))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 700, color: 'white',
              }}>{user?.name?.charAt(0) || 'O'}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Owner'}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user?.role || 'owner'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={logout} className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center', color: 'var(--color-danger-400)', fontSize: '0.75rem' }}>
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 35 }}
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: sidebarWidth, minHeight: '100vh', display: 'flex', flexDirection: 'column', transition: 'margin-left var(--transition-base)' }}>
        {/* Top Bar */}
        <header style={{
          height: 'var(--header-height)', display: 'flex', alignItems: 'center',
          padding: '0 1.5rem', background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-primary)', gap: '1rem',
          position: 'sticky', top: 0, zIndex: 30,
        }}>
          {/* Mobile menu / Collapse toggle */}
          <button onClick={() => {
            if (window.innerWidth <= 768) setSidebarOpen(true);
            else setCollapsed(!collapsed);
          }} style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
            <Menu size={20} color="var(--text-secondary)" />
          </button>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <Home size={14} />
            <ChevronRight size={14} />
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{getCurrentPageLabel()}</span>
          </div>

          <div style={{ flex: 1 }} />

          {/* Search */}
          <div style={{ position: 'relative', width: 300 }} className="desktop-nav">
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="input-field" placeholder="Search anything..." style={{ paddingLeft: 36, height: 38, fontSize: '0.8rem', width: '100%' }} />
          </div>

          {/* Notifications */}
          <button style={{ position: 'relative', padding: '0.5rem' }}>
            <Bell size={20} color="var(--text-secondary)" />
            <span className="notification-dot" />
          </button>

          {/* Settings */}
          <button style={{ padding: '0.5rem' }}>
            <Settings size={20} color="var(--text-secondary)" />
          </button>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); width: 280px !important; }
          .sidebar.open { transform: translateX(0); }
          div[style*="marginLeft"] { margin-left: 0 !important; }
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}
