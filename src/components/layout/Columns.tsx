import type { HTMLAttributes } from "react";
import { columnsClasses, placementClasses, type ColumnLayout, type Placement } from "./layout";

export type ColumnsProps = HTMLAttributes<HTMLDivElement> & ColumnLayout & Placement;

export default function Columns({
	ratio,
	gap,
	align,
	reverse,
	mobile,
	minStart,
	minEnd,
	column,
	row,
	spaceBefore,
	desktopSpaceBefore,
	className,
	...props
}: ColumnsProps) {
	return (
		<div
			{...props}
			className={[
				columnsClasses({ ratio, gap, align, reverse, mobile, minStart, minEnd }),
				placementClasses({ column, row, spaceBefore, desktopSpaceBefore }),
				className,
			]
				.filter(Boolean)
				.join(" ")}
		/>
	);
}
