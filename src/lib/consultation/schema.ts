import { z } from "zod";

/**
 * Text sanitization utility to strip malicious script tags, html tags,
 * and dangerous command injection fragments.
 */
export function sanitizeInput(value: string): string {
  if (!value) return "";
  return value
    .replace(/<[^>]*>?/gm, "") // Strip HTML/XML tags
    .replace(/[<>'"`;\\]/g, "") // Strip dangerous script characters
    .trim();
}

/**
 * Generate a unique executive reference number: NOV-2026-XXXX
 */
export function generateReferenceId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomCode = "";
  for (let i = 0; i < 4; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `NOV-2026-${randomCode}`;
}

/**
 * Phone number regex matching international formats:
 * Optional leading +, followed by 8 to 20 digits, spaces, hyphens, or parentheses.
 */
const PHONE_REGEX = /^\+?[0-9\s\-()]{8,20}$/;

/**
 * Full name regex supporting English, Arabic, common accented letters,
 * apostrophes, hyphens, and spaces.
 */
const NAME_REGEX = /^[a-zA-Z\u0600-\u06FF\s.'-]+$/;

export const consultationSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters")
    .regex(NAME_REGEX, "Full name contains invalid characters")
    .transform(sanitizeInput),

  email: z
    .string({ required_error: "Corporate email is required" })
    .email("Please provide a valid corporate email address")
    .max(100, "Email address is too long")
    .toLowerCase()
    .trim(),

  phone: z
    .string({ required_error: "Phone number is required" })
    .min(8, "Phone number must be at least 8 digits")
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(PHONE_REGEX, "Please enter a valid international phone number")
    .trim(),

  companyName: z
    .string()
    .max(100, "Company name cannot exceed 100 characters")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeInput(val) : "")),

  jurisdiction: z.enum(
    ["mainland", "freezone", "offshore", "golden_visa", "undecided"],
    {
      required_error: "Please select a target jurisdiction",
    }
  ),

  timeline: z.enum(["immediate", "within_30_days", "planning"], {
    required_error: "Please select your target timeline",
  }),

  serviceInterest: z
    .string()
    .max(100, "Service interest is too long")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeInput(val) : "")),

  notes: z
    .string()
    .max(1000, "Confidential notes cannot exceed 1000 characters")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeInput(val) : "")),

  // Anti-spam invisible honeypot field: MUST BE EMPTY
  honeypot: z
    .string()
    .max(0, "Automated bot submission detected"),

  // Client generation timestamp in ms: used for velocity check (< 2000ms is bot)
  timestamp: z
    .number({ required_error: "Submission timestamp is missing" })
    .int(),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;

export interface ConsultationResult {
  success: boolean;
  referenceId?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
}
