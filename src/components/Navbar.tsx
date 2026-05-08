'use client';

import Link from 'next/link';
import { BookOpen, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, marginBottom: '2rem' }}>
      <div className="container" style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
          <BookOpen size={32} />
          <span>SmartTutoring</span>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-menu">
          <Link href="/tutors">Find Tutors</Link>
          <Link href="/subjects">Subjects</Link>
          <Link href="/about">How it works</Link>
          <Link href="/login" className="btn btn-primary">
            <User size={18} />
            Login
          </Link>
        </div>

        {/* Mobile toggle (Simplified) */}
        <div style={{ display: 'none' }} className="mobile-toggle">
           <button onClick={() => setIsOpen(!isOpen)}>
             {isOpen ? <X /> : <Menu />}
           </button>
        </div>
      </div>
      
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
