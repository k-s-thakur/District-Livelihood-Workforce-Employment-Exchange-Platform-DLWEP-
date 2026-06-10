"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import { 
  Award, 
  ArrowLeft, 
  MapPin, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Briefcase,
  Users
} from "lucide-react";

// Mock profiles matching the database seed and admin vetting list
const WORKERS = [
  {
    id: "w1",
    name: "Rajesh Kumar",
    primary_skill: "Electrician",
    experience_years: 5,
    mobile: "+91 98765 01234",
    rating_average: 4.9,
    trust_score: 50,
    jobs_completed: 42,
    block: "Murwara (Katni)",
    village: "Pipariya",
    lat: 23.814,
    lng: 80.419,
    photo_url: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "w2",
    name: "Sunita Bai",
    primary_skill: "Tailor / Seamstress",
    experience_years: 8,
    mobile: "+91 91234 56789",
    rating_average: 4.8,
    trust_score: 50,
    jobs_completed: 67,
    block: "Murwara (Katni)",
    village: "Kuthla",
    lat: 23.849,
    lng: 80.387,
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "w3",
    name: "Amit Patel",
    primary_skill: "Plumber",
    experience_years: 4,
    mobile: "+91 95432 10987",
    rating_average: 4.75,
    trust_score: 50,
    jobs_completed: 23,
    block: "Bahoriband",
    village: "Sleemanabad",
    lat: 23.611,
    lng: 80.146,
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "pw1",
    name: "Vikram Singh",
    primary_skill: "Welder",
    experience_years: 4,
    mobile: "+91 88761 00213",
    rating_average: 4.85,
    trust_score: 50, // Vetted by Admin
    jobs_completed: 18,
    block: "Murwara (Katni)",
    village: "Pipariya",
    lat: 23.814,
    lng: 80.419,
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "pw2",
    name: "Rekha Sharma",
    primary_skill: "Tailor / Seamstress",
    experience_years: 6,
    mobile: "+91 99876 54312",
    rating_average: 4.65,
    trust_score: 50,
    jobs_completed: 31,
    block: "Bahoriband",
    village: "Sleemanabad",
    lat: 23.611,
    lng: 80.146,
    photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "pw3",
    name: "Sunil Verma",
    primary_skill: "Plumber",
    experience_years: 3,
    mobile: "+91 77654 32109",
    rating_average: 4.5,
    trust_score: 50,
    jobs_completed: 12,
    block: "Vijayraghavgarh",
    village: "Bijeraghogarh",
    lat: 24.097,
    lng: 80.610,
    photo_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=60"
  }
];

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function RequestDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params.id as string;
  const skill = searchParams.get("skill") || "Electrician";
  const description = searchParams.get("description") || "No details provided.";
  const block = searchParams.get("block") || "Murwara (Katni)";
  const village = searchParams.get("village") || "Kuthla";
  const reqLat = parseFloat(searchParams.get("lat") || "23.849");
  const reqLng = parseFloat(searchParams.get("lng") || "80.387");

  const [status, setStatus] = useState<"created" | "matched" | "worker_selected" | "completed">("created");
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  // Compute geographical matches dynamically using Haversine algorithm
  const matchedWorkers = WORKERS.filter(worker => {
    // Exact skill match
    const skillName = worker.primary_skill.toLowerCase();
    const targetSkill = skill.toLowerCase();
    return skillName.includes(targetSkill) || targetSkill.includes(skillName);
  })
  .map(worker => {
    const distance = getDistanceKm(reqLat, reqLng, worker.lat, worker.lng);
    return { ...worker, distance };
  })
  .sort((a, b) => {
    // Sort by trust score desc, rating desc, then distance asc
    if (b.trust_score !== a.trust_score) return b.trust_score - a.trust_score;
    if (b.rating_average !== a.rating_average) return b.rating_average - a.rating_average;
    return a.distance - b.distance;
  });

  const selectedWorker = WORKERS.find(w => w.id === selectedWorkerId);

  const handleSelectWorker = (workerId: string) => {
    setSelectedWorkerId(workerId);
    setStatus("worker_selected");
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-hairline rounded-md p-8 airbnb-shadow">
      
      {/* Request Header Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-hairline-soft pb-6 mb-8 gap-4">
        <div>
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Request ID: {id}</span>
          <h1 className="text-2xl font-bold tracking-tight text-ink mt-0.5">
            Service Request for {skill}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {status === "created" && (
            <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-bold px-3 py-1 rounded-full">
              ● Match Search Active
            </span>
          )}
          {status === "worker_selected" && (
            <span className="bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-3 py-1 rounded-full">
              ✓ Worker Selected & Dispatched
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left column: Request Details */}
        <div className="md:col-span-1 space-y-6">
          <div>
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Description</span>
            <p className="text-sm text-body mt-1">{description}</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Requested Location</span>
            <p className="text-sm text-ink font-semibold mt-1 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              {village}, {block}
            </p>
          </div>

          <div className="bg-surface-soft p-4 rounded-sm border border-hairline">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">GPS Centerpoints</span>
            <span className="text-xs font-mono text-muted block mt-1">Lat: {reqLat}</span>
            <span className="text-xs font-mono text-muted block">Lng: {reqLng}</span>
          </div>

          {status === "worker_selected" && selectedWorker && (
            <div className="bg-green-50 border border-green-200 p-6 rounded-md space-y-3">
              <div className="flex items-center gap-2 text-green-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-700" />
                Connection Established
              </div>
              <p className="text-xs text-green-700">
                Please call {selectedWorker.name} directly to finalize timing and dispatch.
              </p>
              <a 
                href={`tel:${selectedWorker.mobile}`} 
                className="button-primary w-full h-11 text-xs rounded-full flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                Call {selectedWorker.mobile}
              </a>
            </div>
          )}
        </div>

        {/* Right column: Matched Workers list */}
        <div className="md:col-span-2 border-l border-hairline-soft pl-0 md:pl-8">
          <h2 className="text-lg font-bold text-ink mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            PostGIS Geodetic Matches (Top 5)
          </h2>

          {matchedWorkers.length === 0 ? (
            <div className="text-center py-12 bg-surface-soft border border-dashed border-hairline rounded-sm">
              <Users className="w-12 h-12 text-muted-soft mx-auto mb-3" />
              <h3 className="font-bold text-sm text-ink">No local matches found</h3>
              <p className="text-xs text-muted mt-1 max-w-xs mx-auto">
                No verified workers are currently active in this skill category within the search radius.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {matchedWorkers.slice(0, 5).map((worker) => {
                const isSelected = selectedWorkerId === worker.id;
                return (
                  <div 
                    key={worker.id}
                    className={`border rounded-md p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                      isSelected 
                        ? "border-green-500 bg-green-50/20 shadow-md" 
                        : "border-hairline hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={worker.photo_url} 
                        alt={worker.name} 
                        className="w-12 h-12 rounded-full object-cover border border-hairline"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm text-ink">{worker.name}</h3>
                          <span className="flex items-center gap-0.5 text-xs font-semibold text-ink">
                            <Star className="w-3 h-3 fill-ink" />
                            {worker.rating_average}
                          </span>
                        </div>
                        <p className="text-xs text-muted mt-0.5">
                          {worker.experience_years} Years Exp ● {worker.jobs_completed} jobs
                        </p>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-[10px] font-bold text-primary bg-primary-disabled/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            Trust: {worker.trust_score}
                          </span>
                          <span className="text-[10px] font-bold text-muted flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-muted-soft" />
                            {worker.distance.toFixed(1)} km away
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {isSelected ? (
                        <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                          ✓ Assigned
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSelectWorker(worker.id)}
                          disabled={status === "worker_selected"}
                          className="button-primary h-9 px-4 text-xs font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Select & Connect
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default function RequestDetailPage() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas text-ink font-sans">
      
      {/* Top Nav Header */}
      <header className="h-20 bg-canvas border-b border-hairline flex items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center gap-1.5 text-muted hover:text-ink font-semibold text-[14px] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg text-primary">DLWEP</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 bg-surface-soft py-12 px-6">
        <Suspense fallback={
          <div className="w-full max-w-4xl mx-auto bg-white border border-hairline rounded-md p-8 airbnb-shadow text-center">
            <p className="text-muted text-sm">Loading request details...</p>
          </div>
        }>
          <RequestDetailContent />
        </Suspense>
      </main>

      <footer className="py-6 border-t border-hairline text-center text-xs text-muted bg-canvas">
        © 2026 District Livelihood Workforce & Employment Exchange Platform
      </footer>

    </div>
  );
}
