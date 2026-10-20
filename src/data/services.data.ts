export interface ServiceItem {
  id: string;
  titleEn: string;
  titleAr: string;
  shortDescEn: string;
  shortDescAr: string;
  fullOverviewEn: string;
  fullOverviewAr: string;
  deliverablesEn: string[];
  deliverablesAr: string[];
  timeline: string;
  authorities: string[];
  icon: string;
  featured?: boolean;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "business-setup",
    titleEn: "Business Setup & Company Formation",
    titleAr: "تأسيس الشركات وتراخيص الأعمال",
    shortDescEn:
      "End-to-end company formation across Dubai Mainland, 40+ UAE Free Zones, and Offshore jurisdictions with 100% foreign ownership guarantee.",
    shortDescAr:
      "تأسيس متكامل للشركات في البر الرئيسي بدبي، وأكثر من 40 منطقة حرة إماراتية، مع ضمان التملك الأجنبي بنسبة 100%.",
    fullOverviewEn:
      "Novus provides premier turnkey advisory for corporate incorporation throughout Dubai and the wider UAE. Whether structuring a Mainland LLC under the Dubai Department of Economy and Tourism (DET), establishing in world-renowned Free Zones (DMCC, IFZA, DAFZA, DIFC), or establishing an Offshore wealth holding vehicle, our sovereign legal specialists handle initial approvals, trade name reservation, Memorandum of Association (MOA) drafting, and final electronic trade license issuance.",
    fullOverviewAr:
      "تقدم نوفوس استشارات تنفيذية شاملة لتأسيس وترخيص الشركات في دبي وكافة إمارات الدولة. سواء كان تأسيس شركة ذات مسؤولية محدودة في البر الرئيسي تحت مظلة اقتصادية دبي، أو في كبرى المناطق الحرة مثل DMCC وIFZA، أو شركات الأوفشور لإدارة الثروات، يتولى خبراؤنا استخراج الموافقات المبدئية، وحجز الاسم التجاري، وصياغة عقود التأسيس، وإصدار الرخصة التجارية النهائية.",
    deliverablesEn: [
      "Initial Approval & Trade Name Reservation (DET / Free Zone)",
      "Drafting & Notarization of Memorandum of Association (MOA)",
      "Commercial Lease Agreement (Ejari / Flexi-Desk) Registration",
      "Corporate Establishment Card Issuance (MOHRE & ICP)",
      "Comprehensive 100% Foreign Ownership Structuring",
    ],
    deliverablesAr: [
      "حجز الاسم التجاري واستخراج الموافقة المبدئية",
      "صياغة وتوثيق عقد التأسيس لدى كاتب العدل",
      "توثيق عقد الإيجار التجاري وسند إيجاري (Ejari)",
      "إصدار بطاقة المنشأة لدى وزارة الموارد البشرية والهوية",
      "هيكلة التملك الأجنبي الكامل بنسبة 100%",
    ],
    timeline: "3–5 Business Days",
    authorities: ["DET (DED)", "MOHRE", "ICP", "Dubai Land Dept (Ejari)"],
    icon: "Building2",
    featured: true,
  },
  {
    id: "corporate-pro",
    titleEn: "Corporate PRO & GRO Services",
    titleAr: "خدمات العلاقات العامة الحكومية (PRO / GRO)",
    shortDescEn:
      "Comprehensive government relations outsourcing managing trade license renewals, labor quotas, corporate amendments, and regulatory filings.",
    shortDescAr:
      "إدارة متكاملة للعلاقات الحكومية وإجراءات تجديد الرخص، وتعديل عقود التأسيس، وحصص العمل، والامتثال التنظيمي.",
    fullOverviewEn:
      "Mitigate corporate risk and eliminate bureaucratic delays with Novus's dedicated Corporate Public Relations Officer (PRO) and Government Relations Officer (GRO) retainers. We act as your executive liaison across all federal and municipal ministries, overseeing annual trade license renewals, share transfers, director changes, labor quota increases, and economic substance compliance.",
    fullOverviewAr:
      "تجنب المخاطر التشغيلية والغرامات الحكومية مع خدمات التمثيل الحكومي للشركات (PRO/GRO) من نوفوس. نعمل كحلقة وصل تنفيذية بين شركتك وجميع الدوائر الحكومية والاتحادية، لنتولى التجديد السنوي للرخص، وتعديل الشركاء والمدراء، ورفع حصص تصاريح العمل، وتقارير الامتثال الاقتصادي.",
    deliverablesEn: [
      "Annual Trade License Renewal & Tenancy Synchronization",
      "Company Shareholder Amendments & Board Resolution Filings",
      "MOHRE Labor Quota Allocations & Work Permit Clearances",
      "Immigration File Maintenance & Status Rectification",
      "Establishment Card Annual Renewals & Fine Waivers",
    ],
    deliverablesAr: [
      "تجديد الرخص التجارية السنوية ومزامنة عقود الإيجار",
      "تعديل حصص الشركاء وتوثيق قرارات مجالس الإدارة",
      "إدارة حصص تصاريح العمل لدى وزارة الموارد البشرية",
      "تحديث وتجديد الملفات في إدارة الإقامة والجنسية",
      "تجديد بطاقات المنشأة وإلغاء الغرامات المتراكمة",
    ],
    timeline: "Ongoing Retainer / 24–48h SLA",
    authorities: ["DET", "MOHRE", "ICP", "Dubai Civil Defence"],
    icon: "Briefcase",
  },
  {
    id: "golden-visa",
    titleEn: "Golden Visa & Elite Residency",
    titleAr: "الإقامة الذهبية وتأشيرات النخبة (10 سنوات)",
    shortDescEn:
      "Prestige 10-year residency programs for investors, entrepreneurs, executives, real estate owners, and highly skilled professionals.",
    shortDescAr:
      "برامج الإقامة طويلة الأجل لمدة 10 سنوات للمستثمرين، ورواد الأعمال، وملاك العقارات، والمدراء التنفيذيين، مع كفالة الأسرة.",
    fullOverviewEn:
      "Secure long-term residency in the UAE without the need for a national sponsor. Novus coordinates elite 10-year UAE Golden Visa applications from initial portfolio eligibility vetting through VIP medical fitness testing and Emirates ID issuance. We handle Real Estate Investor Visas (AED 2M+ valuation), Commercial Enterprise Investor Visas, Executive Senior Talent nominations, and full family sponsorship.",
    fullOverviewAr:
      "اضمن إقامتك الاستثمارية طويلة الأجل في دولة الإمارات لـ 10 سنوات دون الحاجة إلى ضامن محلي. تتولى نوفوس ملفات الإقامة الذهبية بدءاً من تقييم الأهلية الاستثمارية وحتى الفحص الطبي لكبار الشخصيات وإصدار بطاقة الهوية الإماراتية، سواء للمستثمرين العقاريين (عقار بقيمة 2 مليون درهم فما فوق)، أو رواد الأعمال، أو المدراء التنفيذيين، مع كفالة أفراد الأسرة بالكامل.",
    deliverablesEn: [
      "Asset & Portfolio Eligibility Audit (Dubai Land Dept / ICP)",
      "VIP Fast-Track Medical Fitness Screening & Biometric Capture",
      "10-Year Golden Visa Entry Permit & In-Country Status Change",
      "Residency Visa Stamping & 10-Year Emirates ID Delivery",
      "Comprehensive Spouse, Children, and Domestic Staff Sponsorship",
    ],
    deliverablesAr: [
      "تدقيق ومطابقة معايير الأهلية الاستثمارية والعقارية",
      "فحص طبي فوري لكبار الشخصيات (VIP Fast-Track) والتبصيم",
      "إصدار إذن دخول الإقامة الذهبية وتعديل الوضع القانوني",
      "تثبيت الإقامة الذهبية وإصدار بطاقة الهوية لـ 10 سنوات",
      "كفالة الزوجة والأبناء والعمالة المنزلية المرافقة",
    ],
    timeline: "4–7 Business Days",
    authorities: ["ICP", "Dubai Land Department", "Dubai Health Authority"],
    icon: "Award",
    featured: true,
  },
  {
    id: "legal-translation",
    titleEn: "Certified Legal Translation",
    titleAr: "الترجمة القانونية المعتمدة (MOJ)",
    shortDescEn:
      "Ministry of Justice (MOJ) certified translation across 10+ major languages recognized by all UAE courts, ministries, and embassies.",
    shortDescAr:
      "ترجمة قانونية معتمدة من وزارة العدل الإماراتية بأكثر من 10 لغات، مقبولة رسمياً أمام كافة المحاكم والوزارات والسفارات.",
    fullOverviewEn:
      "Novus provides certified legal translation officially accredited by the UAE Ministry of Justice (MOJ). Our sworn translators translate contracts, corporate resolutions, powers of attorney, financial statements, and litigation bundles between Arabic, English, French, German, Russian, Mandarin, and other international languages, ensuring total legal accuracy for governmental and judicial submission.",
    fullOverviewAr:
      "توفر نوفوس خدمات الترجمة القانونية المعتمدة رسمياً من وزارة العدل في دولة الإمارات. يقوم مترجمونا المحلفون بترجمة العقود التجارية، والوكالات القانونية، والشهادات الرسمية، والقوائم المالية، والوثائق القضائية بين اللغات العربية والإنجليزية والفرنسية والروسية والصينية وغيرها، بما يضمن دقة صياغتها واعتمادها الفوري لدى كافة الجهات القضائية والرسمية.",
    deliverablesEn: [
      "Ministry of Justice (MOJ) Official Seal & Sworn Certification",
      "Legal Contracts, Memorandum & Shareholder Agreements",
      "Court Pleadings, Litigation Dossiers & Powers of Attorney",
      "Corporate Financial Statements & Auditor Reports",
      "Expedited Same-Day Processing for Urgent Submissions",
    ],
    deliverablesAr: [
      "ختم واعتماد رسمي محلف من وزارة العدل الإماراتية",
      "ترجمة عقود التأسيس والاتفاقيات التجارية ومحاضر الاجتماعات",
      "ترجمة الوكالات العامة والخاصة ولوائح الدعاوى القضائية",
      "ترجمة الميزانيات المدققة والتقارير المالية المعتمدة",
      "خدمة الترجمة الفورية في نفس اليوم للحالات العاجلة",
    ],
    timeline: "Same-Day / 24 Hours",
    authorities: ["UAE Ministry of Justice (MOJ)", "UAE Courts"],
    icon: "Languages",
  },
  {
    id: "government-liaison",
    titleEn: "Government Liaison & Approvals",
    titleAr: "الموافقات الحكومية والتمثيل الرسمي",
    shortDescEn:
      "Specialized permit acquisition and clearance navigation across Dubai Municipality, Civil Defence, RTA, DHA, and Federal Authorities.",
    shortDescAr:
      "استخراج التصاريح المتخصصة والموافقات الاستثنائية من بلدية دبي، والدفاع المدني، وهيئة الطرق والمواصلات، وهيئة الصحة.",
    fullOverviewEn:
      "Regulated commercial activities in the UAE necessitate specialized external approvals beyond standard trade licenses. Novus liaises directly with governing authorities including Dubai Municipality, the General Directorate of Civil Defence, the Roads and Transport Authority (RTA), the Dubai Health Authority (DHA), and the Telecommunications Regulatory Authority (TDRA) to secure commercial activity permits, fit-out clearances, and specialized operation authorizations.",
    fullOverviewAr:
      "تتطلب العديد من الأنشطة الاقتصادية التخصصية في الدولة موافقات خارجية من جهات وهيئات منظمة قبل ممارسة النشاط. تمثل نوفوس الشركات لدى بلدية دبي، والدفاع المدني، وهيئة الطرق والمواصلات (RTA)، وهيئة الصحة (DHA)، وهيئة تنظيم الاتصالات، للحصول على تصاريح الأنشطة الميدانية وتراخيص السلامة والموافقات الفنية اللازمة.",
    deliverablesEn: [
      "Dubai Municipality Food, Safety & Commercial Approvals",
      "Civil Defence Fire Safety & Fit-Out Approvals",
      "RTA Commercial Transport & Fleet Authorizations",
      "Security Industry Regulatory Agency (SIRA) Clearances",
      "Telecommunications & Digital Government Authorizations (TDRA)",
    ],
    deliverablesAr: [
      "موافقات السلامة الغذائية والبيئية من بلدية دبي",
      "شهادات استيفاء السلامة والوقاية من الدفاع المدني",
      "تصاريح الأنشطة اللوجستية والنقل التجاري من هيئة الطرق (RTA)",
      "تصاريح مؤسسة تنظيم الصناعة الأمنية (SIRA)",
      "تراخيص هيئة تنظيم الاتصالات والحكومة الرقمية (TDRA)",
    ],
    timeline: "5–10 Business Days",
    authorities: ["Dubai Municipality", "Civil Defence", "RTA", "DHA", "SIRA"],
    icon: "ShieldAlert",
  },
  {
    id: "document-attestation",
    titleEn: "Document Attestation & Legalization",
    titleAr: "تصديق وتوثيق المستندات والشهادات",
    shortDescEn:
      "Complete chain attestation of foreign corporate and personal records via MOFA UAE, embassies, consulates, and international Apostille.",
    shortDescAr:
      "سلسلة تصديقات متكاملة للوثائق الصادرة من خارج الدولة لدى وزارة الخارجية وسفارات الدول تمهيداً لاعتمادها القانوني.",
    fullOverviewEn:
      "Cross-border investments require foreign documentation to be strictly authenticated for official legal validity within the UAE. Novus orchestrates the entire attestation chain for commercial certificates of incorporation, board resolutions, certificates of good standing, and personal vital documents, handling notary public authentication in origin countries, embassy legalization, and final UAE Ministry of Foreign Affairs (MOFA) attestation.",
    fullOverviewAr:
      "تتطلب الاستثمارات الدولية تصديق وتوثيق المستندات الصادرة من خارج الدولة لتكتسب صفتها القانونية داخل الإمارات. تدير نوفوس دورة التصديق الكاملة للوثائق التجارية (شهادات التأسيس الأجنبية، وقرارات مجالس الإدارة) والوثائق الشخصية، بدءاً من كاتب العدل في بلد المنشأ، مروراً بسفارة الإمارات بالخارج، وحتى الختم النهائي لوزارة الخارجية الإماراتية (MOFA).",
    deliverablesEn: [
      "UAE Ministry of Foreign Affairs (MOFA) Final Attestation",
      "Foreign Embassy & Consulate Legalization within the UAE",
      "Origin Country Notarization & Apostille Coordination",
      "Corporate Powers of Attorney (POA) Legalization",
      "Secure Door-to-Door Courier Collection and Delivery",
    ],
    deliverablesAr: [
      "تصديق وزارة الخارجية الإماراتية النهائي (MOFA eDAS)",
      "تصديق سفارات وقنصليات الدول الأجنبية داخل الدولة",
      "تنسيق الأبوستيل (Apostille) والتصديق في بلد الإصدار",
      "تصديق الوكالات التجارية وعقود التأسيس للشركات الأجنبية",
      "خدمة استلام وتسليم الوثائق عبر خدمة البريد الآمن (Door-to-Door)",
    ],
    timeline: "2–4 Business Days",
    authorities: ["MOFA UAE", "Diplomatic Consulates", "MOJ Notary"],
    icon: "FileCheck2",
  },
  {
    id: "relocation-banking",
    titleEn: "Relocation Concierge & Corporate Banking",
    titleAr: "الاستقرار المصرفي وتسهيلات الإقامة الفاخرة",
    shortDescEn:
      "Elite corporate banking account introductions with tier-1 UAE banks, VIP airport meet & greet, and executive family relocation assistance.",
    shortDescAr:
      "فتح الحسابات المصرفية للشركات لدى كبرى البنوك الإماراتية، واستقبال VIP في المطار، وخدمات الاستقرار العائلي المتكاملة.",
    fullOverviewEn:
      "Establishing in Dubai extends beyond incorporation to seamless personal and corporate integration. Novus connects newly formed entities with top-tier UAE banking institutions (Emirates NBD, Mashreq, Abu Dhabi Commercial Bank, First Abu Dhabi Bank) for expedited corporate accounts. Concurrently, our executive concierge manages luxury airport VIP arrivals, private school enrollments, and premium residential leasing.",
    fullOverviewAr:
      "لا يقتصر النجاح في دبي على ترخيص الشركة فحسب، بل يمتد إلى الاستقرار المالي والمصرفي السريع. تيسر نوفوس فتح الحسابات المصرفية للشركات لدى بنوك الفئة الأولى (Emirates NBD، بنك المشرق، ADCB، بنك أبوظبي الأول)، بالتوازي مع خدمات الكونسيرج الفاخرة للاستقبال في صالات كبار الشخصيات بالمطار، وتسهيلات السكن الراقي والمدارس الدولية.",
    deliverablesEn: [
      "Corporate Banking Introductions & KYC Compliance Audit",
      "Multi-Currency Account Opening (AED, USD, EUR, GBP)",
      "VIP Airport Meet & Assist with Dedicated Private Transfers",
      "Executive Residential Leasing & Commercial Office Sourcing",
      "Personal Wealth Banking & Private Client Introductions",
    ],
    deliverablesAr: [
      "تجهيز ملفات الامتثال المصرفي (KYC) للبنوك الوطنية والدولية",
      "فتح حسابات الشركات المصرفية متعددة العملات (درهم، دولار، يورو)",
      "استقبال VIP في صالات المطار الخاصة وسيارات مجهزة",
      "استشارات استئجار المقار والمكاتب التنفيذية الفخمة",
      "ربط المستثمرين بإدارات الخدمات المصرفية الخاصة (Private Banking)",
    ],
    timeline: "7–14 Business Days",
    authorities: ["Central Bank of UAE", "Tier-1 UAE Commercial Banks"],
    icon: "Landmark",
  },
];
