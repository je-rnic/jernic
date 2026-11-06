import type { BlockquoteHTMLAttributes } from "react";
import { placementClasses, type Placement } from "../layout/layout";

export default function Quote({
	spaceBefore = "6",
	desktopSpaceBefore = spaceBefore,
	column,
	row,
	className,
	...props
}: BlockquoteHTMLAttributes<HTMLQuoteElement> & Placement) {
	return (
		<blockquote
			{...props}
			className={[
				"quote",
				placementClasses({ spaceBefore, desktopSpaceBefore, column, row }),
				className,
			]
				.filter(Boolean)
				.join(" ")}
		/>
	);
}
