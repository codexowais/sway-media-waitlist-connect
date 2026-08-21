import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { OpeningIntro } from "./OpeningIntro";

afterEach(() => {
  sessionStorage.clear();
  vi.restoreAllMocks();
});

test("plays the supplied opening video over a full-screen intro", () => {
  render(<OpeningIntro />);

  const video = screen.getByLabelText("SWAY MEDIA opening animation");
  expect(video).toHaveAttribute(
    "src",
    "/video/Website_opening_animation_design_202608201259.mp4",
  );
  expect(video).toHaveAttribute("autoplay");
  expect(video).toHaveAttribute("playsinline");
  expect(video).not.toHaveAttribute("loop");
  expect(document.body.style.overflow).toBe("hidden");
});

test("removes the overlay immediately when the video ends", () => {
  render(<OpeningIntro />);

  fireEvent.ended(screen.getByLabelText("SWAY MEDIA opening animation"));

  expect(screen.queryByTestId("opening-intro")).not.toBeInTheDocument();
  expect(sessionStorage.getItem("sway-media-opening-intro-complete")).toBeNull();
  expect(document.body.style.overflow).toBe("");
});

test("plays on a new document load even when a previous session stored completion", () => {
  sessionStorage.setItem("sway-media-opening-intro-complete", "true");

  render(<OpeningIntro />);

  expect(screen.getByTestId("opening-intro")).toBeInTheDocument();
});
