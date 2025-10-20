-- Supabase Database Setup for Ediz Gündoğdu Portfolio
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    title_tr TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_tr TEXT NOT NULL,
    description_en TEXT NOT NULL,
    category_tr TEXT NOT NULL,
    category_en TEXT NOT NULL,
    year TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- About Table
CREATE TABLE IF NOT EXISTS about (
    id BIGSERIAL PRIMARY KEY,
    content_tr TEXT NOT NULL,
    content_en TEXT NOT NULL,
    image_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Contact Table
CREATE TABLE IF NOT EXISTS contact (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS social_links (
    id BIGSERIAL PRIMARY KEY,
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Skills Table (optional for future use)
CREATE TABLE IF NOT EXISTS skills (
    id BIGSERIAL PRIMARY KEY,
    name_tr TEXT NOT NULL,
    name_en TEXT NOT NULL,
    level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
    category_tr TEXT,
    category_en TEXT,
    icon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Users Table for Admin Authentication
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY \"Enable read access for all users\" ON projects FOR SELECT USING (true);
CREATE POLICY \"Enable read access for all users\" ON about FOR SELECT USING (true);
CREATE POLICY \"Enable read access for all users\" ON contact FOR SELECT USING (true);
CREATE POLICY \"Enable read access for all users\" ON social_links FOR SELECT USING (true);
CREATE POLICY \"Enable read access for all users\" ON skills FOR SELECT USING (true);

-- Create policies for authenticated write access (admin only)
CREATE POLICY \"Enable insert for authenticated users only\" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY \"Enable update for authenticated users only\" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY \"Enable delete for authenticated users only\" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY \"Enable insert for authenticated users only\" ON about FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY \"Enable update for authenticated users only\" ON about FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY \"Enable insert for authenticated users only\" ON contact FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY \"Enable update for authenticated users only\" ON contact FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY \"Enable insert for authenticated users only\" ON social_links FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY \"Enable update for authenticated users only\" ON social_links FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY \"Enable delete for authenticated users only\" ON social_links FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY \"Enable insert for authenticated users only\" ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY \"Enable update for authenticated users only\" ON skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY \"Enable delete for authenticated users only\" ON skills FOR DELETE USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category_tr ON projects(category_tr);
CREATE INDEX IF NOT EXISTS idx_projects_category_en ON projects(category_en);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);
CREATE INDEX IF NOT EXISTS idx_skills_category_tr ON skills(category_tr);
CREATE INDEX IF NOT EXISTS idx_skills_category_en ON skills(category_en);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_updated_at BEFORE UPDATE ON about
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();