"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNotificationStore } from "@/lib/notificationStore";
import { 
  Award, 
  MapPin, 
  Compass,
  FileCheck,
  Zap
} from "lucide-react";
import NotificationCenter from "@/components/NotificationCenter";

const WORKER_PROFILES = [
  {
    id: "w1",
    name: "Rajesh Kumar",
    skill: "Electrician",
    mobile: "+91 98765 01234",
    block: "Murwara (Katni)"
  },
  {
    id: "w2",
    name: "Sunita Bai",
    skill: "Tailor / Seamstress",
    mobile: "+91 91234 56789",
    block: "Murwara (Katni)"
  }
];

export default function WorkerDashboard() {
  const { jobs, updateJobStatus, addNotification } = useNotificationStore();
  const [activeProfileIdx, setActiveProfileIdx] = useState(0);

  const worker = WORKER_PROFILES[activeProfileIdx];

  // 1. Nearby matching requests: status is 'created' AND skill matches worker skill
  const matchingRequests = jobs.filter(
    (j) => j.status === "created" && 
    (j.skill.toLowerCase().includes(worker.skill.toLowerCase()) || 
     worker.skill.toLowerCase().includes(j.skill.toLowerCase()))
  );

  // 2. Active Hired Jobs: status is 'worker_selected' AND assigned to this worker
  const activeJobs = jobs.filter(
    (j) => j.status === "worker_selected" && j.workerId === worker.id
  );

  // 3. Completed Jobs: status is 'completed' AND assigned to this worker
  const completedJobs = jobs.filter(
    (j) => j.status === "completed" && j.workerId === worker.id
  );

  const handleAcceptJob = (jobId: string) => {
    updateJobStatus(jobId, "worker_selected", worker.id, worker.name, worker.mobile);
    addNotification(
      "Job Match Confirmed",
      `You accepted the request. The customer has been notified and unlocked your contact: ${worker.mobile}`
    );
  };

  const handleCompleteJob = (jobId: string) => {
    updateJobStatus(jobId, "completed");
    addNotification(
      "Job Finished",
      "Successfully submitted completion report. Awaiting customer review."
    );
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
            <Link href="/dashboard/citizen" className="hover:text-ink transition-colors">Citizen Portal</Link>
            <span className="text-primary font-extrabold border-b-2 border-primary pb-1">Worker Portal</span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Worker Identity Switcher (for testing matching mechanics) */}
          <div className="relative flex items-center gap-1.5 bg-surface-soft border border-hairline px-3 py-1.5 rounded-full text-xs font-semibold text-ink">
            <span className="text-[10px] text-muted font-bold uppercase">Identity:</span>
            <select
              value={activeProfileIdx}
              onChange={(e) => setActiveProfileIdx(parseInt(e.target.value))}
              className="bg-transparent border-none outline-none font-bold text-primary cursor-pointer pr-1"
            >
              {WORKER_PROFILES.map((p, idx) => (
                <option key={p.id} value={idx}>{p.name} ({p.skill})</option>
              ))}
            </select>
          </div>

          <NotificationCenter />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 bg-surface-soft py-10 px-6">
        <div className="w-full max-w-5xl mx-auto space-y-8">
          
          {/* Welcome Banner */}
          <div className="bg-white border border-hairline rounded-md p-6 airbnb-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-ink">Livelihood Workspace: {worker.name}</h1>
                <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  ✓ Verified Skill Badge
                </span>
              </div>
              <p className="text-xs text-muted mt-1">
                You are listed under <span className="font-bold text-ink">{worker.skill}</span> in <span className="font-bold text-ink">{worker.block}</span>. Nearby jobs will appear here automatically.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-surface-soft px-4 py-2.5 rounded-sm border border-hairline-soft">
              <Zap className="w-5 h-5 text-primary shrink-0" />
              <div className="text-[11px] font-semibold text-muted leading-tight">
                <span className="font-bold text-ink block">Availability Status</span>
                Listed as <span className="text-green-700 font-extrabold">ACTIVE</span> on map
              </div>
            </div>
          </div>

          {/* Core Matching Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Matching & Assigned Job Board (col-span-2) */}
            <div className="md:col-span-2 space-y-6">
              
              {/* 1. Nearby Matched Requests */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-primary" />
                  Nearby Matching Requests ({matchingRequests.length})
                </h2>

                {matchingRequests.length === 0 ? (
                  <div className="bg-white border border-hairline rounded-md p-8 text-center airbnb-shadow">
                    <p className="text-xs text-muted">No nearby requests currently matching your trade skill.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {matchingRequests.map((job) => (
                      <div 
                        key={job.id} 
                        className="bg-white border border-hairline rounded-md p-5 airbnb-shadow flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-extrabold text-primary bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
                            {job.skill} Match
                          </span>
                          <p className="text-sm font-bold text-ink">{job.description}</p>
                          <p className="text-xs text-muted flex items-center gap-0.5">
                            <MapPin className="w-3.5 h-3.5 text-muted-soft" />
                            {job.village}, {job.block}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAcceptJob(job.id)}
                          className="button-primary h-9 px-4 text-xs font-bold rounded-full shrink-0"
                        >
                          Accept & Apply
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Active Hired Jobs */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-green-700" />
                  Active Assigned Tasks ({activeJobs.length})
                </h2>

                {activeJobs.length === 0 ? (
                  <div className="bg-white border border-hairline rounded-md p-8 text-center airbnb-shadow">
                    <p className="text-xs text-muted">You have no active hired tasks at the moment.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activeJobs.map((job) => (
                      <div 
                        key={job.id} 
                        className="bg-green-50/10 border border-green-200 rounded-md p-5 flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Hired Job
                          </span>
                          <p className="text-sm font-bold text-ink">{job.description}</p>
                          <p className="text-xs text-muted flex items-center gap-0.5">
                            <MapPin className="w-3.5 h-3.5 text-muted-soft" />
                            {job.village}, {job.block}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCompleteJob(job.id)}
                          className="bg-green-600 hover:bg-green-700 text-white h-9 px-4 text-xs font-bold rounded-full shrink-0 border border-transparent shadow-sm transition-colors cursor-pointer"
                        >
                          Mark Completed
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Completed Jobs History */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-muted uppercase tracking-wider">
                  Completed Jobs History ({completedJobs.length})
                </h2>

                {completedJobs.length > 0 && (
                  <div className="bg-white border border-hairline rounded-md divide-y divide-hairline-soft airbnb-shadow">
                    {completedJobs.map((job) => (
                      <div key={job.id} className="p-4 flex items-center justify-between text-xs text-muted">
                        <span>{job.description}</span>
                        <span className="font-bold text-green-700 flex items-center gap-0.5">
                          ✓ Completed
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Sidebar Guidelines (col-span-1) */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white border border-hairline rounded-md p-6 airbnb-shadow">
                <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-3">
                  Worker Livelihood Code
                </h3>
                <div className="space-y-4 text-xs text-muted leading-relaxed">
                  <div>
                    <span className="font-bold text-ink block">1. Accept Responsibly</span>
                    Accepting a task unlocks your mobile number to the customer. Ensure prompt communications.
                  </div>
                  <div>
                    <span className="font-bold text-ink block">2. Maintain Reputation</span>
                    Every feedback rating directly affects your trust level and ranking order in geodetic matching queries.
                  </div>
                  <div>
                    <span className="font-bold text-ink block">3. Safety Standards</span>
                    Follow safety protocols when executing technical wiring or welding tasks.
                  </div>
                </div>
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
