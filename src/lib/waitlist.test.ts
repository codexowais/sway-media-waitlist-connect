import { afterEach, expect, test, vi } from "vitest";
import { submitWaitlistEmail } from "./waitlist";

afterEach(() => {
  vi.unstubAllGlobals();
});

test("normalizes an email before sending it to the waitlist endpoint", async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);

  await expect(submitWaitlistEmail("  HELLO@SWAYMEDIA.IN  ")).resolves.toEqual({
    status: "acknowledged",
  });

  expect(fetchMock).toHaveBeenCalledWith("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "hello@swaymedia.in" }),
  });
});

test("does not expose API errors to visitors", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 500 })));

  await expect(submitWaitlistEmail("hello@swaymedia.in")).rejects.toThrow(
    "Unable to join the waitlist. Please try again.",
  );
});
