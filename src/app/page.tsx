import Hero from "@/components/Hero";
import LandingBar from "@/components/LandingBar";

export default function HomePage() {
  return (
    <main id="main">
      <section className="landing">
        <Hero />
        <LandingBar />
      </section>
      {/* Phase 2: #work (Selected work), #about, #contact */}
    </main>
  );
}
