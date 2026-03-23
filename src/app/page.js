import styles from "./page.module.css";
import Landing from "../components/Landing";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import SmoothScrollInitializer from "../components/SmoothScrollInitializer";

export default function Home() {
	return (
		<main className={`smooth-scroll ${styles.main}`}>
			<SmoothScrollInitializer />
			<Landing />
			<Projects />
			<Experience />
			<Footer />
		</main>
	);
}
