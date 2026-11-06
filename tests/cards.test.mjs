import assert from "node:assert/strict";
import test from "node:test";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadComponent } from "./load-component.mjs";

const { Card, Cards } = await loadComponent("src/components/case-study/Cards.tsx");

test("cards have unique accessible names and respect nested heading levels", () => {
	const html = renderToStaticMarkup(
		h(
			Cards,
			null,
			h(Card, { title: "First insight" }),
			h(Card, { title: "Nested insight", headingLevel: 4 }),
		),
	);
	const names = [...html.matchAll(/aria-labelledby="([^"]+)"/g)].map((m) => m[1]);
	assert.equal(names.length, 2);
	assert.equal(new Set(names).size, 2);
	assert.ok(html.includes(`<h3 id="${names[0]}"`));
	assert.ok(html.includes(`<h4 id="${names[1]}"`));
	assert.ok(html.includes("First insight</h3>"));
	assert.ok(html.includes("Nested insight</h4>"));
});

test("optional decoration never adds a focus target; body links remain usable", () => {
	const html = renderToStaticMarkup(
		h(
			Card,
			{
				title: "A clear starting point",
				number: "01",
				icon: h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M4 4h16" })),
			},
			h("p", null, "Read the ", h("a", { href: "/work/checkmate" }, "case study")),
		),
	);
	assert.match(html, /aria-hidden="true"/);
	assert.match(html, /<a href="\/work\/checkmate">case study<\/a>/);
	assert.doesNotMatch(html, /tabindex|role="button"/i);
});

test("rich content, zero values and escaped titles survive rendering", () => {
	const html = renderToStaticMarkup(
		h(
			Card,
			{ title: "Search < results" },
			h("p", null, h("strong", null, "Measured"), " request reduction"),
		),
	);
	assert.ok(html.includes("Search &lt; results"));
	assert.ok(html.includes("<strong>Measured</strong> request reduction"));
	assert.match(renderToStaticMarkup(h(Card, { title: "Count" }, 0)), />0<\/div>/);
});
