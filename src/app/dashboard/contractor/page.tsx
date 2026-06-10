"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNotificationStore } from "@/lib/notificationStore";
import { SERVICE_NAMES } from "@/lib/services";
import { 
  Award, 
  MapPin, 
  Plus, 
  Users, 
  Calendar,
  CheckCircle2,
  Trash2,
  AlertCircle
} from "lucide-react";
import NotificationCenter from "@/components/NotificationCenter";

interface TeamPosting {
  id: string;
  skill: string;
  countNeeded: number;
  duration: string;
  block: string;
  village: string;
  description: string;
  status: "open" | "filled";
}

export default function ContractorDashboard() {
  const { addNotification } = useNotificationStore();
  const [postings, setPostings] = useState<TeamPosting[]>([
    {
      id: "post-1",
      skill: "Welder",
      countNeeded: 12,
      duration: "3 Months",
      block: "Murwara (Katni)",
      village: "Pipariya",
      description: "Need team of welders for industrial roof framing project.",
      status: "open"
    }
  ]);

  const [formSkill, setFormSkill] = useState("Welder");
  const [formCount, setFormCount] = useState(5);
  const [formDuration, setFormDuration] = useState("1 Month");
  const [formBlock, setFormBlock] = useState("Murwara (Katni)");
  const [formVillage, setFormVillage] = useState("Pipariya");
  const [formDesc, setFormDesc] = useState("");

  const handleCreatePosting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDesc.trim()) return;

    const newPosting: TeamPosting = {
      id: `post-${Math.random().toString(36).substr(2, 9)}`,
      skill: formSkill,
      countNeeded: formCount,
      duration: formDuration,
      block: formBlock,
      village: formVillage,
      description: formDesc,
      status: "open"
    };

    setPostings([newPosting, ...postings]);
    setFormDesc("");

    // Simulate match alerts
    setTimeout(() => {
      addNotification(
        "Bulk Team Matched",
        `Found ${formCount + 3} matching certified ${formSkill}s in ${formBlock} for your listing.`
      );
    }, 1500);
  };

  const handleFillPosting = (id: string, skill: string) => {
    setPostings(postings.map(p => p.id === id ? { ...p, status: "filled" } : p));
    addNotification(
      "Team Hiring Finalized",
      `Roster for team requirement (${skill}) has been locked and phone numbers unlocked.`
    );
  };

  const handleDeletePosting = (id: string) => {
    setPostings(postings.filter(p => p.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-ink font-sans">
      
      {/* Header */}
      <header className="h-20 bg-canvas border-b border-hairline flex items-center justify-between px-6 md:px-12 sticky top-0 z-40 airbnb-shadow">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Award className="w-8 h-8 text-primary animate-pulse" />
            <span className="font-bold text-xl tracking-tight text-primary">DLWEP</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-muted mt-0.5">
            <span className="text-primary font-extrabold border-b-2 border-primary pb-1">Contractor Portal</span>
            <Link href="/dashboard/citizen" className="hover:text-ink transition-colors">Citizen Portal</Link>
            <Link href="/dashboard/worker" className="hover:text-ink transition-colors">Worker Portal</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <NotificationCenter />
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 bg-surface-soft py-10 px-6">
        <div className="w-full max-w-5xl mx-auto space-y-8">
          
          {/* Welcome Card */}
          <div className="bg-white border border-hairline rounded-md p-6 airbnb-shadow">
            <h1 className="text-xl font-bold text-ink">Contractor Command Center</h1>
            <p className="text-xs text-muted mt-0.5">Post team-based requirements, search verified candidate pools, and hire workforce blocks directly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Postings Listing (col-span-2) */}
            <div className="md:col-span-2 space-y-6">
              
              <h2 className="text-xs font-bold text-muted uppercase tracking-wider">
                Active Workforce Listings ({postings.length})
              </h2>

              {postings.length === 0 ? (
                <div className="bg-white border border-hairline rounded-md p-12 text-center airbnb-shadow">
                  <AlertCircle className="w-12 h-12 text-muted-soft mx-auto mb-3" />
                  <h3 className="font-bold text-sm text-ink">No team requirements active</h3>
                  <p className="text-xs text-muted mt-1 max-w-xs mx-auto">
                    Use the panel on the right to list a team hiring requirement.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {postings.map((p) => (
                    <div 
                      key={p.id} 
                      className={`bg-white border rounded-md p-6 airbnb-shadow flex flex-col justify-between gap-4 transition-all ${
                        p.status === "filled" ? "border-green-200 bg-green-50/5" : "border-hairline hover:border-muted"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-primary bg-primary/5 px-2.5 py-0.5 rounded-full border border-primary/10">
                              {p.skill}
                            </span>
                            <span className="text-xs font-bold text-ink bg-surface-soft px-2 py-0.5 rounded-sm flex items-center gap-1 border border-hairline-soft">
                              <Users className="w-3.5 h-3.5" />
                              Need: {p.countNeeded} Workers
                            </span>
                          </div>
                          <span className="text-[10px] text-muted-soft font-mono uppercase">ID: {p.id}</span>
                        </div>

                        <p className="text-sm font-semibold text-ink leading-relaxed">{p.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted pt-1">
                          <span className="flex items-center gap-0.5">
                            <Calendar className="w-3.5 h-3.5 text-muted-soft" />
                            Duration: {p.duration}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3.5 h-3.5 text-muted-soft" />
                            {p.village}, {p.block}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-hairline-soft pt-4 mt-2">
                        <div>
                          {p.status === "filled" ? (
                            <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4 text-green-700" />
                              Hired & Finalized
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-yellow-700 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full">
                              ● Recruiting Candidates
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {p.status === "open" && (
                            <button
                              onClick={() => handleFillPosting(p.id, p.skill)}
                              className="bg-primary hover:bg-primary-active text-white h-9 px-4 text-xs font-bold rounded-full border border-transparent shadow-sm transition-colors cursor-pointer"
                            >
                              Finalize Team Hire
                            </button>
                          )}
                          <button
                            onClick={() => handleDeletePosting(p.id)}
                            className="p-2 text-muted hover:text-red-600 transition-colors border border-hairline-soft hover:border-red-200 rounded-full cursor-pointer bg-white"
                            title="Remove listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Post Team Requirement Form (col-span-1) */}
            <div className="md:col-span-1">
              <div className="bg-white border border-hairline rounded-md p-6 airbnb-shadow space-y-4 sticky top-28">
                <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
                  List Team Requirement
                </h3>

                <form onSubmit={handleCreatePosting} className="space-y-4">
                  {/* Skill selector */}
                  <div className="relative flex flex-col">
                    <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Skill Profile</span>
                    <select
                      value={formSkill}
                      onChange={(e) => setFormSkill(e.target.value)}
                      className="w-full bg-canvas text-ink border border-hairline rounded-sm pt-8 pb-3 px-3 outline-none focus:border-2 focus:border-ink transition-all text-xs font-semibold appearance-none"
                    >
                      {SERVICE_NAMES.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  {/* Count & Duration */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative flex flex-col">
                      <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Need Count</span>
                      <input
                        type="number"
                        value={formCount}
                        onChange={(e) => setFormCount(parseInt(e.target.value) || 1)}
                        min={1}
                        max={100}
                        className="w-full bg-canvas text-ink border border-hairline rounded-sm pt-8 pb-3 px-3 outline-none focus:border-2 focus:border-ink transition-all text-xs font-semibold"
                      />
                    </div>
                    <div className="relative flex flex-col">
                      <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Duration</span>
                      <select
                        value={formDuration}
                        onChange={(e) => setFormDuration(e.target.value)}
                        className="w-full bg-canvas text-ink border border-hairline rounded-sm pt-8 pb-3 px-3 outline-none focus:border-2 focus:border-ink transition-all text-xs font-semibold appearance-none"
                      >
                        <option value="1 Week">1 Week</option>
                        <option value="1 Month">1 Month</option>
                        <option value="3 Months">3 Months</option>
                        <option value="6 Months">6 Months</option>
                      </select>
                    </div>
                  </div>

                  {/* Block & Village */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative flex flex-col">
                      <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Block</span>
                      <select
                        value={formBlock}
                        onChange={(e) => setFormBlock(e.target.value)}
                        className="w-full bg-canvas text-ink border border-hairline rounded-sm pt-8 pb-3 px-3 outline-none focus:border-2 focus:border-ink transition-all text-xs font-semibold appearance-none"
                      >
                        <option value="Murwara (Katni)">Murwara</option>
                        <option value="Rithi">Rithi</option>
                        <option value="Bahoriband">Bahoriband</option>
                        <option value="Dheemer Kheda">Dheemer Kheda</option>
                      </select>
                    </div>
                    <div className="relative flex flex-col">
                      <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Village</span>
                      <input
                        type="text"
                        value={formVillage}
                        onChange={(e) => setFormVillage(e.target.value)}
                        placeholder="Village name"
                        className="w-full bg-canvas text-ink border border-hairline rounded-sm pt-8 pb-3 px-3 outline-none focus:border-2 focus:border-ink transition-all text-xs font-semibold"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="relative flex flex-col">
                    <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Task Details</span>
                    <textarea
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="Specify work details, safety gear requirements..."
                      rows={3}
                      className="w-full bg-canvas text-ink border border-hairline rounded-sm pt-8 pb-3 px-3 outline-none focus:border-2 focus:border-ink transition-all text-xs font-semibold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="button-primary w-full h-11 text-xs font-bold rounded-md flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Publish Posting
                  </button>
                </form>
              </div>
            </div>

          </div>

        </div>
      </main>

      <footer className="py-6 border-t border-hairline text-center text-xs text-muted bg-canvas mt-auto">
        © 2026 District Livelihood Workforce & Employment Exchange Platform
      </footer>

    </div>
  );
}
