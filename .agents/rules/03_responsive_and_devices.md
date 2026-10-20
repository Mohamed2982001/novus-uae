# Agent Rule: Responsive Design & Dedicated Multi-Device Strategy

## 1. Core Philosophy: Recomposition over Shrinking
- Responsive design is the **recomposition of visual hierarchy**, NOT simply scaling down desktop containers with `width: 100%`.
- Visual hierarchy, information density, and thumb/finger ergonomics must adapt intelligently across every screen form factor.

## 2. Dedicated Tablet & iPad Form Factor (768px – 1023px)
- **First-Class Specialized Interface:**
  - Tablets and iPads must NEVER receive a stretched mobile layout or a shrunken, cramped desktop layout.
  - Implement dedicated dual-column / master-detail layouts (e.g., Services list on the left, interactive detail drawer/panel on the right).
  - Calculator should render a split-screen experience (Inputs on Start side, Live Price Receipt card fixed on End side).
  - Support both Portrait (768×1024) and Landscape (1024×768 / 1180×820) orientations seamlessly.

## 3. Form Factor Breakpoints & Touch Target Rules
1. **Mobile (< 768px):**
   - Single-column linear flow.
   - Fixed Bottom Action Bar or Floating Action Button (FAB) for instant WhatsApp / Call action.
   - Interactive touch targets must be at least **44×44px** minimum.
   - Form inputs with minimum 16px font size to prevent iOS Safari auto-zoom.
2. **Tablet (768px – 1023px):**
   - Dedicated master-detail and 2-column Bento layouts.
   - Optimized touch-friendly sliders and selectable cards.
   - Sticky summary panels for cost estimation.
3. **Desktop (1024px – 1439px):**
   - Multi-column Bento Grid (3-column layout for services).
   - Standard container max-width: **1152px** (`container.lg`).
   - Rich hover states, subtle micro-glows, and interactive modals.
4. **Ultra-Wide Screens (≥ 1440px):**
   - Wide container max-width: **1440px** (`container.xl`).
   - Line length strictly protected to preserve executive typographic legibility (never allow text to stretch full width).

## 4. Interaction Parity
- Never rely exclusively on mouse `:hover` states for critical functionality. Every hover tooltip or menu must have an equivalent tap/click trigger for touchscreens.
