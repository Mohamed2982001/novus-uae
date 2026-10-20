"use server";

import {
  consultationSchema,
  ConsultationResult,
  generateReferenceId,
} from "@/lib/consultation/schema";

/**
 * Server Action: Validates and processes executive consultation requests.
 * Hardened with:
 * 1. Invisible honeypot field verification
 * 2. Velocity-based bot submission trap (< 2000ms submission time)
 * 3. Strict Zod schema validation & input sanitization
 */
export async function submitConsultationAction(
  rawPayload: unknown
): Promise<ConsultationResult> {
  try {
    // 1. Zod Schema Validation
    const parsed = consultationSchema.safeParse(rawPayload);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0]?.toString();
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      }

      // If honeypot failed, silently return generic error to confuse bots
      if (fieldErrors.honeypot) {
        return {
          success: false,
          error: "Unable to process request at this time.",
        };
      }

      return {
        success: false,
        error: "Please correct the highlighted fields in the form.",
        fieldErrors,
      };
    }

    const data = parsed.data;

    // 2. Anti-Bot Velocity Check: Real humans take > 2 seconds to complete the form
    const clientTimestamp = data.timestamp;
    const now = Date.now();
    const elapsedMs = now - clientTimestamp;

    if (elapsedMs < 2000 && elapsedMs >= 0) {
      return {
        success: false,
        error:
          "Submission was completed too quickly. Please review your information and try again.",
      };
    }

    // 3. Generate sovereign reference ID
    const referenceId = generateReferenceId();

    // In a production environment with DB/CRM/Webmail:
    // We would dispatch to database (e.g. Postgres / MongoDB)
    // and trigger an encrypted SMTP notification to contact@novusuae.co.

    return {
      success: true,
      referenceId,
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return {
      success: false,
      error: `Executive intake failed: ${message}`,
    };
  }
}
