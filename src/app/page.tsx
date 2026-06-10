"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  ShieldCheck, 
  Star, 
  Award, 
  CheckCircle, 
  Building2, 
  Users
} from "lucide-react";

// Mock data to ensure the UI is rich and fully styled out of the box
const MOCK_CATEGORIES = [
  { id: "all", name: "All Services", icon: Briefcase },
  { id: "electrician", name: "Electrician", icon: CheckCircle },
  { id: "plumber", name: "Plumber", icon: CheckCircle },
  { id: "driver", name: "Driver", icon: CheckCircle },
  { id: "welder", name: "Welder", icon: CheckCircle },
  { id: "tailor", name: "Tailor", icon: CheckCircle },
];

const MOCK_WORKERS = [
  {
    id: "w1",
    name: "Rajesh Kumar",
    primary_skill: "Electrician",
    experience_years: 5,
    rating_average: 4.9,
    jobs_completed: 42,
    village: "Pipariya",
    block: "Katni",
    is_verified: true,
    photo_url: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "w2",
    name: "Sunita Bai",
    primary_skill: "Tailor / Seamstress",
    experience_years: 8,
    rating_average: 4.8,
    jobs_completed: 67,
    village: "Kuthla",
    block: "Murwara",
    is_verified: true,
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "w3",
    name: "Amit Patel",
    primary_skill: "Plumber",
    experience_years: 4,
    rating_average: 4.75,
    jobs_completed: 23,
    village: "Sleemanabad",
    block: "Bahoriband",
    is_verified: true,
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60"
  },
  {
    id: "w4",
    name: "Ramesh Yadav",
    primary_skill: "Automobile Driver",
    experience_years: 10,
    rating_average: 4.95,
    jobs_completed: 89,
    village: "Bijeraghogarh",
    block: "Vijayraghavgarh",
    is_verified: true,
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60"
  }
];

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchSkill, setSearchSkill] = useState("");
  const [searchBlock, setSearchBlock] = useState("");

  const filteredWorkers = MOCK_WORKERS.filter(worker => {
    const matchesCategory = selectedCategory === "all" || worker.primary_skill.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSkill = !searchSkill || worker.primary_skill.toLowerCase().includes(searchSkill.toLowerCase());
    const matchesBlock = !searchBlock || worker.block.toLowerCase().includes(searchBlock.toLowerCase());
    return matchesCategory && matchesSkill && matchesBlock;
  });

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-ink">
      
      {/* 1. Header (top-nav) */}
      <header className="sticky top-0 z-50 h-20 bg-canvas border-b border-hairline flex items-center justify-between px-6 md:px-12 airbnb-shadow">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Award className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl tracking-tight text-primary font-sans">
            DLWEP
          </span>
        </div>

        {/* Product navigation tabs */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-ink font-semibold text-[15px] border-b-2 border-ink pb-2 mt-2">
            Find Workers
          </Link>
          <Link href="/requests/new" className="text-muted hover:text-ink font-semibold text-[15px] pb-2 mt-2 transition-colors">
            Request Labor
          </Link>
          <Link href="/register" className="text-muted hover:text-ink font-semibold text-[15px] pb-2 mt-2 transition-colors">
            Become a Worker
          </Link>
          <Link href="/admin/verify" className="text-muted hover:text-ink font-semibold text-[15px] pb-2 mt-2 transition-colors flex items-center gap-1">
            College Admin <span className="bg-surface-soft border border-hairline text-ink text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Staff</span>
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="button-secondary h-10 px-4 text-sm font-semibold rounded-full border border-hairline hover:border-ink">
            Log In
          </Link>
          <Link href="/register" className="button-primary h-10 px-5 text-sm font-semibold rounded-full bg-primary hover:bg-primary-active text-white">
            Register
          </Link>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative bg-canvas py-16 px-6 md:px-12 flex flex-col items-center text-center">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-ink mb-4 font-sans leading-tight">
            Connecting Certified Skills with Local Livelihoods
          </h1>
          <p className="text-muted text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Discover verified blue-collar workers certified by the District Livelihood College. 
            Direct connection, zero middle-men fees.
          </p>
        </div>

        {/* Pill-shaped global search bar */}
        <div className="w-full max-w-3xl h-auto md:h-16 bg-white border border-hairline rounded-3xl md:rounded-full p-2 flex flex-col md:flex-row items-center airbnb-shadow gap-2 md:gap-0">
          
          {/* Segment 1: Skill */}
          <div className="w-full md:w-5/12 px-6 py-2 md:py-0 border-b md:border-b-0 md:border-r border-hairline flex flex-col items-start text-left">
            <span className="text-[11px] font-bold text-ink uppercase tracking-wider">What Skill?</span>
            <input 
              type="text" 
              placeholder="e.g. Electrician, Driver" 
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
              className="w-full bg-transparent outline-none text-[14px] text-ink placeholder-muted-soft mt-1"
            />
          </div>

          {/* Segment 2: Block Location */}
          <div className="w-full md:w-5/12 px-6 py-2 md:py-0 flex flex-col items-start text-left">
            <span className="text-[11px] font-bold text-ink uppercase tracking-wider">Location / Block</span>
            <input 
              type="text" 
              placeholder="e.g. Katni, Murwara" 
              value={searchBlock}
              onChange={(e) => setSearchBlock(e.target.value)}
              className="w-full bg-transparent outline-none text-[14px] text-ink placeholder-muted-soft mt-1"
            />
          </div>

          {/* Search Button Orb */}
          <button className="w-full md:w-12 h-12 md:h-12 bg-primary hover:bg-primary-active rounded-full flex items-center justify-center text-white transition-colors cursor-pointer shrink-0">
            <Search className="w-5 h-5" />
            <span className="md:hidden ml-2 font-semibold text-sm">Search</span>
          </button>
        </div>
      </section>

      {/* 3. Category Filter Strip */}
      <section className="bg-canvas border-b border-hairline-soft py-4 px-6 md:px-12 overflow-x-auto flex gap-4 md:justify-center items-center scrollbar-none">
        {MOCK_CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive 
                  ? "bg-ink text-white border-ink" 
                  : "bg-surface-soft text-muted border-hairline hover:border-muted"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {category.name}
            </button>
          );
        })}
      </section>

      {/* 4. Main Marketplace Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-ink">
              Discover Available Manpower
            </h2>
            <p className="text-muted text-xs md:text-sm mt-1">
              Showing {filteredWorkers.length} skilled workers in Katni District
            </p>
          </div>
          <span className="text-xs font-semibold text-primary bg-primary-disabled/20 px-3 py-1 rounded-full">
            ● Direct Hire
          </span>
        </div>

        {/* Worker Cards Grid */}
        {filteredWorkers.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-hairline rounded-2xl bg-surface-soft">
            <Users className="w-12 h-12 text-muted-soft mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ink">No workers found</h3>
            <p className="text-muted text-sm mt-1">Try expanding your search query or choosing another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredWorkers.map((worker) => (
              <div 
                key={worker.id}
                className="group border border-hairline rounded-md overflow-hidden bg-surface-card hover:shadow-lg transition-all duration-200"
              >
                {/* Photo Plate */}
                <div className="relative aspect-square w-full bg-surface-strong overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={worker.photo_url} 
                    alt={worker.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                  />
                  {/* Floating Certified Badge */}
                  <span className="absolute top-3 left-3 bg-white text-ink text-[11px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1 border border-hairline-soft">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary fill-primary-disabled/30" />
                    Livelihood Certified
                  </span>
                </div>

                {/* Info block */}
                <div className="p-4 flex flex-col">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-[16px] text-ink group-hover:text-primary transition-colors">
                      {worker.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[13px] font-semibold text-ink">
                      <Star className="w-3.5 h-3.5 fill-ink" />
                      {worker.rating_average}
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-primary mt-1">
                    {worker.primary_skill}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-muted mt-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{worker.village}, {worker.block} Block</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-hairline-soft mt-4 pt-3 text-xs">
                    <span className="text-muted font-medium">
                      Exp: {worker.experience_years} Years
                    </span>
                    <span className="text-ink font-bold">
                      {worker.jobs_completed} Jobs Completed
                    </span>
                  </div>

                  {/* Hire Button */}
                  <Link 
                    href="/login" 
                    className="button-primary w-full h-10 rounded-full mt-4 text-xs font-bold"
                  >
                    View & Connect
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 5. Statistics Panel */}
      <section className="bg-surface-soft border-y border-hairline py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center airbnb-shadow mb-3">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl md:text-3xl font-extrabold text-ink">1,200+</span>
            <span className="text-muted text-sm mt-1">Verified Skilled Workers</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center airbnb-shadow mb-3">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl md:text-3xl font-extrabold text-ink">4,500+</span>
            <span className="text-muted text-sm mt-1">Jobs Completed Locally</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center airbnb-shadow mb-3">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl md:text-3xl font-extrabold text-ink">85%</span>
            <span className="text-muted text-sm mt-1">Placement & Conversion Rate</span>
          </div>
        </div>
      </section>

      {/* 6. Footer (footer-light) */}
      <footer className="bg-canvas border-t border-hairline py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-primary" />
          <span className="text-xs text-muted font-medium">
            © 2026 District Livelihood Workforce & Employment Exchange Platform
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-muted font-semibold">
          <Link href="/login" className="hover:underline">Staff Login</Link>
          <Link href="/admin/verify" className="hover:underline">Verification Dashboard</Link>
          <Link href="/" className="hover:underline">Privacy Policy</Link>
          <Link href="/" className="hover:underline">Terms & Conditions</Link>
        </div>
      </footer>

    </div>
  );
}
