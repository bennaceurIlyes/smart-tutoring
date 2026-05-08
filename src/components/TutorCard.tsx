import { Star, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TutorCard({ tutor }: { tutor: any }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="card glass"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--border)', overflow: 'hidden' }}>
          {tutor.user?.profile_picture ? (
            <img src={tutor.user.profile_picture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={32} color="var(--text-muted)" />
            </div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.25rem' }}>{tutor.user?.first_name} {tutor.user?.last_name}</h3>
            {tutor.user?.is_verified && <Shield size={16} color="var(--success)" />}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontSize: '0.9rem' }}>
            <Star size={16} fill="#f59e0b" />
            <span>{tutor.average_rating} ({tutor.total_reviews} reviews)</span>
          </div>
        </div>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {tutor.user?.bio || 'Professional tutor dedicated to student success and academic excellence.'}
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {['Mathematics', 'Physics', 'Computing'].map(subject => (
          <span key={subject} className="badge badge-primary">{subject}</span>
        ))}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>${tutor.hourly_rate}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>/hr</span>
        </div>
        <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>View Profile</button>
      </div>
    </motion.div>
  );
}
