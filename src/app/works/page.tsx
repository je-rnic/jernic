import type { Metadata } from "next";
import WorkRow from "@/components/WorkRow";
import { getWorksByDate, WORKS_ORDER, yearOf } from "@/content/work/queries";
import { worksPage } from "@/content/site";

export const metadata: Metadata = {
  title: worksPage.title,
  description: worksPage.intro,
};

export default function WorksPage() {
  const list = getWorksByDate();
  const direction = WORKS_ORDER === "newest-first" ? "newest first" : "oldest first";

  return (
    <main id="main">
      <header className="page-header container">
        <h1 className="type-display">{worksPage.title}</h1>
        <p className="page-header__intro type-subtitle">{worksPage.intro}</p>
      </header>

      <section className="works-list container" aria-label={`All works, ${direction}`}>
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
