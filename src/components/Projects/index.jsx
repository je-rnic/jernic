import styles from "./style.module.scss";
import Project from "./components/project";
import { getAllProjects } from "../../lib/projects";

export default async function Home() {
	const projects = await getAllProjects();

	return (
		<main className={styles.main}>
			<div className={styles.body}>
				{projects.map((project) => {
					return (
						<Project
							key={project.slug}
							slug={project.slug}
							title={project.title}
							subtitle={project.subtitle}
							role={project.role}
						/>
					);
				})}
			</div>
		</main>
	);
}
