"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
	const roles = [
        "Barista",
		"Software Engineer",
		"Dancer",
		"Product Manager",
        "Interior Design Enthusiast",
		"Videographer",
        "B-boy",
		"UX Designer",
		"Artist",
		"Storyteller",
	];
	const loopedRoles = [...roles, roles[0]];
	const [activeIndex, setActiveIndex] = useState(0);
	const [isResetting, setIsResetting] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updateMotionPreference = () =>
			setPrefersReducedMotion(mediaQuery.matches);
		updateMotionPreference();

		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener("change", updateMotionPreference);
		} else {
			mediaQuery.addListener(updateMotionPreference);
		}

		const loadTimer = setTimeout(() => {
			setIsLoaded(true);
		}, 80);

		return () => {
			clearTimeout(loadTimer);
			if (mediaQuery.removeEventListener) {
				mediaQuery.removeEventListener("change", updateMotionPreference);
			} else {
				mediaQuery.removeListener(updateMotionPreference);
			}
		};
	}, []);

	useEffect(() => {
		if (prefersReducedMotion) {
			return;
		}

		const rotationTimer = setInterval(() => {
			setActiveIndex((previous) => previous + 1);
		}, 2500);

		return () => clearInterval(rotationTimer);
	}, [prefersReducedMotion]);

	useEffect(() => {
		if (prefersReducedMotion || activeIndex !== roles.length) {
			return;
		}

		const resetTimer = setTimeout(() => {
			setIsResetting(true);
			setActiveIndex(0);

			requestAnimationFrame(() => {
				setIsResetting(false);
			});
		}, 500);

		return () => clearTimeout(resetTimer);
	}, [activeIndex, prefersReducedMotion, roles.length]);

	return (
		<main className={`${styles.main} ${isLoaded ? styles.loaded : ""}`}>
			<Image
				fill={true}
				src="/images/background.jpg"
				alt="Portrait background"
				draggable="false"
			></Image>

			<div className={styles.overlay}></div>

			<div className={styles.content}>
				<div className={styles.introduction}>
					<p className={styles.kicker}>Hello, I am Jernic.</p>
					<h1>
						I build thoughtful digital experiences at the intersection of code,
						design, and product.
					</h1>
					<p className={styles.supportingText}>
						An engineer by day, an artist by night.
					</p>
				</div>

				<div className={styles.identityRow}>
					<p>I am also a/an</p>
					<div
						className={styles.tickerWindow}
						aria-live="polite"
						aria-atomic="true"
					>
						<div
							className={`${styles.tickerTrack} ${isResetting ? styles.noTransition : ""}`}
							style={{
								transform: `translateY(calc(-1 * ${activeIndex} * var(--ticker-step)))`,
							}}
						>
							{loopedRoles.map((role, index) => (
								<span key={`${role}-${index}`} className={styles.tickerItem}>
									{role}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
