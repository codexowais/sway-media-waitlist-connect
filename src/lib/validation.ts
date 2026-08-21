const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate an email address.
 * Returns an error message if invalid, or `null` if the value is acceptable.
 */
export function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Enter your email address.";
  if (!EMAIL_RE.test(trimmed)) return "Enter a valid email address.";
  return null;
}
