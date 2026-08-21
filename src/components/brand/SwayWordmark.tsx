type SwayWordmarkProps = { className?: string };

export function SwayWordmark({ className }: SwayWordmarkProps) {
  return <span className={`sway-wordmark${className ? ` ${className}` : ""}`}>swaymedia</span>;
}
