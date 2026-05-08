import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Search, SlidersHorizontal, Star, Shield, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

import TutorCard from '../components/TutorCard';

export default function Tutors() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTutors() {
      const { data, error } = await supabase
        .from('tutor_profiles')
        .select(`
          id,
          hourly_rate,
          average_rating,
          total_reviews,
          experience_years,
          languages,
          user:user_id (
            first_name,
            last_name,
            profile_picture,
            is_verified,
            bio
          )
        `)
        .eq('is_available', true);

      if (!error && data) {
        setTutors(data);
      }
      setLoading(false);
    }
    fetchTutors();
  }, []);

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Find Your Mentor</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Expert tutors ready to help you master any subject.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search subjects or names..." 
              style={{ paddingLeft: '3rem', width: '350px' }}
            />
          </div>
          <button className="btn btn-outline">
            <SlidersHorizontal size={20} />
            Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="card" style={{ height: '350px', opacity: 0.5 }}></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-3">
          {tutors.length > 0 ? tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          )) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem' }}>
              <Users size={64} style={{ opacity: 0.1, marginBottom: '2rem' }} />
              <h2>No tutors available yet</h2>
              <p style={{ color: 'var(--text-muted)' }}>We're currently onboarding expert mentors. Check back soon!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
