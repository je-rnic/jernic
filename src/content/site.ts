/**
 * Site chrome: things that belong to the website itself (nav labels, logo text,
 * metadata). Facts about *you* — name, tagline, contact, bio — will move to
 * career-system/data/profile.json once the loader is built (Phase 2).
 */

export const site = {
  name: "Jernic Yeo",
  title: "Jernic Yeo — Product Designer",
  description:
    "A business analyst turned product designer building intuitive user experiences centred around data, design and accessibility.",
  logo: "l:go",
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const heroImage: {
  src: string;
  alt: string;
  width: 2400;
  height: number;
} = {
  src: "/images/background.jpg",
  alt: "Background image",
  width: 2400,
  height: 1600,
};
