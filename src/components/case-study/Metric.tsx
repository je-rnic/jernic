import type { ReactNode } from "react";
import { placementClasses, type Placement } from "../layout/layout";

export type MetricProps = Placement & {
	label?: ReactNode;
	value: ReactNode;
	description?: ReactNode;
	note?: ReactNode;
	layout?: "stack" | "row";
};

export default function Metric({
	label,
	value,
	description,
	note,
	layout = "stack",
	...placement
}: MetricProps) {
	const valueNode = <p className="type-display">{value}</p>;
	const descriptionNode = description != null && <p className="type-subtitle">{description}</p>;
	return (
		<div className={["metric", placementClasses(placement)].filter(Boolean).join(" ")}>
			{label != null && <p className="type-eyebrow">{label}</p>}
			{layout === "row" ? (
				<div className="metric__row">
					{valueNode}
					{descriptionNode}
				</div>
			) : (
				<>
					{valueNode}
					{descriptionNode}
				</>
			)}
			{note != null && <p className="type-serif">{note}</p>}
		</div>
	);
}
