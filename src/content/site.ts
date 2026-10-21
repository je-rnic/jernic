/**
 * Site chrome: things that belong to the website itself (nav labels, logo text, metadata)
 * Project entries live in content/work/works.ts
 * Case-study stories in content/work/<slug>.mdx.
 */

export const site = {
	name: "Jernic Yeo",
	title: "Jernic Yeo — Product Designer",
	description: "",
	logo: "/favicon.ico",
	nav: [
		{ label: "Work", href: "#work" },
		{ label: "About", href: "#about" },
		{ label: "Contact", href: "#contact" },
	],
} as const;

export const allWorksPage = {
	title: "All Works",
	intro: "A gallery of projects across product design, project management and frontend development.",
} as const;

export const heroImage: {
	src: string;
	alt: string;
	width: number;
	height: number;
} = {
	src: "/images/background.jpg",
	alt: "Background image",
	width: 3024,
	height: 2005,
};
