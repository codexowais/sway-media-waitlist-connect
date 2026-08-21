import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Home from "./page";

test("renders the SWAY main landmark", () => {
  render(<Home />);

  expect(
    screen.getByRole("main", { name: /sway media waitlist/i }),
  ).toBeInTheDocument();
});
