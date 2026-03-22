import styles from "./style.module.scss";
import ProjectsAccordion from "./ProjectsAccordion";
import { getAllProjects } from "../../lib/projects";

export default async function Home() {
	const projects = await getAllProjects();

	return (
		<main id="projects" className={styles.main}>
			<ProjectsAccordion projects={projects} />
		</main>
	);
}
