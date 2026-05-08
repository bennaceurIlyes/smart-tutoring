'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  User, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronRight,
  Zap,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            Hello, <span style={{ color: 'var(--primary)' }}>{user?.email?.split('@')[0]}</span> 👋
          </h1>
          <p style={{ color: 'var(--secondary)' }}>Welcome back to your learning dashboard</p>
        </div>
        <button onClick={handleLogout} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <LogOut size={18} />
          Sign Out
        </button>
      </header>

      <div className="grid grid-3" style={{ gap: '2rem' }}>
        {/* Main Stats */}
        <div className="card glass" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '1rem' }}>Learning Progress</h3>
              <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                <div style={{ width: '65%', height: '100%', background: 'linear-gradient(to right, var(--primary), var(--accent))' }}></div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--secondary)' }}>65% of your weekly goal reached. Keep it up!</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>12</div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--secondary)', letterSpacing: '1px' }}>Hours</div>
              </div>
              <div style={{ width: '1px', background: 'var(--border)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>4</div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--secondary)', letterSpacing: '1px' }}>Sessions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Profile */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '1rem', fontSize: '2rem', fontWeight: 700 }}>
            {user?.email?.[0].toUpperCase()}
          </div>
          <h4 style={{ margin: 0 }}>{user?.email}</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--secondary)', marginBottom: '1.5rem' }}>Verified Student</p>
          <Link href="/accounts/profile" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}>
            Edit Profile
          </Link>
        </div>

        {/* Action Grid */}
        <div className="grid grid-2" style={{ gridColumn: 'span 3', gap: '1.5rem', marginTop: '1rem' }}>
          <Link href="/tutors" className="card glass hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', textDecoration: 'none' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: 'var(--radius)', color: 'var(--primary)' }}>
              <BookOpen size={32} />
            </div>
            <div>
              <h4 style={{ margin: 0 }}>Find Tutors</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--secondary)' }}>Browse expert educators</p>
            </div>
            <ChevronRight size={20} style={{ marginLeft: 'auto', opacity: 0.5 }} />
          </Link>

          <Link href="/schedule" className="card glass hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', textDecoration: 'none' }}>
            <div style={{ background: 'rgba(192, 132, 252, 0.1)', padding: '1rem', borderRadius: 'var(--radius)', color: 'var(--accent)' }}>
              <Calendar size={32} />
            </div>
            <div>
              <h4 style={{ margin: 0 }}>My Schedule</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--secondary)' }}>Manage your sessions</p>
            </div>
            <ChevronRight size={20} style={{ marginLeft: 'auto', opacity: 0.5 }} />
          </Link>

          <Link href="/messages" className="card glass hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', textDecoration: 'none' }}>
            <div style={{ background: 'rgba(52, 211, 153, 0.1)', padding: '1rem', borderRadius: 'var(--radius)', color: '#34d399' }}>
              <MessageSquare size={32} />
            </div>
            <div>
              <h4 style={{ margin: 0 }}>Messages</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--secondary)' }}>Chat with your tutors</p>
            </div>
            <ChevronRight size={20} style={{ marginLeft: 'auto', opacity: 0.5 }} />
          </Link>

          <Link href="/settings" className="card glass hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', textDecoration: 'none' }}>
            <div style={{ background: 'rgba(156, 163, 175, 0.1)', padding: '1rem', borderRadius: 'var(--radius)', color: 'var(--secondary)' }}>
              <Settings size={32} />
            </div>
            <div>
              <h4 style={{ margin: 0 }}>Settings</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--secondary)' }}>Account preferences</p>
            </div>
            <ChevronRight size={20} style={{ marginLeft: 'auto', opacity: 0.5 }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
