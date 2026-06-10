export const SERVICE_CATALOG = [
  { id: "electrician", name: "Electrician", category: "Electrical & Energy" },
  { id: "ac-repair", name: "AC Repair & Installation", category: "Electrical & Energy" },
  { id: "solar-technician", name: "Solar Technician", category: "Electrical & Energy" },
  { id: "plumber", name: "Plumber", category: "Construction & Plumbing" },
  { id: "mason", name: "Mason (Bricklayer)", category: "Construction & Plumbing" },
  { id: "painter", name: "Painter", category: "Construction & Finishing" },
  { id: "tile-installer", name: "Tile Installer", category: "Construction & Finishing" },
  { id: "welder", name: "Welder", category: "Industrial & Fabrication" },
  { id: "carpenter", name: "Carpenter", category: "Woodworking & Furniture" },
  { id: "appliance-repair", name: "Appliance Repair Technician", category: "Repair & Maintenance" },
  { id: "automobile-driver", name: "Automobile Driver", category: "Logistics & Transport" },
  { id: "tractor-operator", name: "Tractor Operator", category: "Logistics & Transport" },
  { id: "two-wheeler-mechanic", name: "Two-Wheeler Mechanic", category: "Automotive Services" },
  { id: "auto-mechanic", name: "Auto Mechanic", category: "Automotive Services" },
  { id: "tailor", name: "Tailor / Seamstress", category: "Apparel & Fashion" },
  { id: "home-cleaner", name: "General Home Cleaner", category: "Domestic Services" },
  { id: "cook", name: "Cook", category: "Domestic Services" },
  { id: "gardener", name: "Gardener", category: "Outdoor Services" },
  { id: "security-guard", name: "Security Guard", category: "Security Services" },
  { id: "pest-control", name: "Pest Control Technician", category: "Health & Sanitation" },
] as const;

export const SERVICE_NAMES = SERVICE_CATALOG.map((service) => service.name);
