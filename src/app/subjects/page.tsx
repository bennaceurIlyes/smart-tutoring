'use client';

import { 
  Calculator, 
  FlaskConical, 
  Code, 
  Globe, 
  Book, 
  TrendingUp, 
  Microscope, 
  Music
} from 'lucide-react';
import Link from 'next/link';

const subjects = [
  { name: 'Mathematics', category: 'Sciences', icon: <Calculator />, color: '#6366f1' },
  { name: 'Physics', category: 'Sciences', icon: <Zap />, color: '#c084fc' },
  { name: 'Chemistry', category: 'Sciences', icon: <FlaskConical />, color: '#34d399' },
  { name: 'Computer Science', category: 'Technology', icon: <Code />, color: '#3b82f6' },
  { name: 'English', category: 'Languages', icon: <Globe />, color: '#f59e0b' },
  { name: 'Biology', category: 'Sciences', icon: <Microscope />, color: '#10b981' },
  { name: 'Economics', category: 'Social Sciences', icon: <TrendingUp />, color: '#ec4899' },
  { name: 'Music', category: 'Arts', icon: <Music />, color: '#f43f5e' },
];

export default function SubjectsPage() {
  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Browse Subjects</h1>
        <p style={{ color: 'var(--secondary)', fontSize: '1.2rem' }}>Find the perfect tutor for any topic you want to master.</p>
      </div>

      <div className="grid grid-4" style={{ gap: '2rem' }}>
        {subjects.map((subject) => (
          <Link key={subject.name} href={`/tutors?subject=${subject.name}`} className="card glass hover-scale" style={{ textAlign: 'center', padding: '2.5rem', textDecoration: 'none' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '16px', 
              background: `${subject.color}15`, 
              color: subject.color, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1.5rem' 
            }}>
              {subject.icon}
            </div>
            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{subject.name}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--secondary)', marginTop: '0.5rem' }}>{subject.category}</p>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: '6rem', textAlign: 'center', padding: '4rem', background: 'var(--card)', borderRadius: 'var(--radius)' }}>
        <h2 style={{ marginBottom: '1rem' }}>Don't see your subject?</h2>
        <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>We're constantly adding new subjects and tutors to our platform.</p>
        <Link href="/contact" className="btn btn-primary">Request a Subject</Link>
      </div>
    </div>
  );
}

// Helper icon component
function Zap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
