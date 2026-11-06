import { useId } from "react";

export type NonEmpty<T> = readonly [T, ...T[]];
export type WorkflowStep = { label: string; emphasis?: boolean };
export type WorkflowStage =
	({ kind: "step" } & WorkflowStep) | { kind: "parallel"; steps: NonEmpty<WorkflowStep> };
export type WorkflowProps = {
	title: string;
	stages: NonEmpty<WorkflowStage>;
	ordered?: boolean;
	heading?: "h3" | "label";
};

function Step({ label, emphasis }: WorkflowStep) {
	return (
		<div
			className={["workflow__step", emphasis && "workflow__step--emphasis"]
				.filter(Boolean)
				.join(" ")}
		>
			{label}
		</div>
	);
}

export default function Workflow({
	title,
	stages,
	ordered = false,
	heading = "h3",
}: WorkflowProps) {
	const titleId = useId();
	const Panel = heading === "h3" ? "section" : "div";
	const Heading = heading === "h3" ? "h3" : "p";
	const Flow = ordered ? "ol" : "div";
	const Item = ordered ? "li" : "div";
	return (
		<Panel className="workflow" aria-labelledby={titleId}>
			<Heading id={titleId} className="workflow__title type-eyebrow">
				{title}
			</Heading>
			<Flow className={"workflow__flow" + (ordered ? " workflow__flow--ordered" : "")}>
				{stages.map((stage, index) => (
					<Item key={index}>
						{stage.kind === "parallel" ? (
							<div className="workflow__parallel">
								{stage.steps.map((step) => (
									<Step key={step.label} {...step} />
								))}
							</div>
						) : (
							<Step {...stage} />
						)}
						{index < stages.length - 1 && (
							<span className="workflow__arrow" aria-hidden="true">
								↓
							</span>
						)}
					</Item>
				))}
			</Flow>
		</Panel>
	);
}
