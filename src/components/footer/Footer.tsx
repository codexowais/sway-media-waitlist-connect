export function Footer() {
  return (
    <footer className="sway-footer" role="contentinfo">
      <div className="sway-footer__rule" aria-hidden="true" />
      <p className="sway-footer__copy sway-label">&copy; {new Date().getFullYear()} Sway Media</p>
    </footer>
  );
}
