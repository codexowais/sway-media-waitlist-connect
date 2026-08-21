import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Capabilities } from "./Capabilities";

const CAPABILITY_ITEMS = ["Strategy", "Creative", "Content", "AI", "Growth"];

test("renders all five capability items", () => {
  render(<Capabilities />);

  for (const item of CAPABILITY_ITEMS) {
    expect(screen.getByText(item)).toBeInTheDocument();
  }
});

test("uses a list element for semantic structure", () => {
  render(<Capabilities />);
  expect(screen.getByRole("list")).toBeInTheDocument();
});
