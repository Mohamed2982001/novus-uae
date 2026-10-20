# 💎 Novus UAE — Master Design System Specification (DESIGN_SYSTEM.md)

> **Governing Meta-System:** Master Design System (MDS) — `D:\Work\Dev\Master Design System`.
> **Archetype:** **Luxury Dubai Executive Corporate & Sovereign Advisory**.

---

## 1. Visual DNA & Aesthetic Strategy
The UAE corporate services and sovereign advisory market demands an aesthetic that communicates institutional stability, discreet luxury, and effortless efficiency. Novus blends deep midnight canvas depths with warm champagne gold accents and razor-sharp executive typography.

---

## 2. Decoupled Brand Configuration (The 60-Second Rebrander)
Because the client is finalizing the corporate logo and exact corporate color identity, all visual design variables are strictly decoupled into two isolated layers:
1. `src/config/brand.config.ts` (Application-level configuration)
2. `src/styles/theme-tokens.css` (MDS CSS Custom Properties mapping)

When the client delivers final branding, altering `brand.config.ts` updates every button, badge, gradient, border, and glow across the entire platform in under 60 seconds without touching a single component.

---

## 3. Color Token Architecture

```css
:root {
  /* Canvas & Foundations */
  --brand-canvas-primary: #0A1128;       /* Deep Obsidian Navy */
  --brand-canvas-secondary: #0F172A;     /* Rich Midnight Slate */
  --brand-canvas-elevated: #162038;      /* Raised Surface Layer */

  /* Luxury Accents */
  --brand-accent-gold: #C5A059;          /* Imperial Champagne Gold */
  --brand-accent-gold-hover: #D4AF37;    /* Radiant Gold */
  --brand-accent-gold-muted: rgba(197, 160, 89, 0.15);
  --brand-accent-gold-glow: rgba(197, 160, 89, 0.25);

  /* Glassmorphism Surfaces */
  --brand-surface-glass: rgba(15, 23, 42, 0.70);
  --brand-surface-glass-border: rgba(197, 160, 89, 0.20);
  --brand-surface-glass-hover: rgba(22, 32, 56, 0.85);

  /* Typography & Readability */
  --brand-text-primary: #F8FAFC;         /* Crisp Pearl White */
  --brand-text-secondary: #CBD5E1;       /* Silver Mist */
  --brand-text-muted: #94A3B8;           /* Platinum Slate */

  /* Status & Semantics */
  --brand-success: #10B981;              /* Emirates Emerald */
  --brand-warning: #F59E0B;              /* Amber Horizon */
  --brand-error: #EF4444;                /* Crimson Guard */
}
```

---

## 4. Typographic Matrix & Scale
- **Arabic Typography:** **Cairo** (Default per Global Rule) / **Alexandria** (Ultra-luxury geometric option).
- **English Typography:** **Outfit** (Primary Heading) / **Plus Jakarta Sans** (Body text).
- **Numerical & Financial Telemetry:** **JetBrains Mono** (For pricing rates, currency tags, and timelines).

| Token | Size | Line Height (EN) | Line Height (AR) | Usage |
|:---|:---:|:---:|:---:|:---|
| `text.display` | 48px / 3rem | 1.15 | 1.30 | Hero headline |
| `text.h1` | 36px / 2.25rem | 1.20 | 1.35 | Section headers |
| `text.h2` | 28px / 1.75rem | 1.25 | 1.40 | Card titles & Bento blocks |
| `text.h3` | 20px / 1.25rem | 1.30 | 1.45 | Drawer / Modal subtitles |
| `text.body` | 16px / 1rem | 1.50 | 1.65 | Explanatory copy (softWrap true) |
| `text.caption`| 13px / 0.8125rem | 1.40 | 1.55 | Badges & timestamps |

---

## 5. Layout & Spacing Principles
- **Standard Container Max-Width:** `1152px` (`container.lg`) per MDS rules.
- **Wide Container Max-Width:** `1440px` (`container.xl`) on ultra-wide screens.
- **Bento Grid Architecture:**
  - Desktop: 3-column asymmetric layout with featured hero cards spanning 2 columns.
  - Tablet / iPad: 2-column dedicated split layout.
  - Mobile: Single-column linear cards with 44px minimum touch targets.
