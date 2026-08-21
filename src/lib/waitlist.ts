import { validateEmail } from "./validation";

const GENERIC_SUBMISSION_ERROR = "Unable to join the waitlist. Please try again.";

export async function submitWaitlistEmail(email: string): Promise<{ status: "acknowledged" }> {
  const normalizedEmail = email.trim().toLowerCase();
  const validationError = validateEmail(normalizedEmail);
  if (validationError) throw new Error(validationError);

  try {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: normalizedEmail }),
    });

    if (!response.ok) {
      throw new Error(GENERIC_SUBMISSION_ERROR);
    }
  } catch {
    throw new Error(GENERIC_SUBMISSION_ERROR);
  }

  return { status: "acknowledged" };
}
