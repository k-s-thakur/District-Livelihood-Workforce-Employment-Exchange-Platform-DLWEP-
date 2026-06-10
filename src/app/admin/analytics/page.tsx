"use client";

import React from "react";
import Link from "next/link";
import { 
  Award, 
  TrendingUp, 
  Download, 
  Users, 
  CheckCircle2, 
  Clock 
} from "lucide-react";
import NotificationCenter from "@/components/NotificationCenter";

const MOCK_ANALYTICS_DATA = [
  { block: "Murwara (Katni)", jobsCompleted: 64, activeWorkers: 245, certificationRate: "78%" },
  { block: "Bahoriband", jobsCompleted: 38, activeWorkers: 180, certificationRate: "71%" },
  { block: "Rithi", jobsCompleted: 26, activeWorkers: 140, certificationRate: "68%" },
  { block: "Badwara", jobsCompleted: 20, activeWorkers: 125, certificationRate: "65%" },
  { block: "Vijayraghavgarh", jobsCompleted: 18, activeWorkers: 110, certificationRate: "70%" },
  { block: "Barhi", jobsCompleted: 12, activeWorkers: 90, certificationRate: "60%" }
];

const CSV_ROW_TEMPLATE = [
  ["Candidate Name", "Trade Skill", "Block", "Village", "Placed Date", "Livelihood Certified", "Status"],
  ["Rajesh Kumar", "Electrician", "Murwara (Katni)", "Pipariya", "2026-06-08", "Yes", "Completed"],
  ["Sunita Bai", "Tailor / Seamstress", "Murwara (Katni)", "Kailwara", "2026-06-09", "Yes", "Active"],
  ["Ramesh Patel", "Mason / Builder", "Bahoriband", "Saliya", "2026-06-09", "Yes", "Completed"],
  ["Aarti Soni", "Healthcare Assistant", "Rithi", "Hardua", "2026-06-10", "Yes", "Active"],
  ["Vijay Yadav", "Welder", "Badwara", "Khamtara", "2026-06-10", "No", "Completed"]
];

export default function LivelihoodAnalytics() {
  
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + CSV_ROW_TEMPLATE.map(e => e.map(val => `"${val}"`).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "katni_livelihood_placement_report_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <span className="text-primary font-extrabold border-b-2 border-primary pb-1">District Admin Panel</span>
            <Link href="/dashboard/citizen" className="hover:text-ink transition-colors">Citizen Portal</Link>
            <Link href="/dashboard/worker" className="hover:text-ink transition-colors">Worker Portal</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <NotificationCenter />
          <button
            onClick={handleExportCSV}
            className="button-primary h-10 px-4 text-xs font-bold rounded-full flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-surface-soft py-10 px-6">
        <div className="w-full max-w-5xl mx-auto space-y-8">
          
          {/* Welcome Title */}
          <div>
            <h1 className="text-2xl font-bold text-ink">District Livelihood Analytics Dashboard</h1>
            <p className="text-xs text-muted mt-0.5">Real-time outcome measurement metrics for Katni District employment exchanges.</p>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            
            {/* Metric 1 */}
            <div className="bg-white border border-hairline rounded-md p-5 airbnb-shadow flex items-start gap-4">
              <div className="bg-primary/10 p-2.5 rounded-full text-primary mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Jobs Completed</span>
                <span className="text-2xl font-extrabold text-ink block mt-1">178</span>
                <span className="text-[10px] text-green-700 font-bold block mt-0.5">↑ 14% this month</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white border border-hairline rounded-md p-5 airbnb-shadow flex items-start gap-4">
              <div className="bg-primary/10 p-2.5 rounded-full text-primary mt-0.5">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Active Workforce</span>
                <span className="text-2xl font-extrabold text-ink block mt-1">890</span>
                <span className="text-[10px] text-muted font-bold block mt-0.5">92% verified profile</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white border border-hairline rounded-md p-5 airbnb-shadow flex items-start gap-4">
              <div className="bg-primary/10 p-2.5 rounded-full text-primary mt-0.5">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">College Placements</span>
                <span className="text-2xl font-extrabold text-ink block mt-1">72.4%</span>
                <span className="text-[10px] text-primary font-bold block mt-0.5">Target: 75% Year 1</span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-white border border-hairline rounded-md p-5 airbnb-shadow flex items-start gap-4">
              <div className="bg-primary/10 p-2.5 rounded-full text-primary mt-0.5">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Match Latency</span>
                <span className="text-2xl font-extrabold text-ink block mt-1">18.5m</span>
                <span className="text-[10px] text-green-700 font-bold block mt-0.5">↓ 2.4m reduction</span>
              </div>
            </div>

          </div>

          {/* Graphical Section & Table Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Histogram (col-span-2) */}
            <div className="md:col-span-2 bg-white border border-hairline rounded-md p-6 airbnb-shadow space-y-6">
              <div>
                <h3 className="font-bold text-sm text-ink uppercase tracking-wider">Geographic Job Distribution</h3>
                <p className="text-[11px] text-muted mt-0.5">Total completed task requests distributed block-by-block in Katni district.</p>
              </div>

              {/* Bar Graph Simulation */}
              <div className="space-y-4">
                {MOCK_ANALYTICS_DATA.map((item) => {
                  const percent = Math.round((item.jobsCompleted / 64) * 100);
                  return (
                    <div key={item.block} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-ink">
                        <span>{item.block}</span>
                        <span>{item.jobsCompleted} Jobs completed</span>
                      </div>
                      <div className="h-4 bg-surface-soft rounded-sm overflow-hidden border border-hairline-soft">
                        <div 
                          className="h-full bg-primary rounded-sm transition-all duration-500" 
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Table (col-span-1) */}
            <div className="md:col-span-1 bg-white border border-hairline rounded-md p-6 airbnb-shadow space-y-4">
              <div>
                <h3 className="font-bold text-sm text-ink uppercase tracking-wider">Block Performance</h3>
                <p className="text-[11px] text-muted mt-0.5">Comparison of active workforce rosters and certified ratios.</p>
              </div>

              <div className="divide-y divide-hairline-soft">
                {MOCK_ANALYTICS_DATA.map((item) => (
                  <div key={item.block} className="py-3 flex items-center justify-between text-xs">
                    <span className="font-semibold text-ink">{item.block}</span>
                    <div className="text-right leading-tight">
                      <span className="font-bold text-ink block">{item.activeWorkers} Active</span>
                      <span className="text-muted text-[10px]">{item.certificationRate} Certified</span>
                    </div>
                  </div>
                ))}
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
