import { expect, test, vi } from "vitest";

const mongodb = vi.hoisted(() => ({
  getWaitlistCollection: vi.fn(),
}));

vi.mock("@/lib/mongodb", () => mongodb);

import { POST } from "./route";

test("stores a normalized waitlist email and returns an acknowledgement", async () => {
  const createIndex = vi.fn().mockResolvedValue("waitlist_email_unique");
  const insertOne = vi.fn().mockResolvedValue({ acknowledged: true });
  mongodb.getWaitlistCollection.mockResolvedValue({ createIndex, insertOne });

  const response = await POST(
    new Request("http://localhost/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "  HELLO@SWAYMEDIA.IN  " }),
    }),
  );

  expect(response.status).toBe(201);
  expect(insertOne).toHaveBeenCalledWith(
    expect.objectContaining({ email: "hello@swaymedia.in" }),
  );
});

test("acknowledges a duplicate email without exposing database details", async () => {
  mongodb.getWaitlistCollection.mockResolvedValue({
    createIndex: vi.fn().mockResolvedValue("waitlist_email_unique"),
    insertOne: vi.fn().mockRejectedValue({ code: 11000, message: "duplicate key" }),
  });

  const response = await POST(
    new Request("http://localhost/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "hello@swaymedia.in" }),
    }),
  );

  expect(response.status).toBe(200);
  await expect(response.json()).resolves.toEqual({ status: "acknowledged" });
});
