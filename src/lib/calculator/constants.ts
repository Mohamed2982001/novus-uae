import { JurisdictionType, ActivityCategory } from "./types";

export const AED_TO_USD_RATE = 3.6725;

export interface JurisdictionMeta {
  id: JurisdictionType;
  titleEn: string;
  titleAr: string;
  badgeEn: string;
  badgeAr: string;
  descEn: string;
  descAr: string;
  baseFeeAED: number;
  timeline: { min: number; max: number };
  perksEn: string[];
  perksAr: string[];
}

export const JURISDICTIONS: JurisdictionMeta[] = [
  {
    id: "mainland",
    titleEn: "Dubai Mainland (DET / DED)",
    titleAr: "البر الرئيسي في دبي (اقتصادية دبي)",
    badgeEn: "100% Foreign Ownership",
    badgeAr: "تملك أجنبي 100%",
    descEn: "Trade freely anywhere in the UAE and internationally with direct government contracts.",
    descAr: "حرية ممارسة الأعمال في كافة أنحاء الإمارات والعالم مع التعاقد الحكومي المباشر.",
    baseFeeAED: 18500,
    timeline: { min: 3, max: 5 },
    perksEn: [
      "No geographic trading restrictions in UAE",
      "Qualify for government & municipal tenders",
      "Unlimited employment visas based on office size",
    ],
    perksAr: [
      "حرية التجارة داخل السوق المحلي للإمارات بالكامل",
      "أهلية التعاقد والمناقصات الحكومية الرسمية",
      "تأشيرات عمل مرنة وفق المساحة المكتبية",
    ],
  },
  {
    id: "freezone",
    titleEn: "UAE Free Zone (IFZA, DMCC, Meydan)",
    titleAr: "المناطق الحرة (IFZA، DMCC، ميدان)",
    badgeEn: "Zero Personal Tax & Swift Setup",
    badgeAr: "إعفاء ضريبي شخصي وتأسيس سريع",
    descEn: "Cost-effective, highly streamlined corporate structures for international and tech founders.",
    descAr: "هياكل شركات موفرة للتكاليف ومثالية للمؤسسين الدوليين والأنشطة الرقمية.",
    baseFeeAED: 12500,
    timeline: { min: 2, max: 4 },
    perksEn: [
      "100% capital and profit repatriation",
      "Zero customs duties on re-exports",
      "No physical office lease strictly required",
    ],
    perksAr: [
      "إعادة تحويل الأرباح ورأس المال بالكامل 100%",
      "إعفاء جمركي للبضائع المعاد تصديرها",
      "إمكانية العمل بمكتب مرن (Flexi Desk) دون إيجار مستقل",
    ],
  },
  {
    id: "offshore",
    titleEn: "Offshore Entity (RAK ICC / JAFZA)",
    titleAr: "الشركات الخارجية (أوفشور)",
    badgeEn: "Asset Protection & Holding",
    badgeAr: "حماية الأصول والشركات القابضة",
    descEn: "Confidential corporate vehicles for real estate holding and international intellectual property.",
    descAr: "كيانات موثوقة لحفظ الأصول العقارية والملكية الفكرية الدولية بأعلى سرية.",
    baseFeeAED: 9500,
    timeline: { min: 5, max: 7 },
    perksEn: [
      "Absolute confidentiality of ownership",
      "Direct Dubai real estate property ownership",
      "No UAE residency or office requirement",
    ],
    perksAr: [
      "سرية تامة لحصص الملكية وحماية الأصول",
      "تملك العقارات الاستثمارية في دبي بصورة مباشرة",
      "لا يشترط إصدار تأشيرات إقامة أو وجود مكتب فعلي",
    ],
  },
];

export interface ActivityMeta {
  id: ActivityCategory;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  surchargeAED: number;
}

export const ACTIVITIES: ActivityMeta[] = [
  {
    id: "commercial",
    titleEn: "Commercial License",
    titleAr: "رخصة تجارية",
    descEn: "Trading, retail, wholesale, import/export of specific specialized goods.",
    descAr: "التجارة وتجارة التجزئة والجملة واستيراد وتصدير منتجات محددة.",
    surchargeAED: 0,
  },
  {
    id: "professional",
    titleEn: "Professional / Services",
    titleAr: "رخصة مهنية وخدمية",
    descEn: "Consulting, engineering, IT services, design, and management advisory.",
    descAr: "الاستشارات الهندسية والتقنية وتصميم البرمجيات وإدارة الأعمال.",
    surchargeAED: 0,
  },
  {
    id: "industrial",
    titleEn: "Industrial / Manufacturing",
    titleAr: "رخصة صناعية وإنتاجية",
    descEn: "Manufacturing, light assembly, packaging requiring municipal approvals.",
    descAr: "التصنيع والتجميع والتعبئة مع موافقات البلدية والدفاع المدني.",
    surchargeAED: 5000,
  },
  {
    id: "general_trading",
    titleEn: "General Trading License",
    titleAr: "رخصة تجارة عامة",
    descEn: "Unrestricted multi-commodity trading across diverse unrelated products.",
    descAr: "تجارة عامة شاملة لمختلف البضائع والمنتجات غير المقيدة.",
    surchargeAED: 8000,
  },
];

export const RESIDENCE_VISA_UNIT_FEE_AED = 3500;
export const GOLDEN_VISA_ASSISTANCE_FEE_AED = 6500;

export interface AddonMeta {
  id: keyof import("./types").AddonServices;
  titleEn: string;
  titleAr: string;
  badgeEn: string;
  badgeAr: string;
  descEn: string;
  descAr: string;
  feeAED: number;
}

export const ADDONS_CATALOG: AddonMeta[] = [
  {
    id: "bankAccountAssistance",
    titleEn: "Corporate Bank Account Facilitation",
    titleAr: "تسهيل فتح الحساب المصرفي للشركات",
    badgeEn: "VIP Tier-1 Priority",
    badgeAr: "أولوية مصرفية VIP",
    descEn: "Guaranteed KYC file preparation & direct VIP introductions to Emirates NBD, Mashreq & ADCB.",
    descAr: "تجهيز ملف الامتثال المصرفي (KYC) وربط مباشر مع بنوك الفئة الأولى (المشرق، دبي الوطني، أبوظبي التجاري).",
    feeAED: 3500,
  },
  {
    id: "corporateTaxVat",
    titleEn: "Corporate Tax & VAT Registration Pack",
    titleAr: "التسجيل الضريبي وضريبة الشركات والقيمة المضافة",
    badgeEn: "FTA Compliance",
    badgeAr: "امتثال الهيئة الاتحادية",
    descEn: "Federal Tax Authority (FTA) tax registration number (TRN) and opening compliance filings.",
    descAr: "استخراج الرقم الضريبي (TRN) من الهيئة الاتحادية للضرائب وتهيئة سجلات الامتثال.",
    feeAED: 2000,
  },
  {
    id: "physicalOfficeFlexi",
    titleEn: "Dedicated Office / Flexi-Desk Ejari",
    titleAr: "عقد الإيجار المعتمد وسند إيجاري (Ejari)",
    badgeEn: "Mainland Requirement",
    badgeAr: "اشتراط إلزامي للبر الرئيسي",
    descEn: "Registered commercial address lease required for mainland licenses and bank account approvals.",
    descAr: "عقد إيجار تجاري معتمد وشهادة إيجاري الرسمية اللازمة للرخصة البرية والمصارف.",
    feeAED: 2500,
  },
];
