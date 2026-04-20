"use client";

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
	return (
		<div className={styles.timelineContainer}>
			<ol className={styles.timeline}>
				{experiences.map((experience, index) => (
					<li
						key={`${experience.company}-${experience.period}`}
						className={styles.timelineItem}
					>
						<article className={styles.experienceCard}>
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
