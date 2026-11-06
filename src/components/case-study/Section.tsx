import type { HTMLAttributes } from "react";
import { columnsClasses, type ColumnLayout } from "../layout/layout";

/** A section boundary composed with the same layout classes as Columns.
 * Keeping both on this element preserves the existing DOM and spacing.
 */
export default function Section({
	divider = true,
	inset = false,
	ratio = "2:3",
	gap = "section",
	align = "start",
	reverse,
	minStart,
	minEnd,
	className,
	...props
}: HTMLAttributes<HTMLElement> &
	Omit<ColumnLayout, "mobile"> & {
		divider?: boolean;
		inset?: boolean;
	}) {
	return (
		<section
			{...props}
			className={[
				"section",
				divider && "section--divided",
				inset && "section--inset",
				columnsClasses({ ratio, gap, align, reverse, minStart, minEnd, mobile: "flow" }),
				className,
			]
				.filter(Boolean)
				.join(" ")}
		/>
	);
}
