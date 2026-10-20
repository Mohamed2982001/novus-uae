# 🛡️ Novus UAE — Security Blueprint & Threat Model (SECURITY_BLUEPRINT.md)

> Grounded directly in the master security protocols (`D:\Work\Dev\Security Prompts.txt`).

---

## 1. Threat Model & Asset Identification

### Top 3 Assets Attackers Want
1. **High-Ticket Investor Lead Data:** Names, foreign phone numbers, and investment budgets submitted via the consultation booking form.
2. **Server & Mail Access:** SMTP credentials, DNS zone controls, or hosting administrative access.
3. **Brand Reputation & Defacement:** Injecting malicious scripts, defacing executive prestige, or conducting phishing via subdomains.

### Primary Attack Surface
- **Entry Points:**
  - `POST /api/contact` (Consultation booking endpoint)
  - `POST /api/calculate` (Calculator proposal request)
  - Client-side DOM inputs (XSS vulnerability vectors)
  - External DNS records at GoDaddy (`novusuae.co`)

---

## 2. Defensive Hardening Architecture

### A. "Never Trust the Client" Defense
- Client-side validation in React Hook Form is considered visual candy for UX only.
- All incoming payloads must be parsed on the edge server with Zod:
  - Strict string length boundaries (e.g. Name: 2–60 chars, Email: valid RFC 5322 format, Phone: valid E.164 international format).
  - Regex stripping of `<script>`, `javascript:`, HTML tags, and SQL control characters.

### B. Anti-Spam & Automated Bot Shield
- **Invisible Honeypot Field:** A field named `corporate_vat_number` hidden with `opacity-0 pointer-events-none absolute`. If filled by an automated bot, the request is immediately dropped with HTTP 200 (to deceive the bot without processing).
- **Submission Velocity Enforcement:** Form timestamps are signed; any submission completed in under 2.5 seconds is rejected.
- **Sliding-Window Rate Limiting:** Enforce a maximum of 5 submissions per IP per 10-minute window. Excess requests return HTTP 429 with `Retry-After` header.

### C. HTTP Security Headers (`next.config.ts`)
```typescript
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;",
  },
];
```

---

## 3. Pre-Launch "Will This Embarrass Me?" Checklist
Before the website is launched on `novusuae.co`:
- [ ] Are any API keys, passwords, or GoDaddy secrets visible in client bundle? (Must be 100% clean).
- [ ] Does submitting a `<script>alert(1)</script>` into any input execute or display raw? (Must be escaped).
- [ ] Is `docs/CREDENTIALS.md` included in `.gitignore`?
- [ ] Are rate limits functional on `/api/contact`?
- [ ] Does SSL / HTTPS enforce automatic HTTP -> HTTPS redirection?
- [ ] Are error boundaries suppressing internal stack traces in production mode?
