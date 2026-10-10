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

/**
 * Hero photo. Leave as `null` to show a placeholder block.
 * To use a real photo: put the file in /public/images and fill this in, e.g.
 *   { src: "/images/hero.jpg", alt: "…", width: 3089, height: 2048 }
 * (Export it ~2400px wide first — next/image will serve smaller sizes.)
 */
export const heroImage: {
  src: string;
  alt: string;
  width: number;
  height: number;
} | null = null;
