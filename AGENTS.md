# 🏛️ Novus UAE — Project Master Agent Rules (AGENTS.md)

Welcome, AI Agent. You are operating inside the **Novus UAE** repository (`D:\Work\Dev\Novus`), building the premier corporate digital presence for **Novus Government & Business Setup Services** (`novusuae.co`).

---

## 📌 Non-Negotiable Operational Directives

### 1. Master Design System (MDS) Compliance
- This project is governed by the **Master Design System (MDS)** located at `D:\Work\Dev\Master Design System`.
- Visual DNA: **Luxury Dubai Executive Corporate & Sovereign Advisory**.
- Color Palette: Midnight Navy (`#0A1128`) & Slate (`#0F172A`) Canvas, Champagne Imperial Gold (`#C5A059`, `#D4AF37`) Accents, Translucent Obsidian Glass surfaces, and Pearl White (`#F8FAFC`) reading surfaces.
- **The 60-Second Brand Swapper:** Visual styling is 100% decoupled in `src/config/brand.config.ts` and `src/styles/theme-tokens.css`. Never hardcode raw hex values or arbitrary visual metrics in components.

### 2. Multi-Device & Responsive Rules
- Dedicated **Tablet / iPad (768px – 1023px)** Interface: Tablets must receive specialized split-screen / 2-column Bento layouts — never stretched mobile or squeezed desktop layouts.
- Mobile (< 768px): Single-column flow with minimum 44×44px touch targets.
- Desktop (1024px – 1439px): Max container width `1152px` (`container.lg`).
- Wide Screen (≥ 1440px): Max container width `1440px` (`container.xl`).

### 3. Typography & Multilingual RTL Standards
- Primary Font for Arabic: **Cairo** (Global Rule Default) or **Alexandria**.
- Primary Font for English: **Outfit** & **Plus Jakarta Sans**.
- Monospace / Financial Numbers: **JetBrains Mono**.
- RTL First-Class: Exclusively use logical CSS properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`). Directional navigation icons must mirror via `rtl:rotate-180`.
- Zero Ellipsis on descriptive text: Let text wrap smoothly (`softWrap: true`).

### 4. Mandatory Experience States
Every screen, container, and form must support:
- `Loading State`: Contextual shimmer skeletons.
- `Empty State`: Helpful explanation + actionable CTA button.
- `Error State`: Friendly message + contextual recovery action (Retry / WhatsApp fallback).
- `Success State`: Instant visual assurance modal/toast.

### 5. Architectural Cleanliness & 500-Line Threshold
- No file may exceed 500 lines of code. Extract sub-components, custom hooks, or utility modules when nearing 400 lines.
- Zero dead code or commented-out blocks.
- Strict TypeScript typing with zero `any`.

### 6. Security & Client Mistrust
- Directly adheres to `D:\Work\Dev\Security Prompts.txt` and `docs/SECURITY_BLUEPRINT.md`.
- Never trust client inputs: Server-side Zod validation on every API route and Server Action.
- Anti-spam honeypot fields and submission velocity rate limits.
- Zero secrets committed to git. `docs/CREDENTIALS.md` is strictly quarantined.

### 7. Self-Updating Documentation Protocol
Whenever you complete any task:
1. Mark the completed task in `docs/ROADMAP_AND_SPRINTS.md` as `[x]` with completion timestamp `[Completed: YYYY-MM-DD HH:mm]`.
2. Append the milestone to `docs/PROJECT_HISTORY.md` with timestamp and summary.
3. Update `docs/AI_MEMORY.md` if any architectural decision was made.

---

## 🗂️ Rule Directory Reference
Detailed individual rule files are located in `.agents/rules/`:
- [.agents/rules/01_code_standards.md](file:///d:/Work/Dev/Novus/.agents/rules/01_code_standards.md)
- [.agents/rules/02_experience_states.md](file:///d:/Work/Dev/Novus/.agents/rules/02_experience_states.md)
- [.agents/rules/03_responsive_and_devices.md](file:///d:/Work/Dev/Novus/.agents/rules/03_responsive_and_devices.md)
- [.agents/rules/04_security_rules.md](file:///d:/Work/Dev/Novus/.agents/rules/04_security_rules.md)
- [.agents/rules/05_typography_and_rtl.md](file:///d:/Work/Dev/Novus/.agents/rules/05_typography_and_rtl.md)
- [.agents/rules/06_ai_agent_workflow.md](file:///d:/Work/Dev/Novus/.agents/rules/06_ai_agent_workflow.md)
