"use client";

import * as React from "react";
import { Star, Quote, CheckCircle2, Building2 } from "lucide-react";
import { TestimonialItem } from "@/data/testimonials.data";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  testimonial: TestimonialItem;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  const { locale, t } = useLanguage();
  const isAr = locale === "ar";
  const quote = isAr ? testimonial.quoteAr : testimonial.quoteEn;

  return (
    <article
      className={cn(
        "relative flex h-full flex-col justify-between rounded-2xl border border-brand-glass-border/60 bg-brand-elevated/70 p-6 sm:p-7 backdrop-blur-xl shadow-glass transition-all duration-300 hover:border-brand-gold/50 hover:shadow-gold-subtle",
        className
      )}
    >
      <div>
        {/* Card Header: Rating Stars & Verified Badge */}
        <div className="flex items-center justify-between gap-3">
          {/* 5-Star Gold Rating */}
          <div
            className="flex items-center gap-1 text-brand-gold"
            aria-label={`${testimonial.rating} out of 5 stars`}
          >
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-brand-gold text-brand-gold"
              />
            ))}
            <span className="ms-1.5 font-mono text-xs font-bold text-brand-gold">
              5.0
            </span>
          </div>

          {/* Verified Incorporation Badge */}
          {testimonial.verified && (
            <div className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-jakarta text-[11px] font-semibold text-emerald-400">
              <CheckCircle2 className="h-3 w-3" />
              <span>{t("testimonials.verifiedSetup")}</span>
            </div>
          )}
        </div>

        {/* Decorative Quote Icon & Content */}
        <div className="relative mt-5">
          <Quote className="h-8 w-8 text-brand-gold/20" aria-hidden="true" />
          <blockquote className="mt-2 font-jakarta text-sm leading-relaxed text-brand-text-secondary">
            &ldquo;{quote}&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Client Identity & Jurisdiction Footer */}
      <div className="mt-6 border-t border-brand-glass-border/40 pt-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-outfit text-base font-bold text-brand-text-primary">
                {testimonial.clientName}
              </h4>
              <span className="text-base" role="img" aria-label="Country Flag">
                {testimonial.flagEmoji}
              </span>
            </div>
            <p className="font-jakarta text-xs text-brand-text-muted">
              {testimonial.clientTitle} •{" "}
              <span className="text-brand-text-secondary font-medium">
                {testimonial.companyName}
              </span>
            </p>
          </div>
        </div>

        {/* Jurisdiction & Year Tag */}
        <div className="mt-3 flex items-center justify-between gap-2 text-[11px] font-mono text-brand-text-muted">
          <span className="inline-flex items-center gap-1 text-brand-gold">
            <Building2 className="h-3 w-3" />
            <span>{testimonial.jurisdictionTag}</span>
          </span>
          <span>{isAr ? `تأسيس ${testimonial.yearIncorporated}` : `Est. ${testimonial.yearIncorporated}`}</span>
        </div>
      </div>
    </article>
  );
}
