import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

const fadeInUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const galleryItems = [
  { id: 1, title: 'Main Warehouse - Nacharam', category: 'warehouse', color: '#1e3a5f' },
  { id: 2, title: 'TMT Steel Bar Storage', category: 'products', color: '#2d1b4e' },
  { id: 3, title: 'Cement Godown - Medchal', category: 'warehouse', color: '#1a3a2a' },
  { id: 4, title: 'Loading & Dispatch Area', category: 'operations', color: '#3d2b1f' },
  { id: 5, title: 'Quality Testing Lab', category: 'operations', color: '#1b2d4a' },
  { id: 6, title: 'Office & Billing Counter', category: 'office', color: '#2a1f3d' },
  { id: 7, title: 'Delivery Fleet', category: 'operations', color: '#1f3d2a' },
  { id: 8, title: 'Client Project - Hyderabad', category: 'projects', color: '#3d1f2a' },
  { id: 9, title: 'Steel Fabrication Area', category: 'operations', color: '#2a3d1f' },
  { id: 10, title: 'Team Meeting', category: 'office', color: '#1f2a3d' },
  { id: 11, title: 'Product Display', category: 'products', color: '#3d2a1f' },
  { id: 12, title: 'Client Project - Vizag', category: 'projects', color: '#1f3d3d' },
];

const filterCategories = ['all', 'warehouse', 'products', 'operations', 'office', 'projects'];

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);

  const goNext = () => {
    if (selectedIndex !== null && selectedIndex < filtered.length - 1) setSelectedIndex(selectedIndex + 1);
  };
  const goPrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  return (
    <>
      <section style={{ paddingTop: 'calc(var(--header-height) + 4rem)', paddingBottom: '3rem', background: 'var(--gradient-hero)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '1rem' }}>
              Our <span className="gradient-text">Gallery</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              A glimpse into our operations, warehouses, and projects
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {filterCategories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`btn btn-sm ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ textTransform: 'capitalize' }}>
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {filtered.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.4 }}
                onClick={() => setSelectedIndex(i)} style={{ cursor: 'pointer' }}>
                <div className="glass-card" style={{
                  height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden', padding: 0,
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                }}>
                  <ImageIcon size={40} color="white" style={{ opacity: 0.2 }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                    display: 'flex', alignItems: 'flex-end', padding: '1.25rem',
                  }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent-400)', fontWeight: 600 }}>{item.category}</span>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: '0.25rem' }}>{item.title}</h3>
                    </div>
                  </div>
                  <div style={{
                    position: 'absolute', top: 12, right: 12, width: 32, height: 32,
                    borderRadius: '50%', background: 'rgba(0,0,0,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: 0, transition: 'opacity var(--transition-fast)',
                  }} className="zoom-icon">
                    <ZoomIn size={16} color="white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="overlay" onClick={() => setSelectedIndex(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: 800, width: '90%', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              <div style={{
                height: 450, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `linear-gradient(135deg, ${filtered[selectedIndex].color}, ${filtered[selectedIndex].color}dd)`,
                position: 'relative',
              }}>
                <ImageIcon size={80} color="white" style={{ opacity: 0.15 }} />
                <button onClick={() => setSelectedIndex(null)} style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={18} color="white" />
                </button>
                {selectedIndex > 0 && (
                  <button onClick={goPrev} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronLeft size={20} color="white" />
                  </button>
                )}
                {selectedIndex < filtered.length - 1 && (
                  <button onClick={goNext} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={20} color="white" />
                  </button>
                )}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent-400)', fontWeight: 600 }}>{filtered[selectedIndex].category}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginTop: '0.25rem' }}>{filtered[selectedIndex].title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
