import { describe, it, expect, vi } from "vitest";
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { StickySubnav } from "@/components/layout/sticky-subnav";
import { LanguageProvider } from "@/context/language-context";

describe("StickySubnav Luxury Scrollspy Widget", () => {
  it("renders all 7 executive section tabs with their icons and labels", () => {
    render(
      <LanguageProvider>
        <StickySubnav />
      </LanguageProvider>
    );

    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Authorities")).toBeInTheDocument();
    expect(screen.getByText("7 Core Services")).toBeInTheDocument();
    expect(screen.getByText("Cost Calculator")).toBeInTheDocument();
    expect(screen.getByText("Leadership")).toBeInTheDocument();
    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("Consultation")).toBeInTheDocument();
  });

  it("handles tab click by triggering smooth window.scrollTo with header offset", () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;
    const fakeSection = document.createElement("div");
    fakeSection.id = "calculator";
    fakeSection.getBoundingClientRect = () => ({ top: 500, bottom: 900 } as DOMRect);
    document.body.appendChild(fakeSection);

    render(
      <LanguageProvider>
        <StickySubnav />
      </LanguageProvider>
    );

    const calcTab = screen.getByText("Cost Calculator");
    fireEvent.click(calcTab);

    expect(scrollToMock).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: "smooth" })
    );

    document.body.removeChild(fakeSection);
  });

  it("renders left and right scroll navigation chevrons for mobile devices", () => {
    render(
      <LanguageProvider>
        <StickySubnav />
      </LanguageProvider>
    );

    expect(screen.getByLabelText("Scroll Tabs Left")).toBeInTheDocument();
    expect(screen.getByLabelText("Scroll Tabs Right")).toBeInTheDocument();
  });
});
