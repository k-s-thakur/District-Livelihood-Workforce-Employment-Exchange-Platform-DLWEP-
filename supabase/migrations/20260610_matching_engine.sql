-- Matching Engine Migration
-- Location: supabase/migrations/20260610_matching_engine.sql

-- 1. Add spatial coordinates to worker_profiles
ALTER TABLE public.worker_profiles
ADD COLUMN latitude DOUBLE PRECISION,
ADD COLUMN longitude DOUBLE PRECISION,
ADD COLUMN geom GEOMETRY(Point, 4326);

-- 2. Create spatial index
CREATE INDEX IF NOT EXISTS idx_worker_profiles_geom ON public.worker_profiles USING GIST (geom);
CREATE INDEX IF NOT EXISTS idx_service_requests_geom ON public.service_requests USING GIST (geom);

-- 3. Trigger to update geom on worker_profiles
CREATE OR REPLACE FUNCTION public.update_worker_geom()
RETURNS trigger AS $$
BEGIN
  IF NEW.latitude IS NOT NULL AND NEW.longitude IS NOT NULL THEN
    NEW.geom := ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
  ELSE
    NEW.geom := NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_update_worker_geom
  BEFORE INSERT OR UPDATE OF latitude, longitude ON public.worker_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_worker_geom();

-- 4. Trigger to update geom on service_requests
CREATE OR REPLACE FUNCTION public.update_request_geom()
RETURNS trigger AS $$
BEGIN
  IF NEW.latitude IS NOT NULL AND NEW.longitude IS NOT NULL THEN
    NEW.geom := ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
  ELSE
    NEW.geom := NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_update_request_geom
  BEFORE INSERT OR UPDATE OF latitude, longitude ON public.service_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_request_geom();

-- 5. PL/pgSQL function to match verified workers by distance, skill, and trust score
CREATE OR REPLACE FUNCTION public.match_workers_for_request(
    req_lat DOUBLE PRECISION,
    req_lng DOUBLE PRECISION,
    req_skill TEXT,
    max_dist_meters DOUBLE PRECISION DEFAULT 15000
)
RETURNS TABLE (
    worker_id UUID,
    name TEXT,
    mobile TEXT,
    experience_years INT,
    availability availability_status,
    trust_score INT,
    rating_average NUMERIC(3,2),
    jobs_completed INT,
    distance_meters DOUBLE PRECISION
) AS $$
DECLARE
    req_geom GEOMETRY(Point, 4326);
BEGIN
    req_geom := ST_SetSRID(ST_MakePoint(req_lng, req_lat), 4326);

    RETURN QUERY
    SELECT 
        wp.id AS worker_id,
        p.name,
        p.mobile,
        wp.experience_years,
        wp.availability,
        wp.trust_score,
        wp.rating_average,
        wp.jobs_completed,
        ST_Distance(wp.geom::geography, req_geom::geography) AS distance_meters
    FROM public.worker_profiles wp
    JOIN public.profiles p ON wp.id = p.id
    JOIN public.worker_skills ws ON wp.id = ws.worker_id
    JOIN public.skills s ON ws.skill_id = s.id
    WHERE 
        wp.is_verified = true
        AND s.name = req_skill
        AND ST_DWithin(wp.geom::geography, req_geom::geography, max_dist_meters)
    ORDER BY 
        wp.trust_score DESC,
        wp.rating_average DESC,
        distance_meters ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
