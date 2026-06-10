-- Seed Data for DLWEP
-- Location: supabase/seed.sql

-- 1. Ensure skills exist (if not seeded by migration)
INSERT INTO public.skills (name, category) VALUES
  ('Electrician', 'Electrical & Energy'),
  ('AC Repair & Installation', 'Electrical & Energy'),
  ('Solar Technician', 'Electrical & Energy'),
  ('Plumber', 'Construction & Plumbing'),
  ('Mason (Bricklayer)', 'Construction & Plumbing'),
  ('Painter', 'Construction & Finishing'),
  ('Tile Installer', 'Construction & Finishing'),
  ('Welder', 'Industrial & Fabrication'),
  ('Carpenter', 'Woodworking & Furniture'),
  ('Appliance Repair Technician', 'Repair & Maintenance'),
  ('Automobile Driver', 'Logistics & Transport'),
  ('Tractor Operator', 'Logistics & Transport'),
  ('Two-Wheeler Mechanic', 'Automotive Services'),
  ('Auto Mechanic', 'Automotive Services'),
  ('Tailor / Seamstress', 'Apparel & Fashion'),
  ('General Home Cleaner', 'Domestic Services'),
  ('Cook', 'Domestic Services'),
  ('Gardener', 'Outdoor Services'),
  ('Security Guard', 'Security Services'),
  ('Pest Control Technician', 'Health & Sanitation')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert mock workers into auth.users (this fires handle_new_user trigger)
-- We use dummy UUIDs and emails
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, aud, role, created_at, updated_at)
VALUES
  (
    '11111111-1111-1111-1111-111111111111', 
    '00000000-0000-0000-0000-000000000000',
    'rajesh@dlwep.org', 
    -- Dummy bcrypt hash for password 'password'
    '$2a$10$wR8Y0C/PDrfLzH0/eIEXEu7jK99D1h1r0Yh19HqXQ6s.mD4l6x5aK', 
    NOW(), 
    '{"name": "Rajesh Kumar", "mobile": "+919999999901", "role": "worker", "district": "Katni", "block": "Katni", "village": "Pipariya"}',
    'authenticated',
    'authenticated',
    NOW(),
    NOW()
  ),
  (
    '22222222-2222-2222-2222-222222222222', 
    '00000000-0000-0000-0000-000000000000',
    'sunita@dlwep.org', 
    '$2a$10$wR8Y0C/PDrfLzH0/eIEXEu7jK99D1h1r0Yh19HqXQ6s.mD4l6x5aK', 
    NOW(), 
    '{"name": "Sunita Bai", "mobile": "+919999999902", "role": "worker", "district": "Katni", "block": "Murwara", "village": "Kuthla"}',
    'authenticated',
    'authenticated',
    NOW(),
    NOW()
  ),
  (
    '33333333-3333-3333-3333-333333333333', 
    '00000000-0000-0000-0000-000000000000',
    'amit@dlwep.org', 
    '$2a$10$wR8Y0C/PDrfLzH0/eIEXEu7jK99D1h1r0Yh19HqXQ6s.mD4l6x5aK', 
    NOW(), 
    '{"name": "Amit Patel", "mobile": "+919999999903", "role": "worker", "district": "Katni", "block": "Bahoriband", "village": "Sleemanabad"}',
    'authenticated',
    'authenticated',
    NOW(),
    NOW()
  ),
  (
    '44444444-4444-4444-4444-444444444444', 
    '00000000-0000-0000-0000-000000000000',
    'ramesh@dlwep.org', 
    '$2a$10$wR8Y0C/PDrfLzH0/eIEXEu7jK99D1h1r0Yh19HqXQ6s.mD4l6x5aK', 
    NOW(), 
    '{"name": "Ramesh Yadav", "mobile": "+919999999904", "role": "worker", "district": "Katni", "block": "Vijayraghavgarh", "village": "Bijeraghogarh"}',
    'authenticated',
    'authenticated',
    NOW(),
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- 3. Update public.worker_profiles with details, photo, location, ratings, and verification
UPDATE public.worker_profiles
SET 
  photo_url = 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=60',
  experience_years = 5,
  availability = 'active'::availability_status,
  trust_score = 45,
  rating_average = 4.90,
  jobs_completed = 42,
  is_verified = true,
  latitude = 23.8340,
  longitude = 80.3990
WHERE id = '11111111-1111-1111-1111-111111111111';

UPDATE public.worker_profiles
SET 
  photo_url = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60',
  experience_years = 8,
  availability = 'active'::availability_status,
  trust_score = 65,
  rating_average = 4.80,
  jobs_completed = 67,
  is_verified = true,
  latitude = 23.8960,
  longitude = 80.4120
WHERE id = '22222222-2222-2222-2222-222222222222';

UPDATE public.worker_profiles
SET 
  photo_url = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60',
  experience_years = 4,
  availability = 'active'::availability_status,
  trust_score = 30,
  rating_average = 4.75,
  jobs_completed = 23,
  is_verified = true,
  latitude = 23.6420,
  longitude = 80.1280
WHERE id = '33333333-3333-3333-3333-333333333333';

UPDATE public.worker_profiles
SET 
  photo_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
  experience_years = 10,
  availability = 'active'::availability_status,
  trust_score = 90,
  rating_average = 4.95,
  jobs_completed = 89,
  is_verified = true,
  latitude = 24.0120,
  longitude = 80.6210
WHERE id = '44444444-4444-4444-4444-444444444444';

-- 4. Map the workers to their respective skills
INSERT INTO public.worker_skills (worker_id, skill_id, is_primary)
VALUES
  (
    '11111111-1111-1111-1111-111111111111', 
    (SELECT id FROM public.skills WHERE name = 'Electrician' LIMIT 1), 
    true
  ),
  (
    '22222222-2222-2222-2222-222222222222', 
    (SELECT id FROM public.skills WHERE name = 'Tailor / Seamstress' LIMIT 1), 
    true
  ),
  (
    '33333333-3333-3333-3333-333333333333', 
    (SELECT id FROM public.skills WHERE name = 'Plumber' LIMIT 1), 
    true
  ),
  (
    '44444444-4444-4444-4444-444444444444', 
    (SELECT id FROM public.skills WHERE name = 'Automobile Driver' LIMIT 1), 
    true
  )
ON CONFLICT (worker_id, skill_id) DO NOTHING;
