import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";
import { BrandConfig } from "@/config/brand.config";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-brand-primary p-6 text-center">
      <div className="glass-card w-full max-w-lg rounded-3xl p-8 shadow-gold-subtle sm:p-12">
        {/* Monogram Badge */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-glass-border bg-brand-elevated text-brand-gold shadow-gold-subtle">
          <Compass className="h-8 w-8 animate-pulse" />
        </div>

        <div className="mb-2 font-mono text-sm uppercase tracking-widest text-brand-gold">
          404 — Not Found
        </div>

        <h1 className="mb-4 font-outfit text-3xl font-bold tracking-tight text-brand-text-primary sm:text-4xl">
          Page Not Located
        </h1>

        <p className="mb-8 font-jakarta text-sm leading-relaxed text-brand-text-secondary sm:text-base">
          The sovereign advisory resource or destination you are attempting to
          access does not exist or has been relocated within the{" "}
          <span className="text-brand-text-primary font-medium">{BrandConfig.name}</span> registry.
        </p>

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-7 py-3.5 font-outfit text-sm font-semibold text-brand-primary shadow-gold-subtle transition-all duration-200 hover:bg-brand-gold-hover hover:shadow-gold-glow active:scale-95"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            Return to Executive Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
