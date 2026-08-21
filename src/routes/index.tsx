import { createFileRoute } from "@tanstack/react-router";
import SwayHome from "@/components/pages/SwayHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SWAY MEDIA — Join the Waitlist" },
      {
        name: "description",
        content:
          "SWAY MEDIA is a new-age media agency at the intersection of culture, creativity, technology and AI. Join the waitlist.",
      },
      { property: "og:title", content: "SWAY MEDIA — Join the Waitlist" },
      {
        property: "og:description",
        content:
          "A new-age media agency at the intersection of culture, creativity, technology and AI. Something is forming.",
      },
    ],
  }),
  component: SwayHome,
});
