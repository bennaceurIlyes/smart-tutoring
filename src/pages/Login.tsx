import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, LogIn, GitHub } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card glass" 
        style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-muted)' }}>Enter your details to access your account</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingLeft: '3rem' }}
              required 
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingLeft: '3rem' }}
              required 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'none' }}>Forgot password?</Link>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '1rem' }}>
            {loading ? 'Signing in...' : 'Sign In'}
            {!loading && <LogIn size={20} />}
          </button>

          <div style={{ textAlign: 'center', margin: '1rem 0', color: 'var(--text-muted)', fontSize: '0.85rem', position: 'relative' }}>
            <span style={{ background: 'var(--card)', padding: '0 1rem', position: 'relative', zIndex: 1 }}>Or continue with</span>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border)' }}></div>
          </div>

          <button type="button" className="btn btn-outline" style={{ width: '100%' }}>
            <GitHub size={20} />
            GitHub
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
