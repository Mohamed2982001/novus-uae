import * as React from "react";
import { Navbar } from "@/components/layout/navbar";
import { StickySubnav } from "@/components/layout/sticky-subnav";
import { HeroSection } from "@/components/sections/hero-section";
import { AuthorityBadges } from "@/components/sections/authority-badges";
import { StatsStrip } from "@/components/sections/stats-strip";
import { ServicesBento } from "@/components/sections/services-bento";
import { SetupCalculator } from "@/components/sections/calculator";
import { LeadershipGrid } from "@/components/sections/leadership";
import { TestimonialsCarousel } from "@/components/sections/testimonials";
import { ConsultationForm } from "@/components/sections/consultation";
import { PrimitivesShowcase } from "@/components/showcase/primitives-showcase";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-brand-primary text-brand-text-primary overflow-x-clip w-full max-w-full">
      {/* Executive Sticky Navbar */}
      <Navbar />

      {/* Luxury Sticky Sub-Nav / Scrollspy Tabs Widget */}
      <StickySubnav />

      {/* Hero Section Above The Fold */}
      <HeroSection />

      {/* UAE Government Strategic Authority Liaison Badges */}
      <AuthorityBadges />

      {/* Animated Authority Proof Counters */}
      <StatsStrip />

      {/* Sprint 4 Core Showcase: 7 Pillars Services Bento Grid */}
      <ServicesBento />

      {/* Sprint 5 Core Engine: Interactive UAE Business Setup Cost Calculator */}
      <SetupCalculator />

      {/* Sprint 6 Trust Pillar 1: Executive Leadership & Sovereign Advisors */}
      <LeadershipGrid />

      {/* Sprint 6 Trust Pillar 2: Client Testimonials & Institutional Track Record */}
      <TestimonialsCarousel />

      {/* Sprint 6 Conversion Pillar 3: Hardened Executive Consultation Intake Form */}
      <ConsultationForm />

      {/* MDS Design Tokens & Verification Showcase */}
      <section id="about" className="container mx-auto max-w-[1152px] px-4 sm:px-6 py-16 border-t border-brand-glass-border/30">
        <PrimitivesShowcase />
      </section>

      {/* Corporate Legal & Telemetry Localized Footer */}
      <Footer />
    </div>
  );
}
