"use client";

import * as React from "react";
import {
  Sparkles,
  ArrowRight,
  Send,
  Building,
  FileCheck2,
  HelpCircle,
  Eye,
} from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  GlassSurface,
  Input,
  Textarea,
  Select,
  Modal,
  Drawer,
  Skeleton,
  EmptyState,
  ErrorBoundaryUI,
} from "@/components/ui";

export function PrimitivesShowcase() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = React.useState(false);

  return (
    <section className="mx-auto mb-20 max-w-5xl space-y-12">
      {/* Section Header */}
      <div className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-glass-border bg-brand-glass px-4 py-1 font-mono text-xs uppercase tracking-wider text-brand-gold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Sprint 2 Foundation — UI Primitives & Experience States</span>
        </div>
        <h2 className="font-outfit text-2xl font-bold text-brand-text-primary sm:text-3xl">
          Executive Design System Showcase
        </h2>
        <p className="mt-2 font-jakarta text-sm text-brand-text-secondary">
          Reusable, accessible primitives adhering strictly to the Master Design System (MDS).
        </p>
      </div>

      {/* 1. Button Variants & Sizes */}
      <Card hoverable>
        <CardHeader>
          <CardTitle>1. Executive Buttons (≥ 44px Touch Targets)</CardTitle>
          <CardDescription>
            Tactile, high-converting luxury buttons with subtle gold glows and loading states.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="gold" icon={<Sparkles className="h-4 w-4" />}>
              Gold Primary
            </Button>
            <Button variant="outline" icon={<Building className="h-4 w-4" />}>
              Glass Outline
            </Button>
            <Button variant="glass" icon={<FileCheck2 className="h-4 w-4" />}>
              Obsidian Glass
            </Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button
              variant="gold"
              isLoading={isLoadingBtn}
              onClick={() => {
                setIsLoadingBtn(true);
                setTimeout(() => setIsLoadingBtn(false), 2000);
              }}
            >
              {isLoadingBtn ? "Processing..." : "Click For Loading State"}
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-brand-glass-border/20">
            <Button size="sm" variant="gold">Size SM</Button>
            <Button size="md" variant="gold">Size MD (44px)</Button>
            <Button size="lg" variant="gold">Size LG (50px)</Button>
            <Button
              variant="outline"
              size="md"
              icon={<ArrowRight className="h-4 w-4 rtl:rotate-180" />}
              iconPosition="end"
            >
              With End Icon
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 2. Form Controls */}
      <Card hoverable>
        <CardHeader>
          <CardTitle>2. Sovereign Form Controls (≥ 16px Anti-Zoom Inputs)</CardTitle>
          <CardDescription>
            Accessible input fields with real-time error states, helper copy, and logical RTL padding.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Company Name"
              placeholder="e.g. Apex Global Trading FZCO"
              helperText="Official registered entity trade name"
            />
            <Input
              label="Contact Phone"
              placeholder="+971 50 000 0000"
              error="Please enter a valid UAE mobile number"
            />
            <Select
              label="Formation Jurisdiction"
              placeholder="Select Jurisdiction"
              options={[
                { value: "mainland", label: "Dubai Mainland (DED License)" },
                { value: "dmcc", label: "DMCC Free Zone (JLT)" },
                { value: "ifza", label: "IFZA Dubai Silicon Oasis" },
              ]}
            />
            <Textarea
              label="Business Activity Overview"
              placeholder="Describe commercial or advisory scope..."
              rows={3}
              helperText="Brief summary for DED approval verification"
            />
          </div>
        </CardContent>
      </Card>

      {/* 3. Overlays (Modal & Drawer) */}
      <Card hoverable>
        <CardHeader>
          <CardTitle>3. Accessible Overlays (Modal & Drawer)</CardTitle>
          <CardDescription>
            Backdrop blur, ESC key dismiss, body scroll lock, and logical RTL sliding.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button
            variant="gold"
            icon={<Eye className="h-4 w-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Launch Modal Dialog
          </Button>

          <Button
            variant="glass"
            icon={<ArrowRight className="h-4 w-4 rtl:rotate-180" />}
            onClick={() => setIsDrawerOpen(true)}
          >
            Open Slide-Over Drawer
          </Button>
        </CardContent>
      </Card>

      {/* 4. Mandatory Experience States */}
      <div className="space-y-6">
        <h3 className="font-outfit text-xl font-bold text-brand-text-primary">
          4. Mandatory Experience States (Rule 02)
        </h3>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* State A: Shimmer Skeleton */}
          <GlassSurface glow className="p-6">
            <span className="mb-4 inline-block font-mono text-xs uppercase tracking-wider text-brand-gold">
              Loading State
            </span>
            <div className="space-y-4">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex gap-3 pt-2">
                <Skeleton variant="circular" className="h-10 w-10 shrink-0" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </div>
          </GlassSurface>

          {/* State B: Empty State */}
          <EmptyState
            title="No Documents"
            description="No trade license files have been uploaded for verification."
            action={
              <Button size="sm" variant="gold" icon={<Send className="h-3.5 w-3.5" />}>
                Upload MOA
              </Button>
            }
          />

          {/* State C: Error Boundary UI */}
          <ErrorBoundaryUI
            title="Calculation Offline"
            message="Could not contact Tasheel rate services."
            incidentRef="TSH_TIMEOUT_408"
            onRetry={() => alert("Retry action triggered")}
          />
        </div>
      </div>

      {/* Modal Instance */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Executive Advisory Inquiry"
        description="Schedule a confidential consultation with our Dubai licensing directors."
      >
        <div className="space-y-4 py-2">
          <Input label="Full Name" placeholder="Investor Name" />
          <Input label="Corporate Email" placeholder="investor@domain.com" />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gold" onClick={() => setIsModalOpen(false)}>
              Confirm Appointment
            </Button>
          </div>
        </div>
      </Modal>

      {/* Drawer Instance */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="UAE Company Formation Details"
        description="Comprehensive guidelines for Dubai Mainland commercial licenses."
      >
        <div className="space-y-6">
          <div className="rounded-2xl border border-brand-glass-border bg-brand-elevated/40 p-4">
            <h4 className="font-outfit text-sm font-semibold text-brand-gold">
              100% Foreign Ownership
            </h4>
            <p className="mt-1 font-jakarta text-xs text-brand-text-secondary leading-relaxed">
              Under UAE Federal Commercial Companies Law, expatriates can hold 100% ownership
              across thousands of commercial and professional activities.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-glass-border bg-brand-elevated/40 p-4">
            <h4 className="font-outfit text-sm font-semibold text-brand-gold">
              Golden Visa Eligibility
            </h4>
            <p className="mt-1 font-jakarta text-xs text-brand-text-secondary leading-relaxed">
              Investors with eligible commercial licenses qualify for 10-year residency Golden Visas
              covering family and dependents.
            </p>
          </div>

          <Button
            variant="gold"
            className="w-full"
            onClick={() => setIsDrawerOpen(false)}
          >
            Close Dossier
          </Button>
        </div>
      </Drawer>
    </section>
  );
}
