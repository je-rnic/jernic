"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
	const workStatus = {
		/* "Open" or "Employed" */
		mode: "Open",
		company: "Company Name",
	};

	const statusContent =
		workStatus.mode === "Open"
			? {
					label: "Open to Work",
					detail: "Available for Full-Time Opportunities",
					bubbleClass: styles.statusOpen,
				}
			: {
					label: `Software Engineer at ${workStatus.company}`,
					detail: "Not actively looking right now",
					bubbleClass: styles.statusEmployed,
				};

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
	const TICKER_ROTATION_MS = 2500;
	const TICKER_TRANSITION_MS = 460;
	const [activeIndex, setActiveIndex] = useState(0);
	const [isResetting, setIsResetting] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isJnCustomReady, setIsJnCustomReady] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		if (typeof document === "undefined" || !document.fonts) {
			return;
		}

		const customFontFamily = getComputedStyle(document.body)
			.getPropertyValue("--font-jn-custom")
			.trim()
			.replace(/^"|"$/g, "");

		if (!customFontFamily) {
			return;
		}

		const fontQuery = `16px "${customFontFamily}"`;
		if (document.fonts.check(fontQuery)) {
			setIsJnCustomReady(true);
			return;
		}

		let isMounted = true;
		document.fonts.load(fontQuery).then(() => {
			if (isMounted && document.fonts.check(fontQuery)) {
				setIsJnCustomReady(true);
			}
		});

		return () => {
			isMounted = false;
		};
	}, []);

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

		if (activeIndex === roles.length) {
			const resetTimer = setTimeout(() => {
				setIsResetting(true);
				setActiveIndex(0);

				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						setIsResetting(false);
					});
				});
			}, TICKER_TRANSITION_MS);

			return () => clearTimeout(resetTimer);
		}

		const rotationTimer = setTimeout(() => {
			setActiveIndex((previous) => previous + 1);
		}, TICKER_ROTATION_MS);

		return () => clearTimeout(rotationTimer);
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
					<p
						className={`${styles.kicker} ${isJnCustomReady ? styles.kickerJnLoaded : ""}`}
					>
						Hello, I am Jernic
					</p>
					<h1 className={styles.heroTitle}>
						<span className={styles.heroLead}>I build</span>
						<span className={styles.heroStrong}>
							thoughtful digital experiences
						</span>
						<span className={styles.heroSub}>
							with the intention of code, design, and product.
						</span>
					</h1>
					<div
						className={`${styles.statusBubble} ${statusContent.bubbleClass}`}
					>
						<span className={styles.statusDot} aria-hidden="true"></span>
						<div className={styles.statusTextWrap}>
							<p className={styles.statusLabel}>{statusContent.label}</p>
							<p className={styles.statusDetail}>{statusContent.detail}</p>
						</div>
					</div>
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

				<div className={styles.scrollIndicator} aria-hidden="true">
					{/* <div className={styles.scrollDots}>
						<span className={styles.scrollDot}></span>
						<span className={styles.scrollDot}></span>
						<span className={styles.scrollDot}></span>
					</div> */}
					<div className={styles.scrollLabelGroup}>
						<span className={styles.scrollLabel}>projects</span>
						<span className={styles.scrollChevron}>⌄</span>
					</div>
				</div>
			</div>
		</main>
	);
}
