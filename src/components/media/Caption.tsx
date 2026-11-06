import type { ReactNode } from "react";
import type { CaptionTone } from "./types";

export default function Caption({
	children,
	tone = "serif",
}: {
	children: ReactNode;
	tone?: CaptionTone;
}) {
	return <figcaption className={"figure__caption type-" + tone}>{children}</figcaption>;
}
