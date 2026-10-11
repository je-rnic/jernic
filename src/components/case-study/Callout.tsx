import type { ReactNode } from "react";

/** Bordered box for one thing worth pausing on: a metric, an insight, a decision. */
export default function Callout({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <aside className="callout flow">
      {label && <p className="callout__label type-eyebrow">{label}</p>}
      <div className="callout__body type-title flow">{children}</div>
    </aside>
  );
}
