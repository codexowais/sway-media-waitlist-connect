import { beforeEach, expect, test, vi } from "vitest";

const store = vi.hoisted(() => ({
  insertWaitlistEmail: vi.fn(),
  sendWaitlistEmails: vi.fn(),
}));

vi.mock("@/lib/waitlist-store.server", () => store);

import { POST } from "@/lib/waitlist-route-handler";

function post(email: unknown) {
  return POST(
    new Request("http://localhost/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }),
  );
}

beforeEach(() => {
  store.insertWaitlistEmail.mockReset();
  store.sendWaitlistEmails.mockReset();
  store.sendWaitlistEmails.mockResolvedValue(undefined);
});

test("stores a normalized waitlist email and returns an acknowledgement", async () => {
  store.insertWaitlistEmail.mockResolvedValue({ duplicate: false });

  const response = await post("  HELLO@SWAYMEDIA.IN  ");

  expect(response.status).toBe(201);
  expect(store.insertWaitlistEmail).toHaveBeenCalledWith("hello@swaymedia.in");
  expect(store.sendWaitlistEmails).toHaveBeenCalledWith("hello@swaymedia.in");
});

test("acknowledges a duplicate email without exposing database details", async () => {
  store.insertWaitlistEmail.mockResolvedValue({ duplicate: true });

  const response = await post("hello@swaymedia.in");

  expect(response.status).toBe(200);
  await expect(response.json()).resolves.toEqual({ status: "acknowledged" });
  expect(store.sendWaitlistEmails).not.toHaveBeenCalled();
});

test("rejects an invalid email before touching the database", async () => {
  const response = await post("not-an-email");

  expect(response.status).toBe(400);
  expect(store.insertWaitlistEmail).not.toHaveBeenCalled();
});
