import type { ReactNode } from "react";

/**
 * A titled block of a case study. Label on the left, content on the right
 * (stacked on phones), the same split as "A little context" on the home page.
 * Markdown inside is styled by `.prose`.
 */
export default function Section({
  label,
  id,
  children,
}: {
  label: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section className="section" id={id}>
      <div className="section__inner split container">
        <h2 className="section__label type-eyebrow">{label}</h2>
        <div className="section__body prose flow">{children}</div>
      </div>
    </section>
  );
}
