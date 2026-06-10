"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Award, ArrowLeft, ShieldCheck, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"citizen" | "worker" | "staff">("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      if (email === "admin@dlwep.gov" || role === "staff") {
        router.push("/admin/verify");
      } else {
        router.push("/");
      }
    }, 1200);
  };

  const handleDemoCredentials = () => {
    if (role === "staff") {
      setEmail("admin@dlwep.gov");
      setPassword("admin123");
    } else if (role === "worker") {
      setEmail("worker@dlwep.org");
      setPassword("worker123");
    } else {
      setEmail("citizen@gmail.com");
      setPassword("citizen123");
    }
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

      {/* Main Form Center */}
      <main className="flex-1 flex items-center justify-center py-16 px-6 bg-surface-soft">
        <div className="w-full max-w-md bg-white border border-hairline rounded-md p-8 airbnb-shadow">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-ink font-sans">
              Log In to DLWEP
            </h1>
            <p className="text-muted text-sm mt-2">
              Select your role to access your account dashboard
            </p>
          </div>

          {/* Role selection tab bar */}
          <div className="grid grid-cols-3 bg-surface-strong p-1 rounded-full border border-hairline mb-8">
            {(["citizen", "worker", "staff"] as const).map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  setErrorMessage("");
                }}
                className={`py-2 text-xs font-bold rounded-full capitalize transition-all cursor-pointer ${
                  role === r 
                    ? "bg-white text-ink shadow-sm" 
                    : "text-muted hover:text-ink"
                }`}
              >
                {r === "staff" ? "College Staff" : r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Input 1: Email */}
            <div className="relative flex flex-col">
              <span className="absolute top-2 left-3 text-[10px] font-bold text-muted uppercase tracking-wider">Email Address</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@example.com"
                className="text-input-field"
              />
              <Mail className="absolute right-4 top-[18px] w-5 h-5 text-muted-soft" />
            </div>

            {/* Input 2: Password */}
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
              <Lock className="absolute right-4 top-[18px] w-5 h-5 text-muted-soft" />
            </div>

            {errorMessage && (
              <div className="text-xs font-semibold text-primary-error-text mt-1">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="button-primary w-full h-12 rounded-md font-bold mt-2"
            >
              {isLoading ? "Logging in..." : "Continue"}
            </button>
          </form>

          {/* Demo Credentials Helper */}
          <div className="mt-6 border-t border-hairline pt-4 text-center">
            <button
              onClick={handleDemoCredentials}
              className="text-xs text-primary font-bold hover:underline"
            >
              Fill Demo Credentials for {role === "staff" ? "College Staff" : role}
            </button>
          </div>

          <div className="mt-8 text-center text-xs text-muted">
            {role === "worker" ? (
              <p>
                Not registered yet?{" "}
                <Link href="/register?role=worker" className="text-ink font-bold hover:underline">
                  Onboard here
                </Link>
              </p>
            ) : role === "citizen" ? (
              <p>
                Need an account?{" "}
                <Link href="/register?role=citizen" className="text-ink font-bold hover:underline">
                  Sign up
                </Link>
              </p>
            ) : (
              <p className="flex items-center justify-center gap-1 text-[11px] text-muted-soft">
                <ShieldCheck className="w-3.5 h-3.5" /> Staff profiles are managed by Livelihood College admins.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-hairline text-center text-xs text-muted bg-canvas">
        © 2026 District Livelihood Workforce & Employment Exchange Platform
      </footer>

    </div>
  );
}
