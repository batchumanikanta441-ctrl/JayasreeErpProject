import { useEffect, useState } from "react";
import { getCustomerDashboard } from "@/services/dashboardService";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package, FileText, CreditCard, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { orders, payments } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function CustomerDashboard() {

  const [dashboard, setDashboard] = useState<any>(null);

useEffect(() => {
  const loadDashboard = async () => {
    try {
      const data = await getCustomerDashboard();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  loadDashboard();
}, []);

  const recentOrders = orders.slice(0, 3);

  const kpis = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: '#3b82f6' },
    { label: 'Total Spent', value: formatCurrency(orders.reduce((s, o) => s + o.totalAmount, 0)), icon: CreditCard, color: '#f59e0b' },
    { label: 'Pending Orders', value: orders.filter(o => o.orderStatus === 'pending' || o.orderStatus === 'processing').length, icon: Clock, color: '#f97316' },
    { label: 'This Month', value: formatCurrency(320000), icon: TrendingUp, color: '#22c55e' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Welcome back! 👋</h1>
        <p style={{ color: 'var(--text-muted)' }}>Here's your account overview</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="kpi-card">
              <div className="kpi-icon" style={{ background: `${kpi.color}15`, color: kpi.color }}><Icon size={22} /></div>
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-label">{kpi.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Browse Products', path: '/customer/catalog', icon: Package, gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
          { label: 'My Orders', path: '/customer/orders', icon: ShoppingBag, gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
          { label: 'My Invoices', path: '/customer/invoices', icon: FileText, gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} to={action.path} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: action.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{action.label}</div>
              </div>
              <ArrowRight size={16} color="var(--text-muted)" />
            </Link>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700 }}>Recent Orders</h2>
          <Link to="/customer/orders" style={{ fontSize: '0.85rem', color: 'var(--color-accent-400)', fontWeight: 600 }}>View All →</Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{order.orderNumber}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td style={{ fontWeight: 600 }}>{formatCurrency(order.totalAmount)}</td>
                  <td><span className={`badge badge-${order.orderStatus === 'delivered' ? 'success' : order.orderStatus === 'pending' ? 'warning' : 'info'}`}>{order.orderStatus}</span></td>
                  <td><span className={`badge badge-${order.paymentStatus === 'paid' ? 'success' : order.paymentStatus === 'partial' ? 'warning' : 'danger'}`}>{order.paymentStatus}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
