import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Textarea,
  Select,
  Skeleton,
  EmptyState,
  ErrorBoundaryUI,
} from "@/components/ui";

describe("Sprint 2 UI Primitives & Experience States", () => {
  describe("Button Primitive", () => {
    it("renders with correct text and handles click events", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Book Consultation</Button>);

      const btn = screen.getByRole("button", { name: /Book Consultation/i });
      expect(btn).toBeInTheDocument();
      fireEvent.click(btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("applies gold variant classes and enforces >= 44px height", () => {
      render(<Button variant="gold" size="md">Executive Gold</Button>);
      const btn = screen.getByRole("button", { name: /Executive Gold/i });
      expect(btn.className).toContain("bg-brand-gold");
      expect(btn.className).toContain("min-h-[44px]");
    });

    it("displays loading spinner, disables clicks, and has aria-busy when isLoading is true", () => {
      const handleClick = vi.fn();
      render(
        <Button isLoading onClick={handleClick}>
          Submit Request
        </Button>
      );

      const btn = screen.getByRole("button");
      expect(btn).toHaveAttribute("aria-busy", "true");
      expect(btn).toBeDisabled();

      fireEvent.click(btn);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Card & GlassSurface Primitives", () => {
    it("renders card structure with compound header and content", () => {
      render(
        <Card hoverable data-testid="test-card">
          <CardHeader>
            <CardTitle>Mainland Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <p>100% Foreign Ownership in Dubai mainland.</p>
          </CardContent>
        </Card>
      );

      const card = screen.getByTestId("test-card");
      expect(card).toBeInTheDocument();
      expect(card.className).toContain("backdrop-blur-md");
      expect(screen.getByText("Mainland Setup")).toBeInTheDocument();
      expect(
        screen.getByText("100% Foreign Ownership in Dubai mainland.")
      ).toBeInTheDocument();
    });
  });

  describe("Form Controls (Input, Textarea, Select)", () => {
    it("renders input with label and helper text", () => {
      render(
        <Input
          label="Corporate Email"
          helperText="Enter your official business address"
          placeholder="investor@domain.ae"
        />
      );

      expect(screen.getByLabelText("Corporate Email")).toBeInTheDocument();
      expect(
        screen.getByText("Enter your official business address")
      ).toBeInTheDocument();
    });

    it("displays error state and message when error prop is provided", () => {
      render(
        <Input
          label="Phone Number"
          error="Valid UAE phone number required (+971)"
        />
      );

      const input = screen.getByLabelText("Phone Number");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(
        screen.getByText("Valid UAE phone number required (+971)")
      ).toBeInTheDocument();
      expect(input.className).toContain("border-brand-error");
    });

    it("renders textarea with custom rows and accessible label", () => {
      render(
        <Textarea label="Project Scope" placeholder="Describe requirements..." />
      );
      expect(screen.getByLabelText("Project Scope")).toBeInTheDocument();
    });

    it("renders select with options and handles selection change", () => {
      const handleChange = vi.fn();
      render(
        <Select
          label="Target Jurisdiction"
          onChange={handleChange}
          options={[
            { value: "mainland", label: "Dubai Mainland (DED)" },
            { value: "freezone", label: "Free Zone (DMCC/IFZA)" },
          ]}
        />
      );

      const select = screen.getByLabelText("Target Jurisdiction");
      expect(select).toBeInTheDocument();
      fireEvent.change(select, { target: { value: "freezone" } });
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("Mandatory Experience States (Skeleton, EmptyState, ErrorBoundaryUI)", () => {
    it("Skeleton applies shimmer animation and variant styles", () => {
      render(<Skeleton data-testid="shimmer-loader" variant="circular" />);
      const skeleton = screen.getByTestId("shimmer-loader");
      expect(skeleton.className).toContain("skeleton-shimmer");
      expect(skeleton.className).toContain("rounded-full");
    });

    it("EmptyState renders icon, title, description, and triggers CTA action", () => {
      const handleAction = vi.fn();
      render(
        <EmptyState
          title="No Visas Pending"
          description="You currently have no active visa processing files."
          action={<Button onClick={handleAction}>Initiate Golden Visa</Button>}
        />
      );

      expect(screen.getByText("No Visas Pending")).toBeInTheDocument();
      expect(
        screen.getByText("You currently have no active visa processing files.")
      ).toBeInTheDocument();

      const ctaBtn = screen.getByRole("button", { name: /Initiate Golden Visa/i });
      fireEvent.click(ctaBtn);
      expect(handleAction).toHaveBeenCalledTimes(1);
    });

    it("ErrorBoundaryUI renders title, message, incident ref, and invokes retry", () => {
      const handleRetry = vi.fn();
      render(
        <ErrorBoundaryUI
          title="Rate Engine Offline"
          message="Could not retrieve live DED government fees."
          incidentRef="DED_API_503"
          onRetry={handleRetry}
        />
      );

      expect(screen.getByText("Rate Engine Offline")).toBeInTheDocument();
      expect(
        screen.getByText("Could not retrieve live DED government fees.")
      ).toBeInTheDocument();
      expect(screen.getByText("DED_API_503")).toBeInTheDocument();

      const retryBtn = screen.getByRole("button", { name: /Retry Action/i });
      fireEvent.click(retryBtn);
      expect(handleRetry).toHaveBeenCalledTimes(1);
    });
  });
});
