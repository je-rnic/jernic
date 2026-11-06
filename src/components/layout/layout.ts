export type Space = "none" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "fluid";
export type GridGap = "2" | "5" | "6" | "7" | "section" | "fluid" | "responsive";
export type ColumnRatio = "1:1" | "1:2" | "2:1" | "1:3" | "2:3" | "3:2";

export type Placement = {
	/** Placement applies at the existing 48rem breakpoint. Mobile follows DOM order. */
	column?: 1 | 2 | "full";
	row?: 1 | 2 | 3;
	spaceBefore?: Space;
	desktopSpaceBefore?: Space;
};

export type ColumnLayout = {
	ratio?: ColumnRatio;
	gap?: GridGap;
	align?: "start" | "center" | "stretch";
	reverse?: boolean;
	mobile?: "grid" | "flow";
	minStart?: boolean;
	minEnd?: boolean;
};

export function placementClasses({
	column,
	row,
	spaceBefore,
	desktopSpaceBefore,
}: Placement): string {
	return [
		column && "column-" + column,
		row && "row-" + row,
		spaceBefore && "space-before-" + spaceBefore,
		desktopSpaceBefore && "desktop-space-before-" + desktopSpaceBefore,
	]
		.filter(Boolean)
		.join(" ");
}

export function columnsClasses({
	ratio = "1:1",
	gap = "5",
	align = "start",
	reverse = false,
	mobile = "grid",
	minStart = false,
	minEnd = false,
}: ColumnLayout): string {
	return [
		"columns",
		"columns--" + ratio.replace(":", "-"),
		"columns--gap-" + gap,
		"columns--align-" + align,
		mobile === "flow" && "columns--flow",
		reverse && "columns--reverse",
		minStart && "columns--min-start",
		minEnd && "columns--min-end",
	]
		.filter(Boolean)
		.join(" ");
}
