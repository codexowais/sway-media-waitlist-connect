import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { SwayLogo } from "./SwayLogo";

test("renders the SWAY logo using the actual brand asset", () => {
  render(<SwayLogo size="hero" />);
  expect(screen.getByLabelText("swaymedia")).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "swaymedia" })).toBeInTheDocument();
});
