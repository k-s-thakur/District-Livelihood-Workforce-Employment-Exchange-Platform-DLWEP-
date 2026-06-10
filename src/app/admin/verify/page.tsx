"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Award, 
  ShieldCheck, 
  Search, 
  MapPin, 
  AlertCircle, 
  UserCheck,
  TrendingUp
} from "lucide-react";

const INITIAL_PENDING_WORKERS = [
  {
    id: "pw1",
    name: "Vikram Singh",
    primary_skill: "Welder",
    experience_years: 4,
    mobile: "+91 88761 00213",
    email: "vikram.singh@gmail.com",
    village: "Pipariya",
    block: "Murwara (Katni)",
    trust_score: 10,
    is_verified: false,
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: "pw2",
    name: "Rekha Sharma",
    primary_skill: "Tailor / Seamstress",
    experience_years: 6,
    mobile: "+91 99876 54312",
    email: "rekha.sews@yahoo.com",
    village: "Sleemanabad",
    block: "Bahoriband",
    trust_score: 10,
    is_verified: false,
    photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: "pw3",
    name: "Sunil Verma",
    primary_skill: "Plumber",
    experience_years: 3,
    mobile: "+91 77654 32109",
    email: "sunil.plumb@gmail.com",
    village: "Bijeraghogarh",
    block: "Vijayraghavgarh",
    trust_score: 10,
    is_verified: false,
    photo_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=60"
  }
];

const INITIAL_VERIFIED_WORKERS = [
  {
    id: "vw1",
    name: "Rajesh Kumar",
    primary_skill: "Electrician",
    experience_years: 5,
    mobile: "+91 98765 01234",
    email: "rajesh.elec@gmail.com",
    village: "Pipariya",
    block: "Murwara (Katni)",
    trust_score: 50, // 10 base + 40 certified
    is_verified: true,
    photo_url: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: "vw2",
    name: "Sunita Bai",
    primary_skill: "Tailor / Seamstress",
    experience_years: 8,
    mobile: "+91 91234 56789",
    email: "sunita.sews@gmail.com",
    village: "Kuthla",
    block: "Murwara (Katni)",
    trust_score: 50,
    is_verified: true,
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60"
  }
];

export default function AdminVerifyPage() {
  const [pendingWorkers, setPendingWorkers] = useState(INITIAL_PENDING_WORKERS);
  const [verifiedWorkers, setVerifiedWorkers] = useState(INITIAL_VERIFIED_WORKERS);
  const [filter, setFilter] = useState<"pending" | "verified" | "all">("pending");
  const [searchQuery, setSearchQuery] = useState("");

  const handleVerify = (workerId: string) => {
    // Locate worker in pending
    const workerToVerify = pendingWorkers.find(w => w.id === workerId);
    if (!workerToVerify) return;

    // Transition worker
    const updatedWorker = {
      ...workerToVerify,
      is_verified: true,
      trust_score: workerToVerify.trust_score + 40 // +40 for Certification
    };

    setPendingWorkers(pendingWorkers.filter(w => w.id !== workerId));
    setVerifiedWorkers([updatedWorker, ...verifiedWorkers]);
  };

  const handleRevoke = (workerId: string) => {
    const workerToRevoke = verifiedWorkers.find(w => w.id === workerId);
    if (!workerToRevoke) return;

    const updatedWorker = {
      ...workerToRevoke,
      is_verified: false,
      trust_score: Math.max(10, workerToRevoke.trust_score - 40)
    };

    setVerifiedWorkers(verifiedWorkers.filter(w => w.id !== workerId));
    setPendingWorkers([updatedWorker, ...pendingWorkers]);
  };

  const allWorkers = [...pendingWorkers, ...verifiedWorkers];
  const activeList = filter === "pending" 
    ? pendingWorkers 
    : filter === "verified" 
      ? verifiedWorkers 
      : allWorkers;

  const filteredWorkers = activeList.filter(worker => 
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    worker.primary_skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.block.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-ink font-sans">
      
      {/* Admin Nav Header */}
      <header className="sticky top-0 z-50 h-20 bg-canvas border-b border-hairline flex items-center justify-between px-6 md:px-12 airbnb-shadow">
        <div className="flex items-center gap-2">
          <Award className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl tracking-tight text-primary">DLWEP</span>
          <span className="bg-ink text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ml-2">Admin</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted font-semibold">
          <Link href="/" className="hover:text-ink">Consumer Portal</Link>
          <span className="h-4 w-[1px] bg-hairline"></span>
          <span className="text-ink">Vetting Hub</span>
        </div>
      </header>

      <div className="flex-1 bg-surface-soft py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-ink">Worker Vetting & Verification</h1>
              <p className="text-muted text-sm mt-1">Review student credentials from Livelihood College batches and toggle certification status.</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-hairline rounded-md p-6 airbnb-shadow flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-muted uppercase tracking-wider">Pending Vetting</span>
                <span className="text-2xl font-extrabold text-ink block mt-1">{pendingWorkers.length}</span>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white border border-hairline rounded-md p-6 airbnb-shadow flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-muted uppercase tracking-wider">Certified Workers</span>
                <span className="text-2xl font-extrabold text-ink block mt-1">{verifiedWorkers.length}</span>
              </div>
              <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center text-green-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white border border-hairline rounded-md p-6 airbnb-shadow flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-muted uppercase tracking-wider">Verification Rate</span>
                <span className="text-2xl font-extrabold text-ink block mt-1">
                  {allWorkers.length > 0 ? `${Math.round((verifiedWorkers.length / allWorkers.length) * 100)}%` : "0%"}
                </span>
              </div>
              <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-600">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Filters & Search Row */}
          <div className="bg-white border border-hairline rounded-md p-4 airbnb-shadow flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            {/* Filter Tabs */}
            <div className="flex bg-surface-strong p-1 rounded-full border border-hairline shrink-0">
              {(["pending", "verified", "all"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full capitalize transition-all cursor-pointer ${
                    filter === f 
                      ? "bg-white text-ink shadow-sm" 
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {f} {f === "pending" ? `(${pendingWorkers.length})` : f === "verified" ? `(${verifiedWorkers.length})` : ""}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:max-w-xs flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-muted-soft" />
              <input
                type="text"
                placeholder="Search name, skill, block..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-canvas text-ink border border-hairline rounded-full py-2 pl-9 pr-4 text-xs outline-none focus:border-ink"
              />
            </div>
          </div>

          {/* Worker List Grid */}
          {filteredWorkers.length === 0 ? (
            <div className="text-center py-16 bg-white border border-hairline rounded-md airbnb-shadow">
              <UserCheck className="w-12 h-12 text-muted-soft mx-auto mb-4" />
              <h3 className="text-lg font-bold text-ink">No profiles matched</h3>
              <p className="text-muted text-sm mt-1">Adjust filters or search parameters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkers.map((worker) => (
                <div 
                  key={worker.id}
                  className="bg-white border border-hairline rounded-md p-6 airbnb-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Photo and Badges */}
                    <div className="flex items-start gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={worker.photo_url} 
                        alt={worker.name} 
                        className="w-16 h-16 rounded-full object-cover border border-hairline"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base text-ink truncate">{worker.name}</h3>
                        <p className="text-xs font-semibold text-primary mt-0.5">{worker.primary_skill}</p>
                        
                        {/* Status Tag */}
                        <div className="mt-2">
                          {worker.is_verified ? (
                            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              <ShieldCheck className="w-3 h-3 text-green-700" />
                              Livelihood Certified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 border border-yellow-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              <AlertCircle className="w-3 h-3 text-yellow-700" />
                              Pending Verification
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Meta info list */}
                    <div className="mt-6 space-y-2 border-t border-hairline-soft pt-4 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted">Experience:</span>
                        <span className="font-semibold text-ink">{worker.experience_years} Years</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted">Contact:</span>
                        <span className="font-semibold text-ink select-all">{worker.mobile}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted">Location:</span>
                        <span className="font-semibold text-ink flex items-center gap-0.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          {worker.village}, {worker.block}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted">Trust Score:</span>
                        <span className="font-extrabold text-ink bg-surface-strong px-2 py-0.5 rounded-full">
                          {worker.trust_score}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-6 pt-4 border-t border-hairline-soft">
                    {worker.is_verified ? (
                      <button
                        onClick={() => handleRevoke(worker.id)}
                        className="button-secondary w-full h-10 text-xs font-bold rounded-md border border-hairline hover:bg-yellow-50 hover:text-primary-error-text hover:border-primary-error-text/50"
                      >
                        Revoke Certification
                      </button>
                    ) : (
                      <button
                        onClick={() => handleVerify(worker.id)}
                        className="button-primary w-full h-10 text-xs font-bold rounded-md bg-ink hover:bg-primary-active text-white border-0"
                      >
                        Verify & Certify Worker
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      <footer className="py-6 border-t border-hairline text-center text-xs text-muted bg-canvas">
        © 2026 District Livelihood Workforce & Employment Exchange Platform
      </footer>

    </div>
  );
}
