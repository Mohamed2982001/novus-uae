# 🧠 Novus UAE — Central AI Memory & Context Buffer (AI_MEMORY.md)

> **Authority Notice:** This document is the living working memory of the Novus UAE project. Any AI Agent engaging with this repository MUST read this file upon session initialization to acquire full project context, architectural decisions, and current milestone state.

---

## 1. Project DNA & Executive Overview
- **Brand / Entity Name:** **Novus** (corporate domain: `novusuae.co`, formerly referenced as Avani Services UAE / `avaniuae.com`).
- **Domain & Market:** Elite UAE Government Relations (PRO/GRO), Corporate Licensing, Business Setup (Mainland, Free Zones, Offshore), Investor Golden Visa (10 Years), Legal Translation, and Concierge Relocation across Dubai & Abu Dhabi.
- **Target Audience:** High-Net-Worth Individuals (HNWI), Foreign Investors, International Tech Startups, and Private Family Offices.
- **Client Strategic Requirement:**
  - Initial Phase: Ultra-luxurious, high-converting Landing Page / Executive Showcase (MVP Demo) allowing immediate commercial operation, marketing, and client acquisition without full portal enterprise costs upfront.
  - Branding Status: Client is currently finalizing brand identity and logo.
  - **Decoupled 60-Second Brand Swapper:** Identity is 100% tokenized via `src/config/brand.config.ts` and `src/styles/theme-tokens.css`. Swapping to final logo and colors will take under 60 seconds.

---

## 2. Key Personnel & Leadership Team
- **Monir Abueida:** Managing Director — Strategic leader focused on expansion, client relationships, and team direction.
- **Mostafa Hamza:** Head of Government Services — Leads UAE licensing, regulatory affairs, government liaison (DED, MOHRE, Amer, Tasheel, ICP), and public sector strategies.
- **Alaa Salem:** Head of Finance & Administration — Oversees finance, banking coordination, and compliance operations.

---

## 3. Technology Stack & Architectural Standards
- **Framework:** Next.js 15 (App Router) + TypeScript (Strict Mode).
- **Design System:** Governed by **Master Design System (MDS)** (`D:\Work\Dev\Master Design System`).
  - Archetype: **Luxury Dubai Executive Corporate**.
  - Canvas: Midnight Navy (`#0A1128`) & Deep Slate (`#0F172A`).
  - Accent: Imperial Champagne Gold (`#C5A059`, hover `#D4AF37`, glow `rgba(197, 160, 89, 0.25)`).
  - Surface: Obsidian Glass (`rgba(15, 23, 42, 0.70)` with 1px gold border).
  - Fonts:
    - English: `Outfit` & `Plus Jakarta Sans`.
    - Arabic: `Cairo` (Default Global Rule) / `Alexandria`.
    - Telemetry/Numbers: `JetBrains Mono`.
- **Motion & Icons:** `framer-motion` (smooth scroll reveals) + `lucide-react`.
- **Forms & Validation:** `react-hook-form` + `zod` for lead capture and calculation forms.
- **Security:** Rate limiting, honeypot spam protection, zero hardcoded secrets, strict server-side validation.
- **SEO & Marketing:** Semantic HTML5, Schema.org JSON-LD (Organization, LocalBusiness), GTM (Google Tag Manager) dataLayer events.

---

## 4. Smart Conversation Filter & Memory Ingestion Protocol
Whenever the developer (Mohamed Khalid) provides new instructions, feedback, or business details:
1. **Filter Signal from Noise:** Extract actionable requirements, constraints, API keys, credentials, or architectural decisions.
2. **Immediate Update:** Record the extracted item into the respective section below and append a brief entry to Section 5 (Working Memory Buffer).
3. **Keep Files Compact:** Never allow any single documentation file or code file to become unreadable. Keep entries structured and concise.

---

## 5. Working Memory Buffer (Session Log)
- **2026-10-07 16:45:** Project initialized. Created comprehensive documentation suite (`PRD`, `SRS`, `SDD`, `USER_DATA_FLOW`, `BUSINESS_LOGIC`, `DESIGN_SYSTEM`, `SECURITY_BLUEPRINT`, `SEO_AND_MARKETING`, `CREDENTIALS`, `PROJECT_HISTORY`, `FUTURE_UPDATES`, `ROADMAP_AND_SPRINTS`).
- **2026-10-07 16:50:** Verified leadership profiles from assets (Monir Abueida, Mostafa Hamza, Alaa Salem).
- **2026-10-07 16:55:** Codified `.agents/rules/` suite (01 Code Standards, 02 Experience States, 03 Responsive & Tablet, 04 Security, 05 Typography & RTL, 06 Agent Workflow).
- **2026-10-07 17:41:** Executed Sprint 1. Next.js 15, MDS tokens, Google Fonts, Vitest, brand config, and experience states verified with zero errors. All 5 unit tests passed. Production build succeeded.
- **2026-10-07 17:53:** Executed Sprint 2. Built reusable MDS UI primitives (`Button`, `Card`, `GlassSurface`), form controls (`Input`, `Textarea`, `Select`), overlays (`Modal`, `Drawer`), and mandatory experience states (`Skeleton`, `EmptyState`, `ErrorBoundaryUI`). Added 11 unit tests (16/16 total passing) and interactive demo showcase. Build verified.
- **2026-10-07 18:06:** Executed Sprint 3. Implemented geometric vector `Monogram`, sticky glassmorphic `Navbar` with mobile `Drawer` and language switcher, Dubai executive `HeroSection` with dual CTAs, `StatsStrip` with 4 animated counters, and `AuthorityBadges` strip for UAE government bodies. Added 8 unit tests (24/24 total passing). Production build verified.
- **2026-10-07 18:23:** Executed Sprint 4. Structured `src/data/services.data.ts` for the 7 official services, built `ServiceCard` with zero text truncation (`softWrap: true`), interactive `ServiceDrawer` with deliverables and WhatsApp integration, and `ServicesBento` responsive grid (1-col Mobile, 2-col dedicated Tablet, 3-col Desktop). Added 5 unit tests (29/29 total passing). Production build verified.
- **2026-10-07 22:51:** Executed Sprint 5. Engineered UAE Business Setup Cost Calculator (`#calculator`). Implemented deterministic math engine (`types.ts`, `constants.ts`, `engine.ts`) with AED/USD exchange rates, 4-step parameter selector (`CalculatorSteps`), sticky live receipt (`LiveReceiptCard`), 1-click WhatsApp quote generator, and responsive container (`SetupCalculator`). Added 7 unit tests (36/36 total passing). Production build verified.
- **2026-10-07 23:47:** Executed Sprint 6. Built institutional trust and lead capture foundation: `LeadershipGrid` with 3 founding advisors (`leadership.data.ts`, `leadership-card.tsx`), `TestimonialsCarousel` with verified clients (`testimonials.data.ts`, `testimonial-card.tsx`), hardened `ConsultationForm` (`#consultation`) with Zod validation, invisible honeypot, velocity anti-bot check, and luxury reference ID success modal. Wired all CTAs across Navbar, Drawers, and Calculator. Added 11 unit tests (47/47 passing). Production build verified.
- **2026-10-08 00:20:** Executed Sprint 7. Full bilingual platform transformation (EN ↔ AR): `TranslationDictionary` (`en.ts`, `ar.ts`), `<LanguageProvider>` & `useLanguage()` with fallback state for tests, Alexandria font binding for RTL in `globals.css`, localized all components (Navbar, Hero, Authorities, Stats, Services, Calculator, Leadership, Testimonials, Consultation, and extracted Footer), mirrored directional icons with `rtl:rotate-180`, 100% logical CSS properties. Added 7 unit tests (54/54 passing). Production build verified.
- **2026-10-08 16:45:** Sovereign Architectural Enhancements & Mobile Drawer Fixes:
  1. Purged Cairo font completely from `fonts.ts`, `globals.css`, and `tailwind.config.ts`; enforced `Alexandria` for Arabic typography.
  2. Solved mobile header stacking context collision by rendering `<Drawer>` and `<Modal>` via `createPortal(..., document.body)` with hydration guards.
  3. Streamlined Language Switcher to render only the `Globe` icon without text labels.
  4. Built Luxury Sticky Scrollspy Sub-Nav (`sticky-subnav.tsx`) with Obsidian glass, active Champagne gold pill, and horizontal touch chevrons.
  5. Expanded Leadership to 6 members with Mohammed Abueida (Founder & CEO) spotlight and 5-member executive grid.
- **2026-10-08 17:25:** Sticky Sub-Nav Stacking Context & Scroll-Lock Resolution:
  1. Root cause 1 (Scroll Yanking): `currentBtn.scrollIntoView()` within `StickySubnav` caused document-level window scroll snapping to top; replaced with container-only horizontal scroll (`container.scrollTo`).
  2. Root cause 2 (Broken Sticky): `overflow-hidden` on `<main>` in `layout.tsx` broke `position: sticky` across Chromium/WebKit; replaced with `overflow-x: clip` in `layout.tsx`, `page.tsx`, and `globals.css`.
  3. Engineered deterministic `requestAnimationFrame` + BoundingClientRect scrollspy tracking all 7 sections bidirectionally.
- **2026-10-17 18:20:** Official Brand Identity & Native Vector Logo Integration:
  1. Extracted exact vector paths and CMYK/RGB color codes from `docs/identity/Novus Color palette.pdf`.
  2. Applied official color palette: Gold Accent `#b6965e`, Deep Canvas Navy `#101e32`, Pearl Ivory `#f4eee3`, Light Palette `#1a1a18` & `#faf6ed`.
  3. Generated native SVGs in `public/assets/brand/`: `novus-icon-dark.svg`, `novus-icon-light.svg`, `novus-logo-en.svg`, `novus-logo-ar.svg`, `novus-logo-h-en.svg`.
  4. Updated `src/config/brand.config.ts`, `src/styles/theme-tokens.css`, `src/components/ui/monogram.tsx`.
  5. Purged remaining `font-cairo` instances to ensure full adoption of `Tajawal` font.
- **2026-10-17 19:40:** Official Favicon & PWA App Icons:
  1. Generated `favicon.svg` (512x512) and `icon.svg` with dark navy squircle (`#101e32`) and official Novus emblem.
  2. Generated multi-size `favicon.ico` (16, 32, 48, 64) and high-DPI `apple-touch-icon.png` (180x180), `favicon-32x32.png`, `favicon-16x16.png`, and `android-chrome-*.png`.
  3. Created `site.webmanifest` and updated `src/app/layout.tsx` metadata with complete `icons` mapping and `themeColor: "#101e32"`.
  4. Verified 71/71 tests passing, production build prerendered icon routes, HTTP 200 OK verified across all icon endpoints.
- **2026-10-20 16:19:** GitHub Repository Setup & Push:
  1. Connected remote origin `https://github.com/Mohamed2982001/novus-uae.git`.
  2. Verified `.gitignore` quarantine on `docs/CREDENTIALS.md`, `.vercel`, `scratch/`.
  3. Pushed clean `main` branch to GitHub for instant Vercel CI/CD deployment.







