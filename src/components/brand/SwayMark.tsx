import Image from "next/image";

type SwayMarkProps = { className?: string };

export function SwayMark({ className }: SwayMarkProps) {
  return (
    <Image
      src="/brand/SWAY_MEDIA_symbol_transparent.png"
      alt=""
      width={48}
      height={72}
      className={className}
      data-testid="sway-mark"
      aria-hidden
      draggable={false}
    />
  );
}
