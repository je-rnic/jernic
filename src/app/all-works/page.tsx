import type { Metadata } from "next";
import WorkRow from "@/components/WorkRow";
import { getWorksByDate, WORKS_ORDER, yearOf } from "@/content/work/queries";
import { allWorksPage } from "@/content/site";

export const metadata: Metadata = {
  title: allWorksPage.title,
  description: allWorksPage.intro,
};

export default function AllWorksPage() {
  const list = getWorksByDate();
  const direction = WORKS_ORDER === "newest-first" ? "newest first" : "oldest first";

  return (
    <main id="main">
      <header className="page-header container">
        <h1 className="type-display">{allWorksPage.title}</h1>
        <p className="page-header__intro type-subtitle">{allWorksPage.intro}</p>
      </header>

      <section className="all-works-list container" aria-label={`All works, ${direction}`}>
        <ol className="work-list">
          {list.map((work) => (
            <WorkRow
              key={work.slug}
              work={work}
              marker={yearOf(work)}
              headingLevel={2}
            />
          ))}
        </ol>
      </section>
    </main>
  );
}
