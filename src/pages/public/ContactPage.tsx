import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const fadeInUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <section style={{ paddingTop: 'calc(var(--header-height) + 4rem)', paddingBottom: '3rem', background: 'var(--gradient-hero)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '1rem' }}>
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto' }}>
              Have a question or need a quote? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', maxWidth: 1000, margin: '0 auto' }}>
            {/* Contact Form */}
            <motion.div {...fadeInUp}>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.5rem' }}>Send us a message</h2>
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <CheckCircle size={48} color="var(--color-success-400)" style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Message Sent!</h3>
                    <p style={{ color: 'var(--text-muted)' }}>We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="input-group">
                      <label className="input-label">Full Name *</label>
                      <input className="input-field" required placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="input-group">
                        <label className="input-label">Email *</label>
                        <input className="input-field" type="email" required placeholder="email@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Phone</label>
                        <input className="input-field" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                      </div>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Subject *</label>
                      <select className="input-field" required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} style={{ background: 'var(--bg-input)' }}>
                        <option value="">Select a topic</option>
                        <option value="pricing">Product Pricing</option>
                        <option value="bulk">Bulk Order Inquiry</option>
                        <option value="delivery">Delivery Information</option>
                        <option value="quality">Quality & Certifications</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Message *</label>
                      <textarea className="input-field" required rows={4} placeholder="Tell us about your requirements..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ resize: 'vertical' }} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                      <Send size={16} /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 0.6 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { icon: MapPin, title: 'Visit Us', lines: ['45 Industrial Area, Nacharam', 'Hyderabad, Telangana - 500076', 'India'] },
                  { icon: Phone, title: 'Call Us', lines: ['+91 91002 77157', '+91 98765 43201', 'Toll Free: 1800-123-4567'] },
                  { icon: Mail, title: 'Email Us', lines: ['info@jayasree-enterprises.in', 'sales@jayasree-enterprises.in', 'support@jayasree-enterprises.in'] },
                  { icon: Clock, title: 'Working Hours', lines: ['Monday - Saturday', '9:00 AM - 7:00 PM', 'Sunday: Closed (Emergency available)'] },
                ].map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.title} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={22} color="var(--color-accent-400)" />
                      </div>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{info.title}</h3>
                        {info.lines.map((line, i) => (
                          <p key={i} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{line}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container">
          <div style={{
            height: 300, borderRadius: 'var(--radius-xl)', overflow: 'hidden',
            background: 'linear-gradient(135deg, #1a2332, #0f172a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--border-primary)',
          }}>
            <div style={{ textAlign: 'center' }}>
              <MapPin size={40} color="var(--color-accent-400)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Interactive Map</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Google Maps integration available with API key</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
