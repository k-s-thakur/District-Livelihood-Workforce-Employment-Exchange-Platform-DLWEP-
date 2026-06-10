"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Award, ArrowLeft, Wrench } from "lucide-react";
import KatniVectorMap from "@/components/KatniVectorMap";

const SKILLS_LIST = [
  "Electrician",
  "AC Repair & Installation",
  "Plumber",
  "Mason (Bricklayer)",
  "Welder",
  "Carpenter",
  "Automobile Driver",
  "Tractor Operator",
  "Tailor / Seamstress",
  "General Home Cleaner"
];

export default function NewRequestPage() {
  const router = useRouter();
  
  const [skill, setSkill] = useState(SKILLS_LIST[0]);
  const [description, setDescription] = useState("");
  const [block, setBlock] = useState("Murwara (Katni)");
  const [village, setVillage] = useState("Kuthla");
  const [lat, setLat] = useState(23.849); // Default coordinate (Kuthla)
  const [lng, setLng] = useState(80.387);
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectCoordinate = (selectedBlock: string, selectedVillage: string, latitude: number, longitude: number) => {
    setBlock(selectedBlock);
    setVillage(selectedVillage);
    setLat(latitude);
    setLng(longitude);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate saving request and getting UUID
    setTimeout(() => {
      setIsLoading(false);
      const mockRequestId = "req-" + Math.floor(Math.random() * 100000);
      router.push(`/requests/${mockRequestId}?skill=${encodeURIComponent(skill)}&description=${encodeURIComponent(description)}&block=${encodeURIComponent(block)}&village=${encodeURIComponent(village)}&lat=${lat}&lng=${lng}`);
    }, 1200);
  };

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

      {/* Main Form Content */}
      <main className="flex-1 bg-surface-soft py-12 px-6">
        <div className="w-full max-w-4xl mx-auto bg-white border border-hairline rounded-md p-8 airbnb-shadow">
          
          <div className="border-b border-hairline-soft pb-6 mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Request Local Skilled Labor</h1>
            <p className="text-muted text-sm mt-1">Create a service request to geo-match with verified, local Blue-Collar workers in Katni.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left Column inputs */}
              <div className="md:col-span-1 space-y-4">
                
                {/* Skill selector */}
                <div className="relative flex flex-col">
                  <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Required Skill</span>
                  <select
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className="text-input-field appearance-none bg-canvas"
                  >
                    {SKILLS_LIST.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Description details */}
                <div className="relative flex flex-col">
                  <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Task Details / Description</span>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Repairing a subsoil electrical water pump in Pipariya block."
                    rows={4}
                    className="w-full bg-canvas text-ink border border-hairline rounded-sm pt-8 pb-3 px-3 min-h-[120px] outline-none focus:border-2 focus:border-ink transition-all text-sm"
                  />
                </div>

                {/* Info block */}
                <div className="bg-surface-soft border border-hairline-soft p-4 rounded-sm flex items-start gap-2.5">
                  <Wrench className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed text-muted">
                    <span className="font-bold text-ink block">Spatial Geo-Matching</span>
                    Upon submission, our PostGIS engine computes distance bounds and notifies nearby verified workers matching this skill category.
                  </div>
                </div>

              </div>

              {/* Right Column (Interactive Map Selector) */}
              <div className="md:col-span-2 space-y-2">
                <span className="text-xs font-bold text-ink uppercase tracking-wider">
                  Location & Coordinate Matching
                </span>
                
                <KatniVectorMap 
                  selectedBlock={block}
                  selectedVillage={village}
                  onSelectCoordinate={handleSelectCoordinate}
                />
              </div>

            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between border-t border-hairline-soft pt-6 mt-8">
              <div className="text-xs text-muted">
                Selected: <span className="font-bold text-ink">{village} village</span> in <span className="font-bold text-ink">{block} block</span>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="button-primary h-12 px-8 rounded-md font-bold shrink-0"
              >
                {isLoading ? "Matching Workers..." : "Submit Service Request"}
              </button>
            </div>

          </form>

        </div>
      </main>

      <footer className="py-6 border-t border-hairline text-center text-xs text-muted bg-canvas">
        © 2026 District Livelihood Workforce & Employment Exchange Platform
      </footer>

    </div>
  );
}
