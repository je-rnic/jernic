import type { HTMLAttributes } from "react";
import { placementClasses, type Placement } from "./layout";

export type ColumnProps = HTMLAttributes<HTMLDivElement> & Placement;

export default function Column({
	column,
	row,
	spaceBefore,
	desktopSpaceBefore,
	className,
	...props
}: ColumnProps) {
	return (
		<div
			{...props}
			className={
				[placementClasses({ column, row, spaceBefore, desktopSpaceBefore }), className]
					.filter(Boolean)
					.join(" ") || undefined
			}
		/>
	);
}
