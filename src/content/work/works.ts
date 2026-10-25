/**
 * Work registry: one entry per project. This is the ONLY place that lists
 * projects. The home page, the all works page, the individual work page and the
 * "next project" link all read from here.
 *
 * The story itself lives in `<slug>.mdx` next to this file.
 *
 * To add a project:
 *   1. add an entry below
 *   2. copy `_template.mdx` to `<slug>.mdx` and write the story
 *   3. (optional) add the slug to `featuredSlugs` to show it on the home page
 */

/** "YYYY-MM". Used for sorting and for the "Nov – Dec 2023" display. */
export type YearMonth = `${number}-${number}`;
export type Accent = {
	light: `#${string}`;
	dark: `#${string}`;
};

export type Work = {
	/** URL segment and MDX filename: /work/<slug> <-> content/work/<slug>.mdx */
	slug: string;
	/** Optional path to the story when it is nested under a project folder. */
	storyPath?: string;
	title: string;
	/** One or two sentences. Shown in the lists and under the case-study title. */
	summary: string;
	/** What I actually did on this project. Be exact; see ownership rules. */
	roles: readonly string[];
	/** Optional bullet list of activities (research, wireframing, handoff ...). */
	productType?: string;
	start: YearMonth;
	/** Omit for a single-month project. "present" for ongoing work. */
	end?: YearMonth | "present";
	/** Optional cover shown in the case-study header. No width/height needed. */
	cover?: { src: string; alt: string };
	/** Optional preview shown on work-list rows. */
	overview?: { src: string; alt: string };
	/** Optional metric shown in the case-study hero metadata. */
	stat?: { label: string; value: string };
	/** Light and dark accent colours used by the case-study editorial styling. */
	accent?: Accent;
};

/*
 * TODO(confirm): every `start`/`end` below is a deliberate placeholder
 * (Jan–Mar 2000) so nothing wrong can ship unnoticed. Replace with real dates.
 * Titles, summaries and roles are copied from the Framer design.
 */
export const works: readonly Work[] = [
	{
		slug: "project-c-accenture",
		title: "project-a*",
		summary:
			"Designing for an Enterprise Human Capital Management Platform to improve user experience for recruitment workflows.",
		roles: ["Product Analyst | Accenture"],
		accent: {
			light: "#59376f",
			dark: "#ab58db",
		},
		start: "2026-08",
		end:"present",
		overview: {
			src: "/images/work/project-c-accenture/Hero.png",
			alt: "Enterprise HR platform ecosystem diagram",
		},
		cover: {
			src: "/images/work/project-c-accenture/Hero.png",
			alt: "Enterprise HR platform ecosystem diagram",
		},
		productType: "Live",
		stat: {
			label: "Product Reach",
			value: "~2,270 Monthly Active Users",
		},
	},
	{
		slug: "checkmate",
		title: "CheckMate: AI-Powered News Platform",
		summary:
			"A capstone project on making news literacy more accessible and educational for our youth today. Team emerged 1st for the Dell Cloud Native Experience Award 2025",
		roles: ["UI/UX Designer", "Frontend Engineer"],
		start: "2024-06",
		end: "2025-06",
	},
	{
		slug: "project-m-accenture",
		title: "project-m*",
		summary:
			"Optimising the User Experience for Search Feature Enhancements on a low-code REMS within the Public Sector",
		roles: ["Software Engineer Intern | Accenture"],
		start: "2024-05",
		end: "2024-08",
	},
	{
		slug: "2023-05-barbequeue-google-ux-certificate",
		storyPath:
			"2023-05-barbequeue-google-ux-certificate/2023-05-barbequeue-google-ux-certificate",
		title: "BarbeQueue",
		summary:
			"A mobile UX case study for simplifying BBQ food ordering.",
		roles: ["Solo Designer | Google UX Design Certification"],
		productType: "Concept",
		accent: {
			light: "#ed795d",
			dark: "#FF947C",
		},
		start: "2023-05",
		end: "2023-08",
		overview: { src: "/images/work/2023-05-barbequeue-google-ux-certificate/assets/Hero.png", alt: "BarbeQueue application concept" },
		cover: { src: "/images/work/2023-05-barbequeue-google-ux-certificate/assets/Hero.png", alt: "BarbeQueue application concept" },
	},
];

/** Slugs shown in "Selected work" on the home page, in this order. */
export const featuredSlugs: readonly string[] = [
	"project-c-accenture",
	"checkmate",
	"project-m-accenture",
	"2023-05-barbequeue-google-ux-certificate",
];
