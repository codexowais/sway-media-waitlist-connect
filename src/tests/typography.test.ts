import { expect, test } from "vitest";
import "@/styles.css";

test("applies SWAY display typography with precise tracking", () => {
  const heading = document.createElement("h1");
  heading.className = "sway-display";
  document.body.append(heading);

  const styles = getComputedStyle(heading);

  // -0.05em resolves to px in the computed style; both express the same tracking.
  expect(["-0.05em", "-1.6px"]).toContain(styles.letterSpacing);
  expect(styles.fontWeight).toBe("400");
});
