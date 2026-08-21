import { validateEmail } from "@/lib/validation";

/**
 * POST /api/waitlist
 *
 * Validates + normalizes the submitted email, stores it in the database through
 * the server-only store, then sends the confirmation/notification emails.
 * Duplicate signups are acknowledged without an error and without a second email.
 */
export async function POST(request: Request): Promise<Response> {
  let email: string;

  try {
    const body: unknown = await request.json();
    const submittedEmail =
      typeof body === "object" && body !== null && "email" in body ? body.email : undefined;

    if (typeof submittedEmail !== "string") {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }

    email = submittedEmail.trim().toLowerCase();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const validationError = validateEmail(email);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  try {
    const { insertWaitlistEmail, sendWaitlistEmails } = await import("@/lib/waitlist-store.server");

    const { duplicate } = await insertWaitlistEmail(email);
    if (duplicate) {
      return Response.json({ status: "acknowledged" });
    }

    try {
      await sendWaitlistEmails(email);
    } catch (emailError) {
      // Email delivery must never fail the signup itself.
      console.error("Waitlist email delivery failed", emailError);
    }
  } catch (error) {
    console.error("Waitlist signup failed", error);
    return Response.json({ error: "Unable to join the waitlist." }, { status: 500 });
  }

  return Response.json({ status: "acknowledged" }, { status: 201 });
}
