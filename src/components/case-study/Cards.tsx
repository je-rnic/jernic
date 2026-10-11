import type { ReactNode } from "react";

/** Grid of equal cards: three problems, a set of pain points, user groups. */
export function Cards({ children }: { children: ReactNode }) {
  return <div className="cards">{children}</div>;
}

export function Card({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="card flow">
      <p className="card__title type-title">{title}</p>
      {children}
    </div>
  );
}
