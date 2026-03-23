import styles from "./style.module.scss";
import ProjectsAccordion from "./ProjectsAccordion";
import { getAllProjects } from "../../lib/projects";

export default async function Home() {
	const projects = await getAllProjects();

	return (
		<main id="projects" className={styles.main}>
			<ProjectsAccordion projects={projects} />
			<a href="#experience" className={styles.nextSectionCue}>
				<span className={styles.cueLabel}>experience</span>
				<span className={styles.cueChevron} aria-hidden="true">
					⌄
				</span>
			</a>
		</main>
	);
}
