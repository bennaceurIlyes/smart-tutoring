import { Link } from 'react-router-dom';
import { BookOpen, User, Menu, X, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="glass" style={{ position: 'sticky', top: '1rem', zIndex: 100, margin: '1rem 2rem', padding: '0.75rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'var(--text)' }}>
          <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '10px' }}>
            <BookOpen size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>SmartTutoring</span>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
          <Link to="/tutors" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}>Find Tutors</Link>
          <Link to="/about" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}>About</Link>
          {user ? (
            <Link to="/dashboard" className="btn btn-primary">
              <User size={18} />
              Dashboard
            </Link>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}>Log in</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer' }}
          className="mobile-toggle"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="animate-fade-in" style={{ padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/tutors" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text)', textDecoration: 'none' }}>Find Tutors</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text)', textDecoration: 'none' }}>About</Link>
          <Link to="/login" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text)', textDecoration: 'none' }}>Log in</Link>
          <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn btn-primary">Get Started</Link>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}} />
    </nav>
  );
}
