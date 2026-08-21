import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import SwayHome from "@/components/pages/SwayHome";

test("renders the SWAY main landmark", () => {
  render(<SwayHome />);

  expect(screen.getByRole("main", { name: /sway media waitlist/i })).toBeInTheDocument();
});
