import { createFileRoute } from "@tanstack/react-router";
import { POST } from "@/lib/waitlist-route-handler";

export const Route = createFileRoute("/api/waitlist")({
  server: {
    handlers: {
      POST: async ({ request }) => POST(request),
    },
  },
});
