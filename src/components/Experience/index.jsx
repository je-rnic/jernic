import styles from "./style.module.scss";
import { getAllExperience } from "../../lib/experience";
import ExperiencePolaroids from "./ExperiencePolaroids";

export default async function Experience() {
	const experiences = await getAllExperience();

	return (
		<section
			id="experience"
			className={styles.main}
			aria-labelledby="experience-title"
		>
			<div className={styles.body}>
				<header className={styles.header}>
					<p className={styles.kicker}>Work Experience</p>
					<h2 id="experience-title">Delivering Software in Real Teams</h2>
				</header>
				<ExperiencePolaroids experiences={experiences} />
			</div>
		</section>
	);
}
