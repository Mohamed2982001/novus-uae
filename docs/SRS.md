# 📋 Novus UAE — Software Requirements Specification (SRS.md)

## 1. Introduction
### 1.1 Purpose
This document specifies the software requirements for the official corporate web application of **Novus UAE** (`novusuae.co`). It defines the functional, non-functional, and interface requirements guiding the development and deployment.

### 1.2 Scope
The scope covers a bilingual (English / Arabic RTL), high-performance, executive web application built with Next.js 15, TypeScript, and Tailwind CSS, featuring an interactive cost calculator, Bento Grid service architecture, and lead capture pipelines.

---

## 2. Functional Requirements (FR)

### FR-01: Decoupled Brand Token Architecture
- The system must consume visual styling exclusively from `src/config/brand.config.ts` and `src/styles/theme-tokens.css`.
- Changing logo and brand colors in this single configuration must propagate site-wide without refactoring component code.

### FR-02: Bilingual & RTL Layout Engine
- The system must support English (LTR) as primary international language and Arabic (RTL) as primary regional language.
- Toggling language must flip layout direction dynamically via HTML `dir="rtl"` attribute and switch typography between `Outfit` (EN) and `Cairo`/`Alexandria` (AR).

### FR-03: Animated Metrics & Stat Counters
- The hero section must display animated counters triggering upon viewport intersection:
  - 10,000+ Visas Processed
  - 800+ Companies Incorporated
  - 10+ Years UAE Experience
  - 100% Regulatory Compliance

### FR-04: Interactive UAE Business Setup Cost Calculator
- Step 1: Select Jurisdiction (`Mainland DED`, `Free Zone DMCC/IFZA`, `Offshore`).
- Step 2: Select Business Activity (`Commercial / Trading`, `Professional / Consultancy`, `Industrial`).
- Step 3: Select Visa Allocation (`0`, `1-2`, `3-5`, `5+ Investor / Golden Visa`).
- Step 4: Display real-time itemized estimate in AED / USD with estimated timeline (3–5 business days).
- Step 5: Direct export of the calculated estimate to WhatsApp or inquiry form with pre-filled inputs.

### FR-05: 7 Core Services Bento Grid
- Present the 7 services in an asymmetric responsive Bento Grid:
  1. Business Setup & Company Formation
  2. PRO & Corporate GRO Services
  3. Golden Visa & Elite Residency
  4. Certified Legal Translation (MOJ)
  5. Government Liaison & Approvals
  6. Document Attestation & Legalization
  7. Relocation Concierge & Banking
- Clicking any card must open an interactive detail drawer or modal with comprehensive service breakdown.

### FR-06: Consultation Booking & Lead Capture
- Fields: Full Name, Email, Phone/WhatsApp, Desired Service, Message.
- Strict validation via client and server-side Zod schemas.
- Anti-spam protection via hidden honeypot field and timestamp verification.

### FR-07: Floating Smart WhatsApp Concierge
- Fixed floating action button on bottom corner.
- Generates pre-formatted WhatsApp URLs referencing the active service or calculator selection.

### FR-08: Executive Leadership Profile Cards
- Display leadership credentials for Monir Abueida (MD), Mostafa Hamza (Head of Government Services), and Alaa Salem (Head of Finance).

### FR-09: Experience States (Loading, Empty, Error, Success)
- All interactive components and data views must implement skeletons for loading, graceful empty states with CTAs, and contextual error states with recovery actions.

### FR-10: Marketing & Telemetry Integration
- Embed Google Tag Manager (GTM) script safely.
- Dispatch dataLayer custom events: `calculator_complete`, `consultation_submit`, `whatsapp_click`.

---

## 3. Non-Functional Requirements (NFR)

### NFR-01: Performance & Web Vitals
- Google Lighthouse Performance score ≥ 90 across mobile and desktop.
- Cumulative Layout Shift (CLS) < 0.1; Largest Contentful Paint (LCP) < 2.0s.

### NFR-02: Accessibility (a11y)
- Compliance with WCAG 2.1 Level AA standards.
- Minimum interactive touch target of 44×44px on all devices.
- High contrast ratios (≥ 4.5:1 for body text, ≥ 3.0:1 for large text).

### NFR-03: Code Standards & Maintainability
- Strict 500-line ceiling per file.
- TypeScript strict mode with zero `any` declarations.
- Modular component composition with unidirectional dependency flow.

### NFR-04: Security & Privacy
- Zero sensitive credentials committed to git.
- Full protection against XSS, CSRF, and injection attacks.
- Strict Content Security Policy (CSP) and secure HTTP response headers.
