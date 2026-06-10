"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Award, ArrowLeft, ShieldCheck, User, Hammer } from "lucide-react";

const DISTRICT_BLOCKS = {
  "Katni": ["Murwara (Katni)", "Bahoriband", "Rithi", "Barwara", "Vijayraghavgarh", "Badwara"]
};

const BLOCK_VILLAGES = {
  "Murwara (Katni)": ["Kuthla", "Pipariya", "Jhanjhari", "Madhayn"],
  "Bahoriband": ["Sleemanabad", "Bahoriband", "Khamtara", "Chhapra"],
  "Rithi": ["Rithi", "Hardua", "Bari", "Bakhra"],
  "Barwara": ["Barwara", "Rupaund", "Nanhwara", "Banjari"],
  "Vijayraghavgarh": ["Bijeraghogarh", "Vijayraghavgarh", "Khalwara", "Kharhari"],
  "Badwara": ["Badwara", "Lakhakhera", "Kailwara", "Bujbuja"]
};

const SKILLS_LIST = [
  { id: "1", name: "Electrician", category: "Electrical & Energy" },
  { id: "2", name: "AC Repair & Installation", category: "Electrical & Energy" },
  { id: "3", name: "Plumber", category: "Construction & Plumbing" },
  { id: "4", name: "Mason (Bricklayer)", category: "Construction & Plumbing" },
  { id: "5", name: "Welder", category: "Industrial & Fabrication" },
  { id: "6", name: "Carpenter", category: "Woodworking & Furniture" },
  { id: "7", name: "Automobile Driver", category: "Logistics & Transport" },
  { id: "8", name: "Tractor Operator", category: "Logistics & Transport" },
  { id: "9", name: "Tailor / Seamstress", category: "Apparel & Fashion" },
  { id: "10", name: "General Home Cleaner", category: "Domestic Services" }
];

function RegisterForm() {
  const searchParams = useSearchParams();
  
  // Initialize role cleanly from URL param without useEffect
  const roleParam = searchParams.get("role");
  const initialRole = roleParam === "worker" || roleParam === "citizen" ? roleParam : "citizen";

  // Step tracker: 1 = Account Info, 2 = Skill Info (Workers only), 3 = Location Info (Workers only), 4 = Onboarding Completed
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"citizen" | "worker">(initialRole);
  
  // Basic info state
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Worker-specific info state
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experienceYears, setExperienceYears] = useState("0");
  const [district, setDistrict] = useState("Katni");
  const [block, setBlock] = useState("Murwara (Katni)");
  const [village, setVillage] = useState("Kuthla");

  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSkill = (skillName: string) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skillName));
    } else {
      setSelectedSkills([...selectedSkills, skillName]);
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (role === "worker") {
        setStep(2);
      } else {
        handleSubmit();
      }
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate user creation
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 1200);
  };

  return (
    <div className="w-full max-w-xl bg-white border border-hairline rounded-md p-8 airbnb-shadow">
      
      {/* Step Indicators */}
      {role === "worker" && step < 4 && (
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 1 ? "bg-ink text-white" : "bg-surface-strong text-muted"
          }`}>1</span>
          <span className="h-[1px] w-8 bg-hairline"></span>
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 2 ? "bg-ink text-white" : "bg-surface-strong text-muted"
          }`}>2</span>
          <span className="h-[1px] w-8 bg-hairline"></span>
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 3 ? "bg-ink text-white" : "bg-surface-strong text-muted"
          }`}>3</span>
        </div>
      )}

      {step === 1 && (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Create Your Account</h1>
            <p className="text-muted text-sm mt-2">Join the District Livelihood Exchange network</p>
          </div>

          {/* Role Select Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setRole("citizen")}
              className={`p-4 border rounded-md text-left transition-all cursor-pointer flex flex-col items-start ${
                role === "citizen" 
                  ? "border-primary bg-primary/5 text-ink" 
                  : "border-hairline hover:border-ink text-muted"
              }`}
            >
              <User className={`w-6 h-6 mb-2 ${role === "citizen" ? "text-primary" : "text-muted"}`} />
              <span className="font-bold text-sm">Citizen</span>
              <span className="text-[11px] text-muted-soft mt-1">Hiring local help or contractors</span>
            </button>

            <button
              type="button"
              onClick={() => setRole("worker")}
              className={`p-4 border rounded-md text-left transition-all cursor-pointer flex flex-col items-start ${
                role === "worker" 
                  ? "border-primary bg-primary/5 text-ink" 
                  : "border-hairline hover:border-ink text-muted"
              }`}
            >
              <Hammer className={`w-6 h-6 mb-2 ${role === "worker" ? "text-primary" : "text-muted"}`} />
              <span className="font-bold text-sm">Skilled Worker</span>
              <span className="text-[11px] text-muted-soft mt-1">Offering trade skills for employment</span>
            </button>
          </div>

          <form onSubmit={handleNextStep} className="space-y-4">
            <div className="relative flex flex-col">
              <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Full Name</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Patel"
                className="text-input-field"
              />
            </div>

            <div className="relative flex flex-col">
              <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Mobile Number</span>
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="text-input-field"
              />
            </div>

            <div className="relative flex flex-col">
              <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Email Address</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. ramesh@example.com"
                className="text-input-field"
              />
            </div>

            <div className="relative flex flex-col">
              <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="text-input-field"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="button-primary w-full h-12 rounded-md font-bold mt-4"
            >
              {role === "worker" ? "Next Step" : "Submit Registration"}
            </button>
          </form>
        </div>
      )}

      {step === 2 && role === "worker" && (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Skills & Experience</h1>
            <p className="text-muted text-sm mt-2">Select the skills you want to offer</p>
          </div>

          <form onSubmit={handleNextStep} className="space-y-6">
            <div>
              <span className="text-xs font-bold text-ink uppercase tracking-wider mb-2 block">Choose Primary Skills</span>
              <div className="grid grid-cols-2 gap-2">
                {SKILLS_LIST.map((skill) => {
                  const isSelected = selectedSkills.includes(skill.name);
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => handleToggleSkill(skill.name)}
                      className={`p-3 border rounded-md text-xs font-semibold text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? "border-primary bg-primary/5 text-primary" 
                          : "border-hairline hover:border-ink text-ink"
                      }`}
                    >
                      <span>{skill.name}</span>
                      {isSelected && <span className="text-lg">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative flex flex-col">
              <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Years of Experience</span>
              <input
                type="number"
                min="0"
                required
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                placeholder="e.g. 5"
                className="text-input-field"
              />
            </div>

            <button
              type="submit"
              className="button-primary w-full h-12 rounded-md font-bold"
            >
              Next: Location Info
            </button>
          </form>
        </div>
      )}

      {step === 3 && role === "worker" && (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Location Details</h1>
            <p className="text-muted text-sm mt-2">Set your local service area for geo-matching</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
            <div className="relative flex flex-col">
              <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">District</span>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="text-input-field appearance-none bg-canvas"
              >
                <option value="Katni">Katni (Madhya Pradesh)</option>
              </select>
            </div>

            <div className="relative flex flex-col">
              <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Block</span>
              <select
                value={block}
                onChange={(e) => {
                  const newBlock = e.target.value;
                  setBlock(newBlock);
                  const villages = BLOCK_VILLAGES[newBlock as keyof typeof BLOCK_VILLAGES] || [];
                  if (villages.length > 0) {
                    setVillage(villages[0]);
                  }
                }}
                className="text-input-field appearance-none bg-canvas"
              >
                {DISTRICT_BLOCKS["Katni"].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="relative flex flex-col">
              <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Village / Ward</span>
              <select
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="text-input-field appearance-none bg-canvas"
              >
                {(BLOCK_VILLAGES[block as keyof typeof BLOCK_VILLAGES] || []).map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            <div className="p-4 bg-surface-soft rounded-md border border-hairline flex items-start gap-3 mt-6">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-ink block">Physical Vetting Required</span>
                <span className="text-muted">
                  Your profile will be placed in a pending state. Please visit the Livelihood College in Katni with your certification docs to toggle your listing active.
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="button-primary w-full h-12 rounded-md font-bold mt-6"
            >
              {isLoading ? "Saving Profile..." : "Complete Registration"}
            </button>
          </form>
        </div>
      )}

      {step === 4 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Registration Successful!</h1>
          
          {role === "worker" ? (
            <div className="max-w-md mx-auto mt-4">
              <p className="text-muted text-sm">
                Thank you for joining DLWEP, <span className="font-bold text-ink">{name}</span>. 
                Your profile is now registered.
              </p>
              <div className="mt-8 bg-surface-soft border border-hairline p-6 rounded-md text-left text-xs space-y-2">
                <span className="font-bold text-ink block uppercase tracking-wider text-[10px]">What happens next?</span>
                <p className="text-muted"><span className="font-bold text-ink">1. Vetting:</span> Visit the Livelihood College campus with your trade certificate.</p>
                <p className="text-muted"><span className="font-bold text-ink">2. Activation:</span> College staff will verify your documents and mark your profile verified.</p>
                <p className="text-muted"><span className="font-bold text-ink">3. Matching:</span> Once active, you will receive service alerts on your dashboard.</p>
              </div>
            </div>
          ) : (
            <p className="text-muted text-sm mt-4 max-w-sm mx-auto">
              Your account has been created. You can now log in to search for skilled workers and request local service connections.
            </p>
          )}

          <div className="mt-8 flex flex-col gap-2">
            <Link href="/login" className="button-primary w-full h-12 rounded-md font-bold">
              Go to Login
            </Link>
            <Link href="/" className="text-xs text-muted hover:underline mt-2">
              Return to Landing Page
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas text-ink font-sans">
      
      {/* Header */}
      <header className="h-20 bg-canvas border-b border-hairline flex items-center justify-between px-6 md:px-12">
        <Link 
          href="/"
          className="flex items-center gap-1.5 text-muted hover:text-ink font-semibold text-[14px] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg text-primary">DLWEP</span>
        </div>
      </header>

      {/* Main wizard area */}
      <main className="flex-1 flex items-center justify-center py-12 px-6 bg-surface-soft">
        <Suspense fallback={
          <div className="w-full max-w-xl bg-white border border-hairline rounded-md p-8 airbnb-shadow text-center">
            <p className="text-muted text-sm">Loading onboarding form...</p>
          </div>
        }>
          <RegisterForm />
        </Suspense>
      </main>

      <footer className="py-6 border-t border-hairline text-center text-xs text-muted bg-canvas">
        © 2026 District Livelihood Workforce & Employment Exchange Platform
      </footer>

    </div>
  );
}
