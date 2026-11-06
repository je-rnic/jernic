import Column, { type ColumnProps } from "./Column";

export default function TextBlock({
	measure = "copy",
	className,
	...props
}: ColumnProps & { measure?: "copy" | "compact" | "wide" }) {
	return (
		<Column
			{...props}
			className={["text-block", "text-block--" + measure, "flow", className]
				.filter(Boolean)
				.join(" ")}
		/>
	);
}
