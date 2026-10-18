import ArrowLink from "./ArrowLink";
import WorkRow from "./WorkRow";
import { getFeaturedWorks } from "@/content/work/queries";

/** Home page segment: the featured projects, then a link to everything. */
export default function SelectedWork() {
  const featured = getFeaturedWorks();

  return (
    <section
      id="work"
      className="selected-work"
      aria-labelledby="selected-work-title"
    >
      <div className="selected-work__inner container">
        <h2 id="selected-work-title" className="type-eyebrow">
          Selected work
        </h2>

        <ol className="work-list">
          {featured.map((work, i) => (
            <WorkRow
              key={work.slug}
              work={work}
              marker={String(i + 1).padStart(2, "0")}
              decorativeMarker
            />
          ))}
        </ol>

        <div className="selected-work__footer">
          <ArrowLink href="/all-works">all works</ArrowLink>
        </div>
      </div>
    </section>
  );
}
