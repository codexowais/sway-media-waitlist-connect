import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test, vi } from "vitest";

const submitWaitlistEmail = vi.hoisted(() => vi.fn());

vi.mock("@/lib/waitlist", () => ({ submitWaitlistEmail }));

import { WaitlistForm } from "./WaitlistForm";

beforeEach(() => {
  submitWaitlistEmail.mockResolvedValue({ status: "acknowledged" });
});

test("shows the CTA button in idle state", () => {
  render(<WaitlistForm />);
  expect(
    screen.getByRole("button", { name: /join the waitlist/i }),
  ).toBeInTheDocument();
});

test("transitions to the email form when CTA is clicked", async () => {
  const user = userEvent.setup();
  render(<WaitlistForm />);

  await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

  // Wait for AnimatePresence transition
  expect(
    await screen.findByPlaceholderText("YOUR EMAIL"),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /submit email/i }),
  ).toBeInTheDocument();
});

test("shows validation error for empty submission", async () => {
  const user = userEvent.setup();
  render(<WaitlistForm />);

  await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

  // Wait for the form to appear
  const submitBtn = await screen.findByRole("button", { name: /submit email/i });
  await user.click(submitBtn);

  expect(screen.getByText("Enter your email address.")).toBeInTheDocument();
});

test("shows validation error for invalid email", async () => {
  const user = userEvent.setup();
  render(<WaitlistForm />);

  await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

  const emailInput = await screen.findByPlaceholderText("YOUR EMAIL");
  await user.type(emailInput, "bad-email");
  await user.click(screen.getByRole("button", { name: /submit email/i }));

  expect(
    await screen.findByText("Enter a valid email address."),
  ).toBeInTheDocument();
});

test("shows success state for valid email submission", async () => {
  const user = userEvent.setup();
  render(<WaitlistForm />);

  await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

  const emailInput = await screen.findByPlaceholderText("YOUR EMAIL");
  await user.type(emailInput, "hello@swaymedia.in");
  await user.click(screen.getByRole("button", { name: /submit email/i }));

  // Wait for the existing success-state animation.
  await waitFor(
    () => {
      expect(screen.getByText(/you're in/i)).toBeInTheDocument();
    },
    { timeout: 3000 },
  );
});
