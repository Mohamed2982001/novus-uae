# Agent Rule: Mandatory Experience States (Loading, Empty, Error, & Recovery)

## 1. Mandatory State Coverage for Every View & Screen
Every interactive component, data container, form, modal, and drawer MUST explicitly implement and support the following core experience states:

### A. Loading State (Skeletons & Shimmers)
- Use content-matching shimmer loaders / skeleton placeholders that mirror the actual geometry of the component.
- Strictly avoid generic blank screens or full-page blocking spinners where skeleton layouts can be rendered.
- Animated shimmers must use brand-harmonized hues (`rgba(197, 160, 89, 0.08)` to `rgba(255, 255, 255, 0.05)`).

### B. Empty State (Descriptive & Actionable)
- When lists, search queries, filter results, or lead history return zero items, display a purposeful Empty State.
- **Empty State Requirements:**
  - Clear visual indicator or elegant icon.
  - Informative title explaining what is missing.
  - Subtitle guiding the user on how to populate data.
  - Primary Call-to-Action (CTA) button (e.g., "Reset Filters", "Request Custom Package", "Contact Our Advisor").
- Never leave blank whitespace or abrupt truncation.

### C. Error State (Contextual & Non-Technical)
- When a network request, calculation, or form submission fails, render an elegant Error State.
- Explain the issue in clear, customer-friendly terminology (no raw server stack traces or uncaught JS errors).
- **Mandatory Contextual Recovery:**
  - Network Failure → "Check your connection & Retry"
  - Form Validation Error → Specific field highlighting with actionable feedback
  - Rate Limited (429) → "Please wait [countdown] seconds before trying again"
  - Service Unavailable → "Direct WhatsApp Hotline" fallback button

### D. Success State (Immediate Assurance)
- Instant visual and haptic feedback upon submission (e.g., Lead form submitted, Consultation scheduled).
- Render a luxury confirmation modal or toast with inquiry reference number and expected response window (e.g., "Our Senior Advisor will contact you within 2 hours").

## 2. Next.js Routing Boundaries
- Provide route-level boundary files for all dynamic segments:
  - `loading.tsx`: Instant suspense skeleton wrapper.
  - `error.tsx`: Client-side error boundary with reset button.
  - `not-found.tsx`: Luxury 404 page directing users back to the Executive Hub.
