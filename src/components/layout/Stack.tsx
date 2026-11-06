import Column, { type ColumnProps } from "./Column";
import type { GridGap } from "./layout";

export default function Stack({
	gap = "5",
	width,
	className,
	...props
}: ColumnProps & { gap?: GridGap; width?: "wide" }) {
	return (
		<Column
			{...props}
			className={["stack", "stack--gap-" + gap, width && "stack--" + width, className]
				.filter(Boolean)
				.join(" ")}
		/>
	);
}
