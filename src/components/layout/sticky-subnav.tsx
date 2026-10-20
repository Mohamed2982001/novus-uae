"use client";

import * as React from "react";
import {
  Compass,
  ShieldCheck,
  Briefcase,
  Calculator,
  Users,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export interface SubNavTab {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const SUBNAV_TABS: SubNavTab[] = [
  {
    id: "overview",
    labelEn: "Overview",
    labelAr: "نظرة عامة",
    icon: Compass,
  },
  {
    id: "authorities",
    labelEn: "Authorities",
    labelAr: "الجهات الرسمية",
    icon: ShieldCheck,
  },
  {
    id: "services",
    labelEn: "7 Core Services",
    labelAr: "الخدمات الرئيسية",
    icon: Briefcase,
  },
  {
    id: "calculator",
    labelEn: "Cost Calculator",
    labelAr: "حاسبة التكاليف",
    icon: Calculator,
  },
  {
    id: "leadership",
    labelEn: "Leadership",
    labelAr: "فريق القيادة",
    icon: Users,
  },
  {
    id: "testimonials",
    labelEn: "Reviews",
    labelAr: "آراء العملاء",
    icon: Star,
  },
  {
    id: "consultation",
    labelEn: "Consultation",
    labelAr: "حجز استشارة",
    icon: Calendar,
  },
];

export function StickySubnav() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const [activeTab, setActiveTab] = React.useState<string>("overview");
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const isManualScrollingRef = React.useRef(false);

  // Robust Scrollspy: Track active section via requestAnimationFrame & BoundingClientRect
  React.useEffect(() => {
    const sectionIds = SUBNAV_TABS.map((t) => t.id);
    let ticking = false;

    const updateActiveSection = () => {
      if (isManualScrollingRef.current) return;

      // When near top of the page, activate overview
      if (window.scrollY < 180) {
        setActiveTab("overview");
        return;
      }

      // When near bottom of the document, activate the last section (consultation)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120
      ) {
        setActiveTab(sectionIds[sectionIds.length - 1]);
        return;
      }

      // Check sections from bottom to top to identify the current active section
      const readingOffset = 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= readingOffset) {
            setActiveTab(id);
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Center active tab horizontally in the container WITHOUT scrolling the window
  React.useEffect(() => {
    const currentBtn = tabRefs.current[activeTab];
    const container = scrollContainerRef.current;
    if (currentBtn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = currentBtn.getBoundingClientRect();
      const currentScroll = container.scrollLeft;
      const targetScroll =
        currentScroll +
        (btnRect.left - containerRect.left) -
        containerRect.width / 2 +
        btnRect.width / 2;
      if (typeof container.scrollTo === "function") {
        container.scrollTo({
          left: targetScroll,
          behavior: "smooth",
        });
      } else {
        container.scrollLeft = targetScroll;
      }
    }
  }, [activeTab]);

  const handleTabClick = (sectionId: string) => {
    setActiveTab(sectionId);
    isManualScrollingRef.current = true;

    const target = document.getElementById(sectionId);
    if (target) {
      // 64-72px navbar + ~52px subnav + margin = ~135px
      const headerOffset = 135;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      if (typeof window.scrollTo === "function") {
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });
      }
    }

    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 800);
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      const offset = isAr ? 150 : -150;
      if (typeof scrollContainerRef.current.scrollBy === "function") {
        scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollLeft += offset;
      }
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const offset = isAr ? -150 : 150;
      if (typeof scrollContainerRef.current.scrollBy === "function") {
        scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollLeft += offset;
      }
    }
  };

  return (
    <nav
      aria-label="Page Sections Navigation"
      className="sticky top-[64px] sm:top-[72px] z-30 w-full max-w-full overflow-hidden border-b border-brand-glass-border/40 bg-brand-primary/95 backdrop-blur-xl shadow-glass transition-all duration-200"
    >
      <div className="container mx-auto max-w-[1152px] w-full min-w-0 px-2 sm:px-6 relative flex items-center">
        {/* Left Scroll Chevron (Mobile / Tablet helper) */}
        <button
          type="button"
          onClick={handleScrollLeft}
          aria-label="Scroll Tabs Left"
          className="flex lg:hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-glass-border/30 bg-brand-elevated/40 text-brand-gold transition-colors hover:bg-brand-elevated active:scale-95 z-10"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
        </button>

        {/* Scrollable Tabs Track */}
        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex flex-1 min-w-0 items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 px-2 scroll-smooth select-none lg:justify-center"
        >
          {SUBNAV_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const label = isAr ? tab.labelAr : tab.labelEn;

            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                data-tab={tab.id}
                data-active={isActive ? "true" : "false"}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group relative inline-flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap min-h-[38px]",
                  isActive
                    ? "bg-brand-gold/20 text-brand-gold shadow-gold-subtle border border-brand-gold/60 font-semibold scale-[1.02]"
                    : "text-brand-text-secondary hover:text-brand-gold hover:bg-brand-elevated/50 border border-transparent"
                )}
              >
                <Icon
                  className={cn(
                    "h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors",
                    isActive ? "text-brand-gold" : "text-brand-text-muted group-hover:text-brand-gold"
                  )}
                />
                <span className="font-outfit sm:font-jakarta">{label}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-brand-gold shadow-gold-subtle"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Scroll Chevron (Mobile / Tablet helper) */}
        <button
          type="button"
          onClick={handleScrollRight}
          aria-label="Scroll Tabs Right"
          className="flex lg:hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-glass-border/30 bg-brand-elevated/40 text-brand-gold transition-colors hover:bg-brand-elevated active:scale-95 z-10"
        >
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
        </button>
      </div>
    </nav>
  );
}
