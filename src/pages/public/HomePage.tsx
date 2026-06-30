import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Truck, Clock, Award, Package, Users, TrendingUp, Star, ChevronRight, Phone, Sparkles } from 'lucide-react';
import { products } from '@/data/mockData';
import { formatCurrency, categoryLabels } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const stats = [
  { value: '14+', label: 'Years Experience', icon: Award },
  { value: '5000+', label: 'Projects Supplied', icon: Package },
  { value: '500+', label: 'Happy Clients', icon: Users },
  { value: '₹50Cr+', label: 'Annual Turnover', icon: TrendingUp },
];

const features = [
  { icon: Shield, title: 'Certified Quality', desc: 'All products are ISI certified and BIS standard compliant.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Same-day dispatch for orders placed before 2 PM.' },
  { icon: Clock, title: 'On-Time Always', desc: '98% on-time delivery rate across Telangana & AP.' },
  { icon: Award, title: 'Best Prices', desc: 'Direct dealer partnerships for the best wholesale rates.' },
];

const categories = [
  { id: 'tmt-steel', name: 'TMT Steel Bars', desc: 'Fe-500D & Fe-550D grade TMT bars from top brands', count: 4, gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { id: 'cement', name: 'Cement', desc: 'OPC & PPC cement from UltraTech, ACC, Ambuja', count: 3, gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
  { id: 'pipes', name: 'Pipes', desc: 'GI, MS and PVC pipes for all applications', count: 1, gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
  { id: 'angles', name: 'Angles & Channels', desc: 'MS angles, channels, and structural steel', count: 2, gradient: 'linear-gradient(135deg, #ec4899, #db2777)' },
  { id: 'construction-materials', name: 'Construction Materials', desc: 'Binding wire, electrodes, bolts & more', count: 2, gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)' },
];

const testimonials = [
  { name: 'Rajesh Kumar', company: 'Sai Constructions', text: 'Jayasree Enterprises has been our trusted steel supplier for 8 years. Quality is always top-notch and delivery is never late.', rating: 5 },
  { name: 'Anil Gupta', company: 'Metro Infrastructure', text: 'The best rates in the market with genuine branded products. Their online ordering system saved us a lot of time.', rating: 5 },
  { name: 'Suresh Reddy', company: 'BuildRight Engineers', text: 'Professional team, transparent billing with GST, and excellent after-sales support. Highly recommended!', rating: 5 },
];

export default function HomePage() {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'var(--gradient-hero)', position: 'relative', overflow: 'hidden',
        paddingTop: 'var(--header-height)',
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
          backgroundSize: '60px 60px', pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 720 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)',
                background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)',
                fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-accent-400)',
                marginBottom: '1.5rem',
              }}>
                <Sparkles size={14} /> Trusted Since 2010
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}
            >
              Premium Steel & Cement{' '}
              <span className="gradient-text">Delivered</span> to Your Site
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: 560 }}
            >
              Jayasree Enterprises is your one-stop destination for TMT steel bars, cement, 
              pipes, and construction materials at the best wholesale prices with doorstep delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <Link to="/products" className="btn btn-primary btn-lg">
                Browse Products <ArrowRight size={18} />
              </Link>
              <Link to="/request-quote" className="btn btn-secondary btn-lg">
                Request Quote
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}
            >
              {['Tata Tiscon', 'UltraTech', 'JSW Steel', 'ACC', 'SAIL'].map((brand) => (
                <span key={brand} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, opacity: 0.6 }}>
                  {brand}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-primary)', padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} {...stagger} transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} color="var(--color-accent-400)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem' }}>
              Our <span className="gradient-text">Product Categories</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 550, margin: '0 auto', fontSize: '1.05rem' }}>
              Complete range of construction materials for every project size
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {categories.map((cat, i) => (
              <motion.div key={cat.id} {...stagger} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <Link to="/products" className="glass-card" style={{
                  display: 'block', padding: '2rem', height: '100%',
                  textDecoration: 'none', position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: -20, right: -20, width: 100, height: 100,
                    borderRadius: '50%', background: cat.gradient, opacity: 0.1,
                  }} />
                  <div style={{
                    width: 48, height: 48, borderRadius: 'var(--radius-md)',
                    background: cat.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.25rem', fontSize: '1.25rem',
                  }}>
                    <Package size={22} color="white" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {cat.desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-accent-400)', fontWeight: 600 }}>
                    {cat.count} Products <ChevronRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
                Featured <span className="gradient-text">Products</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Best-selling products trusted by hundreds of builders</p>
            </div>
            <Link to="/products" className="btn btn-secondary">
              View All Products <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {featuredProducts.map((product, i) => (
              <motion.div key={product.id} {...stagger} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                  {/* Product Image Placeholder */}
                  <div style={{
                    height: 200, background: `linear-gradient(135deg, ${product.category === 'tmt-steel' ? '#1a1a2e, #16213e' : '#1a1a2e, #0f3460'})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                  }}>
                    <Package size={48} color="var(--color-accent-400)" style={{ opacity: 0.5 }} />
                    {product.discount > 0 && (
                      <span style={{
                        position: 'absolute', top: 12, right: 12,
                        background: 'var(--color-danger-500)', color: 'white',
                        padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)',
                        fontSize: '0.7rem', fontWeight: 700,
                      }}>{product.discount.toFixed(0)}% OFF</span>
                    )}
                    <span className="badge badge-info" style={{ position: 'absolute', top: 12, left: 12 }}>
                      {product.categoryLabel}
                    </span>
                  </div>

                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} fill={j < Math.floor(product.rating) ? '#fbbf24' : 'transparent'} color="#fbbf24" />
                      ))}
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>({product.reviewCount})</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem', lineHeight: 1.4 }}>
                      {product.name}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{product.brand} · {product.unit}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-accent-400)' }}>
                        {formatCurrency(product.price)}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        {formatCurrency(product.mrp)}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>/{product.unit}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className={`badge ${product.stockQty > product.reorderLevel ? 'badge-success' : 'badge-warning'}`}>
                        {product.stockQty > product.reorderLevel ? 'In Stock' : 'Low Stock'}
                      </span>
                      <Link to="/login" className="btn btn-primary btn-sm">Order Now</Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem' }}>
              Why Choose <span className="gradient-text">Jayasree</span>?
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 550, margin: '0 auto', fontSize: '1.05rem' }}>
              We deliver more than just materials — we deliver trust and reliability
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} {...stagger} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}>
                    <Icon size={28} color="var(--color-accent-400)" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem' }}>
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t, i) => (
              <motion.div key={t.name} {...stagger} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'var(--gradient-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, color: 'var(--text-inverse)', fontSize: '0.9rem',
                  }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(59, 130, 246, 0.05))',
        borderTop: '1px solid var(--border-accent)',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div {...fadeInUp}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem' }}>
              Ready to Build <span className="gradient-text">Something Great</span>?
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto 2rem', fontSize: '1.1rem' }}>
              Get competitive quotes for your next project. We supply across Telangana & Andhra Pradesh.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/request-quote" className="btn btn-primary btn-lg">
                Get Free Quote <ArrowRight size={18} />
              </Link>
              <a href="tel:+919100277157" className="btn btn-secondary btn-lg">
                <Phone size={18} /> Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
