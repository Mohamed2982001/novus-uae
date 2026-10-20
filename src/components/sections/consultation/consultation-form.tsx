"use client";

import * as React from "react";
import {
  ShieldCheck,
  Calendar,
  Send,
  MessageCircle,
  Copy,
  Check,
  AlertTriangle,
  Clock,
  Building,
  User,
  Mail,
  Phone,
  HelpCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { submitConsultationAction } from "@/app/actions/consultation.action";
import { BrandConfig } from "@/config/brand.config";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

const JURISDICTION_OPTIONS_EN = [
  { value: "mainland", label: "Dubai Mainland LLC (100% Foreign Ownership)" },
  { value: "freezone", label: "UAE Free Zone (IFZA, DMCC, Shams, Meydan)" },
  { value: "offshore", label: "Offshore Entity (RAK ICC / JAFZA)" },
  { value: "golden_visa", label: "10-Year UAE Golden Visa Nomination" },
  { value: "undecided", label: "Undecided / Request Advisory Guidance" },
];

const JURISDICTION_OPTIONS_AR = [
  { value: "mainland", label: "البر الرئيسي في دبي (تملك أجنبي 100%)" },
  { value: "freezone", label: "المناطق الحرة (IFZA، DMCC، شمس، ميدان)" },
  { value: "offshore", label: "شركات الأوفشور الدولية (RAK ICC / جافزا)" },
  { value: "golden_visa", label: "ترشيح الإقامة الذهبية (10 سنوات)" },
  { value: "undecided", label: "غير محدد / طلب استشارة وتوجيه" },
];

const TIMELINE_OPTIONS_EN = [
  { value: "immediate", label: "Immediate Execution (Under 7 Days)" },
  { value: "within_30_days", label: "Within 30 Days" },
  { value: "planning", label: "Strategic Planning / Future Expansion" },
];

const TIMELINE_OPTIONS_AR = [
  { value: "immediate", label: "تنفيذ فوري وعاجل (أقل من 7 أيام)" },
  { value: "within_30_days", label: "خلال 30 يوماً" },
  { value: "planning", label: "تخطيط استراتيجي وتوسع مستقبلي" },
];

export interface ConsultationFormProps {
  className?: string;
}

export function ConsultationForm({ className }: ConsultationFormProps) {
  const { locale, t } = useLanguage();
  const isAr = locale === "ar";

  // Form Field State
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [jurisdiction, setJurisdiction] = React.useState("mainland");
  const [timeline, setTimeline] = React.useState("immediate");
  const [serviceInterest, setServiceInterest] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");

  // Submission & Validation State
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [generalError, setGeneralError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [referenceId, setReferenceId] = React.useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  const [hasCopiedRef, setHasCopiedRef] = React.useState(false);

  // Mount timestamp for anti-bot velocity check
  const mountTimestampRef = React.useRef<number>(0);
  React.useEffect(() => {
    mountTimestampRef.current = Date.now();
  }, []);

  const jurisdictionOptions = isAr ? JURISDICTION_OPTIONS_AR : JURISDICTION_OPTIONS_EN;
  const timelineOptions = isAr ? TIMELINE_OPTIONS_AR : TIMELINE_OPTIONS_EN;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const payload = {
        fullName,
        email,
        phone,
        companyName,
        jurisdiction,
        timeline,
        serviceInterest,
        notes,
        honeypot,
        timestamp: mountTimestampRef.current || Date.now() - 3000,
      };

      const result = await submitConsultationAction(payload);

      if (result.success && result.referenceId) {
        setReferenceId(result.referenceId);
        setIsSuccessModalOpen(true);
        // Reset form inputs
        setFullName("");
        setEmail("");
        setPhone("");
        setCompanyName("");
        setServiceInterest("");
        setNotes("");
        setHoneypot("");
        mountTimestampRef.current = Date.now();
      } else {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        setGeneralError(result.error || t("consultation.error.general"));
      }
    } catch {
      setGeneralError(t("consultation.error.general"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReference = () => {
    if (!referenceId) return;
    navigator.clipboard.writeText(referenceId);
    setHasCopiedRef(true);
    setTimeout(() => setHasCopiedRef(false), 2000);
  };

  const generateWhatsAppFastTrackUrl = () => {
    const text = isAr
      ? `مرحباً فريق الاستشارات السيادية في نوفوس (Novus UAE)، لقد قمت بتقديم طلب استشارة رسمية بالرقم المرجعي: *${referenceId}*. أود تسريع المراجعة ومتابعة الملف فوراً.`
      : `Hello Novus UAE Sovereign Advisory, I have submitted a formal consultation request with Reference ID: *${referenceId}*. I would like to fast-track my inquiry.`;
    return `https://wa.me/${BrandConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="consultation"
      aria-label={t("consultation.headline")}
      className={cn(
        "relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-brand-secondary/40 via-brand-primary to-brand-primary scroll-mt-36",
        className
      )}
    >
      {/* Ambient Radial Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-96 w-full max-w-5xl rounded-full bg-brand-gold/5 blur-[140px]"
      />

      <div className="container mx-auto max-w-[1152px] px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-brand-gold shadow-gold-subtle">
            <Calendar className="h-3.5 w-3.5" />
            <span>{t("consultation.sectionPill")}</span>
          </div>

          <h2 className="mt-4 font-outfit text-3xl font-extrabold tracking-tight text-brand-text-primary sm:text-4xl lg:text-5xl">
            {t("consultation.headline")}{" "}
            <span className="text-gradient-gold">
              {t("consultation.headlineGradient")}
            </span>
          </h2>

          <p className="mt-4 font-jakarta text-sm sm:text-base leading-relaxed text-brand-text-secondary">
            {t("consultation.subtitle")}
          </p>
        </div>

        {/* Main Form Container Card */}
        <div className="mx-auto max-w-3xl rounded-3xl border border-brand-glass-border/70 bg-brand-elevated/80 p-6 sm:p-10 backdrop-blur-2xl shadow-glass-elevated">
          {/* Error Banner */}
          {generalError && (
            <div
              role="alert"
              className="mb-8 flex items-start gap-3 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-start text-rose-300"
            >
              <AlertTriangle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
              <div className="flex-1 text-xs sm:text-sm">
                <p className="font-semibold text-rose-200">{generalError}</p>
                <p className="mt-1 text-rose-300/80">
                  {t("consultation.error.whatsappFallback")}{" "}
                  <a
                    href={`https://wa.me/${BrandConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline hover:text-white"
                  >
                    {t("consultation.error.whatsappLinkText")}
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Anti-Spam Invisible Honeypot Field */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="hp-field">Leave blank</label>
              <input
                id="hp-field"
                type="text"
                name="honeypot"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Row 1: Full Name & Corporate Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label={t("consultation.fullNameLabel")}
                placeholder={t("consultation.fullNamePlaceholder")}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={fieldErrors.fullName}
                startIcon={<User className="h-4 w-4" />}
                required
              />

              <Input
                label={t("consultation.emailLabel")}
                type="email"
                placeholder={t("consultation.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldErrors.email}
                startIcon={<Mail className="h-4 w-4" />}
                required
              />
            </div>

            {/* Row 2: Phone Number & Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label={t("consultation.phoneLabel")}
                type="tel"
                placeholder={t("consultation.phonePlaceholder")}
                helperText={t("consultation.phoneHelper")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={fieldErrors.phone}
                startIcon={<Phone className="h-4 w-4" />}
                required
              />

              <Input
                label={t("consultation.companyLabel")}
                placeholder={t("consultation.companyPlaceholder")}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                error={fieldErrors.companyName}
                startIcon={<Building className="h-4 w-4" />}
              />
            </div>

            {/* Row 3: Target Jurisdiction & Execution Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Select
                label={t("consultation.jurisdictionLabel")}
                options={jurisdictionOptions}
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                error={fieldErrors.jurisdiction}
              />

              <Select
                label={t("consultation.timelineLabel")}
                options={timelineOptions}
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                error={fieldErrors.timeline}
              />
            </div>

            {/* Row 4: Specific Service of Interest */}
            <Input
              label={t("consultation.serviceInterestLabel")}
              placeholder={t("consultation.serviceInterestPlaceholder")}
              value={serviceInterest}
              onChange={(e) => setServiceInterest(e.target.value)}
              error={fieldErrors.serviceInterest}
              startIcon={<HelpCircle className="h-4 w-4" />}
            />

            {/* Row 5: Confidential Scope Notes */}
            <Textarea
              label={t("consultation.notesLabel")}
              rows={4}
              placeholder={t("consultation.notesPlaceholder")}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              error={fieldErrors.notes}
              helperText={t("consultation.notesHelper")}
            />

            {/* Action Bar & Submit Button */}
            <div className="pt-4 border-t border-brand-glass-border/40">
              <Button
                type="submit"
                variant="gold"
                size="lg"
                isLoading={isSubmitting}
                className="w-full justify-center shadow-gold-glow py-3.5 font-bold tracking-wide"
                icon={<Send className="h-4 w-4 rtl:rotate-180" />}
                iconPosition="end"
              >
                {isSubmitting
                  ? t("consultation.submittingBtn")
                  : t("consultation.submitBtn")}
              </Button>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-jakarta text-brand-text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-brand-gold" />
                  <span>{t("consultation.slaCommitment")}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-gold" />
                  <span>{t("consultation.encryptionNotice")}</span>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Success Experience Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        size="md"
        title={t("consultation.modal.title")}
        description={t("consultation.modal.description")}
      >
        <div className="space-y-6 text-start">
          {/* Reference ID Banner */}
          <div className="rounded-2xl border border-brand-gold/40 bg-brand-gold/10 p-5 text-center">
            <span className="font-jakarta text-xs uppercase tracking-wider text-brand-text-muted">
              {t("consultation.modal.refLabel")}
            </span>
            <div className="mt-2 flex items-center justify-center gap-3">
              <span className="font-mono text-2xl font-black text-brand-gold tracking-widest">
                {referenceId}
              </span>
              <button
                type="button"
                onClick={handleCopyReference}
                aria-label="Copy Reference Number"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-gold/40 bg-brand-primary text-brand-gold transition-colors hover:bg-brand-elevated"
              >
                {hasCopiedRef ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            {hasCopiedRef && (
              <p className="mt-1 text-xs text-emerald-400 font-medium">
                {t("consultation.modal.copied")}
              </p>
            )}
          </div>

          {/* SLA Commitment */}
          <div className="rounded-xl border border-brand-glass-border/40 bg-brand-elevated/50 p-4 text-xs font-jakarta text-brand-text-secondary space-y-2">
            <div className="flex items-center gap-2 font-semibold text-brand-text-primary">
              <Clock className="h-4 w-4 text-brand-gold" />
              <span>{t("consultation.modal.responseCommitment")}</span>
            </div>
            <p className="leading-relaxed">
              {t("consultation.modal.responseDetail")}
            </p>
          </div>

          {/* Fast-Track Actions */}
          <div className="space-y-3 pt-2">
            <a
              href={generateWhatsAppFastTrackUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-jakarta text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-emerald-500 active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{t("consultation.modal.whatsAppFastTrack")}</span>
            </a>

            <Button
              variant="ghost"
              size="md"
              className="w-full justify-center text-brand-text-muted hover:text-brand-text-primary"
              onClick={() => setIsSuccessModalOpen(false)}
            >
              {t("consultation.modal.closeBtn")}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
