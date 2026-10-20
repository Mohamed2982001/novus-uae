# Agent Rule: Code Standards & File Size Thresholds

## 1. File Size Guideline (500-Line Decomposition Threshold)
- **500 Lines as a Hard Architectural Threshold:** No source code file should exceed 500 lines of code. This serves as a mandatory trigger for modular decomposition.
- **Proactive Refactoring:** When any component, hook, controller, or utility approaches ~400 lines, immediately evaluate and extract sub-components, custom hooks, or utility functions.
- **Conciseness & Precision:** Achieve the target functionality with the minimum necessary lines of code without sacrificing readability or type safety.
- **Zero Dead Code:** Strictly prohibit unused imports, commented-out code blocks, and orphaned functions. Clean git history replaces commented code.

## 2. Token Discipline & Zero Arbitrary Values
- **Zero Raw Visual Values:** Never hardcode raw hex colors, raw pixel margins/paddings, arbitrary border-radii, or arbitrary z-indices in components.
- **MDS Token Hierarchy:**
  1. Component Token (`component.button.primary.background`)
  2. Semantic Token (`color.action.primary`, `color.surface.default`, `var(--brand-accent)`)
  3. Primitive Token (`space.16`, `radius.12`, `color.navy.900`)
- **Single Source of Truth:** All brand values, typography, and palette definitions must be drawn from `src/config/brand.config.ts` and `src/styles/theme-tokens.css`.

## 3. Clean Architecture & Structure
- **Feature-First / Domain-Driven Modular Layout:**
  - `src/app/`: Next.js App Router pages and route handlers.
  - `src/components/ui/`: Reusable primitive and core components (Button, Card, Input, Modal, Drawer, Badge).
  - `src/components/sections/`: High-level landing sections (Hero, Services, Calculator, Leadership, Testimonials, Contact).
  - `src/components/layout/`: Global layout components (Navbar, Footer, MobileNav, FloatingWhatsApp).
  - `src/config/`: Decoupled Brand Configuration (`brand.config.ts`), Site metadata, and Nav links.
  - `src/lib/`: Utilities, analytics, validators, and math calculators.
  - `src/types/`: Strict TypeScript interfaces and schemas.
- **Unidirectional Layer Dependencies:** Primitives and UI base components must NEVER depend on specific business sections.
- **Strict Null Safety & Typing:** TypeScript strict mode enabled at all times. The use of `any` is strictly prohibited. Avoid forced non-null assertions (`!`) unless statically proven and documented.
