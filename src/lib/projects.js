import { promises as fs } from "fs";
import path from "path";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

function assertString(project, field, sourceFile) {
	if (typeof project[field] !== "string" || !project[field].trim()) {
		throw new Error(
			`Invalid project content in ${sourceFile}: '${field}' is required.`,
		);
	}
}

function normalizeProject(project, sourceFile) {
	assertString(project, "title", sourceFile);
	assertString(project, "subtitle", sourceFile);
	assertString(project, "role", sourceFile);
	assertString(project, "timeline", sourceFile);
	assertString(project, "slug", sourceFile);

	const technologies = Array.isArray(project.technologies)
		? project.technologies.filter(
				(entry) => typeof entry === "string" && entry.trim(),
			)
		: [];

	const highlights = Array.isArray(project.highlights)
		? project.highlights.filter(
				(entry) => typeof entry === "string" && entry.trim(),
			)
		: [];

	const order = Number.isFinite(project.order) ? project.order : 999;
	const link =
		typeof project.link === "string" && project.link.trim()
			? project.link.trim()
			: null;
	const awardLink =
		typeof project.awardLink === "string" && project.awardLink.trim()
			? project.awardLink.trim()
			: null;

	return {
		title: project.title.trim(),
		subtitle: project.subtitle.trim(),
		role: project.role.trim(),
		timeline: project.timeline.trim(),
		technologies,
		link,
		slug: project.slug.trim(),
		order,
		coverImage:
			typeof project.coverImage === "string" && project.coverImage.trim()
				? project.coverImage.trim()
				: null,
		featured: Boolean(project.featured),
		award:
			typeof project.award === "string" && project.award.trim()
				? project.award.trim()
				: null,
		awardLink,
		highlights,
	};
}

export async function getAllProjects() {
	const files = await fs.readdir(PROJECTS_DIR);
	const projectFiles = files.filter((file) => file.endsWith(".json"));

	const projects = await Promise.all(
		projectFiles.map(async (fileName) => {
			const fullPath = path.join(PROJECTS_DIR, fileName);
			const fileData = await fs.readFile(fullPath, "utf8");
			const parsed = JSON.parse(fileData);
			return normalizeProject(parsed, fileName);
		}),
	);

	const slugSet = new Set();
	for (const project of projects) {
		if (slugSet.has(project.slug)) {
			throw new Error(`Duplicate project slug found: '${project.slug}'.`);
		}
		slugSet.add(project.slug);
	}

	return projects.sort(
		(a, b) => a.order - b.order || a.title.localeCompare(b.title),
	);
}

export async function getProjectBySlug(slug) {
	const projects = await getAllProjects();
	return projects.find((project) => project.slug === slug) || null;
}

export async function getProjectSlugs() {
	const projects = await getAllProjects();
	return projects.map((project) => project.slug);
}
