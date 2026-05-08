import { Shield, Zap, Heart, Globe, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const stats = [
    { label: 'Success Rate', value: '98%', icon: <Zap size={24} /> },
    { label: 'Active Tutors', value: '500+', icon: <Globe size={24} /> },
    { label: 'Student Hours', value: '50k+', icon: <BookOpen size={24} /> },
    { label: 'Awards Won', value: '12', icon: <Award size={24} /> },
  ];

  return (
    <div className="container" style={{ padding: '6rem 0' }}>
      <section style={{ textAlign: 'center', marginBottom: '8rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>Our Mission</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
            To democratize high-quality education by connecting the world's most brilliant minds with eager learners, 
            leveraging technology to create a seamless, inspiring learning environment.
          </p>
        </motion.div>
      </section>

      <div className="grid grid-4" style={{ marginBottom: '8rem' }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card" 
            style={{ textAlign: 'center', padding: '2.5rem' }}
          >
            <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              {stat.icon}
            </div>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>{stat.value}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <section className="card glass" style={{ padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The SmartTutoring Philosophy</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            We believe that every student has untapped potential. Our platform isn't just about passing exams; 
            it's about fostering curiosity, building confidence, and preparing the next generation for the challenges of tomorrow.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Heart size={20} color="var(--error)" />
              <span>Student-centric approach</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Shield size={20} color="var(--success)" />
              <span>Safety and trust first</span>
            </div>
          </div>
        </div>
        <div style={{ background: 'var(--border)', height: '400px', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          {/* Placeholder for mission image */}
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, var(--primary), var(--accent))', opacity: 0.2 }}></div>
        </div>
      </section>
    </div>
  );
}
