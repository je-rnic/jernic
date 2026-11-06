import { useId, type ReactNode } from "react";
import { placementClasses, type Placement } from "../layout/layout";

/** Container layout is independent of the content and emphasis of each card. */
export function Cards({
	children,
	layout = "grid",
	column,
	row,
	spaceBefore,
	desktopSpaceBefore,
}: Placement & {
	children: ReactNode;
	layout?: "grid" | "stack";
}) {
	return (
		<div
			className={[
				"cards",
				"cards--" + layout,
				placementClasses({ column, row, spaceBefore, desktopSpaceBefore }),
			]
				.filter(Boolean)
				.join(" ")}
		>
			{children}
		</div>
	);
}

export function Card({
	title,
	icon,
	number,
	variant = "default",
	headingLevel = 3,
	children,
}: {
	title: string;
	/** Decorative icon; meaningful information belongs in the title or body. */
	icon?: ReactNode;
	/** Optional visual index, e.g. "01". Reading order comes from the content. */
	number?: string;
	/** Display-sized titles are reserved for explicit metrics. */
	variant?: "default" | "metric";
	headingLevel?: 3 | 4;
	children?: ReactNode;
}) {
	const titleId = useId();
	const Heading = headingLevel === 4 ? "h4" : "h3";

	return (
		<article className={`card card--${variant}`} aria-labelledby={titleId}>
			{(icon || number) && (
				<div className="card__meta" aria-hidden="true">
					{icon && <span className="card__icon">{icon}</span>}
					{number && <span className="card__number">{number}</span>}
				</div>
			)}
			<Heading id={titleId} className="card__title type-title">
				{title}
			</Heading>
			{children != null && <div className="card__body flow">{children}</div>}
		</article>
	);
}
