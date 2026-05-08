'use client';

import Link from 'next/link';
import { BookOpen, User, Menu, X } from '@/components/Icons';
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

        {/* Mobile toggle */}
        <div className="mobile-toggle" style={{ display: 'none' }}>
           <button onClick={() => setIsOpen(!isOpen)} className="btn" style={{ padding: '0.5rem' }}>
             {isOpen ? <X /> : <Menu />}
           </button>
         </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="glass animate-fade-in" style={{ position: 'absolute', top: '80px', left: 0, right: 0, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '1px solid var(--border)' }}>
          <Link href="/tutors" onClick={() => setIsOpen(false)}>Find Tutors</Link>
          <Link href="/subjects" onClick={() => setIsOpen(false)}>Subjects</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>How it works</Link>
          <Link href="/login" className="btn btn-primary" onClick={() => setIsOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  );
}
