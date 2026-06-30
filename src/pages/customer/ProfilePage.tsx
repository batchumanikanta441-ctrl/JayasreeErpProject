import { useAuthStore } from '@/stores/authStore';
import { User, Mail, Phone, Building, MapPin, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuthStore();
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>My Profile</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-accent-500), var(--color-secondary-500))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{user?.name?.charAt(0) || 'U'}</div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>{user?.name}</h2>
              <span className="badge badge-success">Verified</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { icon: Mail, label: 'Email', value: user?.email },
              { icon: Phone, label: 'Phone', value: user?.phone },
              { icon: Building, label: 'Company', value: 'Sai Constructions Pvt Ltd' },
              { icon: MapPin, label: 'Location', value: 'Hyderabad, Telangana' },
              { icon: Shield, label: 'GST Number', value: '36AADCS1234A1Z5' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={18} color="var(--text-muted)" /></div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.label}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.value || 'Not set'}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem' }}>Edit Profile</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="input-group"><label className="input-label">Full Name</label><input className="input-field" defaultValue={user?.name} /></div>
            <div className="input-group"><label className="input-label">Phone</label><input className="input-field" defaultValue={user?.phone} /></div>
            <div className="input-group"><label className="input-label">Company Name</label><input className="input-field" defaultValue="Sai Constructions Pvt Ltd" /></div>
            <div className="input-group"><label className="input-label">GST Number</label><input className="input-field" defaultValue="36AADCS1234A1Z5" /></div>
            <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
}
