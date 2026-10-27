import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyHeader from "@/components/case-study/CaseStudyHeader";
import WorkRow from "@/components/WorkRow";
import { works } from "@/content/work/works";
import { getNextWork, getWork, yearOf } from "@/content/work/queries";

type Props = { params: Promise<{ slug: string }> };
type CaseStudyStyle = React.CSSProperties & {
  "--accent"?: string;
};

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

  // The story defaults to content/work/<slug>.mdx, with an optional nested path
  // for projects that keep their story and assets together.
  let Story: React.ComponentType;
  try {
    ({ default: Story } = await import(
      `@/content/work/${work.storyPath ?? slug}.mdx`
    ));
  } catch {
    notFound();
  }

  const next = getNextWork(slug);
  const caseStudyStyle: CaseStudyStyle = {
    ["--accent"]: `light-dark(${work.accent?.light ?? "#5267b2"}, ${
      work.accent?.dark ?? "#a1b0f0"
    })`,
  };

  return (
    <main id="main">
      <article className="case-study" style={caseStudyStyle}>
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
