import { Phone } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/generated/ganesh-logo.dim_512x512.png" 
                alt="Ganesh logo" 
                className="h-10 w-10 object-contain"
              />
              <div className="text-2xl font-bold text-primary">
                Ganapati Coaching Centre
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/fees">
                <Button variant="outline" size="default">
                  Fee Management
                </Button>
              </Link>
              <a
                href="tel:6290060952"
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
              >
                <Phone className="h-4 w-4" />
                Call Now: 6290060952
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b-4 border-primary bg-mint py-16 text-center">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-4 inline-block rounded-full bg-white px-6 py-2 font-bold shadow-sm">
            WBBSE | CBSE | ICSE
          </div>
          <h1 className="mb-3 text-4xl font-bold text-slate md:text-5xl">
            Achieve Academic Excellence
          </h1>
          <p className="mb-5 text-2xl font-bold text-primary md:text-3xl">
            ADMISSION OPEN
          </p>
          <p className="mx-auto max-w-2xl text-lg text-slate/80">
            Providing quality education with a focus on fundamentals and creative learning.
          </p>
        </div>
      </section>

      {/* Our Classes Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl">
            Our Classes
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border-t-4 border-primary bg-white p-8 shadow-md transition-shadow hover:shadow-lg">
              <h3 className="mb-3 text-2xl font-bold text-slate">Class V to X</h3>
              <p className="mb-3 font-bold text-slate/70">All Subjects</p>
              <p className="text-slate/80">
                Comprehensive guidance for all major subjects to build a strong base for board exams.
              </p>
            </div>
            <div className="rounded-xl border-t-4 border-primary bg-white p-8 shadow-md transition-shadow hover:shadow-lg">
              <h3 className="mb-3 text-2xl font-bold text-slate">Class XI to XII</h3>
              <p className="mb-3 font-bold text-slate/70">Arts & Science</p>
              <p className="text-slate/80">
                Specialized coaching for higher secondary streams with expert guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-mint py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl">
            Why Choose Us?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-5">
              <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-sm">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  ✓
                </span>
                <div>
                  <strong className="mb-1 block text-lg text-slate">Focus on Textbooks</strong>
                  <p className="text-slate/80">
                    We give maximum importance to board textbooks to ensure concepts are clear.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-sm">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  ✓
                </span>
                <div>
                  <strong className="mb-1 block text-lg text-slate">Daily Homework & Routine</strong>
                  <p className="text-slate/80">
                    Daily homework assigned and checked. Weekly class and exam schedules are provided a week in advance.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-sm">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  ✓
                </span>
                <div>
                  <strong className="mb-1 block text-lg text-slate">Creative Study Notes</strong>
                  <p className="text-slate/80">
                    We provide subject-wise hand notes prepared using creative methods for better retention.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-sm">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  ✓
                </span>
                <div>
                  <strong className="mb-1 block text-lg text-slate">Regular Assessments</strong>
                  <p className="text-slate/80">
                    Weekly exams every Saturday. Full model tests are conducted before Half-Yearly and Annual exams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Section */}
      <section className="bg-primary py-12 text-center text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-3 text-2xl font-semibold">Meet Your Mentor</h2>
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">Ayan Da</h1>
          <p className="text-lg text-white/90">Dedicated to guiding students toward success.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate py-12 text-center text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-2xl font-bold">Contact Us</h2>
          <p className="mb-2 text-3xl font-bold text-primary">
            <Phone className="mb-1 inline h-7 w-7" /> 6290060952
          </p>
          <p className="mb-1 text-lg">
            <strong>Location:</strong> Belur Bazar
          </p>
          <p className="mb-6 text-white/80">(Near Belur Girl's Primary School)</p>
          <p className="text-sm text-white/60">© 2026 Ganapati Coaching Centre. Built with ❤️ using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">caffeine.ai</a></p>
        </div>
      </footer>
    </div>
  );
}
