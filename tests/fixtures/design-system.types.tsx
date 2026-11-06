import Columns from "../../src/components/layout/Columns";
import Figure from "../../src/components/case-study/Figure";
import Workflow from "../../src/components/case-study/Workflow";

const informative = <Figure src="/screen.png" alt="Property search results" aspect="16/9" />;
const decorative = <Figure src="/texture.png" decorative />;
const placeholder = <Figure placeholder />;
// @ts-expect-error An informative image needs an explicit description.
const missingAlt = <Figure src="/screen.png" />;
// @ts-expect-error A decorative image cannot also carry an informative label.
const contradictoryImage = <Figure src="/texture.png" decorative alt="Information" />;
// @ts-expect-error Layout ratios express geometry rather than story categories.
const storyLayout = <Columns ratio="research" />;
// @ts-expect-error Workflows must contain at least one stage.
const emptyWorkflow = <Workflow title="Search" stages={[]} />;

void [
	informative,
	decorative,
	placeholder,
	missingAlt,
	contradictoryImage,
	storyLayout,
	emptyWorkflow,
];
