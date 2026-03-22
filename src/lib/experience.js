import { promises as fs } from "fs";
import path from "path";

const EXPERIENCE_DIR = path.join(process.cwd(), "src/content/experience");

function assertString(experience, field, sourceFile) {
	if (typeof experience[field] !== "string" || !experience[field].trim()) {
		throw new Error(
			`Invalid experience content in ${sourceFile}: '${field}' is required.`,
		);
	}
}

function normalizeExperience(experience, sourceFile) {
	assertString(experience, "company", sourceFile);
	assertString(experience, "title", sourceFile);
	assertString(experience, "period", sourceFile);

	const highlights = Array.isArray(experience.highlights)
		? experience.highlights.filter(
				(entry) => typeof entry === "string" && entry.trim(),
			)
		: [];

	const technologies = Array.isArray(experience.technologies)
		? experience.technologies.filter(
				(entry) => typeof entry === "string" && entry.trim(),
			)
		: [];

	const order = Number.isFinite(experience.order) ? experience.order : 999;

	return {
		company: experience.company.trim(),
		title: experience.title.trim(),
		period: experience.period.trim(),
		highlights,
		technologies,
		order,
	};
}

export async function getAllExperience() {
	const files = await fs.readdir(EXPERIENCE_DIR);
	const experienceFiles = files.filter((file) => file.endsWith(".json"));

	const experiences = await Promise.all(
		experienceFiles.map(async (fileName) => {
			const fullPath = path.join(EXPERIENCE_DIR, fileName);
			const fileData = await fs.readFile(fullPath, "utf8");
			const parsed = JSON.parse(fileData);
			return normalizeExperience(parsed, fileName);
		}),
	);

	return experiences.sort(
		(a, b) => a.order - b.order || a.company.localeCompare(b.company),
	);
}
