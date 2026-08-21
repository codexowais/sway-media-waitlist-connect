import "@testing-library/jest-dom/vitest";

// Polyfill IntersectionObserver for jsdom (needed by Framer Motion useInView)
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(
    private callback: IntersectionObserverCallback,
  ) {
    // Immediately trigger with all targets as intersecting
    requestAnimationFrame(() => {
      this.callback(
        [{ isIntersecting: true, intersectionRatio: 1 } as IntersectionObserverEntry],
        this,
      );
    });
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  globalThis.IntersectionObserver = MockIntersectionObserver;
}
