-- Seed data for SmartTutoring

-- Insert Users (Using public schema, assuming profiles table links to auth.users)
-- Note: In Supabase, you should use the Auth API to create users, 
-- but for testing purposes we can insert into a public 'profiles' table.

-- Insert Subjects
INSERT INTO subjects (name, category, icon) VALUES
('Mathematics', 'Science', 'calculator'),
('Physics', 'Science', 'atom'),
('Chemistry', 'Science', 'test-tube'),
('Computer Science', 'Technology', 'code'),
('English', 'Languages', 'languages'),
('French', 'Languages', 'languages'),
('Biology', 'Science', 'dna'),
('Economics', 'Social Science', 'trending-up');

-- Insert Tutors (Assuming you have their user IDs from auth.users)
-- This is a template, real IDs would be UUIDs from auth.users
/*
INSERT INTO tutor_profiles (user_id, hourly_rate, experience_years, education, teaching_style, languages, is_available, average_rating, total_reviews) VALUES
('UUID-AHMED', 1500, '8', 'Master Mathématiques — USTHB', 'Interactive and practical', 'Arabe, Français', true, 4.8, 12),
('UUID-FATIMA', 1200, '5', 'Licence Lettres Françaises — Université d''Oran', 'Supportive and patient', 'Français, Arabe', true, 4.5, 8),
('UUID-KARIM', 2000, '6', 'Ingénieur en Informatique — ENP', 'Hands-on coding', 'Français, Anglais, Arabe', true, 4.9, 15);
*/

-- Example of how to link tutors and subjects
-- INSERT INTO tutor_profiles_subjects (tutor_profile_id, subject_id) VALUES (1, 1), (1, 2);
