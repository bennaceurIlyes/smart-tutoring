import { ArrowRight, Star, Users, Shield, Zap, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section style={{ padding: '6rem 0', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Revolutionizing Education</span>
          <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(to right, #fff, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Elevate Your Learning <br /> With Expert Tutors
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 3rem' }}>
            Connect with top-tier tutors globally. Personalized learning paths designed for your success in a modern, digital environment.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Start Learning Now
              <ArrowRight size={20} />
            </Link>
            <Link to="/tutors" className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Browse Tutors
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section style={{ padding: '4rem 0' }}>
        <div className="bento-grid">
          <div className="card bento-item span-2 row-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(45deg, #1e293b, #312e81)' }}>
            <Zap size={40} color="var(--accent)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Instant Matching</h3>
            <p style={{ color: 'var(--text-muted)' }}>Find the perfect tutor for your subject in seconds with our AI-driven matching algorithm.</p>
          </div>
          
          <div className="card bento-item span-2" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px' }}>
              <Shield size={32} color="var(--success)" />
            </div>
            <div>
              <h3 style={{ marginBottom: '0.25rem' }}>Verified Quality</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Every tutor is strictly vetted for expertise.</p>
            </div>
          </div>
          
          <div className="card bento-item" style={{ textAlign: 'center' }}>
            <Star size={32} color="#f59e0b" style={{ marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.5rem' }}>4.9/5</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Average Rating</p>
          </div>
          
          <div className="card bento-item" style={{ textAlign: 'center' }}>
            <Users size={32} color="var(--primary)" style={{ marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.5rem' }}>10k+</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Students</p>
          </div>
          
          <div className="card bento-item span-2" style={{ display: 'flex', alignItems: 'center', background: 'rgba(99, 102, 241, 0.05)' }}>
            <div style={{ flex: 1 }}>
              <h3>Start your journey</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Join the future of education today.</p>
            </div>
            <Search size={40} style={{ opacity: 0.2 }} />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Trusted by students from</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', opacity: 0.5, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>OXFORD</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>HARVARD</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>STANFORD</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>MIT</span>
        </div>
      </section>
    </div>
  );
}
