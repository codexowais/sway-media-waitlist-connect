type SwayLogoProps = { size?: "hero" | "nav" };

export function SwayLogo({ size = "nav" }: SwayLogoProps) {
  const isHero = size === "hero";

  return (
    <div aria-label="swaymedia" className={`sway-logo sway-logo--${size}`} role="img">
      <img
        src="/brand/SWAY_MEDIA_logo_transparent.png"
        alt=""
        width={isHero ? 600 : 160}
        height={isHero ? 180 : 48}
        className="sway-logo__img"
        loading={isHero ? "eager" : "lazy"}
        draggable={false}
      />
    </div>
  );
}
