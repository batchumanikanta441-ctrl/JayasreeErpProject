import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Package } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { formatCurrency } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal, getGstAmount, getShippingCharges, getTotalAmount } = useCartStore();
  const invalidStock = items.some(
  item =>
    item.quantity >
    (item.product.stockQty ?? item.product.stock)
);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <ShoppingBag size={64} color="var(--text-muted)" style={{ margin: '0 auto 1.5rem', opacity: 0.3 }} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Browse our catalog to add products</p>
        <Link to="/customer/catalog" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800 }}>Shopping Cart ({items.length})</h1>
        <button onClick={clearCart} className="btn btn-ghost btn-sm" style={{ color: 'var(--color-danger-400)' }}>
          <Trash2 size={14} /> Clear All
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map(item => (
            <div key={item.productId} className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Package size={28} color="var(--color-accent-400)" style={{ opacity: 0.4 }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.15rem' }}>{item.product.name}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.product.brand} · {formatCurrency(item.product.price)}/{item.product.unit}</p>
                <p
  style={{
    color:
      (item.product.stockQty ?? item.product.stock) > 0
        ? "#22c55e"
        : "#ef4444",
    fontSize: "12px",
    marginTop: 4,
    fontWeight: 600,
  }}
>
  {(item.product.stockQty ?? item.product.stock)> 0
    ? `Available Stock : ${(item.product.stockQty ?? item.product.stock)} ${item.product.unit}`
    : "Out of Stock"}
</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>GST: {item.product.gstRate}%</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)' }}>
                <button
  disabled={
    item.quantity <= item.product.minOrderQty
  }
  onClick={() =>
    updateQuantity(
      item.productId,
      item.quantity - (item.product.minOrderQty ?? 1)
    )
  }
>
  <Minus size={14} />
</button>
                <span style={{ padding: '0.4rem 0.75rem', borderLeft: '1px solid var(--border-primary)', borderRight: '1px solid var(--border-primary)', fontSize: '0.85rem', minWidth: 50, textAlign: 'center' }}>{Number(item.quantity) || 1}</span>
                <button
  disabled={item.quantity >= (item.product.stockQty ?? item.product.stock)}
  onClick={() =>
    updateQuantity(
      item.productId,
      item.quantity + (item.product.minOrderQty ?? 1)
    )
  }
  style={{
    padding: "0.4rem 0.6rem",
    opacity:
      item.quantity >= (item.product.stockQty ?? item.product.stock) ? 0.4 : 1,
    cursor:
      item.quantity >= (item.product.stockQty ?? item.product.stock)
        ? "not-allowed"
        : "pointer",
  }}
>
  <Plus size={14} />
</button>
              </div>

              {item.quantity >= (item.product.stockQty ?? item.product.stock) && (
  <p
    style={{
      color: "#f59e0b",
      fontSize: "12px",
      marginTop: "6px",
      fontWeight: 600,
    }}
  >
    Maximum available stock reached.
  </p>
)}


              <div style={{ textAlign: 'right', minWidth: 100 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-accent-400)' }}>{formatCurrency(item.product.price * item.quantity)}</div>
              </div>
              <button onClick={() => removeItem(item.productId)} style={{ padding: '0.5rem', color: 'var(--color-danger-400)' }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="glass-card" style={{ padding: '1.5rem', position: 'sticky', top: 'calc(var(--header-height) + 1.5rem)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Order Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span>{formatCurrency(getSubtotal())}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>GST</span>
              <span>{formatCurrency(getGstAmount())}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
              <span>{getShippingCharges() === 0 ? <span style={{ color: 'var(--color-success-400)' }}>FREE</span> : formatCurrency(getShippingCharges())}</span>
            </div>
            <div style={{ height: 1, background: 'var(--border-primary)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700 }}>
              <span>Total</span>
              <span className="gradient-text">{formatCurrency(getTotalAmount())}</span>
            </div>
          </div>
          {invalidStock && (
  <div
    style={{
      color: "#ef4444",
      fontWeight: 600,
      marginBottom: "15px",
    }}
  >
    One or more products exceed the available stock.
  </div>
)}
          
          <Link
  to={invalidStock ? "#" : "/customer/checkout"}
  className="btn btn-primary btn-lg"
  style={{
    width: "100%",
    pointerEvents: invalidStock ? "none" : "auto",
    opacity: invalidStock ? 0.5 : 1,
  }}
>
            Proceed to Checkout <ArrowRight size={18} />
          </Link>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.75rem' }}>
            Free shipping on orders above ₹1,00,000
          </p>
        </div>
      </div>

      <style>{`@media(max-width:768px){div[style*="gridTemplateColumns: 1fr 360px"]{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
