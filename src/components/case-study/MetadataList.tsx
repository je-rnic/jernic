import type { ReactNode } from "react";

export type MetadataItem = { label: string; value: ReactNode };

export default function MetadataList({ items }: { items: readonly MetadataItem[] }) {
	return (
		<dl className="metadata-grid">
			{items.map((item) => (
				<div key={item.label}>
					<dt className="type-title">{item.label}</dt>
					<dd className="type-body">{item.value}</dd>
				</div>
			))}
		</dl>
	);
}
