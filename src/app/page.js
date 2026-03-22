import styles from "./page.module.css";
import Landing from "../components/Landing";
import Projects from "../components/Projects";
import SmoothScrollInitializer from "../components/SmoothScrollInitializer";

export default function Home() {
	return (
		<main className={`smooth-scroll ${styles.main}`}>
			<SmoothScrollInitializer />
			{/* <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      <Description />

      <SlidingImages />
      <Contact /> */}
			<Landing />
			<Projects />
		</main>
	);
}
