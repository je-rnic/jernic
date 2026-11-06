import { columnsClasses } from "../layout/layout";
import Workflow, { type WorkflowProps } from "./Workflow";

export default function WorkflowComparison({
	before,
	after,
}: {
	before: WorkflowProps;
	after: WorkflowProps;
}) {
	return (
		<figure
			className={
				"workflow-comparison " + columnsClasses({ ratio: "1:1", gap: "5", align: "stretch" })
			}
		>
			<Workflow {...before} />
			<Workflow {...after} />
		</figure>
	);
}
