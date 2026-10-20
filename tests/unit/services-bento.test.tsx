import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ServicesBento } from "@/components/sections/services-bento";
import { SERVICES_DATA } from "@/data/services.data";

describe("Sprint 4: The 7 Core Services Bento Grid & Interactive Drawers", () => {
  it("renders all 7 core service pillars in the Bento Grid", () => {
    render(<ServicesBento />);

    expect(SERVICES_DATA.length).toBe(7);

    for (const service of SERVICES_DATA) {
      expect(
        screen.getByRole("button", { name: new RegExp(service.titleEn, "i") })
      ).toBeInTheDocument();
      expect(screen.getByText(service.titleAr)).toBeInTheDocument();
    }
  });

  it("renders section header and authority badge", () => {
    render(<ServicesBento />);
    expect(
      screen.getByText(/Sovereign Excellence & Corporate Facilitation/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/7 Pillars of Strategic UAE Business/i)
    ).toBeInTheDocument();
  });

  it("opens interactive detail drawer with deliverables upon card click", () => {
    render(<ServicesBento />);

    // Click on "Golden Visa & Elite Residency"
    const goldenVisaCard = screen.getByRole("button", {
      name: /Golden Visa & Elite Residency/i,
    });
    fireEvent.click(goldenVisaCard);

    // Verify drawer opened with full deliverables
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const deliverables = screen.getAllByText(
      /10-Year Golden Visa Entry Permit & In-Country Status Change/i
    );
    expect(deliverables.length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText(/Operational & Legal Overview/i)
    ).toBeInTheDocument();
  });

  it("formats the WhatsApp action link with the active service parameter", () => {
    render(<ServicesBento />);

    // Click on "Business Setup & Company Formation"
    const businessSetupCard = screen.getByRole("button", {
      name: /Business Setup & Company Formation/i,
    });
    fireEvent.click(businessSetupCard);

    const whatsappBtn = screen.getByRole("link", {
      name: /Inquire via WhatsApp/i,
    });
    expect(whatsappBtn).toBeInTheDocument();
    expect(whatsappBtn).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/971500000000")
    );
    expect(whatsappBtn).toHaveAttribute(
      "href",
      expect.stringContaining("business-setup")
    );
  });

  it("applies responsive Bento Grid layout classes conforming to MDS", () => {
    const { container } = render(<ServicesBento />);
    const gridContainer = container.querySelector(".grid");

    expect(gridContainer).not.toBeNull();
    // Mobile 1-col, dedicated Tablet 2-col, Desktop 3-col
    expect(gridContainer?.className).toContain("grid-cols-1");
    expect(gridContainer?.className).toContain("md:grid-cols-2");
    expect(gridContainer?.className).toContain("lg:grid-cols-3");
  });
});
