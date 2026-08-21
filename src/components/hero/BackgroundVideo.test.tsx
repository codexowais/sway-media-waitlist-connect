import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { BackgroundVideo } from "./BackgroundVideo";

test("renders the supplied video as muted looping atmosphere", () => {
  render(<BackgroundVideo />);
  const video = screen.getByLabelText("Atmospheric SWAY media");
  expect((video as HTMLVideoElement).muted).toBe(true);
  expect(video).toHaveAttribute("loop");
  expect(video).toHaveAttribute("playsinline");
});
