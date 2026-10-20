# 🏗️ Novus UAE — Software Design Document (SDD.md)

## 1. System Architecture Overview
The Novus corporate web platform is architected as a modern, decoupled, server-rendered Next.js 15 application utilizing the App Router. The system strictly separates concerns into presentation, configuration, business domain logic, and telemetry.

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  Next.js 15 App Router | React Server Components | Client   │
│  Tailwind CSS v3/v4 | CSS Custom Properties (MDS Tokens)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    Domain & Business Layer                  │
│  UAE Setup Calculator Engine | Zod Validation Schemas        │
│  i18n Locale Provider (EN ↔ AR) | Lead Dispatch Actions     │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    Configuration & Tokens                   │
│  brand.config.ts (Decoupled 60-second rebrand engine)       │
│  theme-tokens.css (MDS Semantic Token Variables)            │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    External Integrations                    │
│  WhatsApp Web API | Google Tag Manager | Resend / SMTP Email│
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Directory Structure & Modular Decomposition
```
d:\Work\Dev\Novus\
├── .agents/
│   └── rules/                  # Autonomous AI Agent Governance Rules
│       ├── 01_code_standards.md
│       ├── 02_experience_states.md
│       ├── 03_responsive_and_devices.md
│       ├── 04_security_rules.md
│       ├── 05_typography_and_rtl.md
│       └── 06_ai_agent_workflow.md
├── docs/                       # Project Documentation Suite
│   ├── AI_MEMORY.md            # Working memory buffer for agents
│   ├── CREDENTIALS.md          # Encrypted/git-ignored credentials
│   ├── PROJECT_HISTORY.md      # Chronological ledger
│   ├── FUTURE_UPDATES.md       # Product backlog
│   ├── PRD.md                  # Product Requirements
│   ├── SRS.md                  # Software Requirements
│   ├── SDD.md                  # This Design Document
│   ├── USER_DATA_FLOW.md       # Mermaid flowcharts
│   ├── BUSINESS_LOGIC.md       # Pricing algorithms
│   ├── DESIGN_SYSTEM.md        # MDS Token Dictionary
│   ├── SECURITY_BLUEPRINT.md   # Threat modeling & audit
│   ├── SEO_AND_MARKETING.md    # Local SEO & GTM setup
│   └── ROADMAP_AND_SPRINTS.md  # Sprints & atomic tasks
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # Dynamic localization root (en, ar)
│   │   │   ├── page.tsx        # Executive Landing Page
│   │   │   ├── layout.tsx      # Root html, fonts, metadata
│   │   │   ├── loading.tsx     # Skeleton boundary
│   │   │   ├── error.tsx       # Error boundary
│   │   │   └── not-found.tsx   # Custom 404 page
│   │   └── api/                # Secure route handlers
│   │       ├── contact/route.ts
│   │       └── health/route.ts
│   ├── components/
│   │   ├── ui/                 # Atomic UI primitives (Button, Card, Modal, Input)
│   │   ├── layout/             # Header, Footer, MobileMenu, WhatsAppButton
│   │   └── sections/           # Hero, Calculator, ServicesBento, Leadership, etc.
│   ├── config/
│   │   ├── brand.config.ts     # Single source of truth for brand identity
│   │   └── navigation.ts       # Menus and anchor targets
│   ├── lib/
│   │   ├── calculator.ts       # UAE Setup business logic & cost algorithms
│   │   ├── gtm.ts              # Google Tag Manager events
│   │   └── validation.ts       # Zod schemas for contact & calculation
│   ├── styles/
│   │   ├── globals.css         # Global Tailwind directives
│   │   └── theme-tokens.css    # MDS CSS Custom Properties
│   └── types/                  # TypeScript interface definitions
└── tests/                      # TDD Unit & Integration test suites
```

---

## 3. Component Hierarchy & Patterns
- **Executive Header (`Navbar`):** Uses glassmorphism with backdrop-filter blur. Includes the Decoupled Brand Monogram, Navigation Links, Language Toggle, and Contact CTA.
- **Hero Section:** Integrates dynamic mesh background, live stat counter (`AnimatedCounter`), and dual conversion paths.
- **Bento Grid (`ServicesBento`):** Implements an asymmetric responsive grid (3 columns on desktop, dedicated 2-column layout on iPad, 1-column on mobile) with interactive modal drawers.
- **Calculator (`SetupCalculator`):** Multi-step reactive form with live receipt preview.
- **Leadership Section (`LeadershipGrid`):** Executive profile cards featuring Monir Abueida, Mostafa Hamza, and Alaa Salem.

---

## 4. Test-Driven Development (TDD) Strategy
- **Framework:** `Vitest` + `@testing-library/react`.
- **Test Suites:**
  1. `tests/unit/calculator.test.ts`: Verifies exact mathematical outputs for all Mainland, Free Zone, and Visa permutations.
  2. `tests/unit/brand-config.test.ts`: Verifies brand tokens resolve correctly.
  3. `tests/components/contact-form.test.ts`: Verifies validation rules, error states, and honeypot rejection.
  4. `tests/components/experience-states.test.ts`: Verifies loading skeletons and error boundaries render as expected.
