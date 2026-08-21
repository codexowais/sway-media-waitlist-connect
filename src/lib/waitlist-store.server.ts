/**
 * Server-only waitlist persistence + notification helpers.
 *
 * This file is never reachable from the browser bundle (`.server.ts` is blocked
 * by the bundler), so the privileged database credential and the Resend API key
 * stay on the server.
 */
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type WaitlistInsertResult = { duplicate: boolean };

/** Postgres unique-violation error code. */
const UNIQUE_VIOLATION = "23505";

export async function insertWaitlistEmail(email: string): Promise<WaitlistInsertResult> {
  const { error } = await supabaseAdmin.from("waitlist").insert({ email });

  if (!error) return { duplicate: false };
  if (error.code === UNIQUE_VIOLATION) return { duplicate: true };

  throw new Error(error.message);
}

/**
 * Sends the visitor confirmation and the internal notification.
 * No-ops when Resend is not configured yet, so signups never fail because of email.
 */
export async function sendWaitlistEmails(email: string): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"];
  const from = process.env["RESEND_FROM_EMAIL"];
  const notify = process.env["WAITLIST_NOTIFICATION_EMAIL"];

  if (!apiKey || !from) return;

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to: email,
    subject: "You're on the SWAY MEDIA waitlist",
    text: "You're in.\n\nSway Media is a new-age media agency at the intersection of culture, creativity, technology and AI. We'll be in touch when we open the doors.\n\n— Sway Media",
  });

  if (notify) {
    await resend.emails.send({
      from,
      to: notify,
      subject: "New SWAY MEDIA waitlist signup",
      text: `New waitlist signup: ${email}`,
    });
  }
}
