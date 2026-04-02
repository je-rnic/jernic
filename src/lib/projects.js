import { promises as fs } from "fs";
import path from "path";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

function deriveRoleShort(role) {
	return role
		.replace(/\s*\([^)]*\)/g, "")
		.replace(/\s{2,}/g, " ")
		.trim();
}

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
	const sections = Array.isArray(project.sections)
		? project.sections
				.filter((section) => section && typeof section === "object")
				.map((section) => ({
					type: typeof section.type === "string" ? section.type.trim() : "",
					title:
						typeof section.title === "string" && section.title.trim()
							? section.title.trim()
							: null,
					body:
						typeof section.body === "string" && section.body.trim()
							? section.body.trim()
							: null,
					items: Array.isArray(section.items)
						? section.items.filter(
								(item) => typeof item === "string" && item.trim(),
							)
						: [],
					src:
						typeof section.src === "string" && section.src.trim()
							? section.src.trim()
							: null,
					poster:
						typeof section.poster === "string" && section.poster.trim()
							? section.poster.trim()
							: null,
					alt:
						typeof section.alt === "string" && section.alt.trim()
							? section.alt.trim()
							: null,
					caption:
						typeof section.caption === "string" && section.caption.trim()
							? section.caption.trim()
							: null,
					autoplay: section.autoplay !== false,
					loop: section.loop !== false,
					muted: section.muted !== false,
					controls: Boolean(section.controls),
				}))
		: [];
	const roleShort =
		typeof project.roleShort === "string" && project.roleShort.trim()
			? project.roleShort.trim()
			: deriveRoleShort(project.role.trim());

	return {
		title: project.title.trim(),
		subtitle: project.subtitle.trim(),
		role: project.role.trim(),
		roleShort,
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
		visible: project.visible !== false,
		award:
			typeof project.award === "string" && project.award.trim()
				? project.award.trim()
				: null,
		awardLink,
		highlights,
		sections,
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

	const visibleProjects = projects.filter((project) => project.visible);

	const slugSet = new Set();
	for (const project of visibleProjects) {
		if (slugSet.has(project.slug)) {
			throw new Error(`Duplicate project slug found: '${project.slug}'.`);
		}
		slugSet.add(project.slug);
	}

	return visibleProjects.sort(
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
