"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MessageSquareQuote, CheckCircle2, TrendingUp } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/data/testimonials.data";
import { TestimonialCard } from "./testimonial-card";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export interface TestimonialsCarouselProps {
  className?: string;
}

export function TestimonialsCarousel({ className }: TestimonialsCarouselProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const total = TESTIMONIALS_DATA.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="testimonials"
      aria-label={t("testimonials.headline")}
      className={cn(
        "relative py-20 sm:py-28 overflow-hidden bg-brand-primary scroll-mt-36",
        className
      )}
    >
      {/* Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-20 h-64 w-64 rounded-full bg-brand-gold/5 blur-[100px]"
      />

      <div className="container mx-auto max-w-[1152px] px-4 sm:px-6 relative z-10">
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-brand-gold shadow-gold-subtle">
              <MessageSquareQuote className="h-3.5 w-3.5" />
              <span>{t("testimonials.sectionPill")}</span>
            </div>

            <h2 className="mt-4 font-outfit text-3xl font-extrabold tracking-tight text-brand-text-primary sm:text-4xl lg:text-5xl">
              {t("testimonials.headline")}{" "}
              <span className="text-gradient-gold">
                {t("testimonials.headlineGradient")}
              </span>
            </h2>

            <p className="mt-3 font-jakarta text-sm sm:text-base leading-relaxed text-brand-text-secondary">
              {t("testimonials.subtitle")}
            </p>
          </div>

          {/* Carousel Arrows (>= 44x44px touch targets) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous Testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-glass-border/70 bg-brand-elevated/70 text-brand-text-primary transition-all duration-200 hover:border-brand-gold hover:text-brand-gold active:scale-95"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              aria-label="Next Testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-glass-border/70 bg-brand-elevated/70 text-brand-text-primary transition-all duration-200 hover:border-brand-gold hover:text-brand-gold active:scale-95"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Desktop Multi-Card Grid / Carousel View */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.slice(0, 3).map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>

        {/* Tablet 2-Card View */}
        <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6">
          {TESTIMONIALS_DATA.slice(0, 2).map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>

        {/* Mobile Single Card Slider */}
        <div className="md:hidden">
          <TestimonialCard testimonial={TESTIMONIALS_DATA[currentIndex]} />

          {/* Dot Indicators */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === currentIndex
                    ? "w-8 bg-brand-gold shadow-gold-subtle"
                    : "w-2 bg-brand-glass-border hover:bg-brand-text-muted"
                )}
              />
            ))}
          </div>
        </div>

        {/* Authority & Assurance Highlights Strip */}
        <div className="mt-14 sm:mt-16 rounded-2xl border border-brand-glass-border/40 bg-brand-elevated/40 p-6 backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-start">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-outfit text-sm font-bold text-brand-text-primary">
                  {t("testimonials.retentionTitle")}
                </p>
                <p className="font-jakarta text-xs text-brand-text-muted">
                  {t("testimonials.retentionSub")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="font-outfit text-sm font-bold text-brand-text-primary">
                  {t("testimonials.velocityTitle")}
                </p>
                <p className="font-jakarta text-xs text-brand-text-muted">
                  {t("testimonials.velocitySub")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
                <MessageSquareQuote className="h-5 w-5" />
              </div>
              <div>
                <p className="font-outfit text-sm font-bold text-brand-text-primary">
                  {t("testimonials.whatsAppVipTitle")}
                </p>
                <p className="font-jakarta text-xs text-brand-text-muted">
                  {t("testimonials.whatsAppVipSub")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
