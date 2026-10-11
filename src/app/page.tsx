import Hero from "@/components/Hero";
import LandingBar from "@/components/LandingBar";
import SelectedWork from "@/components/SelectedWork";

export default function HomePage() {
	return (
		<main id="main">
			<section className="landing">
				<Hero />
				<LandingBar />
			</section>
			<SelectedWork />
		</main>
	);
}
