import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyHeader from "@/components/case-study/CaseStudyHeader";
import WorkRow from "@/components/WorkRow";
import { works } from "@/content/work/works";
import { getNextWork, getWork, yearOf } from "@/content/work/queries";

type Props = { params: Promise<{ slug: string }> };

/** Pre-build one page per registry entry. Unknown slugs fall through to notFound(). */
export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return { title: work.title, description: work.summary };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  // The story: content/work/<slug>.mdx. A registry entry without a file is a 404.
  let Story: React.ComponentType;
  try {
    ({ default: Story } = await import(`@/content/work/${slug}.mdx`));
  } catch {
    notFound();
  }

  const next = getNextWork(slug);

  return (
    <main id="main">
      <article>
        <CaseStudyHeader work={work} />
        <Story />
      </article>

      {next && (
        <nav className="case-next container" aria-labelledby="case-next-title">
          <h2 id="case-next-title" className="type-eyebrow">
            Next project
          </h2>
          <ul className="work-list">
            <WorkRow work={next} marker={yearOf(next)} />
          </ul>
        </nav>
      )}
    </main>
  );
}
