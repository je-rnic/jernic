import Link from "next/link";
import Image from "next/image";
import type { Work } from "@/content/work/works";

/**
 * One row in a list of projects. The whole row is the link.
 * `marker` is the narrow left column: "01" on the home page, the year on Works.
 * Pass `decorativeMarker` when the marker is only an index (screen readers skip it).
 */
export default function WorkRow({
  work,
  marker,
  decorativeMarker = false,
  headingLevel = 3,
}: {
  work: Work;
  marker: string;
  decorativeMarker?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <li>
      <Link href={`/work/${work.slug}`} className="work-row">
        <span
          className="work-row__marker type-eyebrow"
          aria-hidden={decorativeMarker || undefined}
        >
          {marker}
        </span>
        <span className="work-row__body">
          <Heading className="work-row__title type-title">{work.title}</Heading>
          <span className="work-row__summary type-subtitle">{work.summary}</span>
          <span className="work-row__roles type-serif">
            <span className="visually-hidden">Role: </span>
            {work.roles.join(", ")}
          </span>
        </span>
        <span className="work-row__overview">
          {work.overview ? (
            <Image
              src={work.overview.src}
              alt={work.overview.alt}
              fill
              sizes="(min-width: 768px) 30vw, 100vw"
            />
          ) : (
            <span className="work-row__overview-placeholder" aria-hidden="true" />
          )}
        </span>
      </Link>
    </li>
  );
}
