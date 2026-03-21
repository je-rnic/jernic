"use client";
import styles from "./page.module.css";
import { useEffect } from "react";
import Landing from "../components/Landing";
import Projects from "../components/Projects";

export default function Home() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll({
				el: document.querySelector(".smooth-scroll"),
				smooth: true,
				smoothMobile: true,
			});
		})();
	}, []);

	return (
		<main className={styles.main}>
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
