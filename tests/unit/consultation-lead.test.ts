import { describe, it, expect } from "vitest";
import {
  consultationSchema,
  sanitizeInput,
  generateReferenceId,
} from "@/lib/consultation/schema";
import { submitConsultationAction } from "@/app/actions/consultation.action";

describe("Consultation Lead Capture & Security Validation", () => {
  const baseValidPayload = {
    fullName: "Alexander Sterling",
    email: "alexander@sterling-holdings.ch",
    phone: "+971501234567",
    companyName: "Sterling Holdings AG",
    jurisdiction: "mainland",
    timeline: "immediate",
    serviceInterest: "100% Foreign Ownership Mainland LLC",
    notes: "Structuring a multi-commodity corporate headquarters in Dubai.",
    honeypot: "",
    timestamp: Date.now() - 5000, // 5 seconds ago
  };

  it("validates a complete, compliant consultation payload successfully", () => {
    const result = consultationSchema.safeParse(baseValidPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe("Alexander Sterling");
      expect(result.data.email).toBe("alexander@sterling-holdings.ch");
      expect(result.data.jurisdiction).toBe("mainland");
      expect(result.data.timeline).toBe("immediate");
    }
  });

  it("rejects invalid email formats with informative message", () => {
    const payload = { ...baseValidPayload, email: "invalid-email-string" };
    const result = consultationSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailError = result.error.issues.find(
        (issue) => issue.path[0] === "email"
      );
      expect(emailError?.message).toContain("valid corporate email");
    }
  });

  it("rejects invalid phone numbers with too few digits", () => {
    const payload = { ...baseValidPayload, phone: "123" };
    const result = consultationSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const phoneError = result.error.issues.find(
        (issue) => issue.path[0] === "phone"
      );
      expect(phoneError).toBeDefined();
    }
  });

  it("detects and traps bot submission via honeypot field", async () => {
    const botPayload = {
      ...baseValidPayload,
      honeypot: "spam_bot_filling_every_field",
    };

    const actionResult = await submitConsultationAction(botPayload);
    expect(actionResult.success).toBe(false);
    expect(actionResult.referenceId).toBeUndefined();
  });

  it("rejects velocity violations for instantaneous bot submissions (< 2000ms)", async () => {
    const fastBotPayload = {
      ...baseValidPayload,
      timestamp: Date.now() - 500, // Only 500ms ago
    };

    const actionResult = await submitConsultationAction(fastBotPayload);
    expect(actionResult.success).toBe(false);
    expect(actionResult.error).toContain("too quickly");
  });

  it("sanitizes malicious script tags and injection vectors from user input", () => {
    const dirtyName = "<script>alert('xss')</script>Sir Arthur";
    const cleaned = sanitizeInput(dirtyName);
    expect(cleaned).not.toContain("<script>");
    expect(cleaned).not.toContain("</script>");
    expect(cleaned).toBe("alert(xss)Sir Arthur");

    const sqlInjectionNotes = "Notes'; DROP TABLE users; --";
    const cleanedNotes = sanitizeInput(sqlInjectionNotes);
    expect(cleanedNotes).not.toContain(";");
    expect(cleanedNotes).not.toContain("'");
  });

  it("generates correctly formatted executive reference IDs (NOV-2026-XXXX)", () => {
    const refId = generateReferenceId();
    expect(refId).toMatch(/^NOV-2026-[A-Z0-9]{4}$/);
  });

  it("successfully processes valid submissions through the Server Action", async () => {
    const actionResult = await submitConsultationAction(baseValidPayload);
    expect(actionResult.success).toBe(true);
    expect(actionResult.referenceId).toMatch(/^NOV-2026-[A-Z0-9]{4}$/);
  });

  // ==========================================
  // CONSULTATION FORM ABNORMAL & EDGE CASE TESTS
  // ==========================================

  it("accepts valid Arabic names and international accented characters", () => {
    const arabicPayload = {
      ...baseValidPayload,
      fullName: "محمد خالد عبد الرحمن",
    };
    const result = consultationSchema.safeParse(arabicPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe("محمد خالد عبد الرحمن");
    }

    const hyphenatedName = {
      ...baseValidPayload,
      fullName: "Sir Jean-Luc D'Artois",
    };
    const hyphenResult = consultationSchema.safeParse(hyphenatedName);
    expect(hyphenResult.success).toBe(true);
  });

  it("rejects names with numbers or illegal symbol characters", () => {
    const numberName = { ...baseValidPayload, fullName: "Alexander 123" };
    expect(consultationSchema.safeParse(numberName).success).toBe(false);

    const symbolName = { ...baseValidPayload, fullName: "Investor @ Dubai" };
    expect(consultationSchema.safeParse(symbolName).success).toBe(false);
  });

  it("rejects names that exceed 100 characters", () => {
    const longName = {
      ...baseValidPayload,
      fullName: "A".repeat(101),
    };
    expect(consultationSchema.safeParse(longName).success).toBe(false);
  });

  it("accepts international phone numbers with spaces, plus signs, and parentheses", () => {
    const formattedPhones = [
      "+971 50 123 4567",
      "+44 (0) 20 7946 0919",
      "+966-50-123-4567",
      "00971501234567",
    ];

    for (const phone of formattedPhones) {
      const result = consultationSchema.safeParse({
        ...baseValidPayload,
        phone,
      });
      expect(result.success).toBe(true);
    }
  });

  it("rejects malformed phone numbers containing letters or exceeding limits", () => {
    const letterPhone = { ...baseValidPayload, phone: "+97150CALLME" };
    expect(consultationSchema.safeParse(letterPhone).success).toBe(false);

    const longPhone = { ...baseValidPayload, phone: "1".repeat(25) };
    expect(consultationSchema.safeParse(longPhone).success).toBe(false);
  });

  it("rejects submission if required fields are missing", async () => {
    const missingFields = {
      fullName: "",
      email: "",
      phone: "",
      honeypot: "",
      timestamp: Date.now() - 5000,
    };

    const actionResult = await submitConsultationAction(missingFields);
    expect(actionResult.success).toBe(false);
    expect(actionResult.fieldErrors).toBeDefined();
    expect(actionResult.fieldErrors?.fullName).toBeDefined();
    expect(actionResult.fieldErrors?.email).toBeDefined();
    expect(actionResult.fieldErrors?.phone).toBeDefined();
  });

  it("rejects notes that exceed 1000 characters", () => {
    const excessiveNotes = {
      ...baseValidPayload,
      notes: "X".repeat(1001),
    };
    expect(consultationSchema.safeParse(excessiveNotes).success).toBe(false);
  });
});
