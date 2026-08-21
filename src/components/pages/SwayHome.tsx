import { Hero } from "@/components/hero/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Footer } from "@/components/footer/Footer";

export default function SwayHome() {
  return (
    <main aria-label="SWAY MEDIA waitlist">
      <Hero />
      <Capabilities />
      <Footer />
    </main>
  );
}
