import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<'customer' | 'owner'>('owner');
  const [error, setError] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [success, setSuccess] = useState("");
  const [timer, setTimer] = useState(0);

  const {
    login,
    sendOTP,
    verifyOTP,
    customerSendOTP,
    customerVerifyOTP,
    isLoading,
  } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Reset state when switching login type
  useEffect(() => {
    setError("");
    setSuccess("");
    setOtp("");
    setOtpSent(false);
    setPassword("");
  }, [loginType]);

  const handleOwnerSendOTP = async () => {
    if (!email) {
      setError("Enter Email or Phone");
      return;
    }
    setSendingOtp(true);
    const ok = await sendOTP(email);
    setSendingOtp(false);
    if (ok) {
      setError("");
      setSuccess("OTP sent successfully.");
      setOtpSent(true);
      setTimer(60);
    } else {
      setSuccess("");
      setError("Unable to send OTP. Check your email/phone.");
    }
  };

  const handleOwnerVerifyOTP = async () => {
    if (!otp) {
      setError("Enter OTP");
      return;
    }
    const ok = await verifyOTP(email, otp);
    if (ok) {
      navigate("/erp");
    } else {
      setSuccess("");
      setError("Invalid or expired OTP");
    }
  };

  const handleCustomerSendOTP = async () => {
    if (!email) {
      setError("Enter Email or Phone");
      return;
    }
    setSendingOtp(true);
    const ok = await customerSendOTP(email);
    setSendingOtp(false);
    if (ok) {
      setError("");
      setSuccess("OTP sent to your email.");
      setOtpSent(true);
      setTimer(60);
    } else {
      setSuccess("");
      setError("Unable to send OTP. Make sure you have an account.");
    }
  };

  const handleCustomerVerifyOTP = async () => {
    if (!otp) {
      setError("Enter OTP");
      return;
    }
    const ok = await customerVerifyOTP(email, otp);
    if (ok) {
      navigate("/customer");
    } else {
      setSuccess("");
      setError("Invalid or expired OTP");
    }
  };

  const handleCustomerPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = await login(email, password);
    if (ok) {
      navigate("/customer");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-primary)' }}>
      {/* Left Panel - Branding */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--gradient-hero)', position: 'relative', overflow: 'hidden',
        padding: '2rem',
      }} className="desktop-nav">
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)' }} />
        
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          style={{ maxWidth: 450, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--gradient-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-inverse)' }}>J</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>Jayasree ERP AI</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-accent-400)', fontWeight: 600, letterSpacing: '0.1em' }}>ENTERPRISE PLATFORM</div>
            </div>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
            Manage Your Business <span className="gradient-text">Smarter</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
            AI-powered ERP platform for steel, cement, and construction materials trading. 
            Inventory, sales, billing, and analytics — all in one place.
          </p>
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', maxWidth: 560 }}>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          style={{ width: '100%', maxWidth: 400 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Welcome back</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Sign in to your account</p>

          {/* Login Type Toggle */}
          <div style={{
            display: 'flex', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)',
            padding: '0.25rem', marginBottom: '1.5rem', border: '1px solid var(--border-primary)',
          }}>
            {(['owner', 'customer'] as const).map((type) => (
              <button key={type} onClick={() => setLoginType(type)} style={{
                flex: 1, padding: '0.625rem', borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem', fontWeight: 600, transition: 'all var(--transition-fast)',
                background: loginType === type ? 'var(--gradient-accent)' : 'transparent',
                color: loginType === type ? 'var(--text-inverse)' : 'var(--text-muted)',
                textTransform: 'capitalize',
              }}>{type === 'owner' ? 'Owner / Staff' : 'Customer'}</button>
            ))}
          </div>

          {error && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', color: 'var(--color-danger-400)', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{
              padding: '0.75rem 1rem', background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.2)', borderRadius: 'var(--radius-md)',
              marginBottom: '1rem', color: 'var(--color-success-400)', fontSize: '0.85rem',
            }}>
              {success}
            </div>
          )}

          {/* OWNER LOGIN - OTP Based */}
          {loginType === 'owner' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="input-group">
                <label className="input-label">Email or Phone</label>
                <input className="input-field" type="text" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>

              {otpSent && (
                <div className="input-group">
                  <label className="input-label">OTP</label>
                  <input className="input-field" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--color-success-400)' }}>OTP expires in {timer}s</span>
                    <button type="button" disabled={timer > 0} onClick={handleOwnerSendOTP} style={{
                      background: 'transparent', border: 'none', fontWeight: 600, fontSize: '0.8rem',
                      color: timer > 0 ? 'var(--text-muted)' : 'var(--color-accent-400)',
                      cursor: timer > 0 ? 'not-allowed' : 'pointer',
                    }}>
                      {timer > 0 ? `Resend (${timer})` : 'Resend OTP'}
                    </button>
                  </div>
                </div>
              )}

              {!otpSent ? (
                <button type="button" className="btn btn-primary btn-lg" onClick={handleOwnerSendOTP} disabled={sendingOtp || isLoading}
                  style={{ width: '100%', opacity: sendingOtp ? 0.7 : 1 }}>
                  {sendingOtp ? (
                    <><span className="spinner" /> Sending OTP...</>
                  ) : 'Send OTP'}
                </button>
              ) : (
                <button type="button" className="btn btn-primary btn-lg" onClick={handleOwnerVerifyOTP} disabled={isLoading}
                  style={{ width: '100%' }}>
                  {isLoading ? <><span className="spinner" /> Verifying...</> : 'Verify OTP & Login'}
                </button>
              )}
            </div>
          )}

          {/* CUSTOMER LOGIN - OTP or Password */}
          {loginType === 'customer' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="input-group">
                <label className="input-label">Email or Phone</label>
                <input className="input-field" type="text" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>

              {!otpSent ? (
                <>
                  {/* Password Login */}
                  <div className="input-group">
                    <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input className="input-field" type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                        style={{ paddingRight: 40, width: '100%' }} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      }}>
                        {showPassword ? <EyeOff size={18} color="var(--text-muted)" /> : <Eye size={18} color="var(--text-muted)" />}
                      </button>
                    </div>
                  </div>

                  <button type="button" className="btn btn-primary btn-lg" onClick={handleCustomerPasswordLogin} disabled={isLoading}
                    style={{ width: '100%' }}>
                    {isLoading ? <><span className="spinner" /> Signing in...</> : 'Sign In'}
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.25rem 0' }}>
                    <div style={{ flex: 1, height: 1, background: 'var(--border-primary)' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>or</span>
                    <div style={{ flex: 1, height: 1, background: 'var(--border-primary)' }} />
                  </div>

                  <button type="button" className="btn btn-secondary" onClick={handleCustomerSendOTP} disabled={sendingOtp}
                    style={{ width: '100%' }}>
                    {sendingOtp ? 'Sending OTP...' : 'Login with OTP'}
                  </button>
                </>
              ) : (
                <>
                  <div className="input-group">
                    <label className="input-label">OTP</label>
                    <input className="input-field" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--color-success-400)' }}>OTP expires in {timer}s</span>
                      <button type="button" disabled={timer > 0} onClick={handleCustomerSendOTP} style={{
                        background: 'transparent', border: 'none', fontWeight: 600, fontSize: '0.8rem',
                        color: timer > 0 ? 'var(--text-muted)' : 'var(--color-accent-400)',
                        cursor: timer > 0 ? 'not-allowed' : 'pointer',
                      }}>
                        {timer > 0 ? `Resend (${timer})` : 'Resend OTP'}
                      </button>
                    </div>
                  </div>

                  <button type="button" className="btn btn-primary btn-lg" onClick={handleCustomerVerifyOTP} disabled={isLoading}
                    style={{ width: '100%' }}>
                    {isLoading ? <><span className="spinner" /> Verifying...</> : 'Verify OTP & Login'}
                  </button>
                </>
              )}
            </div>
          )}

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--color-accent-400)', fontWeight: 600 }}>Create Account</Link>
          </p>

          <Link to="/" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            ← Back to Website
          </Link>
        </motion.div>
      </div>

      <style>{`
        .desktop-nav { display: flex !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top: 2px solid white;
          border-radius: 50%;
          display: inline-block;
          margin-right: 8px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
