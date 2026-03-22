import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { getProjectBySlug, getProjectSlugs } from "../../../lib/projects";

function renderAwardText(award, awardLink) {
	if (!awardLink) {
		return award;
	}

	const linkedText = "Champion";
	const linkedIndex = award.indexOf(linkedText);
	if (linkedIndex === -1) {
		return award;
	}

	const before = award.slice(0, linkedIndex);
	const after = award.slice(linkedIndex + linkedText.length);

	return (
		<>
			{before}
			<a
				href={awardLink}
				target="_blank"
				rel="noreferrer"
				className={styles.inlineAwardLink}
			>
				{linkedText}
			</a>
			{after}
		</>
	);
}

export async function generateStaticParams() {
	const slugs = await getProjectSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
	const project = await getProjectBySlug(params.slug);
	if (!project) {
		return { title: "Project Not Found" };
	}

	return {
		title: `${project.title} | Projects`,
		description: project.subtitle,
	};
}

export default async function ProjectDetailPage({ params }) {
	const project = await getProjectBySlug(params.slug);

	if (!project) {
		notFound();
	}

	return (
		<main className={styles.page}>
			<div className={styles.container}>
				<Link href="/" className={styles.backLink}>
					Back to home
				</Link>

				<h1 className={styles.title}>{project.title}</h1>
				<p className={styles.subtitle}>{project.subtitle}</p>

				<div className={styles.metaGrid}>
					<div>
						<h2>Role</h2>
						<p>{project.role}</p>
					</div>
					<div>
						<h2>Timeline</h2>
						<p>{project.timeline}</p>
					</div>
				</div>

				{project.award && (
					<section className={styles.section}>
						<h2>Award</h2>
						<p>{renderAwardText(project.award, project.awardLink)}</p>
					</section>
				)}

				<section className={styles.section}>
					<h2>Technologies</h2>
					<ul>
						{project.technologies.map((tech) => (
							<li key={tech}>{tech}</li>
						))}
					</ul>
				</section>

				<section className={styles.section}>
					<h2>Highlights</h2>
					<ul>
						{project.highlights.map((highlight) => (
							<li key={highlight}>{highlight}</li>
						))}
					</ul>
				</section>

				{project.link && (
					<a
						className={styles.externalLink}
						href={project.link}
						target="_blank"
						rel="noreferrer"
					>
						Visit project link
					</a>
				)}
			</div>
		</main>
	);
}
