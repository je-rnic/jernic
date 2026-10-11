/**
 * Work registry: one entry per project. This is the ONLY place that lists
 * projects. The home page, the Works page, the case-study header and the
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

export type Work = {
  /** URL segment and MDX filename: /work/<slug> <-> content/work/<slug>.mdx */
  slug: string;
  title: string;
  /** One or two sentences. Shown in the lists and under the case-study title. */
  summary: string;
  /** What I actually did on this project. Be exact; see ownership rules. */
  roles: readonly string[];
  /** Optional bullet list of activities (research, wireframing, handoff ...). */
  scope?: readonly string[];
  start: YearMonth;
  /** Omit for a single-month project. "present" for ongoing work. */
  end?: YearMonth | "present";
  /** Optional cover shown in the case-study header. No width/height needed. */
  cover?: { src: string; alt: string };
  /** Optional preview shown on work-list rows. */
  overview?: { src: string; alt: string };
};

/*
 * TODO(confirm): every `start`/`end` below is a deliberate placeholder
 * (Jan–Mar 2000) so nothing wrong can ship unnoticed. Replace with real dates.
 * Titles, summaries and roles are copied from the Framer design.
 */
export const works: readonly Work[] = [
  {
    slug: "project-cumulus",
    title: "Project Cumulus",
    summary:
      "Reframing a complex internal workflow into a shared product language, clearer decision moments, and a more reliable operating rhythm.",
    roles: ["Product Consultant"],
    start: "2000-01",
  },
  {
    slug: "checkmate",
    title: "CheckMate: AI-Supported News Platform",
    summary:
      "A service design initiative that connected fragmented journeys into one legible, practical system for people on the move.",
    roles: ["UX Designer", "Frontend Engineer"],
    start: "2000-02",
  },
  {
    slug: "project-maple",
    title: "Project Maple: Optimising a Real Estate Management System",
    summary:
      "Designing a flexible workflow layer for teams coordinating hundreds of small, time-sensitive operational decisions each day.",
    roles: ["Business Analyst", "Frontend Engineer"],
    start: "2000-03",
  },
];

/** Slugs shown in "Selected work" on the home page, in this order. */
export const featuredSlugs: readonly string[] = [
  "project-cumulus",
  "checkmate",
  "project-maple",
];
