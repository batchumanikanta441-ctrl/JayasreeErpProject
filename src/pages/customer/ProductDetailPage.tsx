import { useParams, Link } from 'react-router-dom';
import { Package, Star, ShoppingCart, ArrowLeft, Shield, Truck, Clock } from 'lucide-react';
import api from "@/lib/api";
import { useEffect } from "react";
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { useState } from 'react';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const product =
    products.find((p) => String(p.id) === slug) ||
    products[0];
  const addItem = useCartStore(s => s.addItem);
  const [qty, setQty] = useState(product.minOrderQty);
  useEffect(() => {
    fetchProducts();
}, []);

const fetchProducts = async () => {
    try {
        const response = await api.get("/products");
        setProducts(response.data);
    } catch (err) {
        console.error(err);
    }
};

  return (
    <div>
      <Link to="/customer/catalog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> Back to Catalog
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {/* Product Image */}
        <div className="glass-card" style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
          <Package size={80} color="var(--color-accent-400)" style={{ opacity: 0.3 }} />
        </div>

        {/* Product Info */}
        <div>
          <span className="badge badge-info" style={{ marginBottom: '0.75rem' }}>{product.categoryLabel}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{product.name}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>{product.brand} · SKU: {product.sku}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {[...Array(5)].map((_, j) => <Star key={j} size={16} fill={j < Math.floor(product.rating) ? '#fbbf24' : 'transparent'} color="#fbbf24" />)}
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({product.reviewCount} reviews)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--color-accent-400)' }}>{formatCurrency(product.price)}</span>
            <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{formatCurrency(product.mrp)}</span>
            <span style={{ color: 'var(--text-muted)' }}>per {product.unit}</span>
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.9rem' }}>{product.description}</p>

          {/* Quantity & Add to Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)' }}>
              <button onClick={() => setQty(Math.max(product.minOrderQty, qty - product.minOrderQty))} style={{ padding: '0.75rem 1rem', fontSize: '1.1rem' }}>−</button>
              <input value={qty} onChange={e => setQty(Math.max(product.minOrderQty, Number(e.target.value)))} style={{ width: 80, textAlign: 'center', background: 'transparent', border: 'none', borderLeft: '1px solid var(--border-primary)', borderRight: '1px solid var(--border-primary)', padding: '0.75rem', color: 'var(--text-primary)' }} />
              <button onClick={() => setQty(qty + product.minOrderQty)} style={{ padding: '0.75rem 1rem', fontSize: '1.1rem' }}>+</button>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Min: {product.minOrderQty} {product.unit}</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button onClick={() => addItem(product, qty)} className="btn btn-primary btn-lg" style={{ flex: 1 }}>
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { icon: Shield, text: 'ISI Certified & BIS Standard' },
              { icon: Truck, text: 'Free delivery on orders above ₹1,00,000' },
              { icon: Clock, text: 'Same-day dispatch before 2 PM' },
            ].map(f => {
              const Icon = f.icon;
              return (
                <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <Icon size={16} color="var(--color-success-400)" /> {f.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="glass-card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Specifications</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.75rem' }}>
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem 0', borderBottom: '1px solid var(--border-secondary)' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{key}</span>
              <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
