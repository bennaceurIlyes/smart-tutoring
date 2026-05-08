import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, MessageSquare, LogOut, ChevronRight, Zap, Star } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%' }}></div>
    </div>
  );

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome back, {user?.user_metadata?.first_name || 'Scholar'}</h1>
          <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your learning journey</p>
        </div>
        <button onClick={handleLogout} className="btn btn-outline" style={{ color: 'var(--error)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      {/* Bento Grid Dashboard */}
      <div className="bento-grid" style={{ gridAutoRows: 'minmax(150px, auto)' }}>
        {/* Main Stats */}
        <div className="card bento-item span-2 row-2" style={{ background: 'linear-gradient(135deg, var(--card), rgba(99, 102, 241, 0.1))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem' }}>Learning Progress</h3>
            <Zap size={24} color="var(--accent)" />
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>84%</div>
          <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{ width: '84%', height: '100%', background: 'var(--primary)' }}></div>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>You're ahead of 92% of students this month!</p>
        </div>

        {/* Next Lesson */}
        <div className="card bento-item span-2">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '12px' }}>
              <Calendar size={24} color="var(--success)" />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Next Lesson</h4>
              <p style={{ fontWeight: 600 }}>Advanced Physics with Dr. Aris</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 700 }}>Today</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>16:30 PM</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="card bento-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <MessageSquare size={24} color="var(--primary)" />
          <span>Messages</span>
        </div>
        
        <div className="card bento-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <Star size={24} color="#f59e0b" />
          <span>Reviews</span>
        </div>

        {/* Tutors Section */}
        <div className="card bento-item span-2 row-2">
          <h3 style={{ marginBottom: '1.5rem' }}>My Recent Tutors</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--border)', borderRadius: '50%' }}></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600 }}>Tutor {i}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mathematics</p>
                </div>
                <ChevronRight size={18} color="var(--border)" />
              </div>
            ))}
          </div>
        </div>

        <div className="card bento-item span-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3>Set up your profile</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Complete your profile to find better matches.</p>
          </div>
          <button className="btn btn-primary">Complete Now</button>
        </div>
      </div>
    </div>
  );
}
