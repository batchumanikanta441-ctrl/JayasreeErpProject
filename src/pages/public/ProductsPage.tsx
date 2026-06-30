import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Package, Star, ShoppingCart, Grid, List } from 'lucide-react';
import { products } from '@/data/mockData';
import { formatCurrency, categoryLabels } from '@/lib/utils';

const categories = ['all', 'tmt-steel', 'cement', 'pipes', 'angles', 'channels', 'construction-materials'];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = products
    .filter(p => category === 'all' || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '3rem', background: 'var(--gradient-hero)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '1rem' }}>
              Our <span className="gradient-text">Products</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 550 }}>
              Explore our complete range of ISI-certified steel, cement, and construction materials.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          {/* Filters Bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem',
            flexWrap: 'wrap', padding: '1.25rem', background: 'var(--bg-card)',
            border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ position: 'relative', flex: '1 1 250px' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input className="input-field" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 36, width: '100%', height: 40 }} />
            </div>

            <select className="input-field" value={category} onChange={e => setCategory(e.target.value)}
              style={{ height: 40, minWidth: 160, background: 'var(--bg-input)', cursor: 'pointer' }}>
              {categories.map(c => (
                <option key={c} value={c}>{c === 'all' ? 'All Categories' : categoryLabels[c] || c}</option>
              ))}
            </select>

            <select className="input-field" value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{ height: 40, minWidth: 140, background: 'var(--bg-input)', cursor: 'pointer' }}>
              <option value="name">Sort: Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>

            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button onClick={() => setView('grid')} className="btn btn-icon" style={{ background: view === 'grid' ? 'var(--bg-tertiary)' : 'transparent' }}>
                <Grid size={18} />
              </button>
              <button onClick={() => setView('list')} className="btn btn-icon" style={{ background: view === 'list' ? 'var(--bg-tertiary)' : 'transparent' }}>
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Results count */}
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Showing {filtered.length} of {products.length} products
          </p>

          {/* Product Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
            gap: '1.5rem',
          }}>
            {filtered.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.4 }}
              >
                <div className="glass-card" style={{
                  padding: 0, overflow: 'hidden',
                  display: view === 'list' ? 'flex' : 'block',
                }}>
                  <div style={{
                    height: view === 'list' ? 'auto' : 180,
                    width: view === 'list' ? 200 : '100%',
                    minHeight: view === 'list' ? 160 : undefined,
                    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', flexShrink: 0,
                  }}>
                    <Package size={40} color="var(--color-accent-400)" style={{ opacity: 0.4 }} />
                    {product.discount > 0 && (
                      <span style={{ position: 'absolute', top: 10, right: 10, background: 'var(--color-danger-500)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.65rem', fontWeight: 700 }}>
                        {product.discount.toFixed(0)}% OFF
                      </span>
                    )}
                    <span className="badge badge-info" style={{ position: 'absolute', top: 10, left: 10, fontSize: '0.6rem' }}>
                      {product.categoryLabel}
                    </span>
                  </div>

                  <div style={{ padding: '1.25rem', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={11} fill={j < Math.floor(product.rating) ? '#fbbf24' : 'transparent'} color="#fbbf24" />
                      ))}
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>({product.reviewCount})</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', lineHeight: 1.3 }}>
                      {product.name}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      {product.brand} · SKU: {product.sku}
                    </p>
                    {view === 'list' && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                        {product.shortDescription}
                      </p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-accent-400)' }}>
                        {formatCurrency(product.price)}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        {formatCurrency(product.mrp)}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>/{product.unit}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className={`badge ${product.stockQty > product.reorderLevel ? 'badge-success' : 'badge-warning'}`}>
                        {product.stockQty > product.reorderLevel ? 'In Stock' : 'Low Stock'}
                      </span>
                      <Link to="/login" className="btn btn-primary btn-sm">
                        <ShoppingCart size={14} /> Order
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <Package size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
