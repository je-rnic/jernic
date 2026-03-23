"use client";

import { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { SiConfluence, SiJavascript, SiJirasoftware } from "react-icons/si";
import { FiCode } from "react-icons/fi";
import { FaProjectDiagram } from "react-icons/fa";

const EXPERIENCE_ICON_MAP = {
	javascript: SiJavascript,
	jira: SiJirasoftware,
	confluence: SiConfluence,
	outsystems: FaProjectDiagram,
};

function getTechnologyIcon(technology) {
	const normalized = technology.toLowerCase().trim();
	return EXPERIENCE_ICON_MAP[normalized] || FiCode;
}

export default function ExperiencePolaroids({ experiences }) {
	const cardRefs = useRef([]);
	const dotRefs = useRef([]);

	useEffect(() => {
		const supportsObserver = typeof IntersectionObserver !== "undefined";
		if (!supportsObserver) {
			return;
		}

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const thresholds = Array.from({ length: 41 }, (_, index) => index / 40);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const index = Array.from(cardRefs.current).indexOf(entry.target);
					if (index >= 0) {
						const isVisible = entry.isIntersecting;
						const boostedRatio = Math.min(1, entry.intersectionRatio * 1.2);
						const opacity =
							boostedRatio * boostedRatio * (3 - 2 * boostedRatio);
						entry.target.style.setProperty("--in-view", isVisible ? "1" : "0");
						entry.target.style.setProperty("--opacity", opacity.toString());

						if (dotRefs.current[index]) {
							if (isVisible && !prefersReducedMotion) {
								dotRefs.current[index].classList.add(styles.active);
							} else {
								dotRefs.current[index].classList.remove(styles.active);
							}
						}
					}
				});
			},
			{
				root: null,
				rootMargin: "0px 0px -18% 0px",
				threshold: thresholds,
			},
		);

		cardRefs.current.forEach((card) => {
			if (card) {
				observer.observe(card);
			}
		});

		return () => observer.disconnect();
	}, []);

	return (
		<div className={styles.timelineContainer}>
			<div className={styles.timelineMarker}>
				{experiences.map((_, index) => (
					<div
						key={`dot-${index}`}
						className={styles.timelineNode}
						ref={(element) => {
							dotRefs.current[index] = element;
						}}
					>
						<div className={styles.dot}></div>
					</div>
				))}
			</div>

			<ol className={styles.timeline}>
				{experiences.map((experience, index) => (
					<li
						key={`${experience.company}-${experience.period}`}
						className={styles.timelineItem}
					>
						<article
							className={styles.experienceCard}
							ref={(element) => {
								cardRefs.current[index] = element;
							}}
						>
							<div className={styles.cardNumber}>
								{String(index + 1).padStart(2, "0")}
							</div>

							<div className={styles.cardHead}>
								<div>
									<h3 className={styles.company}>{experience.company}</h3>
									<p className={styles.role}>{experience.title}</p>
									<p className={styles.period}>{experience.period}</p>
								</div>
							</div>

							<ul className={styles.highlights}>
								{experience.highlights.map((highlight) => (
									<li key={highlight}>{highlight}</li>
								))}
							</ul>

							{!!experience.technologies.length && (
								<div className={styles.techRow}>
									{experience.technologies.map((technology) => {
										const Icon = getTechnologyIcon(technology);
										return (
											<div key={technology} className={styles.techItem}>
												<Icon className={styles.techIcon} aria-hidden="true" />
												<span>{technology}</span>
											</div>
										);
									})}
								</div>
							)}
						</article>
					</li>
				))}
			</ol>
		</div>
	);
}
