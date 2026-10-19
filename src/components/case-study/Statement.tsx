import type { ReactNode } from "react";

/**
 * Full-width band in inverted colours: for the goal / the question the project
 * set out to answer. Use once, near the top.
 */
export default function Statement({
  label,
  tone = "dark",
  children,
}: {
  label: string;
  tone?: "dark" | "light";
  children: ReactNode;
}) {
  return (
    <section className={`statement statement--${tone}`}>
      <div className="statement__inner split container">
        <h2 className="statement__label type-eyebrow">{label}</h2>
        <div className="statement__text type-display flow">{children}</div>
      </div>
    </section>
  );
}
