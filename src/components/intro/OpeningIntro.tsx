"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};

function shouldShowOpeningIntro() {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  return !reducedMotion;
}

export function OpeningIntro() {
  const shouldShow = useSyncExternalStore(subscribe, shouldShowOpeningIntro, () => true);
  const [isDismissed, setIsDismissed] = useState(false);
  const isVisible = shouldShow && !isDismissed;

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  function handleVideoEnd() {
    setIsDismissed(true);
  }

  return (
    <div
      aria-hidden="true"
      className="sway-opening-intro"
      data-testid="opening-intro"
    >
      <video
        autoPlay
        className="sway-opening-intro__video"
        muted
        onEnded={handleVideoEnd}
        playsInline
        preload="auto"
        src="/video/Website_opening_animation_design_202608201259.mp4"
        aria-label="SWAY MEDIA opening animation"
      />
    </div>
  );
}
