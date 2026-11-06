import FadeImage from "../FadeImage";
import MediaFrame from "../media/MediaFrame";
import Caption from "../media/Caption";
import type { AspectRatio, ImageFit } from "../media/types";

type ImageContent =
	| { src: string; alt: string; decorative?: false; placeholder?: never }
	| { src: string; decorative: true; alt?: never; placeholder?: never }
	| { placeholder: true; src?: never; alt?: never; decorative?: never };

export type FigureProps = ImageContent & {
	caption?: string;
	aspect?: AspectRatio;
	fit?: ImageFit;
};

/** Informative images require alt text; decoration and placeholders are explicit. */
export default function Figure({
	src,
	alt,
	decorative,
	caption,
	aspect = "3/2",
	fit = "contain",
}: FigureProps) {
	return (
		<figure className="figure">
			<MediaFrame aspect={aspect} surface>
				{src && (
					<FadeImage
						src={src}
						alt={decorative ? "" : alt!}
						fill
						sizes="(min-width: 768px) 60vw, 100vw"
						style={{ objectFit: fit }}
					/>
				)}
			</MediaFrame>
			{caption && <Caption>{caption}</Caption>}
		</figure>
	);
}
