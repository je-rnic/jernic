import Columns from "../layout/Columns";
import Column from "../layout/Column";
import Stack from "../layout/Stack";
import TextBlock from "../layout/TextBlock";
import Metric from "./Metric";
import Quote from "./Quote";
import Caption from "../media/Caption";
import Workflow from "./Workflow";
import { Card, Cards } from "./Cards";
import Figure from "./Figure";
import Section from "./Section";
import Statement from "./Statement";
import Video from "./Video";
import WorkflowComparison from "./WorkflowComparison";

/**
 * Everything an .mdx case study can use without importing.
 * To add a new building block: create the component, add it here.
 */
export const caseStudyComponents = {
	Columns,
	Column,
	Stack,
	TextBlock,
	Metric,
	Quote,
	Caption,
	Workflow,
	Card,
	Cards,
	Figure,
	Section,
	Statement,
	Video,
	WorkflowComparison,
};
