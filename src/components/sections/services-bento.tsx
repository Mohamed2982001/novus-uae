"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { SERVICES_DATA, ServiceItem } from "@/data/services.data";
import { ServiceCard } from "@/components/sections/service-card";
import { ServiceDrawer } from "@/components/sections/service-drawer";
import { useLanguage } from "@/context/language-context";

export function ServicesBento() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = React.useState<ServiceItem | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <section
      id="services"
      aria-label="Core Services Bento Grid"
      className="scroll-mt-36 py-16 sm:py-24"
    >
      <div className="container mx-auto max-w-[1152px] px-4 sm:px-6">
        {/* Section Executive Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-brand-glass-border/70 bg-brand-glass px-3.5 py-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-normal sm:tracking-wider text-brand-gold shadow-gold-subtle backdrop-blur-md text-center">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>{t("services.sectionPill")}</span>
          </div>

          <h2 className="font-outfit text-3xl font-extrabold tracking-tight text-brand-text-primary sm:text-4xl lg:text-5xl leading-tight">
            {t("services.headline")}{" "}
            <span className="text-brand-gold">{t("services.headlineGradient")}</span>
          </h2>

          <p className="mt-4 font-jakarta text-base leading-relaxed text-brand-text-secondary sm:text-lg">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Dedicated Responsive Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES_DATA.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={handleSelectService}
            />
          ))}
        </div>
      </div>

      {/* Interactive Detail Drawer */}
      <ServiceDrawer
        service={selectedService}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}
