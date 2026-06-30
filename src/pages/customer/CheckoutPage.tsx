import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, FileText, CheckCircle, Truck } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { formatCurrency } from '@/lib/utils';

export default function CheckoutPage() {
  const { items, getSubtotal, getGstAmount, getShippingCharges, getTotalAmount, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    setSubmitted(true);
    setTimeout(() => { clearCart(); navigate('/customer/orders'); }, 3000);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <CheckCircle size={72} color="var(--color-success-400)" style={{ margin: '0 auto 1.5rem' }} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>Order Placed Successfully! 🎉</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Order #JE-{Date.now().toString(36).toUpperCase()}</p>
        <p style={{ color: 'var(--text-muted)' }}>Redirecting to your orders...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Checkout</h1>

      {/* Steps */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {[{ n: 1, label: 'Delivery', icon: MapPin }, { n: 2, label: 'Payment', icon: CreditCard }, { n: 3, label: 'Review', icon: FileText }].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: step >= s.n ? 'var(--gradient-accent)' : 'var(--bg-tertiary)', color: step >= s.n ? 'var(--text-inverse)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={14} />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: step >= s.n ? 600 : 400, color: step >= s.n ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s.label}</span>
              {s.n < 3 && <div style={{ width: 40, height: 2, background: step > s.n ? 'var(--color-accent-400)' : 'var(--border-primary)' }} />}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Form Area */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700 }}>Delivery Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group"><label className="input-label">Full Name *</label><input className="input-field" defaultValue="Rajesh Kumar" /></div>
                <div className="input-group"><label className="input-label">Phone *</label><input className="input-field" defaultValue="+919876543210" /></div>
              </div>
              <div className="input-group"><label className="input-label">Address Line 1 *</label><input className="input-field" defaultValue="45 Industrial Area, Phase 2" /></div>
              <div className="input-group"><label className="input-label">Address Line 2</label><input className="input-field" placeholder="Apartment, floor, etc." /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="input-group"><label className="input-label">City *</label><input className="input-field" defaultValue="Hyderabad" /></div>
                <div className="input-group"><label className="input-label">State *</label><input className="input-field" defaultValue="Telangana" /></div>
                <div className="input-group"><label className="input-label">Pincode *</label><input className="input-field" defaultValue="500032" /></div>
              </div>
              <div className="input-group"><label className="input-label">GST Number (Optional)</label><input className="input-field" placeholder="e.g., 36AADCS1234A1Z5" /></div>
              <button onClick={() => setStep(2)} className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Continue to Payment →</button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700 }}>Payment Method</h2>
              {['Razorpay (Cards, UPI, Net Banking)', 'Bank Transfer (NEFT/RTGS)', 'Cash on Delivery'].map((method, i) => (
                <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: `1px solid ${i === 0 ? 'var(--color-accent-400)' : 'var(--border-primary)'}`, borderRadius: 'var(--radius-md)', cursor: 'pointer', background: i === 0 ? 'rgba(245,158,11,0.05)' : 'transparent' }}>
                  <input type="radio" name="payment" defaultChecked={i === 0} style={{ accentColor: 'var(--color-accent-400)' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{method}</div>
                    {i === 0 && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Powered by Razorpay — secure & instant</div>}
                  </div>
                </label>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(1)} className="btn btn-secondary">← Back</button>
                <button onClick={() => setStep(3)} className="btn btn-primary">Review Order →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700 }}>Order Review</h2>
              {items.map(item => (
                <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border-secondary)', fontSize: '0.9rem' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.product.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{item.quantity} {item.product.unit} × {formatCurrency(item.product.price)}</div>
                  </div>
                  <div style={{ fontWeight: 600 }}>{formatCurrency(item.product.price * item.quantity)}</div>
                </div>
              ))}
              <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <Truck size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: 'text-bottom' }} />
                Expected delivery: 3-5 business days
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(2)} className="btn btn-secondary">← Back</button>
                <button onClick={handlePlaceOrder} className="btn btn-primary btn-lg">Place Order — {formatCurrency(getTotalAmount())}</button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="glass-card" style={{ padding: '1.5rem', position: 'sticky', top: 'calc(var(--header-height) + 1.5rem)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Items ({items.length})</span><span>{formatCurrency(getSubtotal())}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>GST</span><span>{formatCurrency(getGstAmount())}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Shipping</span><span>{getShippingCharges() === 0 ? <span style={{ color: 'var(--color-success-400)' }}>FREE</span> : formatCurrency(getShippingCharges())}</span></div>
            <div style={{ height: 1, background: 'var(--border-primary)', margin: '0.25rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.05rem' }}><span>Total</span><span className="gradient-text">{formatCurrency(getTotalAmount())}</span></div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){div[style*="gridTemplateColumns: 1fr 360px"]{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
