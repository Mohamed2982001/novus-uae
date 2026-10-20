# 🔄 Novus UAE — User & Data Flow Architecture (USER_DATA_FLOW.md)

This document diagrams the user journeys, data pipelines, state transitions, and third-party integrations across the Novus digital platform.

---

## 1. Investor Lead & Acquisition Journey

```mermaid
flowchart TD
    A["Visitor Arrives at novusuae.co (Search / Ad / Referral)"] --> B{"Select Preferred Language"}
    B -->|"English (LTR)"| C1["Explore Landing Page (Outfit Font)"]
    B -->|"العربية (RTL)"| C2["Explore Landing Page (Cairo Font)"]
    
    C1 --> D["View Hero & Authority Stats (10k+ Visas, 800+ Companies)"]
    C2 --> D
    
    D --> E{"Primary User Intent"}
    
    E -->|"Calculate Cost"| F["UAE Setup Cost Calculator"]
    E -->|"Explore Services"| G["7 Core Services Bento Grid"]
    E -->|"Immediate Advisory"| H["Direct WhatsApp Concierge"]
    E -->|"Corporate Booking"| I["Book Consultation Form"]
    
    F --> J["Receive Real-Time Estimate (AED / USD)"]
    J -->|"Send via WhatsApp"| H
    J -->|"Submit via Form"| I
    
    G --> K["Click Service Card -> Open Detail Drawer"]
    K --> H
    
    I --> L["Lead Received & Dispatched to Novus CRM"]
    L --> M["Managing Director / Team Follows Up within 2 Hours"]
```

---

## 2. Interactive UAE Setup Cost Calculator Data Flow

```mermaid
sequenceDiagram
    autonumber
    actor Investor as Investor / Client
    participant UI as Calculator UI (Client Component)
    participant Engine as Calculation Engine (lib/calculator.ts)
    participant GTM as Google Tag Manager
    participant WhatsApp as WhatsApp API

    Investor->>UI: Selects Jurisdiction (Mainland / Free Zone / Offshore)
    UI->>Engine: recalculate({ jurisdiction })
    Engine-->>UI: Update Base Fee Range
    
    Investor->>UI: Selects Activity (Commercial / Professional / Industrial)
    UI->>Engine: recalculate({ activity, multiplier })
    Engine-->>UI: Update Approvals & License Cost
    
    Investor->>UI: Selects Visa Allocation (0, 1-2, 3-5, Golden Visa)
    UI->>Engine: recalculate({ visas, medicalFitness, emiratesId })
    Engine-->>UI: Return Final Itemized Estimate (AED & USD)
    
    UI->>GTM: pushEvent("calculator_complete", { totalAED, jurisdiction })
    
    alt Click "Export to WhatsApp"
        Investor->>UI: Clicks "Send to WhatsApp"
        UI->>WhatsApp: Open wa.me with pre-formatted message
    else Click "Request Official Proposal"
        Investor->>UI: Submits Name & Email
        UI->>Engine: Submit lead with calculator state
    end
```

---

## 3. Lead Capture & Security Pipeline Flow

```mermaid
flowchart LR
    subgraph ClientBrowser [Client Browser]
        Form["Consultation Form"]
        ZodClient["Client Zod Validation"]
        HoneypotField["Hidden Honeypot Field"]
        TimestampCheck["Submission Timing Metric"]
    end

    subgraph EdgeServer [Next.js Edge / Server Action]
        RateLimiter["Rate Limiter (Max 5/min)"]
        HoneypotCheck{"Honeypot Filled?"}
        TimeCheck{"Time < 2s?"}
        ZodServer["Server-side Zod Schema"]
    end

    subgraph NotificationPipe [Notification & Telemetry]
        EmailService["Resend / SMTP Mailer"]
        GTMEvent["GTM dataLayer Event"]
        ClientAlert["Executive Team Notification"]
    end

    Form --> ZodClient
    ZodClient -->|Valid| EdgeServer
    HoneypotField --> HoneypotCheck
    TimestampCheck --> TimeCheck

    EdgeServer --> RateLimiter
    RateLimiter -->|Pass| HoneypotCheck
    HoneypotCheck -->|Empty (Legitimate)| TimeCheck
    HoneypotCheck -->|Filled (Bot)| RejectBot["Silently Drop / Reject 400"]
    TimeCheck -->|Legitimate Human| ZodServer
    TimeCheck -->|Instant (Bot)| RejectBot

    ZodServer -->|Sanitized Payload| NotificationPipe
    NotificationPipe --> EmailService
    NotificationPipe --> GTMEvent
    NotificationPipe --> ClientAlert
```

---

## 4. Bilingual Engine & Dynamic Layout Switch Flow

```mermaid
flowchart TD
    Toggle["User Toggles Language Button (EN 🇬🇧 ↔ AR 🇦🇪)"] --> StateChange["Update Locale State in Context & URL Cookie"]
    StateChange --> DOM["Set document.documentElement: dir='rtl' / 'ltr' and lang='ar' / 'en'"]
    DOM --> FontChange{"Active Locale"}
    FontChange -->|"AR"| Cairo["Apply Cairo / Alexandria Font Stack + RTL logical classes"]
    FontChange -->|"EN"| Outfit["Apply Outfit / Plus Jakarta Sans Font Stack + LTR alignment"]
    Cairo --> Icons["Mirror Directional Icons (rtl:rotate-180)"]
    Outfit --> Standard["Default Directional Flow"]
```
