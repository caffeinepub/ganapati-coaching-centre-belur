import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import FeesApp from '@/features/fees/FeesApp';

export default function FeesPage() {
  return (
    <div className="min-h-screen bg-mint">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/generated/ganesh-logo.dim_512x512.png" 
                alt="Ganesh logo" 
                className="h-10 w-10 object-contain"
              />
              <div className="text-2xl font-bold text-primary">
                Fee Management
              </div>
            </div>
            <Link to="/">
              <Button variant="outline" size="default">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <FeesApp />
      </main>
    </div>
  );
}
