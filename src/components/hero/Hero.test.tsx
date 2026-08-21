import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Hero } from "./Hero";

test("renders the SWAY hero with wordmark, headline, and waitlist CTA", () => {
  render(<Hero />);

  // Wordmark text
  expect(screen.getByText("swaymedia")).toBeInTheDocument();

  // Headline
  expect(screen.getByText(/building what.s next/i)).toBeInTheDocument();

  // Supporting copy
  expect(
    screen.getByText(/new-age media agency/i),
  ).toBeInTheDocument();

  // Waitlist CTA
  expect(
    screen.getByRole("button", { name: /join the waitlist/i }),
  ).toBeInTheDocument();
});

