import { expect, test } from "vitest";
import "./globals.css";

test("applies SWAY display typography with precise tracking", () => {
  const heading = document.createElement("h1");
  heading.className = "sway-display";
  document.body.append(heading);

  const styles = getComputedStyle(heading);

  expect(styles.letterSpacing).toBe("-0.05em");
  expect(styles.fontWeight).toBe("400");
});
