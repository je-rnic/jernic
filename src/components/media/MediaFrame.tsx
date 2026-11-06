import type { HTMLAttributes } from "react";
import type { AspectRatio, ImageFit } from "./types";

export default function MediaFrame({
	as: Tag = "div",
	aspect,
	surface = false,
	fit,
	fill = false,
	className,
	style,
	...props
}: HTMLAttributes<HTMLElement> & {
	as?: "div" | "span";
	aspect?: AspectRatio;
	surface?: boolean;
	fit?: ImageFit;
	fill?: boolean;
}) {
	return (
		<Tag
			{...props}
			className={[
				"media-frame",
				surface && "media-frame--surface",
				fit && "media-frame--" + fit,
				fill && "media-frame--fill",
				className,
			]
				.filter(Boolean)
				.join(" ")}
			style={aspect ? { ...style, aspectRatio: aspect } : style}
		/>
	);
}
