import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';

// This is the default Server Component for your landing page.
export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* The HeroSection is a client component, but it's fine to import it here.
        Next.js will ensure it's rendered correctly in the browser. 
      */}
      <Header />
      <HeroSection />

      {/* You can add your footer, features, and other components here */}
    </main>
  );
}
