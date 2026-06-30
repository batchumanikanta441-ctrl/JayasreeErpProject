import { motion } from 'framer-motion';
import { Truck, Calculator, Wrench, Shield, ClipboardCheck, Warehouse, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const services = [
  { icon: Truck, title: 'Bulk Material Supply', desc: 'We supply TMT steel, cement, and construction materials in bulk quantities with competitive wholesale pricing. Direct dealer partnerships ensure best rates.', features: ['Wholesale pricing', 'All major brands', 'Bulk discounts'] },
  { icon: Warehouse, title: 'Doorstep Delivery', desc: 'Free delivery for orders above ₹1 Lakh within Hyderabad. Extended delivery network across Telangana and AP with dedicated transport.', features: ['Free delivery over ₹1L', 'Same-day dispatch', 'GPS tracked'] },
  { icon: Calculator, title: 'Material Estimation', desc: 'Our experts help you estimate the exact quantity of steel, cement, and materials required for your project based on structural drawings.', features: ['Free estimation', 'Expert consultation', 'Cost optimization'] },
  { icon: Shield, title: 'Quality Assurance', desc: 'Every product we supply comes with manufacturer warranty, test certificates, and ISI/BIS certification for complete peace of mind.', features: ['ISI certified', 'Test certificates', 'Brand warranty'] },
  { icon: ClipboardCheck, title: 'GST Compliant Billing', desc: 'Proper GST invoicing with HSN codes, e-Way bills, and digital invoice copies. Perfect for your construction project accounting.', features: ['GST invoices', 'HSN codes', 'Digital copies'] },
  { icon: Wrench, title: 'After-Sales Support', desc: 'Dedicated account manager for each customer. Quick resolution for quality concerns, returns, and replacement of damaged goods.', features: ['Dedicated manager', 'Easy returns', '24h response'] },
];

export default function ServicesPage() {
  return (
    <>
      <section style={{ paddingTop: 'calc(var(--header-height) + 4rem)', paddingBottom: '4rem', background: 'var(--gradient-hero)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ maxWidth: 650, margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '1rem' }}>
              Our <span className="gradient-text">Services</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              More than just a supplier — we are your complete construction materials partner.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass-card" style={{ padding: '2rem' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Icon size={26} color="var(--color-accent-400)" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>{service.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>{service.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {service.features.map(f => (
                      <span key={f} style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', background: 'var(--bg-tertiary)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{f}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="container">
          <motion.div {...fadeInUp}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '1rem' }}>
              Need a <span className="gradient-text">Custom Solution</span>?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: 500, margin: '0 auto 2rem' }}>
              Contact us for custom material requirements, project-based pricing, or long-term supply contracts.
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Contact Us <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
