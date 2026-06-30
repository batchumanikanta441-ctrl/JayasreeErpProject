import { motion } from 'framer-motion';
import { Award, Target, Eye, Heart, Users, Calendar, MapPin, Building } from 'lucide-react';

const fadeInUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const team = [
  { name: 'Jayasree Kumar', role: 'Founder & CEO', initials: 'JK' },
  { name: 'Ravi Shankar', role: 'Operations Head', initials: 'RS' },
  { name: 'Priya Reddy', role: 'Finance Manager', initials: 'PR' },
  { name: 'Sunil Yadav', role: 'Warehouse Manager', initials: 'SY' },
];

const milestones = [
  { year: '2010', title: 'Founded', desc: 'Started as a small steel trading business in Hyderabad' },
  { year: '2014', title: 'Expanded', desc: 'Added cement and construction materials to product line' },
  { year: '2018', title: 'Warehousing', desc: 'Opened 2 large warehouses in Nacharam and Medchal' },
  { year: '2022', title: 'Digital', desc: 'Launched online ordering platform for B2B customers' },
  { year: '2024', title: 'AI-Powered', desc: 'Introduced AI-powered ERP for smart business management' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 'calc(var(--header-height) + 4rem)', paddingBottom: '4rem', background: 'var(--gradient-hero)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container" style={{ position: 'relative' }}>
          <motion.div {...fadeInUp} style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1.25rem' }}>
              Building <span className="gradient-text">Stronger Foundations</span> Since 2010
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Jayasree Enterprises is a leading distributor of steel, cement, and construction materials 
              serving builders, contractors, and infrastructure companies across Telangana and Andhra Pradesh.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: Target, title: 'Our Mission', desc: 'To provide premium quality construction materials at competitive prices with reliable delivery, empowering builders to construct with confidence.' },
              { icon: Eye, title: 'Our Vision', desc: 'To become the most trusted and technology-driven building materials supplier in South India by 2030.' },
              { icon: Heart, title: 'Our Values', desc: 'Quality first, transparent pricing, on-time delivery, long-term relationships, and continuous innovation in customer service.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} {...fadeInUp} transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <Icon size={24} color="var(--color-accent-400)" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
              Our <span className="gradient-text">Journey</span>
            </h2>
          </motion.div>

          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            {milestones.map((m, i) => (
              <motion.div key={m.year} {...fadeInUp} transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--gradient-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-inverse)', flexShrink: 0 }}>{m.year}</div>
                  {i < milestones.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--border-primary)', marginTop: 8 }} />}
                </div>
                <div style={{ paddingTop: 8, paddingBottom: '1rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{m.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
              Our <span className="gradient-text">Team</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>The people behind Jayasree Enterprises</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', maxWidth: 960, margin: '0 auto' }}>
            {team.map((member, i) => (
              <motion.div key={member.name} {...fadeInUp} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-accent-500), var(--color-secondary-500))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem', fontWeight: 700, color: 'white', fontFamily: 'var(--font-display)' }}>{member.initials}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{member.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-accent-400)' }}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: Building, title: '2 Warehouses', desc: 'Located in Nacharam and Medchal for quick dispatch across the twin cities and beyond.' },
              { icon: MapPin, title: 'Pan South India', desc: 'Delivery network across Telangana, Andhra Pradesh, and neighboring states.' },
              { icon: Calendar, title: '6 Days/Week', desc: 'We operate Monday to Saturday, 9 AM to 7 PM. Urgent orders processed on Sundays too.' },
              { icon: Users, title: '20+ Team', desc: 'Dedicated sales, logistics, and support staff to serve you better.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} {...fadeInUp} transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ display: 'flex', gap: '1rem', padding: '1.5rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={22} color="var(--color-secondary-400)" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
