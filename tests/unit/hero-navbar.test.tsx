import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { StatsStrip } from "@/components/sections/stats-strip";
import { AuthorityBadges } from "@/components/sections/authority-badges";
import { Monogram } from "@/components/ui/monogram";
import { AnimatedCounter } from "@/components/ui/animated-counter";

describe("Sprint 3: Executive Header, Hero & Counters", () => {
  describe("Brand Monogram", () => {
    it("renders the Novus monogram SVG and brand name", () => {
      render(<Monogram size="md" />);
      expect(screen.getByText(/Novus/i)).toBeInTheDocument();
      expect(screen.getByText(/UAE Govt & Business Setup/i)).toBeInTheDocument();
    });
  });

  describe("Executive Navbar", () => {
    it("mounts navigation links and CTA button", () => {
      render(<Navbar />);
      expect(screen.getByText("Core Services")).toBeInTheDocument();
      expect(screen.getByText("Cost Calculator")).toBeInTheDocument();
      expect(screen.getByText("Leadership")).toBeInTheDocument();
      const ctaButtons = screen.getAllByRole("button", { name: /Book Consultation/i });
      expect(ctaButtons.length).toBeGreaterThanOrEqual(1);
    });

    it("renders language switcher toggle", () => {
      render(<Navbar />);
      const langBtns = screen.getAllByRole("button", { name: /Toggle Language/i });
      expect(langBtns.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Hero Section", () => {
    it("renders the main executive headline and subtitle", () => {
      render(<HeroSection />);
      expect(
        screen.getByText(/Seamless Business Setup & Elite/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Government Relations/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Licensed UAE Facilitator & Government Liaison Partner/i)
      ).toBeInTheDocument();
    });

    it("renders dual high-conversion CTAs", () => {
      render(<HeroSection />);
      expect(
        screen.getByRole("button", { name: /Calculate Setup Cost/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Explore 7 Core Services/i })
      ).toBeInTheDocument();
    });
  });

  describe("Animated Counter Component", () => {
    it("renders target label and suffix", () => {
      render(
        <AnimatedCounter
          value={800}
          suffix="+"
          label="Companies Formed"
          sublabel="Mainland & Free Zones"
        />
      );
      expect(screen.getByText("Companies Formed")).toBeInTheDocument();
      expect(screen.getByText("Mainland & Free Zones")).toBeInTheDocument();
    });
  });

  describe("Authority Badges & Stats Strip", () => {
    it("renders key UAE government authority partners", () => {
      render(<AuthorityBadges />);
      expect(screen.getByText("DET / DED")).toBeInTheDocument();
      expect(screen.getByText("MOHRE")).toBeInTheDocument();
      expect(screen.getByText("ICP")).toBeInTheDocument();
      expect(screen.getByText("MOFA")).toBeInTheDocument();
    });

    it("renders StatsStrip with all core proof metrics", () => {
      render(<StatsStrip />);
      expect(screen.getByText(/Visas & Residencies Processed/i)).toBeInTheDocument();
      expect(screen.getByText(/Companies Formed/i)).toBeInTheDocument();
      expect(screen.getByText(/Years UAE Expertise/i)).toBeInTheDocument();
      expect(screen.getByText(/Regulatory Compliance/i)).toBeInTheDocument();
    });
  });
});
