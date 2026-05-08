-- 🚀 SMART TUTORING - SUPABASE POSTGRESQL SETUP
-- This script creates the core tables and inserts initial data.
-- Note: It is recommended to run 'python manage.py migrate' first to ensure all Django-specific tables are created correctly.

-- 1. Create Core Tables (If not using Django migrations)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    password VARCHAR(128) NOT NULL,
    role VARCHAR(10) DEFAULT 'student',
    phone VARCHAR(20),
    bio TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50),
    icon VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tutor_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    hourly_rate DECIMAL(8, 2) DEFAULT 0.00,
    experience_years VARCHAR(10) DEFAULT '0-1',
    education TEXT,
    teaching_style TEXT,
    languages VARCHAR(200),
    average_rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    grade_level VARCHAR(50),
    school VARCHAR(100),
    learning_goals TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Insert Subjects
INSERT INTO subjects (name, category, icon) VALUES 
('Mathématiques', 'Sciences', 'calculator'),
('Physique', 'Sciences', 'lightning'),
('Chimie', 'Sciences', 'flask'),
('Informatique', 'Technologie', 'code-slash'),
('Français', 'Langues', 'translate'),
('Anglais', 'Langues', 'globe')
ON CONFLICT (name) DO NOTHING;

-- 3. Insert Tutors (Example: Ahmed Benali)
-- Note: Passwords here are placeholders. Use Django's create_user for real hashed passwords.
INSERT INTO users (username, email, first_name, last_name, password, role, phone, bio)
VALUES ('ahmed.benali', 'ahmed.benali@smarttutor.dz', 'Ahmed', 'Benali', 'pbkdf2_sha256$...', 'tutor', '0550123456', 'Professeur de mathématiques avec 8 ans d''expérience.')
ON CONFLICT (username) DO NOTHING;

INSERT INTO tutor_profiles (user_id, hourly_rate, experience_years, education, languages)
SELECT id, 1500, '5+', 'Master Mathématiques — USTHB', 'Arabe, Français'
FROM users WHERE username = 'ahmed.benali'
ON CONFLICT (user_id) DO NOTHING;

-- 4. Insert Students (Example: Imane Benyahia)
INSERT INTO users (username, email, first_name, last_name, password, role, phone, bio)
VALUES ('imane.benyahia', 'imane.benyahia@email.com', 'Imane', 'Benyahia', 'pbkdf2_sha256$...', 'student', '0550000001', 'Étudiante en 2ème année Licence Mathématiques.')
ON CONFLICT (username) DO NOTHING;

INSERT INTO student_profiles (user_id, grade_level, school)
SELECT id, 'University', 'USTHB'
FROM users WHERE username = 'imane.benyahia'
ON CONFLICT (user_id) DO NOTHING;

-- 5. Additional Data (Truncated for brevity, full list in populate_db.py)
-- Repeat similar INSERTs for other users from populate_db.py
