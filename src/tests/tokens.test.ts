import { expect, test } from "vitest";
import "@/styles.css";

test("exposes the documented SWAY monochrome token system", () => {
  const styles = getComputedStyle(document.documentElement);

  expect(styles.getPropertyValue("--sway-black").trim()).toBe("#000000");
  expect(styles.getPropertyValue("--sway-white").trim()).toBe("#ffffff");
  expect(styles.getPropertyValue("--sway-border").trim()).toBe(
    "rgba(255, 255, 255, 0.12)",
  );
});
