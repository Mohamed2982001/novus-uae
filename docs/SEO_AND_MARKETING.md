# 📈 Novus UAE — SEO & Marketing Architecture (SEO_AND_MARKETING.md)

## 1. UAE Local SEO Strategy & Target Keywords

### Primary Commercial Keywords (Dubai & UAE)
- **High Intent (Commercial & Transactional):**
  - "Business setup in Dubai" / "Company formation UAE"
  - "Mainland LLC license Dubai cost"
  - "Dubai Freezone visa package IFZA DMCC"
  - "10-Year UAE Golden Visa requirements and cost"
  - "Corporate PRO services Dubai"
  - "Certified legal translation Dubai Ministry of Justice"
- **Arabic High-Intent Keywords (RTL Search):**
  - "تأسيس شركات في دبي والإمارات"
  - "تكلفة رخصة المينلاند في دبي"
  - "الفيزا الذهبية في الإمارات 10 سنوات"
  - "خدمات تعقيب المعاملات وتخليص الإجراءات الحكومية دبي"
  - "ترجمة قانونية معتمدة وزارة العدل دبي"

---

## 2. Structured Data & Schema.org JSON-LD

### A. Organization & LocalBusiness Schema
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Novus Government & Business Setup Services UAE",
  "alternateName": "Novus UAE",
  "url": "https://novusuae.co",
  "logo": "https://novusuae.co/assets/logo.png",
  "description": "Premier UAE government relations, corporate PRO services, and business setup firm based in Dubai and Abu Dhabi.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Downtown Dubai, Sheikh Zayed Road",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.1972",
    "longitude": "55.2744"
  },
  "openingHours": "Mo-Fr 08:30-18:00",
  "telephone": "+971-4-000-0000",
  "priceRange": "$$$$"
}
```

### B. FAQPage Schema
Included directly in the landing page to dominate Google Rich Snippets for search queries like *"How long does it take to get a Dubai trade license?"* (Answer: 3–5 business days).

---

## 3. Google Tag Manager (GTM) & Event DataLayer
GTM script container is injected into `src/app/[locale]/layout.tsx`. The application dispatches high-value conversion events to `window.dataLayer`:

| Event Name | Trigger Condition | Payload Parameters |
|:---|:---|:---|
| `calculator_start` | User interacts with Step 1 of Setup Calculator | `{ jurisdiction: string }` |
| `calculator_complete` | User reaches final pricing receipt | `{ jurisdiction, activity, totalAED, totalUSD }` |
| `service_drawer_open` | User clicks to view 1 of the 7 core services | `{ serviceId: string, serviceTitle: string }` |
| `whatsapp_click` | User clicks floating WhatsApp or quote export | `{ source: 'floating' \| 'calculator', service: string }` |
| `consultation_submit` | User successfully submits consultation form | `{ serviceRequested: string, preferredTime: string }` |

---

## 4. Metadata, OpenGraph & Social Cards
Configured in `src/app/[locale]/layout.tsx` using Next.js Metadata API:
- Title template: `%s | Novus UAE — Premier Government Relations & Business Setup`
- Dynamic OpenGraph image generation: `src/app/[locale]/opengraph-image.tsx` rendering luxury champagne gold monogram on obsidian background.
- Dynamic `sitemap.ts` and `robots.ts` generating bilingual XML links with `hreflang="en"` and `hreflang="ar"`.
