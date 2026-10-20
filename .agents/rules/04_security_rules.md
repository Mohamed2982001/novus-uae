# Agent Rule: Security Hardening & Threat Defense Standards

Derived directly from the master security testing protocol (`D:\Work\Dev\Security Prompts.txt`):

## 1. Zero Secrets & Credential Quarantine
- **Strict Prohibition:** Never hardcode passwords, API keys, private tokens, or server URLs in any component, script, or version-controlled file.
- **Environment Isolation:** All sensitive credentials must be loaded via server-only environment variables (`process.env.*` without `NEXT_PUBLIC_` prefix unless strictly required for public client telemetry).
- **Credentials Vault:** Physical credentials (such as GoDaddy logins, cPanel/server credentials, email accounts) must strictly reside in `docs/CREDENTIALS.md` which is git-ignored and sanitized with dummy templates.

## 2. "Never Trust the Client" Architectural Principle
- **Client Validation is UX Only:** Client-side Zod and React Hook Form validation is exclusively for user experience.
- **Server-Side Enforcement:** Every Next.js Server Action and API Route (`/api/contact`, `/api/calculate`) must re-validate the entire payload using strict server-side Zod schemas.
- **XSS & HTML Injection Defense:**
  - Strictly prohibit `dangerouslySetInnerHTML` unless passed through a validated sanitizer (e.g., DOMPurify).
  - Escape all dynamic text rendered in Arabic and English layouts.
- **SVG Sanitization:** All raw SVG assets and icons must be verified to contain zero `<script>`, `onload`, or malicious inline execution handlers.

## 3. Abuse Prevention & Rate Limiting
- **Brute Force & Form Spam Defense:**
  - Consultation and lead generation forms must implement rate limiting (IP-based sliding window via Upstash Redis or memory cache).
  - Implement a hidden Honeypot field and timestamp validation (rejecting submissions occurring faster than 2 seconds).
  - Provide graceful HTTP 429 UI feedback with a retry countdown timer.

## 4. Pre-Launch Security Checklist (Mandatory Gate)
Before any code is delivered or pushed to production:
1. [ ] No exposed API keys in browser network tab or client bundle.
2. [ ] All contact form inputs validated against regex, length bounds, and script injections.
3. [ ] Security headers configured in `next.config.ts` (Content-Security-Policy, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy).
4. [ ] CORS policies strictly limited to authorized domains (`novusuae.co`).
5. [ ] Error responses must never leak stack traces, database details, or server directory paths.
