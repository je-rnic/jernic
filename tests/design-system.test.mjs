import assert from "node:assert/strict";
import test from "node:test";
import { createElement as h } from "react";
import { renderToStaticMarkup as render } from "react-dom/server";
import { loadComponent } from "./load-component.mjs";

const { default: Section } = await loadComponent("src/components/case-study/Section.tsx");
const { default: Columns } = await loadComponent("src/components/layout/Columns.tsx");
const { default: Metric } = await loadComponent("src/components/case-study/Metric.tsx");
const { default: MetadataList } = await loadComponent("src/components/case-study/MetadataList.tsx");
const { default: WorkflowComparison } = await loadComponent(
	"src/components/case-study/WorkflowComparison.tsx",
);

test("layout changes preserve authored reading order and accessible section labels", () => {
	const html = render(
		h(
			Section,
			{ reverse: true, "aria-labelledby": "outro" },
			h("h2", { id: "outro" }, "Takeaways"),
			h("p", null, "Supporting evidence"),
		),
	);
	assert.match(html, /<section[^>]*aria-labelledby="outro"/);
	assert.ok(html.indexOf("Takeaways") < html.indexOf("Supporting evidence"));
	const pair = render(
		h(
			Columns,
			{ reverse: true, ratio: "2:1" },
			h("p", null, "Primary content"),
			h("p", null, "Supporting content"),
		),
	);
	assert.ok(pair.indexOf("Primary content") < pair.indexOf("Supporting content"));
});

test("metrics retain zero values and metadata retains definition-list semantics", () => {
	const metric = render(h(Metric, { value: 0, label: "Requests", description: "Observed" }));
	assert.match(metric, />0<\/p>/);
	assert.match(metric, />Requests<\/p>/);
	const metadata = render(
		h(MetadataList, {
			items: [{ label: "Role", value: h("ul", null, h("li", null, "Designer")) }],
		}),
	);
	assert.match(metadata, /^<dl/);
	assert.match(metadata, /<dt[^>]*>Role<\/dt>/);
	assert.match(metadata, /<dd[^>]*><ul><li>Designer<\/li><\/ul><\/dd>/);
});

test("workflows accept case-study data and repeated comparisons have unique names", () => {
	const props = {
		before: { title: "Before", stages: [{ kind: "step", label: "Enter street" }] },
		after: {
			title: "After",
			stages: [
				{
					kind: "parallel",
					steps: [{ label: "Partial name", emphasis: true }, { label: "Complete name" }],
				},
			],
		},
	};
	const html = render(h("div", null, h(WorkflowComparison, props), h(WorkflowComparison, props)));
	const names = [...html.matchAll(/aria-labelledby="([^"]+)"/g)].map((m) => m[1]);
	assert.equal(names.length, 4);
	assert.equal(new Set(names).size, 4);
	for (const name of names) assert.ok(html.includes('id="' + name + '"'));
	assert.ok(html.includes("Partial name") && html.includes("Complete name"));
	assert.doesNotMatch(html, /Recruiter|Candidate|referee/);
});
