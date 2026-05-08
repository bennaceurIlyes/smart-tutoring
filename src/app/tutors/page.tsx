import { supabase } from '@/lib/supabase';
import TutorCard from '@/components/TutorCard';
import { Search, SlidersHorizontal, Users } from '@/components/Icons';

// Force the page to be rendered on the server at request time, not build time
// This prevents the build from crashing if Supabase env vars are missing
export const dynamic = 'force-dynamic';

async function getTutors() {
  try {
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

    if (error) {
      console.error('Error fetching tutors:', error);
      return [];
    }

    if (!data) return [];

    return data.map((item: any) => ({
      id: item.id,
      full_name: `${item.user?.first_name || 'Tutor'} ${item.user?.last_name || ''}`,
      profile_picture: item.user?.profile_picture,
      hourly_rate: item.hourly_rate,
      average_rating: item.average_rating,
      total_reviews: item.total_reviews,
      experience_years: item.experience_years,
      languages: item.languages,
      bio: item.user?.bio,
      is_verified: item.user?.is_verified,
      subjects: []
    }));
  } catch (err) {
    console.error('Unexpected error in getTutors:', err);
    return [];
  }
}

export default async function TutorsPage() {
  const tutors = await getTutors();

  return (
    <div className="container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem' }}>Expert Tutors</h1>
          <p style={{ color: 'var(--secondary)' }}>{tutors.length} tutors available to help you</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
            <input 
              type="text" 
              placeholder="Search subjects or names..." 
              style={{ padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '300px', background: 'var(--card)' }}
            />
          </div>
          <button className="btn" style={{ border: '1px solid var(--border)', background: 'var(--card)' }}>
            <SlidersHorizontal size={20} />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-3">
        {tutors.length > 0 ? (
          tutors.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem', background: 'var(--card)', borderRadius: 'var(--radius)', border: '1px dashed var(--border)' }}>
            <Users size={48} style={{ color: 'var(--border)', marginBottom: '1rem' }} />
            <h3>No tutors found</h3>
            <p style={{ color: 'var(--secondary)' }}>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
