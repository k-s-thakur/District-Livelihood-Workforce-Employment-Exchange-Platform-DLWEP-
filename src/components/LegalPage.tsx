import Link from "next/link";
import { Award, ArrowLeft, AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  title: string;
  description: string;
  effectiveDate: string;
  sections: LegalSection[];
};

export default function LegalPage({
  title,
  description,
  effectiveDate,
  sections,
}: LegalPageProps) {
  return (
    <div className="min-h-screen bg-surface-soft text-ink">
      <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/95 px-6 py-4 backdrop-blur md:px-12">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
          <Link href="/" className="flex items-center gap-2" aria-label="DLWEP home">
            <Award className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="font-bold text-primary">DLWEP</span>
          </Link>
        </div>
      </header>

      <main className="px-6 py-10 md:px-12 md:py-16">
        <article className="mx-auto max-w-3xl rounded-md border border-hairline bg-canvas p-6 shadow-sm md:p-10">
          <header className="border-b border-hairline pb-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              Legal information
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
            <p className="mt-4 leading-7 text-muted">{description}</p>
            <p className="mt-4 text-sm font-semibold">Effective date: {effectiveDate}</p>
          </header>

          <aside className="my-8 flex gap-3 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>
              <strong>Draft notice:</strong> The platform operator must confirm its legal
              name, postal address, grievance contact, retention schedule, and dispute
              jurisdiction before production launch. This document should receive legal
              review.
            </p>
          </aside>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title} className="scroll-mt-24">
                <h2 className="text-xl font-bold tracking-tight">{section.title}</h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-body [&_a]:font-semibold [&_a]:text-blue-600 [&_a]:underline [&_li]:ml-5 [&_li]:pl-1 [&_ul]:list-disc">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>

      <footer className="border-t border-hairline bg-canvas px-6 py-8 text-center text-xs text-muted">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span>© 2026 District Livelihood Workforce & Employment Exchange Platform</span>
          <Link href="/privacy" className="font-semibold hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="font-semibold hover:underline">
            Terms & Conditions
          </Link>
        </div>
      </footer>
    </div>
  );
}
