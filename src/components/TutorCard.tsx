import Link from 'next/link';
import { Star, Clock, Globe, ShieldCheck } from 'lucide-react';

interface TutorCardProps {
  tutor: {
    id: string;
    full_name: string;
    profile_picture?: string;
    hourly_rate: number;
    average_rating: number;
    total_reviews: number;
    experience_years: string;
    languages: string;
    bio?: string;
    is_verified: boolean;
    subjects?: { name: string }[];
  };
}

export default function TutorCard({ tutor }: TutorCardProps) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--border)', overflow: 'hidden', position: 'relative' }}>
          {tutor.profile_picture ? (
            <img src={tutor.profile_picture} alt={tutor.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
              {tutor.full_name.charAt(0)}
            </div>
          )}
          {tutor.is_verified && (
            <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'white', borderRadius: '50%', padding: '2px', color: '#10b981' }}>
              <ShieldCheck size={16} fill="currentColor" />
            </div>
          )}
        </div>
        <div>
          <h3 style={{ margin: 0 }}>{tutor.full_name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', fontSize: '0.9rem', fontWeight: 600 }}>
            <Star size={14} fill="currentColor" />
            <span>{tutor.average_rating} ({tutor.total_reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {tutor.subjects?.map(s => (
          <span key={s.name} style={{ fontSize: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.25rem 0.6rem', borderRadius: '20px', fontWeight: 600 }}>
            {s.name}
          </span>
        ))}
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {tutor.bio || "No bio available."}
      </p>

      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>${tutor.hourly_rate}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>/hr</span>
        </div>
        <Link href={`/tutors/${tutor.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
          View Profile
        </Link>
      </div>
    </div>
  );
}
