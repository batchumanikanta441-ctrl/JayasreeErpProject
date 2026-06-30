import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Package, Calculator, ArrowRight } from 'lucide-react';
import { categoryLabels } from '@/lib/utils';

const fadeInUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

export default function RequestQuotePage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section style={{ paddingTop: 'calc(var(--header-height) + 4rem)', paddingBottom: '3rem', background: 'var(--gradient-hero)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '1rem' }}>
              Request a <span className="gradient-text">Quote</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 550, margin: '0 auto' }}>
              Get competitive pricing for your construction material requirements within 2 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container" style={{ maxWidth: 700, margin: '0 auto' }}>
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <CheckCircle size={64} color="var(--color-success-400)" style={{ margin: '0 auto 1.5rem' }} />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Quote Request Submitted!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Our team will prepare your customized quote and respond within 2 hours.</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Quote Reference: QR-{Date.now().toString(36).toUpperCase()}</p>
            </motion.div>
          ) : (
            <motion.div {...fadeInUp}>
              {/* Progress Steps */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                {[1, 2, 3].map((s) => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: step >= s ? 'var(--gradient-accent)' : 'var(--bg-tertiary)',
                      color: step >= s ? 'var(--text-inverse)' : 'var(--text-muted)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', fontWeight: 700,
                    }}>{s}</div>
                    <span style={{ fontSize: '0.8rem', color: step >= s ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: 500 }}>
                      {s === 1 ? 'Products' : s === 2 ? 'Details' : 'Review'}
                    </span>
                    {s < 3 && <ArrowRight size={14} color="var(--text-muted)" />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem' }}>
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                      <Package size={20} style={{ display: 'inline', marginRight: 8, verticalAlign: 'text-bottom' }} />
                      What do you need?
                    </h2>
                    <div className="input-group">
                      <label className="input-label">Product Category *</label>
                      <select className="input-field" required style={{ background: 'var(--bg-input)' }}>
                        <option value="">Select category</option>
                        {Object.entries(categoryLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Product Details *</label>
                      <textarea className="input-field" rows={3} required placeholder="e.g., TMT 8mm Fe-500D - 2000 Kg, UltraTech OPC 53 - 200 bags" style={{ resize: 'vertical' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="input-group">
                        <label className="input-label">Quantity</label>
                        <input className="input-field" type="number" placeholder="e.g., 5000" />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Unit</label>
                        <select className="input-field" style={{ background: 'var(--bg-input)' }}>
                          <option>Kg</option><option>Ton</option><option>Bags</option><option>Pieces</option>
                        </select>
                      </div>
                    </div>
                    <button type="button" onClick={() => setStep(2)} className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>
                      Next <ArrowRight size={16} />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                      <Calculator size={20} style={{ display: 'inline', marginRight: 8, verticalAlign: 'text-bottom' }} />
                      Your Details
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="input-group">
                        <label className="input-label">Full Name *</label>
                        <input className="input-field" required placeholder="Your name" />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Company Name</label>
                        <input className="input-field" placeholder="Company name" />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="input-group">
                        <label className="input-label">Phone *</label>
                        <input className="input-field" required placeholder="+91 98765 43210" />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Email *</label>
                        <input className="input-field" type="email" required placeholder="email@example.com" />
                      </div>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Delivery Location</label>
                      <input className="input-field" placeholder="City, Area" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Additional Notes</label>
                      <textarea className="input-field" rows={2} placeholder="Any specific requirements..." style={{ resize: 'vertical' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                      <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">Back</button>
                      <button type="button" onClick={() => setStep(3)} className="btn btn-primary">
                        Next <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                      <Send size={20} style={{ display: 'inline', marginRight: 8, verticalAlign: 'text-bottom' }} />
                      Review & Submit
                    </h2>
                    <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 2 }}>
                      <p>📦 Your quote request is ready to submit.</p>
                      <p>⚡ We typically respond within 2 hours during business hours.</p>
                      <p>📞 For urgent requirements, call us at +91 91002 77157.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                      <button type="button" onClick={() => setStep(2)} className="btn btn-secondary">Back</button>
                      <button type="submit" className="btn btn-primary btn-lg">
                        <Send size={16} /> Submit Quote Request
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
