'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, User, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'tutor'>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role,
        }
      }
    });

    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)', padding: '2rem' }}>
      <div className="card glass" style={{ width: '100%', maxWidth: '900px', display: 'flex', overflow: 'hidden', padding: 0 }}>
        
        {/* Left Side: Illustration/Text */}
        <div style={{ flex: 1, background: 'linear-gradient(135deg, var(--primary), var(--accent))', padding: '4rem', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Join the Future of Learning</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '2rem' }}>
            Connect with experts, master new skills, and achieve your goals with our smart tutoring platform.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '50%' }}><GraduationCap size={20} /></div>
              <span>Expert tutors in every subject</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '50%' }}><ArrowRight size={20} /></div>
              <span>Flexible 1-on-1 sessions</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{ flex: 1.2, padding: '4rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create Account</h1>
            <p style={{ color: 'var(--secondary)' }}>Start your learning journey today</p>
          </div>

          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Role Selection */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
              <button 
                type="button"
                onClick={() => setRole('student')}
                style={{ flex: 1, padding: '1rem', borderRadius: 'var(--radius)', border: `2px solid ${role === 'student' ? 'var(--primary)' : 'var(--border)'}`, background: role === 'student' ? 'rgba(99, 102, 241, 0.05)' : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
              >
                <User size={24} color={role === 'student' ? 'var(--primary)' : 'var(--secondary)'} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Student</span>
              </button>
              <button 
                type="button"
                onClick={() => setRole('tutor')}
                style={{ flex: 1, padding: '1rem', borderRadius: 'var(--radius)', border: `2px solid ${role === 'tutor' ? 'var(--primary)' : 'var(--border)'}`, background: role === 'tutor' ? 'rgba(99, 102, 241, 0.05)' : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
              >
                <Briefcase size={24} color={role === 'tutor' ? 'var(--primary)' : 'var(--secondary)'} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Tutor</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)' }}
                />
              </div>
            </div>

            <button disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '1rem' }}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--secondary)' }}>
            Already have an account? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
