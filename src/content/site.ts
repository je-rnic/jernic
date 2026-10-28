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
		{ label: "Work", href: "/#work" },
		{ label: "About", href: "/about" },
		{ label: "Contact", href: "#contact" },
	],
} as const;

export const allWorksPage = {
	title: "All Works",
	intro: "A gallery of projects across product design, project management and frontend development.",
} as const;

export const aboutPage = {
	title: "boy ah, this one how to use ah?",
	paragraphs: [
		"growing up, my parents often thought my studying of 'computing' somehow meant i was a tech genius - from broken wifi connections, an email inbox out of storage, to navigating websites that simply had too much advertisements plastered over it. i was always happy to help; ",
		"but somewhere along the way i realised that my passion for tech wasn't necessarily driven by how technically impressive something could be - it was when users could skim through a product with ease coming back wanting to use it again.",
		"being a creative from young (see Yeo, 2007) came with its own set of foibles: i've always been kaypoh (intrigued) by the visual touches that guide our environment and culture -> the yellow tactile pavements at our mrts that aid our visually handicapped, the sloped roofs that keep our heavy rains out, and the trumpet flowers that bloom every spring and autumn.",
		"a part of me likes to think that the beauty in design lies in the beauty of our people. and it's why design and tech cannot coexist without first understanding the people needed beneath it. i'm particularly drawn to products that serve to use AI as a form of supplement, rather than one that overwrites it. it's equally essential that we keep our human touch within tech and design - it's also why you might have seen my handwriting hidden around this page by now.",
		"outside of my day to day rigour, you might find me indulging in my old soul hobbies: putting on jazz by kenny burrell, sipping on a hot oat latte, and people-watching by the window seat, where the sun just gently falls right through."
	],
} as const;

export const heroImage: {
	src: string;
	alt: string;
	width: number;
	height: number;
	loading: string;
} = {
	src: "/images/background.jpg",
	alt: "Background image",
	width: 3024,
	height: 2005,
	loading: "eager"
};
