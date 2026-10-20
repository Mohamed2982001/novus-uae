# 💼 Novus UAE — Business Logic & Pricing Engine (BUSINESS_LOGIC.md)

## 1. Domain Background & Regulatory Framework
Company setup and government licensing in the UAE operate under federal guidelines (MOHRE, ICP) and emirate-specific authorities (DED Dubai, DED Abu Dhabi, and Free Zone Authorities). Pricing structures are strictly separated into:
1. **Government Fees:** Mandatory state charges (DED License, ICP Visa, MOHRE labor file, Amer, Tasheel).
2. **Professional & PRO Service Fees:** Novus facilitation, document drafting, local agent representation, and VIP expedited processing.

---

## 2. Interactive Calculator Calculation Matrix

### A. Jurisdiction Base Fees
| Jurisdiction Type | Target Authorities | Base Gov & License Fee (AED) | Base Fee (USD) | Standard Timeline |
|:---|:---|:---:|:---:|:---:|
| **Mainland (LLC / Professional)** | Dubai Economy & Tourism (DET / DED) | **14,500 AED** | ~$3,950 USD | 3 – 5 Business Days |
| **Free Zone (IFZA / DMCC / Meydan)** | Relevant Free Zone Authority | **12,900 AED** | ~$3,510 USD | 2 – 4 Business Days |
| **Offshore (RAK ICC / JAFZA)** | International Corporate Center | **16,000 AED** | ~$4,350 USD | 5 – 7 Business Days |

### B. Business Activity Multipliers
- **Professional & Consultancy:** Multiplier `1.0×` (No government deposit required; 100% foreign ownership standard).
- **Commercial & General Trading:** Multiplier `1.15×` (Includes commercial license tariffs, chamber of commerce registration).
- **Industrial & Manufacturing:** Multiplier `1.35×` (Requires municipality site inspection, Civil Defense approval, and environmental clearance).

### C. Visa & Residency Allocation Unit Costs
Each visa allocation includes the full mandatory UAE lifecycle:
1. Entry Permit / Quota Approval.
2. In-Country Status Change.
3. VIP Express Medical Fitness (Blood test & Chest X-ray).
4. Biometrics & Emirates ID (VIP appointment).
5. Residency Stamping & Labor Card issuance.

| Visa Tier | Description | Cost per Visa (AED) | Cost per Visa (USD) |
|:---|:---|:---:|:---:|
| **0 Visas** | License Only (Holding or Virtual Setup) | **0 AED** | $0 |
| **1 – 2 Visas** | Founder & Core Partner Residence | **3,850 AED** / visa | $1,050 / visa |
| **3 – 5 Visas** | Growing Team & Key Employees | **3,600 AED** / visa | $980 / visa |
| **Golden Visa (10-Yr)** | VIP Investor / Executive Golden Visa | **9,500 AED** (all inclusive) | $2,585 |

---

## 3. Calculation Formula & Algorithm
```typescript
interface CalculationInput {
  jurisdiction: "mainland" | "freezone" | "offshore";
  activity: "consultancy" | "commercial" | "industrial";
  visas: number;
  hasGoldenVisa?: boolean;
}

export function calculateUAESetupCost(input: CalculationInput) {
  const USD_PEG = 3.6725;
  
  // 1. Base jurisdiction fee
  const baseFees = {
    mainland: 14500,
    freezone: 12900,
    offshore: 16000,
  };
  
  // 2. Activity multiplier
  const activityMultipliers = {
    consultancy: 1.0,
    commercial: 1.15,
    industrial: 1.35,
  };
  
  const licenseCost = Math.round(
    baseFees[input.jurisdiction] * activityMultipliers[input.activity]
  );
  
  // 3. Visa cost calculation
  let visaCost = 0;
  if (input.hasGoldenVisa) {
    visaCost = 9500;
  } else {
    const ratePerVisa = input.visas > 2 ? 3600 : 3850;
    visaCost = input.visas * ratePerVisa;
  }
  
  // 4. Compliance, E-channel & Virtual Office mandatory allocation
  const complianceFee = input.jurisdiction === "offshore" ? 2500 : 3500;
  
  const totalAED = licenseCost + visaCost + complianceFee;
  const totalUSD = Math.round(totalAED / USD_PEG);
  
  return {
    licenseCost,
    visaCost,
    complianceFee,
    totalAED,
    totalUSD,
    estimatedDays: input.jurisdiction === "freezone" ? "2-4 Days" : "3-5 Days",
  };
}
```

---

## 4. WhatsApp Dynamic Message Dispatch
When the user clicks "Send to WhatsApp", the link is generated with URL encoding:
`https://wa.me/971500000000?text=Hello%20Novus,%20I%20used%20your%20UAE%20Setup%20Calculator:%0A- Jurisdiction: Mainland%0A- Activity: Commercial%0A- Visas: 2%0A- Estimated: AED 25,175 ($6,855)%0APlease send me the official itemized proposal.`
