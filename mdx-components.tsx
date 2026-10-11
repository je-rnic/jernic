import type { MDXComponents } from "mdx/types";
import { caseStudyComponents } from "@/components/case-study";

/**
 * Required by @next/mdx. Plain Markdown elements get the site's type styles here;
 * the case-study blocks (<Section>, <Callout> ...) are available in every .mdx file.
 */
const components: MDXComponents = {
	...caseStudyComponents,
	// Inside a <Section>, use ### for sub-headings (the section label is the h2).
	h3: (props) => <h3 className="type-title" {...props} />,
	h4: (props) => <h4 className="type-subtitle prose__h4" {...props} />,
	p: (props) => <p className="type-body" {...props} />,
};

export function useMDXComponents(): MDXComponents {
	return components;
}
