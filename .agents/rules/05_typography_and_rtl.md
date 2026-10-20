# Agent Rule: Typography, Multilingual & RTL First-Class Standards

## 1. Typography Hierarchy & Font Matrix
- **Arabic Typography:**
  - Primary Font: **Cairo** (Google Fonts) — default global font per architectural standard, or **Alexandria** for ultra-luxury corporate branding.
  - Weights: Regular 400, Medium 500, SemiBold 600, Bold 700.
  - Line-Height (Leading): Arabic typography naturally requires an additional `+0.15` leading relative to Latin equivalents to prevent clipping of diacritics and vertical rhythm distortion.
- **Latin Typography:**
  - Primary English Font: **Outfit** or **Plus Jakarta Sans** for premier Dubai executive aesthetic.
- **Monospace & Numerical Telemetry:**
  - Font: **JetBrains Mono** for pricing calculations, licensing reference numbers, and currency counters (`AED`, `USD`).

## 2. RTL Native First-Class Invariants
- **Strict Logical CSS Properties:**
  - Strictly prohibit hardcoding `left`, `right`, `margin-left`, `margin-right`, `padding-left`, or `padding-right`.
  - Always use Tailwind logical utility classes: `ms-*` (margin-inline-start), `me-*` (margin-inline-end), `ps-*` (padding-inline-start), `pe-*` (padding-inline-end), `start-*`, `end-*`.
- **Directional Icon Mirroring:**
  - Interactive navigation controls (back/next arrows, chevrons, flow arrows) must mirror automatically in RTL via `rtl:rotate-180`.
  - Neutral / Non-directional icons (phone, WhatsApp, checkmarks, search, email, shield) must NEVER mirror.

## 3. Text Wrapping & Legibility Invariants
- **Zero Ellipsis Truncation on Descriptive Text:**
  - Strictly forbid `text-ellipsis`, `truncate`, or `overflow-hidden` on explanatory paragraphs, service descriptions, values, or testimonial copy.
  - Allow text to wrap naturally (`softWrap: true`, `whitespace-normal`) across 2+ lines with proper leading.
  - Layouts must be tested with Arabic strings which run 20%–30% longer than English equivalents.
