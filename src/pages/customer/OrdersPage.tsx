import { orders } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function OrdersPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>My Orders</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {orders.map(order => (
          <div key={order.id} className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.15rem' }}>{order.orderNumber}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Placed on {formatDate(order.createdAt, 'long')}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span className={`badge badge-${order.orderStatus === 'delivered' ? 'success' : order.orderStatus === 'pending' ? 'warning' : 'info'}`}>{order.orderStatus}</span>
                <span className={`badge badge-${order.paymentStatus === 'paid' ? 'success' : order.paymentStatus === 'partial' ? 'warning' : 'danger'}`}>{order.paymentStatus}</span>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-secondary)', paddingTop: '1rem' }}>
              {order.items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.productName} × {item.quantity} {item.unit}</span>
                  <span style={{ fontWeight: 600 }}>{formatCurrency(item.totalAmount)}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-secondary)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {order.expectedDelivery && `Expected: ${formatDate(order.expectedDelivery)}`}
                {order.deliveredAt && ` · Delivered: ${formatDate(order.deliveredAt)}`}
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-accent-400)' }}>{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
