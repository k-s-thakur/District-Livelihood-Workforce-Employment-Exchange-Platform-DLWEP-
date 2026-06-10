"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNotificationStore, Job } from "@/lib/notificationStore";
import { 
  Award, 
  MapPin, 
  CheckCircle2, 
  Plus, 
  Star, 
  Users,
  ChevronRight,
  TrendingUp,
  X
} from "lucide-react";
import NotificationCenter from "@/components/NotificationCenter";

export default function CitizenDashboard() {
  const { jobs, updateJobStatus, addNotification } = useNotificationStore();
  const [selectedJobForRating, setSelectedJobForRating] = useState<Job | null>(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const handleOpenRating = (job: Job) => {
    setSelectedJobForRating(job);
    setRatingValue(5);
    setReviewText("");
  };

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForRating) return;

    // Transition status to completed
    updateJobStatus(selectedJobForRating.id, "completed");
    
    // Add success notification
    addNotification(
      "Feedback Submitted",
      `Thank you for rating ${selectedJobForRating.workerName || "the worker"} ${ratingValue} stars!`
    );

    setSelectedJobForRating(null);
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
            <span className="text-primary font-extrabold border-b-2 border-primary pb-1">Citizen Portal</span>
            <Link href="/dashboard/worker" className="hover:text-ink transition-colors">Switch to Worker</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <NotificationCenter />
          <Link href="/requests/new" className="button-primary h-10 px-4 text-xs font-bold rounded-full flex items-center gap-1">
            <Plus className="w-4 h-4" />
            New Request
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 bg-surface-soft py-10 px-6">
        <div className="w-full max-w-5xl mx-auto space-y-8">
          
          {/* Welcome Banner */}
          <div className="bg-white border border-hairline rounded-md p-6 airbnb-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-ink">Welcome back, Citizen</h1>
              <p className="text-xs text-muted mt-0.5">Manage your active service requests and connect with certified blue-collar talent in Katni.</p>
            </div>
            <div className="flex items-center gap-4 bg-surface-soft px-4 py-2.5 rounded-sm border border-hairline-soft">
              <TrendingUp className="w-5 h-5 text-primary shrink-0" />
              <div className="text-[11px] font-semibold text-muted leading-tight">
                <span className="font-bold text-ink block">Platform Stats</span>
                Average local response time: <span className="text-primary font-bold">14 minutes</span>
              </div>
            </div>
          </div>

          {/* Jobs Listing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Active Requests List (col-span-2) */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">
                Your Service Requests ({jobs.length})
              </h2>

              {jobs.length === 0 ? (
                <div className="bg-white border border-hairline rounded-md p-12 text-center airbnb-shadow">
                  <Users className="w-12 h-12 text-muted-soft mx-auto mb-3" />
                  <h3 className="font-bold text-sm text-ink">No requests created</h3>
                  <p className="text-xs text-muted mt-1 max-w-xs mx-auto">
                    You haven&apos;t requested any local service workforce yet. Click the &apos;New Request&apos; button above to begin.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div 
                      key={job.id} 
                      className="bg-white border border-hairline rounded-md p-6 airbnb-shadow flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-muted"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-bold text-primary bg-primary-disabled/20 px-2.5 py-0.5 rounded-full">
                            {job.skill}
                          </span>
                          <span className="text-[10px] text-muted font-bold font-mono uppercase">
                            ID: {job.id}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-ink">{job.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted">
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3.5 h-3.5 text-muted-soft" />
                            {job.village}, {job.block}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-hairline-soft">
                        {/* Status logic */}
                        {job.status === "created" && (
                          <div className="flex items-center gap-2">
                            <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-bold px-3 py-1 rounded-full">
                              ● Searching Matches
                            </span>
                            <Link 
                              href={`/requests/${job.id}?skill=${encodeURIComponent(job.skill)}&description=${encodeURIComponent(job.description)}&block=${encodeURIComponent(job.block)}&village=${encodeURIComponent(job.village)}&lat=${job.lat}&lng=${job.lng}`}
                              className="button-primary h-9 px-4 text-xs font-bold rounded-full flex items-center gap-0.5"
                            >
                              Match List
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        )}

                        {job.status === "worker_selected" && (
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <div className="bg-green-50 border border-green-200 px-4 py-2.5 rounded-sm flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />
                              <div className="text-[11px] leading-tight">
                                <span className="font-bold text-green-800 block">Assigned: {job.workerName}</span>
                                <span className="text-green-700 font-medium">{job.workerMobile || "+91 98765 01234"}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleOpenRating(job)}
                              className="button-primary h-10 px-4 text-xs font-bold rounded-full"
                            >
                              Complete Job
                            </button>
                          </div>
                        )}

                        {job.status === "completed" && (
                          <div className="flex items-center gap-2">
                            <span className="bg-green-100 text-green-800 border border-green-200 text-xs font-bold px-3 py-1 rounded-full">
                              ✓ Job Completed
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Guidelines (col-span-1) */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white border border-hairline rounded-md p-6 airbnb-shadow">
                <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-3">
                  Verification Guidelines
                </h3>
                <div className="space-y-4 text-xs text-muted leading-relaxed">
                  <div>
                    <span className="font-bold text-ink block">1. Geodetic Sourcing</span>
                    All workers suggested in your match dashboard are certified by the Livelihood College and verified using GPS boundary coordinates.
                  </div>
                  <div>
                    <span className="font-bold text-ink block">2. Zero Commission</span>
                    We do not charge matching fees. Connect directly with workers to settle payment details.
                  </div>
                  <div>
                    <span className="font-bold text-ink block">3. Safety first</span>
                    Check their digital credentials and trust index before dispatching.
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Rating Modal */}
      {selectedJobForRating && (
        <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-hairline rounded-md p-6 max-w-md w-full airbnb-shadow space-y-4 animate-scale-up">
            
            <div className="flex items-center justify-between border-b border-hairline-soft pb-3">
              <h3 className="font-bold text-base text-ink">Rate Service Experience</h3>
              <button 
                onClick={() => setSelectedJobForRating(null)}
                className="text-muted hover:text-ink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitRating} className="space-y-4">
              
              <div className="text-xs text-muted">
                How was your task completion experience with <span className="font-bold text-ink">{selectedJobForRating.workerName}</span>?
              </div>

              {/* Star Rating Select */}
              <div className="flex items-center gap-2 justify-center py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingValue(star)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star 
                      className={`w-8 h-8 ${
                        star <= ratingValue 
                          ? "fill-primary text-primary" 
                          : "text-muted-soft"
                      }`} 
                    />
                  </button>
                ))}
              </div>

              {/* Text Review */}
              <div className="relative flex flex-col">
                <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Review / Feedback</span>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="e.g. Completed the wiring quickly. Very professional work!"
                  rows={3}
                  className="w-full bg-canvas text-ink border border-hairline rounded-sm pt-8 pb-3 px-3 outline-none focus:border-2 focus:border-ink transition-all text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-hairline-soft">
                <button
                  type="button"
                  onClick={() => setSelectedJobForRating(null)}
                  className="button-secondary h-10 px-4 text-xs font-bold rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button-primary h-10 px-6 text-xs font-bold rounded-md"
                >
                  Submit Feedback & Complete
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      <footer className="py-6 border-t border-hairline text-center text-xs text-muted bg-canvas mt-auto">
        © 2026 District Livelihood Workforce & Employment Exchange Platform
      </footer>

    </div>
  );
}
