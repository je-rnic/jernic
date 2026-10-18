import { featuredSlugs, works, type Work, type YearMonth } from "./works";

export type Order = "newest-first" | "oldest-first";

/** Change this one constant to flip the all works page. */
export const WORKS_ORDER: Order = "newest-first";

export function getWork(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}

export function getWorksByDate(order: Order = WORKS_ORDER): Work[] {
  const sorted = [...works].sort((a, b) => a.start.localeCompare(b.start));
  return order === "newest-first" ? sorted.reverse() : sorted;
}

export function getFeaturedWorks(): Work[] {
  return featuredSlugs
    .map(getWork)
    .filter((work): work is Work => work !== undefined);
}

/** The work after `slug` in the all works order, wrapping round at the end. */
export function getNextWork(slug: string): Work | undefined {
  const list = getWorksByDate();
  if (list.length < 2) return undefined;
  const i = list.findIndex((work) => work.slug === slug);
  return i === -1 ? undefined : list[(i + 1) % list.length];
}

/* ---- dates ---------------------------------------------------------------- */

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

function parts(value: YearMonth): { year: number; month: string } {
  const [year, month] = value.split("-").map(Number);
  return { year, month: MONTHS[month - 1] };
}

export function yearOf(work: Work): string {
  return String(parts(work.start).year);
}

/** "Nov 2023", "Nov – Dec 2023", "Nov 2023 – Mar 2024", "Nov 2023 – Present". */
export function formatPeriod(work: Work): string {
  const s = parts(work.start);
  if (!work.end) return `${s.month} ${s.year}`;
  if (work.end === "present") return `${s.month} ${s.year} – Present`;
  const e = parts(work.end);
  return s.year === e.year
    ? `${s.month} – ${e.month} ${e.year}`
    : `${s.month} ${s.year} – ${e.month} ${e.year}`;
}
