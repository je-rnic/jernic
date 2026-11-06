import type { ReactNode } from "react";

/**
 * Full-width band in inverted colours: for the goal / the question the project
 * set out to answer. Use once, near the top.
 */
export default function Statement({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className={`statement`}>
      <div className="statement__inner container">
        <div className="statement__content">
          <h2 className="statement__label">{label}</h2>
          <div className="statement__text type-statement flow">{children}</div>
        </div>
      </div>
    </section>
  );
}
