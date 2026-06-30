import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Package, Star, ShoppingCart, Filter } from 'lucide-react';
import { useEffect } from "react";
import api from "@/lib/api";
import { formatCurrency, categoryLabels } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';

const categories = ['all', 'tmt-steel', 'cement', 'pipes', 'angles', 'channels', 'construction-materials'];

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const addItem = useCartStore(s => s.addItem);

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
}, []);

const fetchProducts = async () => {
    try {
        const response = await api.get("/products");

        const formattedProducts = response.data.map((p: any) => ({
  ...p,

  // Backend -> Frontend mapping
  stockQty: p.stock,
  minOrderQty: p.min_order_qty ?? 1,
  reviewCount: p.review_count ?? 0,

  gstRate: p.gst_rate ?? 18,
  reorderLevel: p.reorder_level ?? 10,
  categoryLabel: p.category,

  shortDescription: p.description ?? "",
  discount: p.discount ?? 0,
  specifications: {},
  images: [],
  tags: [],
  weight: 0,
  weightUnit: "Kg",
  warehouseId: "",
  isFeatured: false,

  slug: p.slug ?? "",
}));

setProducts(formattedProducts);
    } catch (error) {
        console.error(error);
    }
};

  const filtered = products
    .filter(p => category === 'all' || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800 }}>Product Catalog</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{filtered.length} products available</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 250px' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input-field" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36, height: 40, width: '100%' }} />
        </div>
        <select className="input-field" value={category} onChange={e => setCategory(e.target.value)} style={{ height: 40, minWidth: 150, background: 'var(--bg-input)' }}>
          {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : categoryLabels[c] || c}</option>)}
        </select>
        <select className="input-field" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ height: 40, minWidth: 140, background: 'var(--bg-input)' }}>
          <option value="name">Sort: Name</option>
          <option value="price-low">Price: Low→High</option>
          <option value="price-high">Price: High→Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
        {filtered.map((product, i) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.05, 0.3) }}>
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ height: 160, background: 'linear-gradient(135deg, #0f172a, #1e293b)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Package size={36} color="var(--color-accent-400)" style={{ opacity: 0.3 }} />
                {product.discount > 0 && (
                  <span style={{ position: 'absolute', top: 8, right: 8, background: 'var(--color-danger-500)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.6rem', fontWeight: 700 }}>-{product.discount.toFixed(0)}%</span>
                )}
                <span className="badge badge-info" style={{ position: 'absolute', top: 8, left: 8, fontSize: '0.55rem' }}>{product.categoryLabel}</span>
              </div>
              <div style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.15rem', marginBottom: '0.375rem' }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={10} fill={j < Math.floor(product.rating) ? '#fbbf24' : 'transparent'} color="#fbbf24" />)}
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>({product.reviewCount})</span>
                </div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.15rem', lineHeight: 1.3 }}>{product.name}</h3>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{product.brand} · {product.unit}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-accent-400)' }}>{formatCurrency(product.price)}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{formatCurrency(product.mrp)}</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>/{product.unit}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className={`badge ${product.stockQty > product.reorderLevel ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.6rem' }}>
                    {product.stockQty > product.reorderLevel ? 'In Stock' : 'Low Stock'}
                  </span>
                  <button onClick={() =>
  addItem(product, product.minOrderQty)
} className="btn btn-primary btn-sm" style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>
                    <ShoppingCart size={13} /> Add
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
