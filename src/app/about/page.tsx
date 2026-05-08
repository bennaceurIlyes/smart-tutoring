'use client';

import { BookOpen, Shield, Zap, Heart, Globe, Award } from '@/components/Icons';

export default function AboutPage() {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: '5rem' }}>
      <section className="container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Empowering Learning <br /> Through Connection</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
          SmartTutoring was built with a simple mission: to make high-quality, personalized education accessible to everyone, everywhere.
        </p>
      </section>

      <section style={{ background: 'var(--card)', padding: '6rem 0' }}>
        <div className="container">
          <div className="grid grid-3" style={{ gap: '3rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary)' }}>
                <Shield size={32} />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Trust & Safety</h3>
              <p style={{ color: 'var(--secondary)', lineHeight: 1.5 }}>Every tutor on our platform is thoroughly vetted and background-checked for your peace of mind.</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'rgba(192, 132, 252, 0.1)', width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--accent)' }}>
                <Zap size={32} />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Instant Connection</h3>
              <p style={{ color: 'var(--secondary)', lineHeight: 1.5 }}>Find and book sessions in minutes. Our smart matching algorithm finds the perfect expert for your needs.</p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'rgba(52, 211, 153, 0.1)', width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#34d399' }}>
                <Globe size={32} />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Global Reach</h3>
              <p style={{ color: 'var(--secondary)', lineHeight: 1.5 }}>Access the world's best educators from the comfort of your home, regardless of your location.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '8rem 0' }}>
        <div className="card glass" style={{ display: 'flex', overflow: 'hidden', padding: 0 }}>
          <div style={{ flex: 1, padding: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Our Story</h2>
            <p style={{ color: 'var(--secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Founded in 2026, SmartTutoring started as a small project to help students find math help during finals. We quickly realized that the problem was much larger—finding the right mentor is hard.
            </p>
            <p style={{ color: 'var(--secondary)', lineHeight: 1.8 }}>
              Today, we serve thousands of students across 50+ subjects, leveraging technology to bridge the gap between curiosity and expertise.
            </p>
          </div>
          <div style={{ flex: 1, background: 'var(--border)', minHeight: '400px', position: 'relative' }}>
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, var(--primary), var(--accent))', opacity: 0.1 }}></div>
             <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={120} style={{ opacity: 0.2 }} />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
