export interface TestimonialItem {
  id: string;
  clientName: string;
  clientTitle: string;
  companyName: string;
  jurisdictionTag: string;
  flagEmoji: string;
  rating: number;
  quoteEn: string;
  quoteAr: string;
  verified: boolean;
  yearIncorporated: number;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "testimonial-1",
    clientName: "Alexandre Dubois",
    clientTitle: "Managing Partner",
    companyName: "Solis Capital Europe",
    jurisdictionTag: "DIFC Family Office & Mainland",
    flagEmoji: "🇫🇷",
    rating: 5.0,
    quoteEn:
      "Novus handled our cross-border holding formation and Golden Visas with institutional perfection. Their direct channel to UAE sovereign departments turned a complex 3-month procedure into 10 seamless business days.",
    quoteAr:
      "تولت نوفوس تأسيس شركتنا القابضة العابرة للحدود واستخراج الإقامات الذهبية بدقة مؤسسية فائقة. علاقاتهم المباشرة مع الدوائر السيادية اختصرت إجراءات كانت تستغرق 3 أشهر إلى 10 أيام عمل فقط.",
    verified: true,
    yearIncorporated: 2024,
  },
  {
    id: "testimonial-2",
    clientName: "Sir James Thornton",
    clientTitle: "Founder & CEO",
    companyName: "Vanguard Logistics UK",
    jurisdictionTag: "Dubai Mainland LLC (100% Foreign)",
    flagEmoji: "🇬🇧",
    rating: 5.0,
    quoteEn:
      "Relocating our headquarters from London to Dubai required absolute regulatory clarity. Monir and Mostafa secured our 100% foreign ownership license and corporate banking clearance without a single bottleneck.",
    quoteAr:
      "تطلب نقل مقرنا الرئيسي من لندن إلى دبي وضوحاً تنظيمياً تاماً. نجح منير ومصطفى في استخراج رخصة التملك الأجنبي بنسبة 100% وتفعيل الحساب البنكي المؤسسي دون أي عائق.",
    verified: true,
    yearIncorporated: 2023,
  },
  {
    id: "testimonial-3",
    clientName: "Dr. Tariq Al-Ghamdi",
    clientTitle: "Principal Director",
    companyName: "Gulf Horizon Biotech",
    jurisdictionTag: "Dubai Science Park & Mainland",
    flagEmoji: "🇸🇦",
    rating: 5.0,
    quoteEn:
      "Their mastery of Ministry of Health approvals and specialized commercial licensing is unmatched in the GCC. Novus is not merely an agency; they are executive sovereign advisors who protect your interests.",
    quoteAr:
      "كفاءتهم في استصدار الموافقات المتخصصة من وزارة الصحة والتراخيص التجارية الفريدة لا مثيل لها في الخليج. نوفوس ليست مجرد مكتب تخليص، بل شركاء استشاريون يحمون استثمارك.",
    verified: true,
    yearIncorporated: 2024,
  },
  {
    id: "testimonial-4",
    clientName: "Elena Rostova",
    clientTitle: "Chief Technology Officer",
    companyName: "CyberGrid Labs",
    jurisdictionTag: "IFZA Tech Venture & Golden Visa",
    flagEmoji: "🇨🇭",
    rating: 5.0,
    quoteEn:
      "From Swiss banking integration to engineering team residence permits, Novus executed our entire setup with Swiss-watch precision. The cost transparency and zero hidden fees were truly refreshing.",
    quoteAr:
      "من الربط مع البنوك السويسرية إلى إصدار إقامات الفريق التقني، نفذت نوفوس تأسيس شركتنا بدقة متناهية. الشفافية المطلقة في التكاليف وانعدام الرسوم المخفية منحتنا ثقة لا حدود لها.",
    verified: true,
    yearIncorporated: 2025,
  },
  {
    id: "testimonial-5",
    clientName: "Marcus Sterling",
    clientTitle: "Head of Operations",
    companyName: "Apex Global Commodities",
    jurisdictionTag: "DMCC Free Zone Hub",
    flagEmoji: "🇦🇺",
    rating: 5.0,
    quoteEn:
      "Alaa Salem's corporate tax structuring saved our trading desk immense exposure during the 9% UAE Corporate Tax rollout. Their VIP concierge service and speed of response exceed premier private banks.",
    quoteAr:
      "هيكلة ضرائب الشركات التي أعدها علاء سالم حمت عملياتنا التجارية من أي مخاطر أثناء تطبيق ضريبة الشركات بنسبة 9%. خدمات كبار الشخصيات وسرعة الاستجابة تفوق البنوك الخاصة العالمية.",
    verified: true,
    yearIncorporated: 2024,
  },
];
