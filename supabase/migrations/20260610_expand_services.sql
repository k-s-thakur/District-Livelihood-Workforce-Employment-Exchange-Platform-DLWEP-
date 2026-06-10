INSERT INTO public.skills (name, category) VALUES
  ('Solar Technician', 'Electrical & Energy'),
  ('Painter', 'Construction & Finishing'),
  ('Tile Installer', 'Construction & Finishing'),
  ('Appliance Repair Technician', 'Repair & Maintenance'),
  ('Two-Wheeler Mechanic', 'Automotive Services'),
  ('Auto Mechanic', 'Automotive Services'),
  ('Cook', 'Domestic Services'),
  ('Gardener', 'Outdoor Services'),
  ('Security Guard', 'Security Services'),
  ('Pest Control Technician', 'Health & Sanitation')
ON CONFLICT (name) DO NOTHING;
