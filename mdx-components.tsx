import type { MDXComponents } from "mdx/types";
import { caseStudyComponents } from "@/components/case-study";

/**
 * Required by @next/mdx. Plain Markdown elements get the site's type styles here;
 * the shared layout and content blocks are available in every .mdx file.
 */
const components: MDXComponents = {
	...caseStudyComponents,
	// Heading level expresses document structure independently of its appearance.
	h3: (props) => <h3 className="type-title" {...props} />,
	h4: (props) => <h4 className="type-subtitle type-subheading" {...props} />,
	p: (props) => <p className="type-body" {...props} />,
};

export function useMDXComponents(): MDXComponents {
	return components;
}
