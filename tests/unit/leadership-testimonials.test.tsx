import { describe, it, expect, vi } from "vitest";
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LeadershipGrid } from "@/components/sections/leadership";
import { TestimonialsCarousel } from "@/components/sections/testimonials";
import { ConsultationForm } from "@/components/sections/consultation";

describe("Sprint 6 UI Components: Leadership, Testimonials & Lead Capture", () => {
  it("renders the LeadershipGrid with all 6 executive leaders including Founder spotlight", () => {
    render(<LeadershipGrid />);

    // Check section heading
    expect(screen.getByText(/Executive Sovereign Advisors/i)).toBeInTheDocument();

    // Check all 6 leaders are rendered
    expect(screen.getByText("Mohammed Abueida")).toBeInTheDocument();
    expect(screen.getByText("Monir Abueida")).toBeInTheDocument();
    expect(screen.getByText("Mostafa Hamza")).toBeInTheDocument();
    expect(screen.getByText("Ahmed AlFatih")).toBeInTheDocument();
    expect(screen.getByText("Alaa Salem")).toBeInTheDocument();
    expect(screen.getByText("Ali Hassan")).toBeInTheDocument();

    // Check credentials & experience badges
    expect(screen.getAllByText(/Years UAE Track Record/i).length).toBe(6);
  });

  it("renders the TestimonialsCarousel with verified client quotes", () => {
    render(<TestimonialsCarousel />);

    expect(
      screen.getByText(/Verified by Founders/i)
    ).toBeInTheDocument();

    // Check at least one verified quote is visible
    expect(screen.getAllByText("Alexandre Dubois").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Verified Setup/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText("5.0").length).toBeGreaterThan(0);
  });

  it("renders the ConsultationForm with mandatory security fields", () => {
    render(<ConsultationForm />);

    // Header & Subtitle
    expect(screen.getByText(/Book a Sovereign/i)).toBeInTheDocument();

    // Form inputs
    expect(screen.getByLabelText(/Full Legal Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Corporate Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile \/ WhatsApp Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Target Jurisdiction/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Target Execution Timeline/i)).toBeInTheDocument();

    // Submit button
    expect(
      screen.getByRole("button", {
        name: /Submit Confidential Consultation Request/i,
      })
    ).toBeInTheDocument();

    // Honeypot field exists and is hidden
    const honeypot = screen.getByLabelText(/Leave blank/i);
    expect(honeypot).toBeInTheDocument();
    expect(honeypot.parentElement).toHaveClass("hidden");
  });
});
