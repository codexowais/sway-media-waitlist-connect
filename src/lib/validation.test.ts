import { expect, test } from "vitest";
import { validateEmail } from "./validation";

test("rejects an empty string", () => {
  expect(validateEmail("")).toBe("Enter your email address.");
});

test("rejects whitespace-only input", () => {
  expect(validateEmail("   ")).toBe("Enter your email address.");
});

test("rejects an invalid email format", () => {
  expect(validateEmail("not-an-email")).toBe("Enter a valid email address.");
});

test("rejects an email without a domain", () => {
  expect(validateEmail("user@")).toBe("Enter a valid email address.");
});

test("accepts a valid email", () => {
  expect(validateEmail("hello@swaymedia.in")).toBeNull();
});

test("accepts a valid email with leading/trailing whitespace", () => {
  expect(validateEmail("  hello@swaymedia.in  ")).toBeNull();
});
