-- Database Initialization Migration
-- Location: supabase/migrations/20260610_init.sql

-- Enable PostGIS and UUID extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Enums
CREATE TYPE user_role AS ENUM ('citizen', 'worker', 'contractor', 'student', 'agent', 'staff');
CREATE TYPE availability_status AS ENUM ('active', 'busy', 'offline');
CREATE TYPE request_status AS ENUM ('created', 'matched', 'worker_selected', 'completed', 'cancelled', 'auto_closed');
CREATE TYPE job_status AS ENUM ('assigned', 'in_progress', 'completed', 'auto_closed');

-- 2. Profiles Table (Unified Profile)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL,
    mobile TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    role user_role NOT NULL DEFAULT 'citizen',
    district TEXT NOT NULL,
    block TEXT NOT NULL,
    village TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Worker Profiles (Extends profiles)
CREATE TABLE public.worker_profiles (
    id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    photo_url TEXT,
    experience_years INT DEFAULT 0,
    availability availability_status DEFAULT 'offline' NOT NULL,
    trust_score INT DEFAULT 10 NOT NULL,
    rating_average NUMERIC(3,2) DEFAULT 0.00,
    jobs_completed INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE NOT NULL
);

-- 4. Skills Table
CREATE TABLE public.skills (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL
);

-- 5. Worker Skills Map (Many-to-Many)
CREATE TABLE public.worker_skills (
    worker_id UUID REFERENCES public.worker_profiles(id) ON DELETE CASCADE,
    skill_id BIGINT REFERENCES public.skills(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (worker_id, skill_id)
);

-- 6. Service Requests
CREATE TABLE public.service_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    service_category TEXT NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    geom GEOMETRY(Point, 4326),
    status request_status DEFAULT 'created' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Jobs (Lifecycle instances)
CREATE TABLE public.jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_id UUID REFERENCES public.service_requests(id) ON DELETE CASCADE,
    worker_id UUID REFERENCES public.worker_profiles(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status job_status DEFAULT 'assigned' NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 8. Ratings
CREATE TABLE public.ratings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    worker_id UUID REFERENCES public.worker_profiles(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    review TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. In-App Notifications (Alternative to SMS Gateway)
CREATE TABLE public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS) on all public tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 10. RLS Policies

-- Profiles: Anyone can view profiles, only user can update their own
CREATE POLICY "Allow public read on profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Allow user to update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Worker Profiles: Anyone can view, only worker or staff can update
CREATE POLICY "Allow public read on worker_profiles" ON public.worker_profiles
    FOR SELECT USING (true);

CREATE POLICY "Allow worker to update own profile" ON public.worker_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Skills: Read-only for public, write for staff
CREATE POLICY "Allow public read on skills" ON public.skills
    FOR SELECT USING (true);

-- Worker Skills: Anyone can view, worker can update
CREATE POLICY "Allow public read on worker_skills" ON public.worker_skills
    FOR SELECT USING (true);

CREATE POLICY "Allow worker to manage own skills" ON public.worker_skills
    FOR ALL USING (auth.uid() = worker_id);

-- Service Requests: Citizen can manage their own, workers and staff can read all
CREATE POLICY "Allow citizens to manage own requests" ON public.service_requests
    FOR ALL USING (auth.uid() = customer_id);

CREATE POLICY "Allow workers and staff to read requests" ON public.service_requests
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND (profiles.role = 'worker' OR profiles.role = 'staff')
        )
    );

-- Jobs: Related customer or worker or staff can view/update
CREATE POLICY "Allow access to related jobs" ON public.jobs
    FOR ALL USING (
        auth.uid() = customer_id OR 
        auth.uid() = worker_id OR
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'staff'
        )
    );

-- Ratings: Customer can create, worker and staff can read
CREATE POLICY "Allow customers to manage ratings" ON public.ratings
    FOR ALL USING (auth.uid() = customer_id);

CREATE POLICY "Allow public read on ratings" ON public.ratings
    FOR SELECT USING (true);

-- Notifications: Only target user can access
CREATE POLICY "Allow users to manage own notifications" ON public.notifications
    FOR ALL USING (auth.uid() = user_id);

-- 11. Profile Creation Trigger on Sign Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, mobile, email, role, district, block, village)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', ''),
    COALESCE(new.raw_user_meta_data->>'mobile', ''),
    new.email,
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'citizen'::user_role),
    COALESCE(new.raw_user_meta_data->>'district', ''),
    COALESCE(new.raw_user_meta_data->>'block', ''),
    COALESCE(new.raw_user_meta_data->>'village', '')
  );
  
  -- If worker, also create worker_profile record
  IF COALESCE(new.raw_user_meta_data->>'role', '') = 'worker' THEN
    INSERT INTO public.worker_profiles (id, experience_years, availability, trust_score, is_verified)
    VALUES (
      new.id, 
      COALESCE((new.raw_user_meta_data->>'experience_years')::int, 0),
      'offline'::availability_status, 
      10, 
      false
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 12. Seed Skills Data
INSERT INTO public.skills (name, category) VALUES
  ('Electrician', 'Electrical & Energy'),
  ('AC Repair & Installation', 'Electrical & Energy'),
  ('Plumber', 'Construction & Plumbing'),
  ('Mason (Bricklayer)', 'Construction & Plumbing'),
  ('Welder', 'Industrial & Fabrication'),
  ('Carpenter', 'Woodworking & Furniture'),
  ('Automobile Driver', 'Logistics & Transport'),
  ('Tractor Operator', 'Logistics & Transport'),
  ('Tailor / Seamstress', 'Apparel & Fashion'),
  ('General Home Cleaner', 'Domestic Services')
ON CONFLICT (name) DO NOTHING;
