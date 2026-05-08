'use client';

import Link from 'next/link';
import { Search, Star, Users, Shield, Zap } from '@/components/Icons';

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Master Any Subject with <br /> Expert Personal Tutors
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', maxWidth: '700px', margin: '0 auto 2.5rem', fontWeight: 500 }}>
          The smartest way to learn. Connect with the world's most qualified tutors for customized 1-on-1 sessions.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/tutors" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Get Started
            <Zap size={20} />
          </Link>
          <Link href="/about" className="btn" style={{ border: '1px solid var(--border)', padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Learn More
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container" style={{ padding: '4rem 0' }}>
        <div className="grid grid-3">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary)' }}>
              <Star size={28} />
            </div>
            <h3>Top 1% Tutors</h3>
            <p style={{ color: 'var(--secondary)', marginTop: '0.5rem' }}>Only the most qualified and experienced educators join our platform.</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ background: 'rgba(192, 132, 252, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--accent)' }}>
              <Shield size={28} />
            </div>
            <h3>Verified Profiles</h3>
            <p style={{ color: 'var(--secondary)', marginTop: '0.5rem' }}>Every tutor undergoes a rigorous background and identity check.</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary)' }}>
              <Users size={28} />
            </div>
            <h3>Flexible Learning</h3>
            <p style={{ color: 'var(--secondary)', marginTop: '0.5rem' }}>Schedule sessions that fit your life, from anywhere in the world.</p>
          </div>
        </div>
      </section>

      {/* Categories Placeholder */}
      <section style={{ background: 'var(--card)', padding: '6rem 0', marginTop: '4rem' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Popular Subjects</h2>
          <div className="grid grid-4">
            {['Mathematics', 'Physics', 'Computer Science', 'English', 'French', 'Biology', 'Chemistry', 'Economics'].map(subject => (
              <Link key={subject} href={`/tutors?subject=${subject}`} className="card" style={{ textAlign: 'center', padding: '1rem' }}>
                <h4 style={{ margin: 0 }}>{subject}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
