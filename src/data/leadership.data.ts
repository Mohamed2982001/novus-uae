export interface LeaderProfile {
  id: string;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  isFounder?: boolean;
  experienceYears: number;
  credentialsEn: string[];
  credentialsAr: string[];
  specialtiesEn: string[];
  specialtiesAr: string[];
  keyLiaisons: string[];
  bioEn: string;
  bioAr: string;
  monogram: string;
}

export const LEADERSHIP_PROFILES: LeaderProfile[] = [
  {
    id: "mohammed-abueida",
    nameEn: "Mohammed Abueida",
    nameAr: "محمد أبو عيدة",
    titleEn: "Founder & Chief Executive Officer",
    titleAr: "المؤسس والرئيس التنفيذي",
    isFounder: true,
    experienceYears: 16,
    credentialsEn: [
      "Sovereign Corporate Strategy Architect",
      "High-Level Government Relations Pioneer",
      "Cross-Border FDI & Enterprise Advisor",
    ],
    credentialsAr: [
      "مهندس الاستراتيجيات المؤسسية السيادية",
      "رائد العلاقات الحكومية والتمثيل الاستراتيجي",
      "مستشار الاستثمار الأجنبي وتأسيس الشركات الكبرى",
    ],
    specialtiesEn: [
      "Strategic Institutional Notarization Systems",
      "UAE Federal & Local Regulatory Frameworks",
      "High-Net-Worth & Enterprise Structuring",
    ],
    specialtiesAr: [
      "أنظمة التوثيق والخدمات الحكومية المؤسسية",
      "الأطر التنظيمية الاتحادية والمحلية في الإمارات",
      "هيكلة استثمارات كبار الشخصيات والشركات العالمية",
    ],
    keyLiaisons: ["DED / DET", "MOHRE", "ICP", "Dubai Chambers", "MOFA UAE"],
    bioEn:
      "Directs sovereign advisory strategies and institutional government relations to empower global investors, corporate enterprises, and private wealth looking to establish a permanent presence and thrive in the United Arab Emirates.",
    bioAr:
      "يقود الرؤية الاستراتيجية وأنظمة التوثيق والعلاقات الحكومية المؤسسية لتمكين المستثمرين العالميين والشركات الدولية من ترسيخ أعمالهم والنمو المستدام في دولة الإمارات العربية المتحدة.",
    monogram: "MA",
  },
  {
    id: "monir-abueida",
    nameEn: "Monir Abueida",
    nameAr: "منير أبو عيدة",
    titleEn: "Managing Director",
    titleAr: "المدير العام",
    experienceYears: 12,
    credentialsEn: [
      "Strategic Enterprise Growth & Operations",
      "Cross-Border Client Relations Lead",
      "Foreign Direct Investment (FDI) Strategist",
    ],
    credentialsAr: [
      "النمو المؤسسي الاستراتيجي وإدارة العمليات",
      "إدارة وتطوير العلاقات الاستثمارية الدولية",
      "استراتيجي استقطاب الاستثمار الأجنبي المباشر",
    ],
    specialtiesEn: [
      "100% Mainland Foreign Ownership Frameworks",
      "Corporate Market-Entry Architecture",
      "High-Value Commercial Partnerships",
    ],
    specialtiesAr: [
      "أطر التملك الأجنبي الكامل في البر الرئيسي 100%",
      "هندسة دخول الأسواق وتأسيس الأعمال",
      "الشراكات التجارية والاستراتيجية الكبرى",
    ],
    keyLiaisons: ["DED / DET", "ICP", "MOHRE", "Dubai Chambers", "ADGM"],
    bioEn:
      "A strategic leader focused on growth, high-value client relationships, and guiding the advisory team forward across mainland and free zone corporate jurisdictions.",
    bioAr:
      "قائد استراتيجي يركز على نمو الأعمال، وتطوير العلاقات مع كبار المستثمرين، وقيادة الفريق نحو التميز التشغيلي في كافة المناطق الحرة والبر الرئيسي.",
    monogram: "MA",
  },
  {
    id: "mostafa-hamza",
    nameEn: "Mostafa Hamza",
    nameAr: "مصطفى حمزة",
    titleEn: "Head of Government Services",
    titleAr: "رئيس الخدمات الحكومية",
    experienceYears: 14,
    credentialsEn: [
      "Public Sector Strategies & Clearances",
      "Amer & Tasheel VIP Fast-Track Directorate",
      "High-Level DED & MOFA Clearances",
    ],
    credentialsAr: [
      "استراتيجيات القطاع العام والموافقات الرسمية",
      "إدارة المسار السريع VIP لمراكز آمر وتسهيل",
      "التخليص والموافقات السيادية لدى اقتصادية دبي والخارجية",
    ],
    specialtiesEn: [
      "UAE Licensing & Regulatory Affairs",
      "Public Sector Strategy & Fast-Track Approvals",
      "Golden Visa 10-Year Sovereign Nominations",
    ],
    specialtiesAr: [
      "التراخيص الحكومية والشؤون التنظيمية",
      "استراتيجيات القطاع الحكومي والتخليص السريع",
      "ملفات ترشيح الإقامة الذهبية السيادية (10 سنوات)",
    ],
    keyLiaisons: ["Amer & Tasheel VIP", "MOHRE", "GDRFA Dubai", "MOFA UAE", "DET"],
    bioEn:
      "Leads government relations and regulatory affairs, guiding clients through UAE licensing, compliance, and public sector strategies with institutional precision.",
    bioAr:
      "يقود العلاقات الحكومية والشؤون التنظيمية، وتوجيه العملاء عبر إجراءات الترخيص والامتثال والاستراتيجيات الحكومية المتكاملة.",
    monogram: "MH",
  },
  {
    id: "ahmed-alfatih",
    nameEn: "Ahmed AlFatih",
    nameAr: "أحمد الفاتح",
    titleEn: "Head of Legal Translation",
    titleAr: "رئيس قسم الترجمة القانونية",
    experienceYears: 11,
    credentialsEn: [
      "Ministry of Justice Certified Legal Translator",
      "Cross-Border Commercial MoA Translation",
      "Consular & Embassy Attestation Specialist",
    ],
    credentialsAr: [
      "مترجم قانوني معتمد لدى وزارة العدل الإماراتية",
      "ترجمة عقود التأسيس والاتفاقيات التجارية الدولية",
      "متخصص التصديقات القنصلية والسفارات الأجنبية",
    ],
    specialtiesEn: [
      "Official Court & Ministry Sworn Translations",
      "Articles of Association & Board Resolutions",
      "Apostille & Diplomatic Attestation Chains",
    ],
    specialtiesAr: [
      "الترجمة المحلفة المعتمدة للمحاكم والوزارات",
      "صياغة وترجمة عقود التأسيس وقرارات مجالس الإدارة",
      "سلاسل تصديق الأبوستيل والبعثات الدبلوماسية",
    ],
    keyLiaisons: ["Ministry of Justice (MOJ)", "MOFA UAE", "Dubai Courts", "Foreign Embassies"],
    bioEn:
      "Leads legal translation services with accuracy, clarity, and meticulous attention to detail, ensuring international documents comply with UAE judicial standards.",
    bioAr:
      "يشرف على خدمات الترجمة القانونية والتوثيق بدقة واحترافية فائقة والالتزام بأعلى معايير الصياغة القانونية والاعتماد القضائي.",
    monogram: "AF",
  },
  {
    id: "alaa-salem",
    nameEn: "Alaa Salem",
    nameAr: "علاء سالم",
    titleEn: "Head of Finance & Administration",
    titleAr: "رئيس الشؤون المالية والإدارية",
    experienceYears: 12,
    credentialsEn: [
      "FTA Registered Corporate Tax & VAT Lead",
      "Tier-1 UAE Institutional Banking Onboarding",
      "Internal Financial Controls & Audit Oversight",
    ],
    credentialsAr: [
      "مسؤول الضرائب وضرائب الشركات لدى الهيئة الاتحادية (FTA)",
      "إدارة فتح وتسهيل الحسابات البنكية لدى كبرى بنوك الإمارات",
      "الرقابة المالية والتدقيق الداخلي للشركات",
    ],
    specialtiesEn: [
      "9% Corporate Tax & VAT Statutory Compliance",
      "Operational Administration & Banking Setup",
      "Financial Reporting & Cashflow Governance",
    ],
    specialtiesAr: [
      "الامتثال لضريبة الشركات (9%) وضريبة القيمة المضافة",
      "تنظيم العمليات التشغيلية وتسهيلات الحسابات البنكية",
      "التقارير المالية وحوكمة التدفقات النقدية",
    ],
    keyLiaisons: [
      "Federal Tax Authority (FTA)",
      "Emirates NBD",
      "ADCB",
      "Mashreq Bank",
    ],
    bioEn:
      "Oversees finance and administration to keep corporate operations organized, compliant, and running smoothly across all regulatory requirements.",
    bioAr:
      "يشرف على الشؤون المالية والإدارية لضمان تنظيم العمليات والامتثال التنظيمي التام وسلاسة سير العمل لكافة الشركات والمؤسسات.",
    monogram: "AS",
  },
  {
    id: "ali-hassan",
    nameEn: "Ali Hassan",
    nameAr: "علي حسن",
    titleEn: "Financial Analyst",
    titleAr: "محلل مالي",
    experienceYears: 8,
    credentialsEn: [
      "Corporate Financial Modeling & Valuation",
      "Economic Feasibility Study Specialist",
      "Market Entry Cost Benchmarking",
    ],
    credentialsAr: [
      "النمذجة والتقييم المالي للشركات",
      "إعداد دراسات الجدوى الاقتصادية المعتمدة",
      "تحليل ومقارنة تكاليف تأسيس الأعمال",
    ],
    specialtiesEn: [
      "Forecasting, Cashflow & Profitability Models",
      "Jurisdiction Cost-Benefit Tradeoff Analysis",
      "Comprehensive Setup Financial Projections",
    ],
    specialtiesAr: [
      "النماذج المالية والتوقعات والربحية والتدفق النقدي",
      "تحليل الجدوى والمقارنة بين المناطق الحرة والبر الرئيسي",
      "التقديرات المالية الشاملة لمشاريع التأسيس",
    ],
    keyLiaisons: ["Dubai Chamber", "Banking Underwriting Desks", "FTA Reporting"],
    bioEn:
      "Supports reporting, forecasting, and financial analysis, delivering clear quantitative insights to optimize client investments across the Emirates.",
    bioAr:
      "يدعم التقارير والتوقعات والتحليلات المالية، ويقدم رؤى كمية استشرافية لتعظيم عوائد استثمارات العملاء في دولة الإمارات.",
    monogram: "AH",
  },
];
